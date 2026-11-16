(function () {
  "use strict";
  const data = window.VIATOR_ICHING_DATA;
  if (!data) return;

  const trigramRoot = document.getElementById("trigram-list");
  const hexagramRoot = document.getElementById("hexagram-list");
  const search = document.getElementById("hexagram-search");
  const count = document.getElementById("hexagram-count");

  function lineMarkup(pattern) {
    return pattern.split("").map(bit =>
      '<span class="hex-line ' + (bit === "1" ? "yang" : "yin") + '" aria-label="' + (bit === "1" ? "Yang" : "Yin") + '"></span>'
    ).join("");
  }

  trigramRoot.innerHTML = data.trigrams.map(t =>
    '<article class="trigram-card">' +
      '<div class="trigram-symbol">' + t.symbol + '</div>' +
      '<div><h3>' + t.pinyin + ' <span>' + t.hanzi + '</span></h3>' +
      '<p>' + t.image + '</p><small>' + t.pattern.split("").reverse().map(x => x === "1" ? "Yang" : "Yin").join(" · ") + '</small></div>' +
    '</article>'
  ).join("");

  function renderHexagrams(term) {
    const q = (term || "").trim().toLocaleLowerCase("id");
    const filtered = data.hexagrams.filter(h =>
      !q || String(h.number).includes(q) ||
      h.pinyin.toLocaleLowerCase("id").includes(q) ||
      h.hanzi.includes(q) ||
      h.gloss.toLocaleLowerCase("id").includes(q)
    );
    count.textContent = filtered.length + " dari 64 heksagram";
    hexagramRoot.innerHTML = filtered.map(h =>
      '<article class="hexagram-card">' +
        '<div class="hexagram-top"><span class="hexagram-number">' + String(h.number).padStart(2,"0") + '</span>' +
        '<span class="hexagram-unicode" aria-hidden="true">' + h.symbol + '</span></div>' +
        '<h3>' + h.pinyin + ' <span>' + h.hanzi + '</span></h3>' +
        '<p>' + h.gloss + '</p>' +
        '<div class="hexagram-lines" aria-label="Enam garis, dibaca dari bawah ke atas">' + lineMarkup(h.pattern) + '</div>' +
        '<small>Trigram bawah: ' + h.lower + ' · atas: ' + h.upper + '</small>' +
      '</article>'
    ).join("");
  }

  search.addEventListener("input", () => renderHexagrams(search.value));
  renderHexagrams("");
})();
