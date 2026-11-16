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

  const classical = {
  "1": {
    "source": "James Legge, The Yî King (1882), teks Zhouyi dan Great Image. Padanan Indonesia ini terjemahan kerja ringkas, bukan terjemahan resmi.",
    "judgment": {
      "zh": "元亨。利貞。",
      "id": "Sangat besar dan menjadi awal; membawa kelancaran. Menguntungkan bila dijalani dengan ketepatan dan keteguhan."
    },
    "image": {
      "zh": "天行健，君子以自強不息。",
      "id": "Gerak langit berlangsung kuat dan terus-menerus. Manusia berbudi meneladaninya dengan menguatkan diri dan tidak berhenti berusaha."
    },
    "lines": [
      [
        "初九：潛龍勿用。",
        "Naga masih tersembunyi. Belum waktunya bertindak."
      ],
      [
        "九二：見龍在田，利見大人。",
        "Naga muncul di lapangan. Menguntungkan untuk bertemu atau meminta arahan dari pribadi yang matang."
      ],
      [
        "九三：君子終日乾乾，夕惕若，厲无咎。",
        "Sepanjang hari orang berbudi bekerja tekun; pada malam hari ia tetap waspada. Keadaan berbahaya, tetapi tidak harus berakhir dengan kesalahan."
      ],
      [
        "九四：或躍在淵，无咎。",
        "Seperti hendak melompat, tetapi masih berada di kedalaman. Tidak ada cela bila langkah diambil dengan tepat."
      ],
      [
        "九五：飛龍在天，利見大人。",
        "Naga terbang di langit. Menguntungkan untuk bertemu atau memperoleh dukungan dari pribadi yang agung."
      ],
      [
        "上九：亢龍有悔。",
        "Naga telah melampaui batas ketinggiannya. Akan ada penyesalan."
      ]
    ],
    "changing": [
      "用九：見羣龍无首，吉。",
      "Ketika seluruh garis Yang berubah, sekumpulan naga tanpa satu kepala yang mendominasi membawa keberuntungan."
    ]
  },
  "2": {
    "source": "James Legge, The Yî King (1882), teks Zhouyi dan Great Image. Padanan Indonesia ini terjemahan kerja ringkas, bukan terjemahan resmi.",
    "judgment": {
      "zh": "元亨。利牝馬之貞。君子有攸往，先迷後得主。利西南得朋，東北喪朋。安貞吉。",
      "id": "Ada potensi besar dan kelancaran. Keteguhan digambarkan seperti kuda betina: kuat dalam mengikuti arah. Jika mengambil inisiatif tanpa memahami arah, seseorang dapat tersesat; dengan mengikuti arah yang tepat, ia menemukan pegangan. Keteguhan yang tenang membawa keberuntungan."
    },
    "image": {
      "zh": "地勢坤，君子以厚德載物。",
      "id": "Daya bumi menopang segala sesuatu. Manusia berbudi meneladaninya dengan keluasan watak yang mampu menanggung dan mendukung banyak hal."
    },
    "lines": [
      [
        "初六：履霜，堅冰至。",
        "Ketika menginjak embun beku, es yang keras akan menyusul. Gejala kecil dapat menjadi keadaan besar."
      ],
      [
        "六二：直方大，不習无不利。",
        "Lurus, tepat, dan luas. Tidak perlu dibuat-buat; tidak ada yang merugikan bila sifat itu dijaga."
      ],
      [
        "六三：含章可貞。或從王事，无成有終。",
        "Simpan kecakapan dan tetaplah teguh. Bila menjalankan urusan bersama, jangan menuntut pengakuan; tuntaskan pekerjaan dengan baik."
      ],
      [
        "六四：括囊，无咎无譽。",
        "Ikatlah kantong. Menahan diri dan tidak banyak bicara menghindarkan cela, meski tidak mendatangkan pujian."
      ],
      [
        "六五：黃裳，元吉。",
        "Jubah bawah berwarna kuning. Keberuntungan besar melalui sikap yang rendah hati dan tepat."
      ],
      [
        "上六：龍戰于野，其血玄黃。",
        "Naga-naga bertarung di padang; darah mereka berwarna gelap dan kuning. Pertentangan telah mencapai batas yang berbahaya."
      ]
    ],
    "changing": [
      "用六：利永貞。",
      "Ketika seluruh garis Yin berubah, keteguhan yang berlangsung lama membawa manfaat."
    ]
  }
};

  Object.assign(classical, {
  "3": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "元亨利貞。勿用有攸往。利建侯。",
      "Ada potensi untuk berkembang dan berhasil, tetapi jangan tergesa mengambil langkah jauh. Menguntungkan untuk membangun kepemimpinan dan dukungan yang tepat."
    ],
    "image": [
      "雲雷，屯；君子以經綸。",
      "Awan dan guntur membentuk keadaan awal yang penuh kesulitan. Manusia berbudi menata dan mengurai keadaan agar memiliki arah."
    ],
    "lines": [
      [
        "初九：磐桓。利居貞。利建侯。",
        "Langkah tertahan. Lebih baik menetap teguh dan membangun dasar kepemimpinan."
      ],
      [
        "六二：屯如邅如。乘馬班如。匪寇婚媾。女子貞不字。十年乃字。",
        "Kemajuan tersendat dan arah belum jelas. Jangan salah mengira maksud pihak lain; keteguhan dan waktu diperlukan sebelum ikatan yang tepat terbentuk."
      ],
      [
        "六三：即鹿无虞。惟入于林中。君子幾不如舍。往吝。",
        "Mengejar rusa tanpa pemandu membuat orang tersesat di hutan. Orang bijak mengenali tanda bahaya dan memilih berhenti."
      ],
      [
        "六四：乘馬班如。求婚媾。往吉。无不利。",
        "Kuda-kuda bergerak maju-mundur. Mencari hubungan atau kerja sama yang tepat lalu melangkah membawa keberuntungan."
      ],
      [
        "九五：屯其膏。小貞吉。大貞凶。",
        "Sumber daya atau kemurahan tertahan. Keteguhan dalam urusan kecil menguntungkan; memaksakan perkara besar membawa risiko."
      ],
      [
        "上六：乘馬班如。泣血漣如。",
        "Kuda-kuda terpaksa mundur; kesedihan mendalam mengalir. Keadaan ini tidak dapat dipertahankan lama."
      ]
    ]
  },
  "4": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "亨。匪我求童蒙。童蒙求我。初筮告。再三瀆。瀆則不告。利貞。",
      "Ada jalan menuju kemajuan. Pengajar tidak mengejar murid; murid datang mencari pengetahuan. Pertanyaan yang tulus layak dijawab, tetapi pengulangan tanpa kesungguhan mengaburkan proses belajar. Keteguhan membawa manfaat."
    ],
    "image": [
      "山下出泉，蒙；君子以果行育德。",
      "Mata air keluar dari kaki gunung. Manusia berbudi menumbuhkan watak melalui tindakan yang tegas dan pembinaan diri."
    ],
    "lines": [
      [
        "初六：發蒙。利用刑人。用說桎梏。以往吝。",
        "Membuka ketidaktahuan memerlukan batas dan disiplin. Namun, bila tindakan hanya menjadi hukuman tanpa tujuan pembinaan, hasilnya buruk."
      ],
      [
        "九二：包蒙吉。納婦吉。子克家。",
        "Menerima orang yang belum matang dengan lapang membawa keberuntungan. Tanggung jawab dapat dijalankan dan rumah tangga tertata."
      ],
      [
        "六三：勿用取女。見金夫。不有躬。无攸利。",
        "Jangan membangun ikatan dengan orang yang mudah meninggalkan prinsip demi daya tarik atau keuntungan sesaat; tidak ada manfaat di sana."
      ],
      [
        "六四：困蒙。吝。",
        "Terjebak dalam ketidaktahuan dan menutup diri dari bimbingan membawa kesulitan."
      ],
      [
        "六五：童蒙。吉。",
        "Sikap seorang pemula yang mau belajar membawa keberuntungan."
      ],
      [
        "上九：擊蒙。不利為寇。利禦寇。",
        "Mengatasi ketidaktahuan perlu ketegasan, bukan penindasan. Tepat untuk menahan gangguan, bukan menjadi penyerang."
      ]
    ]
  },
  "5": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "有孚。光亨。貞吉。利涉大川。",
      "Ketulusan memberi kejernihan dan kelancaran. Keteguhan membawa keberuntungan; menyeberangi arus besar dapat dilakukan bila persiapan memadai."
    ],
    "image": [
      "雲上於天，需；君子以飲食宴樂。",
      "Awan berkumpul di langit sebelum hujan. Manusia berbudi menjaga tenaga dan ketenangan sambil menunggu saat yang tepat."
    ],
    "lines": [
      [
        "初九：需于郊。利用恆。无咎。",
        "Menunggu di pinggiran. Ketekunan yang stabil membawa keadaan tanpa cela."
      ],
      [
        "九二：需于沙。小有言。終吉。",
        "Menunggu di pasir dekat bahaya. Mungkin ada teguran kecil, tetapi akhirnya baik."
      ],
      [
        "九三：需于泥。致寇至。",
        "Menunggu di lumpur membuat seseorang rentan mengundang gangguan."
      ],
      [
        "六四：需于血。出自穴。",
        "Berada di tengah luka dan bahaya; jalan keluar perlu dicari dengan hati-hati."
      ],
      [
        "九五：需于酒食。貞吉。",
        "Menunggu dalam keadaan cukup dan tenteram. Keteguhan membawa keberuntungan."
      ],
      [
        "上六：入于穴。有不速之客三人來。敬之終吉。",
        "Masuk ke tempat berlindung, lalu tiga tamu datang tanpa diundang. Sambut dengan hormat; akhirnya baik."
      ]
    ]
  },
  "6": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "有孚。窒惕。中吉。終凶。利見大人。不利涉大川。",
      "Ada ketulusan, tetapi juga hambatan dan kecemasan. Menahan diri dan mencari penyelesaian yang seimbang membawa hasil lebih baik; memaksakan sengketa sampai akhir berbahaya. Baik mencari penengah yang bijak; tidak baik menerjang risiko besar."
    ],
    "image": [
      "天與水違行，訟；君子以作事謀始。",
      "Langit dan air bergerak berlawanan. Manusia berbudi merencanakan awal suatu urusan dengan cermat agar sengketa tidak tumbuh."
    ],
    "lines": [
      [
        "初六：不永所事。小有言。終吉。",
        "Jangan memperpanjang perkara. Meski ada celaan kecil, akhirnya baik."
      ],
      [
        "九二：不克訟。歸而逋。其邑人三百戶。无眚。",
        "Tidak mampu memenangkan sengketa; mundur dan kembali ke tempat sendiri. Dengan menghindari eskalasi, bahaya dapat dicegah."
      ],
      [
        "六三：食舊德。貞厲。終吉。或從王事。无成。",
        "Bertahan pada sumber penghidupan dan nilai lama. Keadaan genting, tetapi akhirnya baik; bila melayani urusan besar, jangan mengklaim hasil sebagai milik sendiri."
      ],
      [
        "九四：不克訟。復即命。渝。安貞吉。",
        "Tidak mampu memenangkan sengketa. Kembali pada ketentuan yang benar, ubah sikap, dan terima batas; keteguhan membawa keberuntungan."
      ],
      [
        "九五：訟。元吉。",
        "Menyelesaikan sengketa dengan kewenangan dan keadilan yang tepat membawa keberuntungan besar."
      ],
      [
        "上九：或錫之鞶帶。終朝三褫之。",
        "Kemenangan mungkin memberi kehormatan, tetapi kehormatan itu dapat dicabut berulang kali. Jangan menganggap kemenangan sengketa sebagai kemuliaan tetap."
      ]
    ]
  },
  "7": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "貞丈人吉。无咎。",
      "Keteguhan, disiplin, dan kepemimpinan orang yang matang membawa keberuntungan tanpa cela."
    ],
    "image": [
      "地中有水，師；君子以容民畜衆。",
      "Air tersimpan di dalam bumi. Manusia berbudi merawat masyarakat dan menghimpun orang dengan tanggung jawab."
    ],
    "lines": [
      [
        "初六：師出以律。否臧凶。",
        "Pasukan bergerak dengan aturan. Bila disiplin tidak baik, hasilnya buruk."
      ],
      [
        "九二：在師中吉。无咎。王三錫命。",
        "Pemimpin berada di tengah pasukan; keberuntungan dan tidak ada cela. Raja berulang kali memberikan kepercayaan dan mandat."
      ],
      [
        "六三：師或輿尸。凶。",
        "Pasukan mungkin pulang membawa jenazah. Kepemimpinan yang buruk membawa akibat fatal."
      ],
      [
        "六四：師左次。无咎。",
        "Pasukan mundur dan berkemah di sisi yang aman. Tidak ada cela bila mundur adalah keputusan tepat."
      ],
      [
        "六五：田有禽。利執言。无咎。長子帥師。弟子輿尸。貞凶。",
        "Ada sasaran di ladang; tindakan tegas dapat dibenarkan. Namun, bila komando utama diberikan kepada orang yang tepat dan orang yang tidak cakap ikut mengendalikan, hasilnya buruk."
      ],
      [
        "上六：大君有命。開國承家。小人勿用。",
        "Penguasa membagikan tugas dan tanggung jawab setelah perjuangan. Jangan menempatkan orang yang tidak layak pada jabatan penting."
      ]
    ]
  },
  "8": {
    "source": "Teks Zhouyi dan Great Image; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "吉。原筮元永貞。无咎。不寧方來。後夫凶。",
      "Keadaan dapat membawa keberuntungan, tetapi dasar persatuan harus diperiksa: apakah ketulusan, kelapangan, dan keteguhan dapat dipertahankan? Mereka yang gelisah akan datang mencari ikatan; yang terlambat bergabung dapat kehilangan kesempatan."
    ],
    "image": [
      "地上有水，比；先王以建萬國，親諸侯。",
      "Air berada di atas bumi dan menyatukannya. Para penguasa terdahulu membangun negeri-negeri dan menjalin kedekatan dengan para pemimpin."
    ],
    "lines": [
      [
        "初六：有孚比之。无咎。有孚盈缶。終來有它吉。",
        "Membangun persatuan dengan tulus tidak membawa cela. Ketulusan yang penuh seperti isi bejana akan mendatangkan kebaikan."
      ],
      [
        "六二：比之自內。貞吉。",
        "Persatuan dimulai dari dalam diri dan lingkaran terdekat. Keteguhan membawa keberuntungan."
      ],
      [
        "六三：比之匪人。",
        "Membangun ikatan dengan orang yang tidak tepat membawa masalah."
      ],
      [
        "六四：外比之。貞吉。",
        "Menjalin hubungan ke luar dengan dasar yang benar membawa keberuntungan."
      ],
      [
        "九五：顯比。王用三驅。失前禽。邑人不誡。吉。",
        "Persatuan dijalankan secara terbuka dan tidak memaksa. Raja membiarkan sebagian buruan lolos; rakyat tidak perlu hidup dalam ketakutan. Ini membawa keberuntungan."
      ],
      [
        "上六：比之无首。凶。",
        "Mencari persatuan tanpa memulai dengan dasar dan arah yang benar membawa hasil buruk."
      ]
    ]
  }
});

  Object.assign(classical, {
  "9": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "小畜：亨。密雲不雨，自我西郊。",
      "Ada kelancaran dalam penahanan kecil. Awan tebal belum menurunkan hujan; tenaga sedang terkumpul tetapi belum mencapai pelepasan."
    ],
    "image": [
      "風行天上，小畜；君子以懿文德。",
      "Angin bergerak di atas langit. Manusia berbudi memperhalus watak dan kebajikan melalui pembinaan diri."
    ],
    "lines": [
      [
        "初九：復自道，何其咎？吉。",
        "Kembali ke jalan sendiri. Tidak ada alasan untuk cela; hasilnya baik."
      ],
      [
        "九二：牽復，吉。",
        "Tertarik kembali ke jalan yang benar; membawa keberuntungan."
      ],
      [
        "九三：輿說輻，夫妻反目。",
        "Roda kereta terlepas dari poros; pasangan saling berpaling. Ketegangan muncul ketika dorongan maju tidak sejalan."
      ],
      [
        "六四：有孚，血去惕出，无咎。",
        "Ketulusan menghilangkan pertumpahan darah dan mengusir kecemasan. Tidak ada cela."
      ],
      [
        "九五：有孚攣如，富以其鄰。",
        "Ketulusan mengikat hubungan erat; kelimpahan dibagikan bersama tetangga."
      ],
      [
        "上九：既雨既處，尚德載。婦貞厲。月幾望，君子征凶。",
        "Hujan telah turun dan keadaan berhenti. Akumulasi telah mencapai puncak; bahkan keteguhan dapat berbahaya bila diteruskan tanpa membaca batas."
      ]
    ]
  },
  "10": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "履虎尾，不咥人，亨。",
      "Menginjak ekor harimau tetapi tidak digigit. Keadaan berisiko dapat dilalui bila perilaku dan langkah dijaga dengan tepat."
    ],
    "image": [
      "上天下澤，履；君子以辨上下，定民志。",
      "Langit berada di atas dan danau di bawah. Manusia berbudi membedakan kedudukan dan tanggung jawab agar kehidupan bersama tertata."
    ],
    "lines": [
      [
        "初九：素履，往无咎。",
        "Melangkah sederhana tanpa kepura-puraan; maju tanpa cela."
      ],
      [
        "九二：履道坦坦，幽人貞吉。",
        "Menempuh jalan yang lapang. Sikap tenang dan teguh membawa keberuntungan."
      ],
      [
        "六三：眇能視，跛能履。履虎尾，咥人，凶。武人為于大君。",
        "Orang yang penglihatannya terbatas merasa mampu melihat, yang pincang merasa mampu berjalan; ia menginjak ekor harimau dan digigit. Kesombongan kemampuan membawa bahaya."
      ],
      [
        "九四：履虎尾，愬愬，終吉。",
        "Menginjak ekor harimau dengan kewaspadaan dan rasa gentar; akhirnya baik."
      ],
      [
        "九五：夬履，貞厲。",
        "Melangkah dengan tegas, tetapi keteguhan yang kaku tetap mengandung bahaya."
      ],
      [
        "上九：視履考祥，其旋元吉。",
        "Meninjau kembali langkah dan akibatnya. Bila perjalanan diperiksa dengan baik, hasilnya sangat baik."
      ]
    ]
  },
  "11": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "泰：小往大來，吉亨。",
      "Yang kecil pergi dan yang besar datang. Keadaan terbuka bagi hubungan yang lancar dan membawa keberuntungan."
    ],
    "image": [
      "天地交，泰；后以財成天地之道，輔相天地之宜，以左右民。",
      "Langit dan bumi saling berhubungan. Pemimpin menata sumber daya dan membantu keselarasan alam demi menopang kehidupan masyarakat."
    ],
    "lines": [
      [
        "初九：拔茅茹，以其彙，征吉。",
        "Mencabut rumput beserta akar dan rumpunnya. Bergerak bersama kelompok yang sejalan membawa keberuntungan."
      ],
      [
        "九二：包荒，用馮河，不遐遺，朋亡，得尚于中行。",
        "Menerima yang belum sempurna, berani menyeberangi sungai, tidak mengabaikan yang jauh, dan tidak terikat kepentingan kelompok; jalan tengah dihormati."
      ],
      [
        "九三：无平不陂，无往不復。艱貞无咎。勿恤其孚，于食有福。",
        "Tidak ada dataran tanpa lereng, tidak ada kepergian tanpa kepulangan. Keteguhan dalam masa sulit mencegah cela; jangan kehilangan kepercayaan, sebab ada berkah dalam kecukupan."
      ],
      [
        "六四：翩翩，不富以其鄰，不戒以孚。",
        "Bergerak turun bersama tetangga, bukan karena kekayaan, melainkan karena kepercayaan yang tidak dipaksakan."
      ],
      [
        "六五：帝乙歸妹，以祉元吉。",
        "Pernikahan putri Kaisar Yi membawa berkah dan keberuntungan besar."
      ],
      [
        "上六：城復于隍，勿用師。自邑告命，貞吝。",
        "Tembok kota runtuh kembali ke paritnya. Jangan mengerahkan pasukan; cukup umumkan keadaan dari dalam wilayah sendiri. Memaksakan keadaan membawa kesulitan."
      ]
    ]
  },
  "12": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "否之匪人，不利君子貞。大往小來。",
      "Keadaan tidak mendukung hubungan manusia yang semestinya. Keteguhan orang berbudi menghadapi hambatan; yang besar menjauh dan yang kecil datang."
    ],
    "image": [
      "天地不交，否；君子以儉德辟難，不可榮以祿。",
      "Langit dan bumi tidak saling berhubungan. Manusia berbudi menjaga kebajikan secara sederhana dan menghindari bahaya, bukan mengejar kehormatan atau upah."
    ],
    "lines": [
      [
        "初六：拔茅茹，以其彙，貞吉亨。",
        "Mencabut rumput beserta rumpunnya. Tetap teguh bersama orang-orang yang sejalan membawa kelancaran."
      ],
      [
        "六二：包承。小人吉，大人否亨。",
        "Menerima dan melayani keadaan. Bagi orang kecil ini mungkin menguntungkan; orang besar sebaiknya tidak larut dan tetap menjaga jalannya."
      ],
      [
        "六三：包羞。",
        "Menanggung rasa malu; keadaan memperlihatkan sesuatu yang patut disadari."
      ],
      [
        "九四：有命无咎，疇離祉。",
        "Bila ada mandat yang benar, tidak ada cela; orang-orang yang sejalan dapat menerima berkah."
      ],
      [
        "九五：休否，大人吉。其亡其亡，繫于苞桑。",
        "Kebuntuan mulai diakhiri. Orang besar memperoleh keberuntungan, tetapi tetap waspada seolah bahaya dapat datang kapan saja; kuatkan dasar seperti akar murbei."
      ],
      [
        "上九：傾否，先否後喜。",
        "Kebuntuan berbalik dan runtuh. Setelah masa tertutup, kegembiraan datang."
      ]
    ]
  },
  "13": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "同人于野，亨。利涉大川。利君子貞。",
      "Bersatu dengan orang lain secara terbuka membawa kelancaran. Menguntungkan untuk menyeberangi kesulitan besar dan menjaga keteguhan orang berbudi."
    ],
    "image": [
      "天與火，同人；君子以類族辨物。",
      "Langit dan api bergerak searah. Manusia berbudi memahami persamaan dan perbedaan kelompok serta membedakan berbagai hal dengan jernih."
    ],
    "lines": [
      [
        "初九：同人于門，无咎。",
        "Bertemu dan bekerja sama di pintu terbuka; tidak ada cela."
      ],
      [
        "六二：同人于宗，吝。",
        "Persatuan hanya di dalam klan sendiri membawa keterbatasan dan kesulitan."
      ],
      [
        "九三：伏戎于莽，升其高陵，三歲不興。",
        "Pasukan bersembunyi di semak dan mengawasi dari bukit; selama tiga tahun tidak berani bergerak. Kecurigaan dan konflik tersembunyi menghambat."
      ],
      [
        "九四：乘其墉，弗克攻，吉。",
        "Sudah berada di atas tembok lawan, tetapi tidak menyerang. Menahan diri membawa keberuntungan."
      ],
      [
        "九五：同人，先號咷而後笑。大師克相遇。",
        "Persatuan diawali tangis lalu berakhir dengan tawa. Setelah perjuangan besar, pihak-pihak akhirnya bertemu."
      ],
      [
        "上九：同人于郊，无悔。",
        "Menjalin hubungan di luar pusat keramaian. Tidak ada penyesalan."
      ]
    ]
  },
  "14": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "大有：元亨。",
      "Kepemilikan dalam ukuran besar membawa potensi kelancaran yang besar."
    ],
    "image": [
      "火在天上，大有；君子以遏惡揚善，順天休命。",
      "Api berada tinggi di langit dan menerangi segala sesuatu. Manusia berbudi menahan keburukan, mengembangkan kebaikan, dan mengikuti ketetapan yang benar."
    ],
    "lines": [
      [
        "初九：无交害，匪咎。艱則无咎。",
        "Tidak berhubungan dengan hal yang merusak; bukan cela. Kewaspadaan dalam keadaan sulit menjaga agar tidak terjadi kesalahan."
      ],
      [
        "九二：大車以載，有攸往，无咎。",
        "Kereta besar mampu memikul muatan. Ada tujuan yang dapat ditempuh tanpa cela."
      ],
      [
        "九三：公用亨于天子，小人弗克。",
        "Seorang pejabat mempersembahkan hasil kepada penguasa. Orang yang tidak matang tidak mampu memikul tanggung jawab semacam itu."
      ],
      [
        "九四：匪其彭，无咎。",
        "Tidak membesarkan diri atau memamerkan kemegahan; dengan demikian tidak ada cela."
      ],
      [
        "六五：厥孚交如，威如，吉。",
        "Ketulusan yang membangun hubungan disertai wibawa yang tepat membawa keberuntungan."
      ],
      [
        "上九：自天祐之，吉无不利。",
        "Pertolongan datang dari langit; keberuntungan dan tidak ada yang tidak menguntungkan."
      ]
    ]
  },
  "15": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "謙：亨。君子有終。",
      "Kerendahan hati membawa kelancaran. Manusia berbudi mampu menjaga sikap itu sampai akhir."
    ],
    "image": [
      "地中有山，謙；君子以裒多益寡，稱物平施。",
      "Gunung berada di dalam bumi. Manusia berbudi mengurangi yang berlebihan, menambah yang kurang, dan menimbang pembagian secara adil."
    ],
    "lines": [
      [
        "初六：謙謙君子，用涉大川，吉。",
        "Orang berbudi yang rendah hati dapat menyeberangi kesulitan besar; membawa keberuntungan."
      ],
      [
        "六二：鳴謙，貞吉。",
        "Kerendahan hati yang tampak dan terdengar, bila tulus dan teguh, membawa keberuntungan."
      ],
      [
        "九三：勞謙君子，有終吉。",
        "Orang berbudi bekerja keras dan tetap rendah hati; hasil akhirnya baik."
      ],
      [
        "六四：无不利，撝謙。",
        "Tidak ada yang merugikan bila kerendahan hati diwujudkan dalam tindakan yang tepat."
      ],
      [
        "六五：不富以其鄰，利用侵伐，无不利。",
        "Tidak mengandalkan kekayaan untuk memengaruhi tetangga. Ketegasan terhadap gangguan dapat dibenarkan bila perlu."
      ],
      [
        "上六：鳴謙，利用行師，征邑國。",
        "Kerendahan hati telah dikenal luas. Bila perlu, tindakan tegas dapat digunakan untuk menertibkan wilayah sendiri."
      ]
    ]
  },
  "16": {
    "source": "Zhouyi, dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia merupakan terjemahan kerja ringkas.",
    "judgment": [
      "豫：利建侯行師。",
      "Menguntungkan untuk mengangkat pemimpin dan menggerakkan kekuatan bersama, asalkan ada dasar yang tepat."
    ],
    "image": [
      "雷出地奮，豫；先王以作樂崇德，殷薦之上帝，以配祖考。",
      "Guntur muncul dari bumi dan menggerakkan segala sesuatu. Para penguasa terdahulu menciptakan musik untuk memuliakan kebajikan dan menghormati leluhur."
    ],
    "lines": [
      [
        "初六：鳴豫，凶。",
        "Memamerkan kegembiraan dan kepuasan diri membawa bahaya."
      ],
      [
        "六二：介于石，不終日，貞吉。",
        "Teguh seperti batu; mengenali keadaan tanpa menunggu lama. Ketepatan dan keteguhan membawa keberuntungan."
      ],
      [
        "六三：盱豫，悔。遲有悔。",
        "Memandang ke atas demi kesenangan atau pujian membawa penyesalan. Terlambat menyadarinya menambah penyesalan."
      ],
      [
        "九四：由豫，大有得。勿疑。朋盍簪。",
        "Sumber kegembiraan dan keselarasan memperoleh hasil besar. Jangan biarkan kecurigaan memecah hubungan; orang-orang akan berkumpul."
      ],
      [
        "六五：貞疾，恆不死。",
        "Penyakit atau kelemahan berlangsung lama. Bertahan saja bukan berarti keadaan telah pulih."
      ],
      [
        "上六：冥豫，成有渝，无咎。",
        "Terlarut dalam kesenangan hingga tidak lagi melihat keadaan. Bila pada akhirnya berubah, cela masih dapat dihindari."
      ]
    ]
  }
});

  Object.assign(classical, {
  "17": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "隨：元亨利貞。无咎。",
      "Mengikuti dengan tepat membawa kelancaran besar. Keteguhan yang benar membuat langkah ini tidak tercela."
    ],
    "image": [
      "澤中有雷，隨；君子以嚮晦入宴息。",
      "Guntur berada di dalam danau. Manusia berbudi memahami waktu untuk berhenti, beristirahat, dan memulihkan tenaga ketika hari mulai gelap."
    ],
    "lines": [
      [
        "初九：官有渝，貞吉。出門交有功。",
        "Tugas atau arah berubah. Keteguhan membawa hasil baik; keluar dan menjalin hubungan memberi manfaat."
      ],
      [
        "六二：係小子，失丈夫。",
        "Terikat pada orang yang belum matang dapat membuat seseorang kehilangan hubungan dengan pribadi yang lebih tepat."
      ],
      [
        "六三：係丈夫，失小子。隨有求得，利居貞。",
        "Mengikuti pribadi yang lebih matang berarti melepaskan keterikatan yang lebih kecil. Apa yang dicari dapat diperoleh; baik untuk tetap teguh."
      ],
      [
        "九四：隨有獲，貞凶。有孚在道，以明，何咎。",
        "Mengikuti demi memperoleh keuntungan dapat menjadi berbahaya. Bila ketulusan tetap berada di jalan yang benar dan dijalankan dengan jernih, cela dapat dihindari."
      ],
      [
        "九五：孚于嘉，吉。",
        "Ketulusan terhadap hal yang baik membawa keberuntungan."
      ],
      [
        "上六：拘係之，乃從維之。王用亨于西山。",
        "Ikatan diperkuat hingga menjadi kukuh. Pengabdian yang sungguh-sungguh dipersembahkan dalam upacara di Gunung Barat."
      ]
    ]
  },
  "18": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "蠱：元亨。利涉大川。先甲三日，後甲三日。",
      "Mengurai kerusakan membuka jalan bagi pembaruan dan kelancaran. Menyeberangi kesulitan besar menguntungkan. Persiapan sebelum perubahan dan peninjauan sesudahnya sama-sama diperlukan."
    ],
    "image": [
      "山下有風，蠱；君子以振民育德。",
      "Angin bergerak di bawah gunung. Manusia berbudi membangunkan masyarakat dan membina kebajikan untuk memperbaiki keadaan yang rusak."
    ],
    "lines": [
      [
        "初六：幹父之蠱，有子，考无咎，厲終吉。",
        "Memperbaiki kerusakan yang diwariskan dari ayah. Anak yang bertanggung jawab menghapus cela; keadaan berisiko, tetapi akhirnya baik."
      ],
      [
        "九二：幹母之蠱，不可貞。",
        "Memperbaiki kerusakan yang berasal dari ibu. Dalam hal ini, ketegasan kaku tidak tepat; perlu cara yang lentur."
      ],
      [
        "九三：幹父之蠱，小有悔，无大咎。",
        "Memperbaiki kesalahan yang diwariskan dari ayah. Mungkin ada penyesalan kecil, tetapi tidak ada kesalahan besar."
      ],
      [
        "六四：裕父之蠱，往見吝。",
        "Membiarkan kerusakan warisan dengan terlalu longgar. Jika diteruskan, kesulitan akan tampak."
      ],
      [
        "六五：幹父之蠱，用譽。",
        "Memperbaiki kerusakan yang diwariskan dari ayah dengan cara yang mendatangkan penghargaan."
      ],
      [
        "上九：不事王侯，高尚其事。",
        "Tidak mengabdi kepada penguasa; menjaga pekerjaan dan prinsip sendiri pada kedudukan yang luhur."
      ]
    ]
  },
  "19": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "臨：元亨利貞。至于八月有凶。",
      "Pendekatan membawa kelancaran besar dan menguntungkan bila dijalankan dengan benar. Namun, keadaan baik tidak abadi; pada bulan kedelapan datang peringatan akan kemunduran."
    ],
    "image": [
      "澤上有地，臨；君子以教思无窮，容保民无疆。",
      "Bumi berada di atas danau. Manusia berbudi mengajar tanpa lelah serta melindungi masyarakat dengan keluasan hati."
    ],
    "lines": [
      [
        "初九：咸臨，貞吉。",
        "Mendekat dengan keterlibatan bersama. Keteguhan membawa keberuntungan."
      ],
      [
        "九二：咸臨，吉无不利。",
        "Mendekat dengan keselarasan dan keterlibatan. Beruntung dan tidak ada yang merugikan."
      ],
      [
        "六三：甘臨，无攸利。既憂之，无咎。",
        "Mendekat dengan sikap manis yang dangkal tidak membawa manfaat. Bila menyadari masalah dan memperbaikinya, cela dapat dihindari."
      ],
      [
        "六四：至臨，无咎。",
        "Mendekat secara sungguh-sungguh dan langsung; tidak ada cela."
      ],
      [
        "六五：知臨，大君之宜，吉。",
        "Memimpin dengan kebijaksanaan dan pemahaman. Inilah sikap yang patut bagi pemimpin besar; membawa keberuntungan."
      ],
      [
        "上六：敦臨，吉无咎。",
        "Mendekat dengan ketulusan dan ketebalan watak; beruntung dan tidak ada cela."
      ]
    ]
  },
  "20": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "觀：盥而不薦，有孚顒若。",
      "Mengamati dengan khidmat seperti saat upacara sebelum persembahan disajikan. Ketulusan dan sikap hormat lebih penting daripada tampilan luar."
    ],
    "image": [
      "風行地上，觀；先王以省方，觀民設教。",
      "Angin bergerak di atas bumi. Para penguasa terdahulu memeriksa berbagai wilayah, mengamati kehidupan rakyat, lalu menetapkan pendidikan yang sesuai."
    ],
    "lines": [
      [
        "初六：童觀，小人无咎，君子吝。",
        "Pengamatan yang masih kekanak-kanakan. Bagi orang biasa mungkin tidak tercela, tetapi bagi pemimpin atau orang berbudi hal ini memalukan."
      ],
      [
        "六二：闚觀，利女貞。",
        "Mengamati dari celah sempit. Keteguhan dalam lingkup terbatas dapat tepat, tetapi pandangannya belum luas."
      ],
      [
        "六三：觀我生，進退。",
        "Mengamati keadaan dan perilaku diri sendiri sebelum memutuskan maju atau mundur."
      ],
      [
        "六四：觀國之光，利用賓于王。",
        "Mengamati kemajuan dan tata kehidupan suatu negeri. Baik untuk hadir dan mengambil peran sebagai tamu atau utusan."
      ],
      [
        "九五：觀我生，君子无咎。",
        "Meninjau kehidupan dan tindakan sendiri. Orang berbudi dapat menghindari cela dengan pemeriksaan yang jujur."
      ],
      [
        "上九：觀其生，君子无咎。",
        "Mengamati kehidupan dan tindakan orang lain. Orang berbudi tidak tercela bila penilaiannya jernih."
      ]
    ]
  },
  "21": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "噬嗑：亨。利用獄。",
      "Menggigit hingga menembus membawa kelancaran. Tepat untuk menyelesaikan hambatan melalui penegakan aturan dan keputusan hukum."
    ],
    "image": [
      "雷電，噬嗑；先王以明罰敕法。",
      "Guntur dan kilat. Para penguasa terdahulu memperjelas hukuman dan menegakkan hukum."
    ],
    "lines": [
      [
        "初九：屨校滅趾，无咎。",
        "Kaki dikenai belenggu sehingga langkah terhenti. Hukuman awal yang membatasi pelanggaran dapat mencegah kesalahan lebih jauh."
      ],
      [
        "六二：噬膚滅鼻，无咎。",
        "Menggigit daging lunak hingga hidung tertutup. Menangani perkara yang relatif mudah dengan ketegasan; tidak ada cela."
      ],
      [
        "六三：噬腊肉，遇毒；小吝，无咎。",
        "Menggigit daging kering lalu menemukan sesuatu yang beracun. Ada kesulitan kecil, tetapi bukan kesalahan yang tak dapat diatasi."
      ],
      [
        "九四：噬乾胏，得金矢。利艱貞，吉。",
        "Menggigit daging kering yang keras dan menemukan anak panah logam. Keteguhan dalam kesulitan membawa keberuntungan."
      ],
      [
        "六五：噬乾肉，得黃金。貞厲，无咎。",
        "Menggigit daging kering dan menemukan logam kuning. Keteguhan tetap diperlukan karena keadaan mengandung risiko; cela dapat dihindari."
      ],
      [
        "上九：何校滅耳，凶。",
        "Belenggu berat menutup telinga. Menolak pelajaran hingga akhir membawa akibat buruk."
      ]
    ]
  },
  "22": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "賁：亨。小利有攸往。",
      "Keindahan dan tata bentuk membawa kelancaran, tetapi hanya menguntungkan untuk langkah-langkah kecil. Hiasan tidak boleh menggantikan dasar."
    ],
    "image": [
      "山下有火，賁；君子以明庶政，无敢折獄。",
      "Api berada di kaki gunung dan menerangi sekitarnya. Manusia berbudi memperjelas urusan pemerintahan, tetapi tidak gegabah memutus perkara hukum."
    ],
    "lines": [
      [
        "初九：賁其趾，舍車而徒。",
        "Menghias langkah kaki; meninggalkan kereta dan berjalan sendiri. Kesederhanaan dapat lebih tepat daripada kemewahan."
      ],
      [
        "六二：賁其須。",
        "Menghias janggut. Keindahan mengikuti dan bergantung pada sesuatu yang lebih mendasar."
      ],
      [
        "九三：賁如濡如，永貞吉。",
        "Keindahan tampak berkilau dan lembut. Keteguhan yang bertahan lama membawa keberuntungan."
      ],
      [
        "六四：賁如皤如，白馬翰如。匪寇婚媾。",
        "Hiasan tampak sederhana dan putih; kuda putih datang cepat. Yang semula disangka ancaman ternyata datang untuk menjalin ikatan."
      ],
      [
        "六五：賁于丘園，束帛戔戔，吝，終吉。",
        "Menghiasi kebun di bukit dengan persembahan kain yang sederhana. Awalnya tampak kurang, tetapi akhirnya baik."
      ],
      [
        "上九：白賁，无咎。",
        "Keindahan yang paling murni adalah kesederhanaan tanpa hiasan berlebihan; tidak ada cela."
      ]
    ]
  },
  "23": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "剝：不利有攸往。",
      "Pengikisan atau keruntuhan sedang berlangsung. Tidak menguntungkan untuk memaksakan perjalanan atau tindakan maju."
    ],
    "image": [
      "山附于地，剝；上以厚下，安宅。",
      "Gunung melekat pada bumi. Mereka yang berada di atas memperkuat dasar di bawah agar tempat tinggal dan tatanan menjadi aman."
    ],
    "lines": [
      [
        "初六：剝床以足，蔑貞凶。",
        "Ranjang mulai dikikis pada kakinya. Mengabaikan dasar keteguhan membawa bahaya."
      ],
      [
        "六二：剝床以辨，蔑貞凶。",
        "Ranjang terkikis pada bagian penyangganya. Bila kerusakan dasar diabaikan, bahaya membesar."
      ],
      [
        "六三：剝之，无咎。",
        "Terpisah dari proses pengikisan. Tidak ada cela bila tidak ikut larut dalam kerusakan."
      ],
      [
        "六四：剝床以膚，凶。",
        "Kerusakan telah mencapai permukaan tubuh. Bahaya sudah dekat dan nyata."
      ],
      [
        "六五：貫魚，以宮人寵，无不利。",
        "Ikan tersusun berurutan, seperti para penghuni istana yang menerima perhatian. Ketertiban dan urutan yang tepat membawa manfaat."
      ],
      [
        "上九：碩果不食，君子得輿，小人剝廬。",
        "Buah besar tidak dimakan dan tetap tersisa. Orang berbudi memperoleh tempat berpijak; orang yang buruk kehilangan rumahnya."
      ]
    ]
  },
  "24": {
    "source": "Zhouyi (周易), teks Judgment, Image dan garis; dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "復：亨。出入无疾，朋來无咎。反復其道，七日來復。利有攸往。",
      "Kembalinya daya membawa kelancaran. Keluar dan masuk tanpa gangguan; orang-orang datang tanpa cela. Siklus kembali pada jalurnya; setelah tujuh hari terjadi pemulihan. Baik untuk melangkah pada waktunya."
    ],
    "image": [
      "雷在地中，復；先王以至日閉關，商旅不行，后不省方。",
      "Guntur berada di dalam bumi. Para penguasa terdahulu menutup gerbang pada titik balik musim, menghentikan perjalanan dagang, dan tidak melakukan inspeksi wilayah."
    ],
    "lines": [
      [
        "初九：不遠復，无祗悔，元吉。",
        "Kembali sebelum terlalu jauh tersesat. Tidak sampai menimbulkan penyesalan; sangat baik."
      ],
      [
        "六二：休復，吉。",
        "Kembali dengan tenang dan baik; membawa keberuntungan."
      ],
      [
        "六三：頻復，厲无咎。",
        "Berulang kali kembali setelah tergelincir. Keadaan berisiko, tetapi cela dapat dihindari."
      ],
      [
        "六四：中行獨復。",
        "Berjalan di tengah, tetapi kembali seorang diri. Kesadaran untuk kembali tetap dijaga meski tidak diikuti orang lain."
      ],
      [
        "六五：敦復，无悔。",
        "Kembali dengan ketulusan dan keteguhan; tidak ada penyesalan."
      ],
      [
        "上六：迷復，凶。有災眚。用行師，終有大敗，以其國君凶。至于十年不克征。",
        "Tersesat dan gagal kembali membawa bahaya. Menggerakkan pasukan berakhir dengan kekalahan besar dan bencana bagi penguasa; selama sepuluh tahun tidak mampu melakukan ekspedisi."
      ]
    ]
  }
});

  Object.assign(classical, {
  "25": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "无妄：元亨利貞。其匪正有眚。不利有攸往。",
      "Ketulusan tanpa kepura-puraan membawa kelancaran dan keteguhan. Bila tindakan menyimpang dari kebenaran, bencana muncul; tidak menguntungkan untuk memaksakan langkah."
    ],
    "image": [
      "天下雷行，物與无妄；先王以茂對時育萬物。",
      "Guntur bergerak di bawah langit dan segala sesuatu tumbuh tanpa dibuat-buat. Para penguasa terdahulu menyelaraskan tindakan dengan musim dan memelihara kehidupan."
    ],
    "lines": [
      [
        "初九：无妄，往吉。",
        "Tanpa kepura-puraan; melangkah membawa keberuntungan."
      ],
      [
        "六二：不耕穫，不菑畬，則利有攸往。",
        "Tidak mengejar hasil sebelum mengolah tanah, tidak mengharapkan panen tanpa persiapan. Menguntungkan untuk bergerak tanpa memaksakan hasil."
      ],
      [
        "六三：无妄之災，或繫之牛，行人之得，邑人之災。",
        "Bencana datang tanpa diduga: sapi yang diikat dapat diambil orang lewat, sementara penduduk setempat menanggung akibatnya. Tidak semua kejadian buruk berasal dari kesalahan sendiri."
      ],
      [
        "九四：可貞，无咎。",
        "Keteguhan dapat dijaga; tidak ada cela."
      ],
      [
        "九五：无妄之疾，勿藥有喜。",
        "Penyakit datang tanpa sebab yang jelas. Tidak perlu tergesa menggunakan tindakan yang tidak diperlukan; keadaan dapat membaik."
      ],
      [
        "上九：无妄，行有眚，无攸利。",
        "Bertindak tanpa membaca keadaan dapat mendatangkan bencana; tidak ada manfaat dalam memaksakan langkah."
      ]
    ]
  },
  "26": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "大畜：利貞。不家食吉。利涉大川。",
      "Pengumpulan daya besar menguntungkan bila dijalankan dengan benar. Tidak hanya menikmati hasil sendiri; mengambil tanggung jawab di ruang publik membawa keberuntungan. Baik untuk menyeberangi kesulitan besar."
    ],
    "image": [
      "天在山中，大畜；君子以多識前言往行，以畜其德。",
      "Langit tersimpan di dalam gunung. Manusia berbudi mempelajari perkataan dan tindakan masa lalu untuk memperkaya wataknya."
    ],
    "lines": [
      [
        "初九：有厲利已。",
        "Ada bahaya; lebih baik menghentikan langkah untuk sementara."
      ],
      [
        "九二：輿說輹。",
        "Kereta kehilangan pengikat porosnya. Gerak tertahan; jangan memaksa perjalanan."
      ],
      [
        "九三：良馬逐，利艱貞。曰閑輿衛，利有攸往。",
        "Kuda baik berlari. Keteguhan dalam kesulitan menguntungkan; latih kendaraan dan perlindungan sebelum melanjutkan."
      ],
      [
        "六四：童牛之牿，元吉。",
        "Anak sapi diberi pelindung tanduk sejak awal. Pencegahan dini membawa keberuntungan besar."
      ],
      [
        "六五：豶豕之牙，吉。",
        "Taring babi jantan yang dikebiri tidak lagi berbahaya. Mengendalikan sumber kekuatan sebelum meledak membawa keberuntungan."
      ],
      [
        "上九：何天之衢，亨。",
        "Jalan terbuka luas di bawah langit. Kelancaran datang ketika daya yang terkumpul digunakan pada waktunya."
      ]
    ]
  },
  "27": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "頤：貞吉。觀頤，自求口實。",
      "Pemeliharaan membawa keberuntungan bila benar. Amati apa yang memberi makan dan menopang kehidupan; periksa bagaimana seseorang memenuhi kebutuhannya sendiri."
    ],
    "image": [
      "山下有雷，頤；君子以慎言語，節飲食。",
      "Guntur berada di kaki gunung. Manusia berbudi berhati-hati dalam berbicara dan membatasi makan-minum."
    ],
    "lines": [
      [
        "初九：舍爾靈龜，觀我朵頤，凶。",
        "Meninggalkan kebijaksanaan diri lalu hanya memandang makanan orang lain. Ketergantungan dan iri membawa bahaya."
      ],
      [
        "六二：顛頤，拂經于丘頤，征凶。",
        "Mencari pemeliharaan dengan cara terbalik dan menyimpang dari jalan yang semestinya. Memaksakan langkah membawa bahaya."
      ],
      [
        "六三：拂頤，貞凶。十年勿用，无攸利。",
        "Cara memenuhi kebutuhan menyimpang dari prinsip. Bertahan pada jalan itu membawa bahaya; untuk waktu lama tidak ada manfaat."
      ],
      [
        "六四：顛頤，吉。虎視眈眈，其欲逐逐，无咎。",
        "Menerima dukungan dari arah yang tidak biasa dapat membawa keberuntungan. Waspada dan mengenali kebutuhan dengan jelas; tidak ada cela."
      ],
      [
        "六五：拂經，居貞吉。不可涉大川。",
        "Jalan biasa tidak dapat diikuti. Menetap dan menjaga keteguhan membawa keberuntungan; jangan mengambil risiko besar."
      ],
      [
        "上九：由頤，厲吉。利涉大川。",
        "Menjadi sumber pemeliharaan bagi orang lain. Keadaan mengandung tanggung jawab besar, tetapi dapat membawa keberuntungan; baik untuk menghadapi kesulitan besar."
      ]
    ]
  },
  "28": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "大過：棟橈。利有攸往，亨。",
      "Beban terlalu besar hingga balok utama melengkung. Meski keadaan tidak biasa dan berat, tindakan yang tepat masih dapat membuka jalan menuju kelancaran."
    ],
    "image": [
      "澤滅木，大過；君子以獨立不懼，遯世无悶。",
      "Danau menenggelamkan pepohonan. Manusia berbudi mampu berdiri sendiri tanpa takut dan tidak larut dalam kegelisahan ketika menjauh dari keramaian."
    ],
    "lines": [
      [
        "初六：藉用白茅，无咎。",
        "Meletakkan alas dari rumput putih sebelum menaruh sesuatu. Kehati-hatian ekstra membuat tindakan tidak tercela."
      ],
      [
        "九二：枯楊生稊，老夫得其女妻，无不利。",
        "Pohon willow tua menumbuhkan tunas; lelaki tua memperoleh istri muda. Pembaruan dapat muncul dari keadaan yang tampak telah usang."
      ],
      [
        "九三：棟橈，凶。",
        "Balok utama melengkung karena beban. Bahaya muncul ketika penyangga tidak lagi mampu menanggung tekanan."
      ],
      [
        "九四：棟隆，吉。有它吝。",
        "Balok utama kembali kokoh; keberuntungan. Namun, bila muncul maksud lain yang mengganggu, kesulitan datang."
      ],
      [
        "九五：枯楊生華，老婦得其士夫，无咎无譽。",
        "Pohon willow tua berbunga; perempuan tua memperoleh suami muda. Ada tanda kehidupan, tetapi hasilnya tidak mendatangkan cela maupun pujian."
      ],
      [
        "上六：過涉滅頂，凶，无咎。",
        "Menyeberang terlalu jauh hingga air menenggelamkan kepala. Hasilnya buruk, meski tindakan itu bukan karena niat yang tercela."
      ]
    ]
  },
  "29": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "習坎：有孚，維心亨，行有尚。",
      "Bahaya datang berulang. Ketulusan dan kejernihan hati membuka jalan; tindakan yang dijalankan dengan teguh patut dihargai."
    ],
    "image": [
      "水洊至，習坎；君子以常德行，習教事。",
      "Air datang berturut-turut dan membentuk jurang. Manusia berbudi menjaga kebajikan secara konsisten dan mengulang pelajaran hingga menjadi kecakapan."
    ],
    "lines": [
      [
        "初六：習坎，入于坎窞，凶。",
        "Terperosok ke lubang terdalam dalam rangkaian bahaya. Keadaan buruk; jangan melangkah tanpa pijakan."
      ],
      [
        "九二：坎有險，求小得。",
        "Di dalam jurang masih ada bahaya. Hanya hasil kecil yang dapat diperoleh untuk sementara."
      ],
      [
        "六三：來之坎坎，險且枕，入于坎窞，勿用。",
        "Bahaya datang dari segala arah; keadaan semakin sulit dan mengarah ke jurang. Jangan bertindak gegabah."
      ],
      [
        "六四：樽酒簋貳，用缶，納約自牖，終无咎。",
        "Persembahan sederhana dibawa melalui jendela. Ketulusan yang sederhana dan langsung dapat menghindarkan cela."
      ],
      [
        "九五：坎不盈，祗既平，无咎。",
        "Jurang belum penuh; air baru mencapai permukaan yang rata. Tidak ada cela bila keadaan ditangani tanpa berlebihan."
      ],
      [
        "上六：係用徽纆，寘于叢棘，三歲不得，凶。",
        "Terikat dan ditempatkan di antara duri selama tiga tahun tanpa jalan keluar. Bahaya besar akibat terperangkap dalam keadaan yang tidak diselesaikan."
      ]
    ]
  },
  "30": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "離：利貞，亨。畜牝牛，吉。",
      "Keterikatan dan kejernihan menguntungkan bila dijalankan dengan keteguhan. Memelihara sifat lembut, tekun, dan dapat diarahkan membawa keberuntungan."
    ],
    "image": [
      "明兩作，離；大人以繼明照于四方。",
      "Dua cahaya saling menerangi. Pribadi besar meneruskan kejernihan agar menerangi segala penjuru."
    ],
    "lines": [
      [
        "初九：履錯然，敬之，无咎。",
        "Langkah tampak kacau dan bersilang. Sikap hormat serta kewaspadaan mencegah cela."
      ],
      [
        "六二：黃離，元吉。",
        "Cahaya kuning yang seimbang. Keberuntungan besar."
      ],
      [
        "九三：日昃之離，不鼓缶而歌，則大耋之嗟，凶。",
        "Matahari condong ke barat. Bila tidak mampu menerima perubahan waktu dengan wajar, yang tersisa hanya ratapan usia tua; keadaan buruk."
      ],
      [
        "九四：突如其來如，焚如，死如，棄如。",
        "Sesuatu datang tiba-tiba seperti api yang membakar, mematikan, lalu ditinggalkan. Perubahan yang meledak tanpa kendali membawa kehancuran."
      ],
      [
        "六五：出涕沱若，戚嗟若，吉。",
        "Air mata mengalir dan kesedihan terasa dalam. Mengakui keadaan dengan jujur dapat membuka jalan menuju kebaikan."
      ],
      [
        "上九：王用出征，有嘉折首，獲匪其醜，无咎。",
        "Penguasa mengirim pasukan; pemimpin gangguan ditangani, tetapi mereka yang tidak terlibat tidak dihukum. Ketegasan yang terarah tidak tercela."
      ]
    ]
  },
  "31": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "咸：亨，利貞。取女吉。",
      "Saling memengaruhi membawa kelancaran. Keteguhan yang tepat menguntungkan; membangun ikatan yang selaras membawa keberuntungan."
    ],
    "image": [
      "山上有澤，咸；君子以虛受人。",
      "Danau berada di atas gunung. Manusia berbudi mengosongkan diri agar mampu menerima orang lain."
    ],
    "lines": [
      [
        "初六：咸其拇。",
        "Pengaruh baru terasa pada ibu jari kaki; gerak masih sangat awal."
      ],
      [
        "六二：咸其腓，凶，居吉。",
        "Pengaruh terasa pada betis dan mendorong gerak tergesa; itu berbahaya. Tetap tenang membawa keberuntungan."
      ],
      [
        "九三：咸其股，執其隨，往吝。",
        "Pengaruh mencapai paha dan seseorang mengikuti dorongan tanpa kendali. Memaksakan langkah membawa kesulitan."
      ],
      [
        "九四：貞吉悔亡。憧憧往來，朋從爾思。",
        "Keteguhan membawa keberuntungan dan menghapus penyesalan. Bila pikiran terus gelisah, hanya orang-orang yang sepemikiran yang akan mengikuti."
      ],
      [
        "九五：咸其脢，无悔。",
        "Pengaruh terasa pada punggung bagian atas. Tidak ada penyesalan bila respons tidak berlebihan."
      ],
      [
        "上六：咸其輔頰舌。",
        "Pengaruh hanya tampak pada pipi, rahang, dan lidah: banyak kata, tetapi belum tentu menyentuh tindakan."
      ]
    ]
  },
  "32": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "恆：亨，无咎，利貞。利有攸往。",
      "Keberlangsungan membawa kelancaran dan tidak tercela bila dijaga dengan keteguhan. Menguntungkan untuk melanjutkan perjalanan atau pekerjaan."
    ],
    "image": [
      "雷風，恆；君子以立不易方。",
      "Guntur dan angin hadir bersama. Manusia berbudi berdiri teguh tanpa mudah mengubah prinsip dan arah yang benar."
    ],
    "lines": [
      [
        "初六：浚恆，貞凶，无攸利。",
        "Memaksakan keberlangsungan terlalu dalam sejak awal. Keteguhan yang tidak membaca keadaan membawa bahaya."
      ],
      [
        "九二：悔亡。",
        "Penyesalan menghilang."
      ],
      [
        "九三：不恆其德，或承之羞，貞吝。",
        "Tidak konsisten dalam kebajikan dapat mendatangkan rasa malu. Mempertahankan ketidakkonsistenan membawa kesulitan."
      ],
      [
        "九四：田无禽。",
        "Berburu di ladang tanpa memperoleh buruan. Usaha tidak menghasilkan karena arah atau waktunya tidak tepat."
      ],
      [
        "六五：恆其德，貞，婦人吉，夫子凶。",
        "Mempertahankan kebajikan dan keteguhan. Teks membedakan peran tradisional perempuan dan laki-laki; padanan ini mempertahankan isi historisnya, bukan menetapkannya sebagai norma masa kini."
      ],
      [
        "上六：振恆，凶。",
        "Mengguncang dan mengubah-ubah keberlangsungan secara terus-menerus membawa bahaya."
      ]
    ]
  }
});

  Object.assign(classical, {
  "33": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "遯：亨。小利貞。",
      "Mengundurkan diri dengan tepat membuka kelancaran. Keteguhan dalam perkara kecil masih menguntungkan; bukan semua keadaan harus dihadapi dengan konfrontasi."
    ],
    "image": [
      "天下有山，遯；君子以遠小人，不惡而嚴。",
      "Gunung berada di bawah langit. Manusia berbudi menjaga jarak dari pengaruh buruk tanpa kebencian, tetapi dengan batas yang tegas."
    ],
    "lines": [
      [
        "初六：遯尾，厲，勿用有攸往。",
        "Tertinggal di bagian belakang saat mundur. Keadaan berbahaya; jangan memaksakan perjalanan."
      ],
      [
        "六二：執之用黃牛之革，莫之勝說。",
        "Mengikat dengan kulit sapi kuning yang kuat. Keteguhan pada batas yang diperlukan tidak mudah dilepaskan."
      ],
      [
        "九三：係遯，有疾厲。畜臣妾吉。",
        "Mundur tetapi masih terikat; keadaan melelahkan dan berbahaya. Mengatur tanggungan dalam lingkup sendiri membawa hasil lebih baik."
      ],
      [
        "九四：好遯，君子吉，小人否。",
        "Mundur dengan lapang hati. Orang berbudi memperoleh keberuntungan; orang yang dikuasai kepentingan sempit tidak."
      ],
      [
        "九五：嘉遯，貞吉。",
        "Pengunduran diri yang dilakukan dengan baik dan terhormat; keteguhan membawa keberuntungan."
      ],
      [
        "上九：肥遯，无不利。",
        "Mundur dengan leluasa tanpa beban yang mengikat. Tidak ada yang merugikan."
      ]
    ]
  },
  "34": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "大壯：利貞。",
      "Kekuatan besar menguntungkan bila diarahkan oleh keteguhan dan aturan yang benar."
    ],
    "image": [
      "雷在天上，大壯；君子以非禮弗履。",
      "Guntur berada di atas langit. Manusia berbudi tidak melakukan tindakan yang melanggar kepatutan."
    ],
    "lines": [
      [
        "初九：壯于趾，征凶，有孚。",
        "Kekuatan terasa pada kaki dan mendorong untuk maju. Memaksakan langkah membawa bahaya, meskipun keyakinan diri kuat."
      ],
      [
        "九二：貞吉。",
        "Keteguhan yang tepat membawa keberuntungan."
      ],
      [
        "九三：小人用壯，君子用罔，貞厲。羝羊觸藩，羸其角。",
        "Orang sempit menggunakan kekuatan secara kasar; orang berbudi menahan diri. Domba jantan menanduk pagar hingga tanduknya tersangkut. Kekuatan tanpa pertimbangan menjadi perangkap."
      ],
      [
        "九四：貞吉悔亡。藩決不羸，壯于大輿之輹。",
        "Keteguhan membawa keberuntungan dan penyesalan lenyap. Pagar terbuka tanpa membuat tanduk tersangkut; kekuatan ditopang dasar yang kokoh."
      ],
      [
        "六五：喪羊于易，无悔。",
        "Domba terlepas di tempat yang mudah. Melepaskan dorongan untuk memaksa dapat menghindarkan penyesalan."
      ],
      [
        "上六：羝羊觸藩，不能退，不能遂，无攸利。艱則吉。",
        "Domba jantan menanduk pagar; tidak dapat mundur maupun maju. Tidak ada manfaat dari memaksa; menerima kesulitan dan menahan diri membuka peluang baik."
      ]
    ]
  },
  "35": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "晉：康侯用錫馬蕃庶，晝日三接。",
      "Kemajuan seperti seorang penguasa yang menerima banyak kuda dan kehormatan, serta berulang kali menghadap penguasa. Kemajuan datang bersama pengakuan dan tanggung jawab."
    ],
    "image": [
      "明出地上，晉；君子以自昭明德。",
      "Matahari terbit di atas bumi. Manusia berbudi membuat kebajikannya sendiri menjadi terang."
    ],
    "lines": [
      [
        "初六：晉如摧如，貞吉。罔孚，裕无咎。",
        "Maju tetapi sempat terhambat. Keteguhan membawa keberuntungan; bila belum dipercaya, tetaplah lapang dan tidak memaksakan pengakuan."
      ],
      [
        "六二：晉如愁如，貞吉。受茲介福，于其王母。",
        "Maju disertai kecemasan. Keteguhan membawa keberuntungan dan menerima berkah besar dari sosok pelindung."
      ],
      [
        "六三：衆允，悔亡。",
        "Kepercayaan banyak orang diperoleh; penyesalan lenyap."
      ],
      [
        "九四：晉如鼫鼠，貞厲。",
        "Maju seperti tikus besar yang rakus. Bahkan bila terus bertahan, keadaan tetap berbahaya."
      ],
      [
        "六五：悔亡，失得勿恤。往吉，无不利。",
        "Penyesalan lenyap. Jangan terlalu cemas pada untung dan rugi; bergerak dengan tepat membawa keberuntungan."
      ],
      [
        "上九：晉其角，維用伐邑。厲吉无咎，貞吝。",
        "Maju dengan tanduk, menggunakan kekuatan untuk menertibkan wilayah sendiri. Berisiko tetapi dapat berhasil; keteguhan yang berlebihan tetap membawa kesulitan."
      ]
    ]
  },
  "36": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "明夷：利艱貞。",
      "Cahaya terluka atau tertutup. Keteguhan dalam keadaan sulit menguntungkan; kejernihan perlu dijaga meski tidak dapat ditampilkan bebas."
    ],
    "image": [
      "明入地中，明夷；君子以莅衆，用晦而明。",
      "Cahaya masuk ke dalam bumi. Manusia berbudi memimpin dengan tidak memamerkan seluruh kecemerlangan, tetapi tetap menjaga kejernihan batin."
    ],
    "lines": [
      [
        "初九：明夷于飛，垂其翼。君子于行，三日不食，有攸往，主人有言。",
        "Cahaya yang terluka terbang dengan sayap terkulai. Orang berbudi pergi, bahkan menahan lapar; tujuan tetap ditempuh meski tuan rumah mencela."
      ],
      [
        "六二：明夷，夷于左股，用拯馬壯，吉。",
        "Cahaya terluka pada paha kiri. Kuda yang kuat digunakan untuk menyelamatkan keadaan; membawa keberuntungan."
      ],
      [
        "九三：明夷于南狩，得其大首，不可疾貞。",
        "Cahaya yang terluka bergerak ke selatan dan menangkap pemimpin gangguan. Jangan tergesa memaksakan penyelesaian."
      ],
      [
        "六四：入于左腹，獲明夷之心，于出門庭。",
        "Masuk ke bagian dalam dan memahami hati dari pihak yang menutupi cahaya; kemudian meninggalkan halaman. Memahami keadaan dapat menunjukkan saat untuk pergi."
      ],
      [
        "六五：箕子之明夷，利貞。",
        "Seperti Pangeran Jizi yang menyembunyikan kejernihannya saat menghadapi kegelapan. Keteguhan menjaga prinsip tetap menguntungkan."
      ],
      [
        "上六：不明晦，初登于天，後入于地。",
        "Cahaya kehilangan kejernihan; mula-mula naik ke langit, kemudian jatuh ke bumi. Kejatuhan datang setelah puncak yang tidak disadari."
      ]
    ]
  },
  "37": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "家人：利女貞。",
      "Tatanan keluarga memerlukan keteguhan yang tepat. Rumusan klasik menyoroti peran perempuan dalam rumah tangga pada konteks zamannya; ini bukan ketentuan sosial universal masa kini."
    ],
    "image": [
      "風自火出，家人；君子以言有物，而行有恆。",
      "Angin muncul dari api. Manusia berbudi menjaga agar perkataan memiliki isi dan tindakan berlangsung konsisten."
    ],
    "lines": [
      [
        "初九：閑有家，悔亡。",
        "Menetapkan batas dan aturan dalam keluarga sejak awal; penyesalan lenyap."
      ],
      [
        "六二：无攸遂，在中饋，貞吉。",
        "Tidak mengejar kehendak sendiri; mengelola urusan rumah tangga dengan tepat. Keteguhan membawa keberuntungan."
      ],
      [
        "九三：家人嗃嗃，悔厲吉；婦子嘻嘻，終吝。",
        "Keluarga terlalu keras menghadapi keadaan; ada risiko, tetapi dapat membawa perbaikan. Bila semua hanya bersenda gurau tanpa tanggung jawab, akhirnya sulit."
      ],
      [
        "六四：富家，大吉。",
        "Membuat keluarga sejahtera; keberuntungan besar."
      ],
      [
        "九五：王假有家，勿恤，吉。",
        "Pemimpin membawa keteladanan dalam keluarga. Tidak perlu cemas; hasilnya baik."
      ],
      [
        "上九：有孚威如，終吉。",
        "Ketulusan yang disertai wibawa dan ketegasan membawa hasil baik pada akhirnya."
      ]
    ]
  },
  "38": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "睽：小事吉。",
      "Perbedaan dan pertentangan membuat urusan besar sulit dijalankan, tetapi perkara kecil masih dapat diselesaikan dengan baik."
    ],
    "image": [
      "上火下澤，睽；君子以同而異。",
      "Api berada di atas dan danau di bawah. Manusia berbudi mampu menemukan kesamaan tanpa menghapus perbedaan."
    ],
    "lines": [
      [
        "初九：悔亡。喪馬勿逐，自復。見惡人，无咎。",
        "Penyesalan lenyap. Kuda yang hilang tidak perlu dikejar; ia akan kembali sendiri. Bertemu orang yang tidak disukai bukan cela."
      ],
      [
        "九二：遇主于巷，无咎。",
        "Bertemu pihak yang tepat di jalan kecil; tidak ada cela."
      ],
      [
        "六三：見輿曳，其牛掣，其人天且劓。无初有終。",
        "Kereta tertahan, sapi menarik ke arah lain, dan orang mengalami hukuman. Awalnya buruk, tetapi masih dapat mencapai akhir."
      ],
      [
        "九四：睽孤，遇元夫，交孚，厲无咎。",
        "Terasing dalam perbedaan, lalu bertemu orang yang tulus. Meski keadaan berisiko, kepercayaan timbal balik mencegah cela."
      ],
      [
        "六五：悔亡，厥宗噬膚，往何咎。",
        "Penyesalan lenyap. Hubungan dengan kelompok sendiri kembali tersambung; maju tanpa cela."
      ],
      [
        "上九：睽孤，見豕負塗，載鬼一車。先張之弧，後說之弧。匪寇婚媾。往遇雨則吉。",
        "Terasing dan melihat sesuatu yang tampak mengancam: babi berlumpur dan kereta penuh bayangan. Busur mula-mula ditarik, lalu dilepaskan setelah diketahui bukan musuh, melainkan pihak yang datang menjalin ikatan. Pertemuan setelah ketegangan membawa keberuntungan."
      ]
    ]
  },
  "39": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "蹇：利西南，不利東北。利見大人，貞吉。",
      "Hambatan menghadang. Arah barat daya menguntungkan dan timur laut tidak; baik mencari orang besar yang mampu membantu. Keteguhan membawa keberuntungan."
    ],
    "image": [
      "山上有水，蹇；君子以反身修德。",
      "Air berada di atas gunung dan jalannya terhalang. Manusia berbudi memeriksa diri sendiri dan memperbaiki kebajikan."
    ],
    "lines": [
      [
        "初六：往蹇，來譽。",
        "Maju menghadapi hambatan; kembali justru mendatangkan penghargaan."
      ],
      [
        "六二：王臣蹇蹇，匪躬之故。",
        "Pejabat raja menghadapi hambatan demi tugasnya, bukan demi kepentingan pribadi."
      ],
      [
        "九三：往蹇，來反。",
        "Maju berarti menemui hambatan; kembali adalah pilihan yang tepat."
      ],
      [
        "六四：往蹇，來連。",
        "Maju terhalang; kembali memungkinkan hubungan dan bantuan tersambung."
      ],
      [
        "九五：大蹇，朋來。",
        "Hambatan besar datang, tetapi teman dan sekutu hadir membantu."
      ],
      [
        "上六：往蹇，來碩，吉；利見大人。",
        "Maju masih terhalang; kembali membawa hasil besar dan keberuntungan. Baik mencari bantuan orang yang bijaksana."
      ]
    ]
  },
  "40": {
    "source": "Zhouyi (周易); dibandingkan dengan James Legge, The Yî King (1882). Padanan Indonesia adalah terjemahan kerja ringkas.",
    "judgment": [
      "解：利西南。无所往，其來復吉。有攸往，夙吉。",
      "Pelepasan dari kesulitan menguntungkan. Bila tidak ada tujuan yang perlu dikejar, kembali ke keadaan semula membawa kebaikan. Bila ada urusan yang harus dilakukan, bertindaklah segera."
    ],
    "image": [
      "雷雨作，解；君子以赦過宥罪。",
      "Guntur dan hujan datang. Manusia berbudi memberi ruang bagi kesalahan untuk diperbaiki dan meringankan hukuman dengan pertimbangan."
    ],
    "lines": [
      [
        "初六：无咎。",
        "Tidak ada cela."
      ],
      [
        "九二：田獲三狐，得黃矢，貞吉。",
        "Dalam perburuan menangkap tiga rubah dan memperoleh anak panah kuning. Keteguhan membawa keberuntungan setelah sumber gangguan dikenali."
      ],
      [
        "六三：負且乘，致寇至，貞吝。",
        "Memikul barang curian sambil menaiki kereta; tindakan itu mengundang perampok. Bertahan pada perilaku demikian membawa kesulitan."
      ],
      [
        "九四：解而拇，朋至斯孚。",
        "Melepaskan keterikatan pada ibu jari kaki. Setelah hubungan yang tidak tepat dilepas, teman yang tulus datang."
      ],
      [
        "六五：君子維有解，吉；有孚于小人。",
        "Orang berbudi mampu membebaskan keadaan; keberuntungan. Bahkan orang yang berperilaku buruk dapat menerima ketulusan dan perubahan."
      ],
      [
        "上六：公用射隼于高墉之上，獲之，无不利。",
        "Seorang pejabat memanah elang di atas tembok tinggi dan berhasil menangkapnya. Mengatasi sumber gangguan dengan tepat membawa manfaat."
      ]
    ]
  }
});

  root.VIATOR_ICHING_DATA = Object.freeze({
    lineOrder: "bottom-to-top",
    yang: "1",
    yin: "0",
    trigrams,
    hexagrams,
    classical
  });
})(window);
