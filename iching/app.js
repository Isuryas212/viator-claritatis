(function () {
  "use strict";
  const data = window.VIATOR_ICHING_DATA;
  if (!data) return;
  const $ = id => document.getElementById(id);
  const trigramRoot = $("trigram-list"), hexagramRoot = $("hexagram-list");
  const search = $("hexagram-search"), count = $("hexagram-count");
  const detail = $("hexagram-detail");
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
      '<button type="button" class="hexagram-card hexagram-open" data-number="' + h.number + '"><div class="hexagram-top"><span class="hexagram-number">' + String(h.number).padStart(2,"0") + '</span><span class="hexagram-unicode">' + h.symbol + '</span></div><h3>' + h.pinyin + ' <span>' + h.hanzi + '</span></h3><p>' + h.gloss + '</p><div class="hexagram-lines">' + lineMarkup(h.pattern) + '</div><small>Ketuk untuk membuka detail</small></button>'
    ).join("");
    hexagramRoot.querySelectorAll("[data-number]").forEach(button => button.addEventListener("click", () => showHexagramDetail(Number(button.dataset.number))));
  }

  function showHexagramDetail(number) {
    const h = data.hexagrams.find(item => item.number === number);
    if (!h) return;
    const lower = data.trigrams.find(t => t.id === h.lower);
    const upper = data.trigrams.find(t => t.id === h.upper);
    const lines = h.pattern.split("").map((bit,i) => '<div class="detail-line"><span>Garis ' + (i+1) + (i===0 ? ' · terbawah' : i===5 ? ' · teratas' : '') + '</span><strong>' + (bit==="1" ? 'Yang · utuh' : 'Yin · terputus') + '</strong></div>').join("");
    detail.hidden = false;
    detail.innerHTML = '<div class="detail-heading"><div><small>HEKSAGRAM ' + String(h.number).padStart(2,"0") + ' · KING WEN</small><h3>' + h.symbol + ' ' + h.pinyin + ' <span>' + h.hanzi + '</span></h3><p>' + h.gloss + ' <em>(padanan ringkas kerja)</em></p></div><button type="button" class="detail-close">Tutup ×</button></div><div class="detail-pair"><div><small>TRIGRAM BAWAH</small><strong>' + lower.symbol + ' ' + lower.pinyin + '</strong><p>' + lower.image + '</p></div><div><small>TRIGRAM ATAS</small><strong>' + upper.symbol + ' ' + upper.pinyin + '</strong><p>' + upper.image + '</p></div></div><h4>Enam garis · dibaca dari bawah ke atas</h4><div class="detail-lines">' + lines + '</div><div class="detail-source"><strong>Status teks klasik</strong><p>Teks Judgment, Image, dan enam pernyataan garis akan dimasukkan setelah pencocokan edisi sumber. Tafsir Viator akan disajikan terpisah.</p><a href="https://kingskungfu.com/classics/i-ching/" target="_blank" rel="noopener">Buka teks Zhouyi dan terjemahan James Legge (1882)</a></div>';
    detail.scrollIntoView({behavior:"smooth",block:"start"});
    detail.querySelector(".detail-close").addEventListener("click", () => { detail.hidden = true; });
  }

  search.addEventListener("input", () => { renderHexagrams(search.value); detail.hidden = true; });
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

    const context = $("question-context").value.trim();
    const lowerName = trigramNames[primary.lower];
    const upperName = trigramNames[primary.upper];
    const nextLower = trigramNames[changed.lower];
    const nextUpper = trigramNames[changed.upper];
    const movementText = moving.length
      ? "Ada " + moving.length + " garis berubah pada posisi " + moving.join(", ") + " (dihitung dari bawah)."
      : "Tidak ada garis berubah; pola awal dan pola hasil tetap sama.";
    const prompts = moving.length
      ? [
          "Apa yang sedang berlangsung pada bagian keadaan yang kamu hubungkan dengan garis " + moving.join(", ") + "?",
          "Faktor apa yang berubah, dan faktor apa yang tetap bertahan?",
          "Perubahan apa yang benar-benar didukung oleh fakta, bukan sekadar dugaan?",
          "Apa konsekuensi yang mungkin muncul jika keadaan bergerak ke pola berikutnya?"
        ]
      : [
          "Apa yang membuat keadaan saat ini bertahan?",
          "Faktor apa yang menjaga keseimbangan atau kebuntuan?",
          "Apa yang dapat dilakukan tanpa memaksakan perubahan yang belum didukung keadaan?",
          "Bukti apa yang perlu diamati sebelum mengambil keputusan?"
        ];

    const lineBreakdown = values.map((v,i) => {
      const original = (v===7 || v===9) ? "Yang" : "Yin";
      const after = (v===6 || v===9) ? (original==="Yang" ? "Yin" : "Yang") : original;
      const status = (v===6 || v===9) ? "Berubah" : "Tetap";
      return '<div class="line-detail"><span>Garis ' + (i+1) + (i===0 ? ' · bawah' : i===5 ? ' · atas' : '') + '</span><strong>' + original + '</strong><span class="line-arrow">→</span><strong>' + after + '</strong><em>' + status + ' · nilai ' + v + '</em></div>';
    }).join("");
    const analysis = $("viator-analysis");
    analysis.innerHTML =
      '<h3 class="section-label">PEMBACAAN STRUKTURAL VIATOR</h3>' +
      '<p class="analysis-note">Bagian ini membaca hubungan pola, bukan meramalkan kejadian. Nama dan citra trigram berasal dari referensi klasik; pertanyaan telaah adalah kerangka refleksi Viator.</p>' +
      '<div class="analysis-block"><strong>1 · KEADAAN AWAL</strong><p>Trigram bawah: ' + lowerName + '. Trigram atas: ' + upperName + '.</p><p>Perhatikan hubungan antara dasar keadaan dan lingkungan atau kondisi yang menaunginya. Ini adalah titik awal pemeriksaan, bukan kesimpulan tentang situasimu.</p></div>' +
      '<div class="analysis-block"><strong>2 · TITIK PERUBAHAN</strong><p>' + movementText + '</p><p>' + (moving.length ? "Posisi garis menunjukkan bagian struktur yang berubah dalam hasil ini. Maknanya perlu diuji terhadap konteks nyata yang kamu tuliskan." : "Karena tidak ada garis berubah, instrumen tidak menunjukkan pergeseran struktur melalui lemparan ini.") + '</p></div>' +
      '<div class="analysis-block"><strong>3 · POLA BERIKUTNYA</strong><p>Trigram bawah: ' + nextLower + '. Trigram atas: ' + nextUpper + '.</p><p>Bandingkan dengan keadaan awal. Apa yang bergeser pada dasar keadaan, lingkungan, atau hubungan keduanya?</p></div>' +
      '<div class="analysis-block"><strong>4 · RINCIAN ENAM GARIS</strong><div class="line-breakdown">' + lineBreakdown + '</div></div>' +
      '<div class="analysis-block"><strong>5 · PERTANYAAN UNTUK DIPERIKSA</strong><ol>' + prompts.map(q => '<li>' + q + '</li>').join("") + '</ol></div>' +
      '<div class="analysis-block"><strong>CATATAN KONTEKS</strong><p id="context-echo"></p></div>' +
      '<p class="analysis-note">Jangan perlakukan hasil sebagai bukti atau instruksi. Cocokkan setiap dugaan dengan fakta, batas, pilihan, dan konsekuensi di dunia nyata.</p>';
    $("context-echo").textContent = context || "Belum ada konteks yang dituliskan. Hasil hanya dapat dibaca sebagai struktur garis.";
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
