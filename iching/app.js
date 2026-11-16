(function () {
  "use strict";
  const data = window.VIATOR_ICHING_DATA;
  if (!data) return;
  const $ = id => document.getElementById(id);
  const trigramRoot = $("trigram-list"), hexagramRoot = $("hexagram-list");
  const search = $("hexagram-search"), count = $("hexagram-count");
  const castButton = $("cast-coins"), manualButton = $("show-manual");
  const manualPanel = $("manual-panel"), resultPanel = $("reading-result");
  const lineInputs = $("manual-lines");

  function lineMarkup(pattern) {
    return pattern.split("").reverse().map(bit =>
      '<span class="hex-line ' + (bit === "1" ? "yang" : "yin") + '"></span>'
    ).join("");
  }
  const trigramNames = Object.fromEntries(data.trigrams.map(t => [t.id, t.pinyin + " (" + t.image + ")"]));
  trigramRoot.innerHTML = data.trigrams.map(t =>
    '<article class="trigram-card"><div class="trigram-symbol">' + t.symbol + '</div><div><h3>' + t.pinyin + ' <span>' + t.hanzi + '</span></h3><p>' + t.image + '</p><small>' + t.pattern.split("").reverse().map(x => x === "1" ? "Yang" : "Yin").join(" · ") + '</small></div></article>'
  ).join("");

  function renderHexagrams(term) {
    const q = (term || "").trim().toLocaleLowerCase("id");
    const filtered = data.hexagrams.filter(h => !q || String(h.number).includes(q) || h.pinyin.toLocaleLowerCase("id").includes(q) || h.hanzi.includes(q) || h.gloss.toLocaleLowerCase("id").includes(q));
    count.textContent = filtered.length + " dari 64 heksagram";
    hexagramRoot.innerHTML = filtered.map(h =>
      '<article class="hexagram-card"><div class="hexagram-top"><span class="hexagram-number">' + String(h.number).padStart(2,"0") + '</span><span class="hexagram-unicode">' + h.symbol + '</span></div><h3>' + h.pinyin + ' <span>' + h.hanzi + '</span></h3><p>' + h.gloss + '</p><div class="hexagram-lines">' + lineMarkup(h.pattern) + '</div><small>Trigram bawah: ' + trigramNames[h.lower] + '<br>Trigram atas: ' + trigramNames[h.upper] + '</small></article>'
    ).join("");
  }
  search.addEventListener("input", () => renderHexagrams(search.value));
  renderHexagrams("");

  const options = '<option value="6">6 · Yin berubah</option><option value="7">7 · Yang tetap</option><option value="8">8 · Yin tetap</option><option value="9">9 · Yang berubah</option>';
  lineInputs.innerHTML = Array.from({length:6}, (_,i) =>
    '<label class="manual-line"><span>Garis ' + (i+1) + (i===0 ? ' · terbawah' : i===5 ? ' · teratas' : '') + '</span><select aria-label="Nilai garis ' + (i+1) + '" class="line-value">' + options + '</select></label>'
  ).join("");

  function patternFor(values) { return values.map(v => (v === 7 || v === 9) ? "1" : "0").join(""); }
  function showResult(values, source) {
    const primaryPattern = patternFor(values);
    const changedPattern = values.map((v,i) => v===6 || v===9 ? (primaryPattern[i]==="1"?"0":"1") : primaryPattern[i]).join("");
    const primary = data.hexagrams.find(h => h.pattern === primaryPattern);
    const changed = data.hexagrams.find(h => h.pattern === changedPattern);
    const moving = values.map((v,i) => (v===6 || v===9) ? i+1 : null).filter(Boolean);
    resultPanel.hidden = false;
    $("result-origin").textContent = source;
    $("primary-result").innerHTML = '<div class="result-symbol">' + primary.symbol + '</div><div><small>HEKSAGRAM AWAL · ' + primary.number + '</small><h3>' + primary.pinyin + ' ' + primary.hanzi + '</h3><p>' + primary.gloss + '</p></div><div class="result-lines">' + lineMarkup(primary.pattern) + '</div>';
    $("changing-result").textContent = moving.length ? "Garis berubah: " + moving.join(", ") : "Tidak ada garis berubah.";
    $("changed-result").innerHTML = '<div class="result-symbol">' + changed.symbol + '</div><div><small>HEKSAGRAM PERUBAHAN · ' + changed.number + '</small><h3>' + changed.pinyin + ' ' + changed.hanzi + '</h3><p>' + changed.gloss + '</p></div><div class="result-lines">' + lineMarkup(changed.pattern) + '</div>';
    resultPanel.scrollIntoView({behavior:"smooth",block:"start"});
  }
  castButton.addEventListener("click", () => {
    const values = Array.from({length:6}, () => {
      const bytes = new Uint32Array(3);
      crypto.getRandomValues(bytes);
      const yang = bytes.reduce((sum,n) => sum + (n % 2), 0);
      return [6,8,7,9][yang];
    });
    showResult(values, "Simulasi tiga koin · enam lemparan");
  });
  manualButton.addEventListener("click", () => {
    manualPanel.hidden = !manualPanel.hidden;
    manualButton.textContent = manualPanel.hidden ? "Input manual" : "Tutup input manual";
  });
  $("manual-submit").addEventListener("click", () => {
    const values = Array.from(lineInputs.querySelectorAll("select")).map(el => Number(el.value));
    if (values.length !== 6 || values.some(v => ![6,7,8,9].includes(v))) return;
    showResult(values, "Input manual · garis 1 (terbawah) sampai 6 (teratas)");
  });
})();
