(() => {
  "use strict";

  const form = document.querySelector(".composer");
  const input = document.querySelector("#prompt");
  const send = form?.querySelector("button");
  const transcript = document.querySelector(".dialog-empty");
  const notice = document.querySelector(".notice");
  const status = document.querySelector(".status");
  const helper = form?.querySelector("small");
  if (!form || !input || !send || !transcript) return;

  const endpoint = document.querySelector('meta[name="viator-api-endpoint"]')?.content?.trim() || "";
  const STORAGE_KEY = "viator-dialog-v1";
  const MAX_HISTORY = 24;
  const API_HISTORY_LIMIT = 12;
  let history = [];
  let busy = false;

  function setStatus(label, ready = false) {
    if (!status) return;
    status.textContent = label;
    status.classList.toggle("is-ready", ready);
  }

  function showMessage(role, content) {
    const item = document.createElement("article");
    item.className = "dialog-message " + (role === "assistant" ? "from-viator" : "from-user");
    const label = document.createElement("span");
    label.className = "message-role";
    label.textContent = role === "assistant" ? "VIATOR" : "KAMU";
    const body = document.createElement("p");
    body.textContent = content;
    item.append(label, body);
    transcript.append(item);
    item.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderHistory() {
    transcript.querySelectorAll(".dialog-message").forEach(node => node.remove());
    history.forEach(message => showMessage(message.role, message.content));
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
    } catch (_) {
      // Dialog tetap berjalan meskipun penyimpanan lokal tidak tersedia.
    }
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved)) {
      history = saved.filter(item =>
        item && ["user", "assistant"].includes(item.role) &&
        typeof item.content === "string"
      ).slice(-MAX_HISTORY);
    }
  } catch (_) {
    history = [];
  }

  if (endpoint) {
    input.disabled = false;
    send.disabled = false;
    setStatus("Layanan AI aktif", true);
    if (notice) notice.textContent = "Dialog terhubung ke VIATOR melalui Cloudflare Workers AI. Hindari memasukkan kata sandi, data keuangan, atau informasi pribadi yang sensitif.";
    if (helper) helper.textContent = "Riwayat tersimpan di browser ini. Maksimal 12 pesan terakhir dikirim sebagai konteks.";
  } else {
    input.disabled = true;
    send.disabled = true;
    setStatus("Backend belum terhubung");
    if (helper) helper.textContent = "Kolom dialog belum tersedia.";
  }

  if (history.length) renderHistory();

  function setBusy(value) {
    busy = value;
    send.disabled = value || !endpoint;
    input.disabled = value || !endpoint;
    send.textContent = value ? "…" : "↑";
    setStatus(value ? "VIATOR sedang menimbang…" : (endpoint ? "Layanan AI aktif" : "Backend belum terhubung"), !!endpoint && !value);
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content || busy || !endpoint) return;

    history.push({ role: "user", content });
    history = history.slice(-MAX_HISTORY);
    showMessage("user", content);
    saveHistory();
    input.value = "";
    setBusy(true);

    try {
      const apiMessages = history.slice(-API_HISTORY_LIMIT);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || ("Layanan mengembalikan status " + response.status));
      const reply = typeof data.reply === "string" ? data.reply.trim() : "";
      if (!reply) throw new Error("Format jawaban layanan tidak sesuai.");
      history.push({ role: "assistant", content: reply });
      history = history.slice(-MAX_HISTORY);
      showMessage("assistant", reply);
      saveHistory();
    } catch (error) {
      const message = "Pesan belum mendapat jawaban. " + (error instanceof Error ? error.message : "Periksa koneksi layanan, lalu coba lagi.");
      showMessage("assistant", message);
    } finally {
      setBusy(false);
      input.focus();
    }
  });

  const clear = document.querySelector("[data-clear-dialog]");
  clear?.addEventListener("click", () => {
    history = [];
    saveHistory();
    renderHistory();
  });
})();