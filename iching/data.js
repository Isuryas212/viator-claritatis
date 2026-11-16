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

  root.VIATOR_ICHING_DATA = Object.freeze({
    lineOrder: "bottom-to-top",
    yang: "1",
    yin: "0",
    trigrams,
    hexagrams,
    classical
  });
})(window);
