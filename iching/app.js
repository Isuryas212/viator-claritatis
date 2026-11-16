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


  function renderClassical(h) {
    const c=data.classical && data.classical[h.number];
    if(!c) return '<strong>Teks klasik belum dimasukkan</strong><p>Entri ini menunggu pencocokan edisi sumber.</p><a href="https://kingskungfu.com/classics/i-ching/" target="_blank" rel="noopener">Buka edisi sumber James Legge (1882)</a>';
    const judgment=Array.isArray(c.judgment)?{zh:c.judgment[0],id:c.judgment[1]}:c.judgment;
    const image=Array.isArray(c.image)?{zh:c.image[0],id:c.image[1]}:c.image;
    const lines=c.lines.map((line,i)=>'<article class="classical-line"><strong>Garis '+(i+1)+'</strong><p class="classical-original">'+line[0]+'</p><p>'+line[1]+'</p></article>').join("");
    const changing=c.changing?'<h4>GARIS KHUSUS</h4><p class="classical-original">'+c.changing[0]+'</p><p>'+c.changing[1]+'</p>':'';
    return '<h4>JUDGMENT · KEPUTUSAN</h4><p class="classical-original">'+judgment.zh+'</p><p>'+judgment.id+'</p><h4>IMAGE · GAMBARAN</h4><p class="classical-original">'+image.zh+'</p><p>'+image.id+'</p><h4>ENAM PERNYATAAN GARIS</h4>'+lines+changing+'<p class="analysis-note">'+c.source+'</p><a href="https://kingskungfu.com/classics/i-ching/" target="_blank" rel="noopener">Periksa teks Zhouyi dan James Legge (1882)</a>';
  }

  function showHexagramDetail(number) {
    const h = data.hexagrams.find(item => item.number === number);
    if (!h) return;
    const lower = data.trigrams.find(t => t.id === h.lower);
    const upper = data.trigrams.find(t => t.id === h.upper);
    const lines = h.pattern.split("").map((bit,i) => '<div class="detail-line"><span>Garis ' + (i+1) + (i===0 ? ' · terbawah' : i===5 ? ' · teratas' : '') + '</span><strong>' + (bit==="1" ? 'Yang · utuh' : 'Yin · terputus') + '</strong></div>').join("");
    detail.hidden = false;
    detail.innerHTML = '<div class="detail-heading"><div><small>HEKSAGRAM ' + String(h.number).padStart(2,"0") + ' · KING WEN</small><h3>' + h.symbol + ' ' + h.pinyin + ' <span>' + h.hanzi + '</span></h3><p>' + h.gloss + ' <em>(padanan ringkas kerja)</em></p></div><button type="button" class="detail-close">Tutup ×</button></div><div class="detail-pair"><div><small>TRIGRAM BAWAH</small><strong>' + lower.symbol + ' ' + lower.pinyin + '</strong><p>' + lower.image + '</p></div><div><small>TRIGRAM ATAS</small><strong>' + upper.symbol + ' ' + upper.pinyin + '</strong><p>' + upper.image + '</p></div></div><h4>Enam garis · dibaca dari bawah ke atas</h4><div class="detail-lines">' + lines + '</div><div class="detail-source">'+renderClassical(h)+'</div>';
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
    const lowerName = trigramNames[primary.lower], upperName = trigramNames[primary.upper];
    const nextLower = trigramNames[changed.lower], nextUpper = trigramNames[changed.upper];
    const lenses = {
      qian:["arah, kapasitas, dan penggunaan daya","Apakah arah dan kapasitas yang tersedia benar-benar sejalan?"],
      dui:["pertukaran, keterbukaan, dan batas kesepakatan","Apakah pertukaran berlangsung seimbang dan dipahami semua pihak?"],
      li:["kejelasan, informasi, dan hal yang terlihat","Informasi apa yang sudah terang, dan apa yang masih tersembunyi?"],
      zhen:["pemicu, respons, dan tindakan awal","Peristiwa apa yang memicu keadaan, dan bagaimana respons pertama terbentuk?"],
      xun:["pengaruh bertahap, kebiasaan, dan penyebaran","Pengaruh kecil atau kebiasaan apa yang perlahan membentuk keadaan?"],
      kan:["risiko, kedalaman masalah, dan jalur yang aman","Risiko apa yang nyata, dan jalur mana yang masih dapat ditempuh dengan aman?"],
      gen:["batas, jeda, dan hal yang perlu dihentikan","Batas apa yang perlu dihormati, atau tindakan apa yang sebaiknya ditunda?"],
      kun:["dukungan, penerimaan, dan daya tampung","Sumber daya, dukungan, atau kapasitas apa yang menopang keadaan ini?"]
    };
    const lowerLens=lenses[primary.lower], upperLens=lenses[primary.upper], nextLowerLens=lenses[changed.lower], nextUpperLens=lenses[changed.upper];
    const movementText=moving.length ? "Ada "+moving.length+" garis berubah pada posisi "+moving.join(", ")+" (dihitung dari bawah)." : "Tidak ada garis berubah; pola awal dan pola hasil tetap sama.";
    const classical=data.classical||{}, primaryText=classical[primary.number];
    const movingNotes=moving.map(pos=>{
      const line=primaryText&&primaryText.lines&&primaryText.lines[pos-1];
      return '<article class="moving-line-note"><strong>Garis '+pos+(pos===1?' · terbawah':pos===6?' · teratas':'')+'</strong>'+
        (line?'<p class="classical-original">'+line[0]+'</p><p>'+line[1]+'</p>':'<p>Teks garis belum tersedia untuk posisi ini.</p>')+
        '<p class="analysis-note">Gunakan teks ini sebagai bahan pemeriksaan konteks, bukan instruksi otomatis.</p></article>';
    }).join("");
    const prompts=[
      "Fakta apa yang paling kuat menggambarkan keadaan yang sedang dihadapi?",
      lowerLens[1],upperLens[1],
      moving.length?"Apa yang sedang berubah pada bagian yang ditandai garis "+moving.join(", ")+", dan bukti apa yang mendukung pembacaan itu?":"Apa yang membuat pola sekarang bertahan, dan bukti apa yang menunjukkan hal tersebut?",
      "Jika pola hasil mulai terbentuk, konsekuensi konkret apa yang mungkin muncul bagi pihak-pihak terkait?",
      "Pilihan apa yang masih berada dalam kendali, dan batas apa yang tidak boleh diabaikan?"
    ];
    const lineBreakdown=values.map((v,i)=>{
      const original=(v===7||v===9)?"Yang":"Yin", after=(v===6||v===9)?(original==="Yang"?"Yin":"Yang"):original, status=(v===6||v===9)?"Berubah":"Tetap";
      return '<div class="line-detail"><span>Garis '+(i+1)+(i===0?' · bawah':i===5?' · atas':'')+'</span><strong>'+original+'</strong><span class="line-arrow">→</span><strong>'+after+'</strong><em>'+status+' · nilai '+v+'</em></div>';
    }).join("");
    const analysis=$("viator-analysis");
    analysis.innerHTML=
      '<h3 class="section-label">PEMBACAAN STRUKTURAL VIATOR</h3>'+
      '<p class="analysis-note">Kerangka ini adalah lensa pengamatan Viator yang disusun dari citra trigram. Ia bukan terjemahan makna klasik, diagnosis keadaan, atau ramalan masa depan.</p>'+
      '<div class="analysis-block"><strong>1 · DASAR KEADAAN</strong><p>Trigram bawah: '+lowerName+'.</p><p>Lensa pengamatan: '+lowerLens[0]+'.</p><p>'+lowerLens[1]+'</p></div>'+
      '<div class="analysis-block"><strong>2 · KONDISI YANG MENAUNGI</strong><p>Trigram atas: '+upperName+'.</p><p>Lensa pengamatan: '+upperLens[0]+'.</p><p>'+upperLens[1]+'</p></div>'+
      '<div class="analysis-block"><strong>3 · TITIK PERUBAHAN</strong><p>'+movementText+'</p>'+(movingNotes||'<p>Tidak ada teks garis berubah. Periksa faktor yang mempertahankan keadaan, bukan memaksakan adanya perubahan.</p>')+'</div>'+
      '<div class="analysis-block"><strong>4 · POLA HASIL</strong><p>Trigram bawah: '+nextLower+' — lensa: '+nextLowerLens[0]+'.</p><p>Trigram atas: '+nextUpper+' — lensa: '+nextUpperLens[0]+'.</p><p>Bandingkan lensa awal dan hasil. Perubahan pola adalah kemungkinan struktural dari susunan garis, bukan kepastian bahwa peristiwa tersebut akan terjadi.</p></div>'+
      '<div class="analysis-block"><strong>5 · RINCIAN ENAM GARIS</strong><div class="line-breakdown">'+lineBreakdown+'</div></div>'+
      '<div class="analysis-block"><strong>6 · PERTANYAAN UNTUK DIPERIKSA</strong><ol>'+prompts.map(q=>'<li>'+q+'</li>').join("")+'</ol></div>'+
      '<div class="analysis-block"><strong>CATATAN KONTEKS</strong><p id="context-echo"></p></div>'+
      '<p class="analysis-note">Pisahkan fakta, tafsir, dan dugaan. Jangan mengambil keputusan besar hanya berdasarkan hasil instrumen. Pertimbangkan konsekuensi nyata dan, bila perlu, mintalah pandangan pihak yang kompeten.</p>';
    $("context-echo").textContent=context||"Belum ada konteks yang dituliskan. Pembacaan ini hanya menunjukkan struktur garis dan lensa pengamatan umum.";
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
