(() => {
  "use strict";

  const form = document.querySelector(".composer");
  const input = document.querySelector("#prompt");
  const send = form?.querySelector("button");
  const transcript = document.querySelector(".dialog-empty");
  const notice = document.querySelector(".notice");
  const status = document.querySelector(".status");
  if (!form || !input || !send || !transcript) return;

  const endpoint = document.querySelector('meta[name="viator-api-endpoint"]')?.content?.trim() || "";
  const STORAGE_KEY = "viator-dialog-v1";
  const MAX_HISTORY = 24;
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
    setStatus("Backend terkonfigurasi", true);
    if (notice) notice.textContent = "Percakapan dikirim ke layanan VIATOR yang dikonfigurasi. Hindari memasukkan data rahasia atau sensitif.";
  } else {
    input.disabled = true;
    send.disabled = true;
    setStatus("Backend belum terhubung");
  }

  if (history.length) renderHistory();

  function setBusy(value) {
    busy = value;
    send.disabled = value || !endpoint;
    input.disabled = value || !endpoint;
    send.textContent = value ? "…" : "↑";
    setStatus(value ? "VIATOR sedang menimbang…" : (endpoint ? "Backend terkonfigurasi" : "Backend belum terhubung"), !!endpoint && !value);
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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });
      if (!response.ok) throw new Error("Layanan mengembalikan status " + response.status);
      const data = await response.json();
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