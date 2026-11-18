import os
import time
from collections import defaultdict, deque
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

SITE_ORIGIN = os.getenv("SITE_ORIGIN", "https://isuryas212.github.io")
LITELLM_URL = os.getenv("LITELLM_URL", "http://litellm:4000")
LITELLM_API_KEY = os.getenv("LITELLM_API_KEY", "")
VIATOR_MODEL = os.getenv("VIATOR_MODEL", "viator-main")
MAX_MESSAGES = 20
MAX_CHARS = 4000
WINDOW_SECONDS = 60
REQUESTS_PER_WINDOW = 12

SYSTEM_PROMPT = """Kamu adalah VIATOR, ruang dialog dalam Viator Claritatis.
Identitas percakapanmu adaptif dan tidak terikat pada satu bentuk persona yang kaku.
Prinsip: ikuti perkembangan tanpa kehilangan diri; amati sebelum menyimpulkan;
pahami sebelum menentukan langkah; tetap berpijak pada realitas.

Berdialoglah secara jernih, kritis, terbuka, dan mudah diikuti. Bantu pengguna
menguji asumsi, melihat alternatif, dan membedakan fakta, dugaan, serta tafsir.
Jangan mengarang sumber, pengalaman, ingatan, atau kemampuan. Akui ketidakpastian
dan batas pengetahuan. Jangan mengaku sebagai manusia atau menyatakan memiliki
kesadaran subjektif. Hindari ceramah, pengulangan, dan kompleksitas yang tidak
diperlukan. Sesuaikan bahasa dengan pengguna; gunakan bahasa Indonesia bila sesuai.
Jangan menganggap seluruh karya Viator Claritatis telah menjadi sumber pengetahuanmu.
Jika isi sumber tidak tersedia dalam konteks, katakan demikian."""

app = FastAPI(title="VIATOR API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[SITE_ORIGIN],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=MAX_CHARS)

class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1, max_length=MAX_MESSAGES)

_rate_buckets: dict[str, deque] = defaultdict(deque)

def enforce_rate_limit(client_ip: str) -> None:
    now = time.monotonic()
    bucket = _rate_buckets[client_ip]
    while bucket and now - bucket[0] > WINDOW_SECONDS:
        bucket.popleft()
    if len(bucket) >= REQUESTS_PER_WINDOW:
        raise HTTPException(status_code=429, detail="Batas permintaan sementara tercapai.")
    bucket.append(now)

@app.get("/health")
async def health():
    return {"status": "ok", "service": "viator-api"}

@app.post("/api/chat")
async def chat(payload: ChatRequest, request: Request):
    if not LITELLM_API_KEY:
        raise HTTPException(status_code=503, detail="Backend AI belum dikonfigurasi.")
    client_ip = request.headers.get("x-real-ip") or (request.client.host if request.client else "unknown")
    enforce_rate_limit(client_ip)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(
        {"role": item.role, "content": item.content.strip()}
        for item in payload.messages
    )
    if any(not item["content"] for item in messages[1:]):
        raise HTTPException(status_code=422, detail="Pesan tidak boleh kosong.")

    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(75.0, connect=10.0)) as client:
            response = await client.post(
                f"{LITELLM_URL.rstrip('/')}/v1/chat/completions",
                headers={"Authorization": f"Bearer {LITELLM_API_KEY}"},
                json={
                    "model": VIATOR_MODEL,
                    "messages": messages,
                    "temperature": 0.6,
                },
            )
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        if not isinstance(reply, str) or not reply.strip():
            raise ValueError("Empty model response")
        return {"reply": reply.strip()}
    except httpx.HTTPStatusError as exc:
        # Do not expose provider responses, credentials, or internal details to the browser.
        raise HTTPException(status_code=502, detail="Layanan model sedang gagal. Coba lagi nanti.") from exc
    except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
        raise HTTPException(status_code=502, detail="VIATOR belum menerima jawaban yang valid.") from exc
