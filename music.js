/* Viator Claritatis ambient music player.
   Browsers may block sound autoplay until the visitor presses Play once. */
(() => {
  const isIChing = location.pathname.includes("/iching/");
  const base = isIChing ? "../assets/music/" : "assets/music/";
  const tracks = {
    wanderer: { label: "Pengembara", file: "Pengembara-1.mp3" },
    anthem: { label: "Viator Anthem", file: "viator-anthem.mp3" }
  };
  const path = location.pathname.toLowerCase();
  const defaultTrack = path.endsWith("/book.html") || path.endsWith("/relations.html") || isIChing ? "wanderer" : "anthem";
  const savedTrack = localStorage.getItem("vc-music-track");
  let currentTrack = tracks[savedTrack] ? savedTrack : defaultTrack;
  let enabled = localStorage.getItem("vc-music-enabled") === "yes";

  const player = document.createElement("section");
  player.className = "vc-music-player";
  player.setAttribute("aria-label", "Pemutar musik Viator Claritatis");
  player.innerHTML = `
    <button class="vc-music-toggle" type="button" aria-label="Putar musik" title="Putar atau jeda musik"><span aria-hidden="true">▶</span></button>
    <div class="vc-music-meta"><strong>SUASANA</strong><span class="vc-music-status" aria-live="polite">Musik pengiring</span></div>
    <select class="vc-music-select" aria-label="Pilih musik">
      <option value="wanderer">Pengembara</option>
      <option value="anthem">Viator Anthem</option>
    </select>
    <button class="vc-music-volume" type="button" aria-label="Matikan suara" title="Matikan atau nyalakan suara">♫</button>
  `;
  document.body.appendChild(player);

  const audio = document.createElement("audio");
  audio.preload = "none";
  audio.loop = true;
  audio.volume = 0.18;
  const savedTime = Number(localStorage.getItem("vc-music-time") || 0);
  audio.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(savedTime) && savedTime > 0 && savedTime < audio.duration) audio.currentTime = savedTime;
  }, { once: true });
  audio.addEventListener("timeupdate", () => {
    if (Number.isFinite(audio.currentTime)) localStorage.setItem("vc-music-time", String(audio.currentTime));
  });
  window.addEventListener("pagehide", () => {
    if (Number.isFinite(audio.currentTime)) localStorage.setItem("vc-music-time", String(audio.currentTime));
  });
  document.body.appendChild(audio);

  const toggle = player.querySelector(".vc-music-toggle");
  const icon = toggle.querySelector("span");
  const status = player.querySelector(".vc-music-status");
  const select = player.querySelector(".vc-music-select");
  const volume = player.querySelector(".vc-music-volume");

  function setTrack(key) {
    currentTrack = key;
    select.value = key;
    audio.src = base + tracks[key].file;
    localStorage.setItem("vc-music-track", key);
    status.textContent = tracks[key].label;
  }
  function showPlaying(playing) {
    icon.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
    status.textContent = playing ? tracks[currentTrack].label + " · diputar" : tracks[currentTrack].label + " · dijeda";
    player.classList.toggle("is-playing", playing);
  }
  async function play() {
    try {
      await audio.play();
      enabled = true;
      localStorage.setItem("vc-music-enabled", "yes");
      showPlaying(true);
    } catch (error) {
      showPlaying(false);
      status.textContent = "Tekan ▶ untuk memulai musik";
    }
  }
  setTrack(currentTrack);
  toggle.addEventListener("click", () => audio.paused ? play() : audio.pause());
  audio.addEventListener("pause", () => showPlaying(false));
  audio.addEventListener("play", () => showPlaying(true));
  select.addEventListener("change", () => {
    const wasPlaying = !audio.paused;
    setTrack(select.value);
    if (wasPlaying || enabled) play();
  });
  volume.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volume.textContent = audio.muted ? "×" : "♫";
    volume.setAttribute("aria-label", audio.muted ? "Nyalakan suara" : "Matikan suara");
  });
  if (enabled) play();
  else status.textContent = "Tekan ▶ untuk memulai musik";
})();
