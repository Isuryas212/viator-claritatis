/* VIATOR I-CHING — canonical structural reference
   Line patterns are ordered bottom to top. 1 = Yang, 0 = Yin.
   King Wen numbering is preserved independently of binary order.
   Classical identity data only; Viator interpretations are authored separately.
*/
(function (root) {
  "use strict";

  const trigrams = [
    { id:"qian", hanzi:"乾", pinyin:"Qián", symbol:"☰", image:"Langit", pattern:"111" },
    { id:"dui", hanzi:"兌", pinyin:"Duì", symbol:"☱", image:"Danau", pattern:"110" },
    { id:"li", hanzi:"離", pinyin:"Lí", symbol:"☲", image:"Api", pattern:"101" },
    { id:"zhen", hanzi:"震", pinyin:"Zhèn", symbol:"☳", image:"Guntur", pattern:"100" },
    { id:"xun", hanzi:"巽", pinyin:"Xùn", symbol:"☴", image:"Angin/Kayu", pattern:"011" },
    { id:"kan", hanzi:"坎", pinyin:"Kǎn", symbol:"☵", image:"Air", pattern:"010" },
    { id:"gen", hanzi:"艮", pinyin:"Gèn", symbol:"☶", image:"Gunung", pattern:"001" },
    { id:"kun", hanzi:"坤", pinyin:"Kūn", symbol:"☷", image:"Bumi", pattern:"000" }
  ];

  // [King Wen number, Unicode figure, Chinese name, pinyin, short gloss, six lines]
  // Six-line pattern is always bottom -> top.
  const records = [
    [1,"䷀","乾","Qián","Langit","111111"],
    [2,"䷁","坤","Kūn","Bumi","000000"],
    [3,"䷂","屯","Zhūn","Kesulitan Awal","100010"],
    [4,"䷃","蒙","Méng","Ketidaktahuan","010001"],
    [5,"䷄","需","Xū","Menunggu","111010"],
    [6,"䷅","訟","Sòng","Sengketa","010111"],
    [7,"䷆","師","Shī","Pasukan","010000"],
    [8,"䷇","比","Bǐ","Persatuan","000010"],
    [9,"䷈","小畜","Xiǎo Chù","Kekuatan Penjinak Kecil","111011"],
    [10,"䷉","履","Lǚ","Melangkah","110111"],
    [11,"䷊","泰","Tài","Kedamaian","111000"],
    [12,"䷋","否","Pǐ","Kemacetan","000111"],
    [13,"䷌","同人","Tóng Rén","Bersama Manusia","101111"],
    [14,"䷍","大有","Dà Yǒu","Kepemilikan Besar","111101"],
    [15,"䷎","謙","Qiān","Kerendahan Hati","001000"],
    [16,"䷏","豫","Yù","Antusiasme","000100"],
    [17,"䷐","隨","Suí","Mengikuti","100110"],
    [18,"䷑","蠱","Gǔ","Memperbaiki Kerusakan","011001"],
    [19,"䷒","臨","Lín","Mendekat","110000"],
    [20,"䷓","觀","Guān","Mengamati","000011"],
    [21,"䷔","噬嗑","Shì Kè","Menggigit Menembus","100101"],
    [22,"䷕","賁","Bì","Hiasan","101001"],
    [23,"䷖","剝","Bō","Pengikisan","000001"],
    [24,"䷗","復","Fù","Kembali","100000"],
    [25,"䷘","無妄","Wú Wàng","Ketakterdugaan","100111"],
    [26,"䷙","大畜","Dà Chù","Kekuatan Penjinak Besar","111001"],
    [27,"䷚","頤","Yí","Pemeliharaan","100001"],
    [28,"䷛","大過","Dà Guò","Kelebihan Besar","011110"],
    [29,"䷜","坎","Kǎn","Air Berulang","010010"],
    [30,"䷝","離","Lí","Api Berulang","101101"],
    [31,"䷞","咸","Xián","Pengaruh","001110"],
    [32,"䷟","恆","Héng","Keteguhan","011100"],
    [33,"䷠","遯","Dùn","Kemunduran","001111"],
    [34,"䷡","大壯","Dà Zhuàng","Kekuatan Besar","111100"],
    [35,"䷢","晉","Jìn","Kemajuan","000101"],
    [36,"䷣","明夷","Míng Yí","Cahaya Terluka","101000"],
    [37,"䷤","家人","Jiā Rén","Keluarga","101011"],
    [38,"䷥","睽","Kuí","Pertentangan","110101"],
    [39,"䷦","蹇","Jiǎn","Hambatan","001010"],
    [40,"䷧","解","Xiè","Pembebasan","010100"],
    [41,"䷨","損","Sǔn","Pengurangan","110001"],
    [42,"䷩","益","Yì","Penambahan","100011"],
    [43,"䷪","夬","Guài","Terobosan","111110"],
    [44,"䷫","姤","Gòu","Pertemuan","011111"],
    [45,"䷬","萃","Cuì","Berkumpul","000110"],
    [46,"䷭","升","Shēng","Meningkat","011000"],
    [47,"䷮","困","Kùn","Keterkungkungan","010110"],
    [48,"䷯","井","Jǐng","Sumur","011010"],
    [49,"䷰","革","Gé","Perubahan","101110"],
    [50,"䷱","鼎","Dǐng","Kuali","011101"],
    [51,"䷲","震","Zhèn","Guntur Berulang","100100"],
    [52,"䷳","艮","Gèn","Gunung Berulang","001001"],
    [53,"䷴","漸","Jiàn","Perkembangan Bertahap","001011"],
    [54,"䷵","歸妹","Guī Mèi","Gadis yang Menikah","110100"],
    [55,"䷶","豐","Fēng","Kelimpahan","101100"],
    [56,"䷷","旅","Lǚ","Pengembara","001101"],
    [57,"䷸","巽","Xùn","Angin Berulang","011011"],
    [58,"䷹","兌","Duì","Danau Berulang","110110"],
    [59,"䷺","渙","Huàn","Penyebaran","010011"],
    [60,"䷻","節","Jié","Pembatasan","110010"],
    [61,"䷼","中孚","Zhōng Fú","Kebenaran Batin","110011"],
    [62,"䷽","小過","Xiǎo Guò","Kelebihan Kecil","001100"],
    [63,"䷾","既濟","Jì Jì","Sudah Menyeberang","101010"],
    [64,"䷿","未濟","Wèi Jì","Belum Menyeberang","010101"]
  ];

  const trigramByPattern = Object.fromEntries(trigrams.map(t => [t.pattern, t]));
  const hexagrams = records.map(([number, symbol, hanzi, pinyin, gloss, pattern]) => ({
    number, symbol, hanzi, pinyin, gloss, pattern,
    lower: trigramByPattern[pattern.slice(0,3)].id,
    upper: trigramByPattern[pattern.slice(3,6)].id
  }));

  root.VIATOR_ICHING_DATA = Object.freeze({
    lineOrder: "bottom-to-top",
    yang: "1",
    yin: "0",
    trigrams,
    hexagrams
  });
})(window);
