# VIATOR Knowledge — rancangan penggunaan

## Tujuan
Knowledge adalah lapisan rujukan bagi VIATOR. Isinya bukan sekadar tambahan prompt, melainkan sumber yang dapat ditelusuri dan dibedakan tingkat kepastiannya.

## Status saat ini
- `core.json`: tujuh ringkasan awal yang diturunkan dari halaman publik situs.
- `sources.json`: daftar sumber dan status ketersediaannya.
- Naskah lengkap Via Silentii et Claritatis, Arsitektur Realitas, Ars Vivendi, dan Viator Math belum diunggah atau diindeks.
- Karena itu, VIATOR belum boleh mengaku telah membaca atau menguasai isi lengkap naskah tersebut.

## Tingkat sumber
1. **Naskah primer** — dokumen asli yang diunggah dan telah diproses. Ini menjadi rujukan utama untuk menyatakan apa yang ditulis Iwan Surya.
2. **Ringkasan terverifikasi** — ringkasan yang diturunkan dari bagian naskah tertentu dan memiliki identitas sumber serta penunjuk bagian/halaman.
3. **Halaman katalog publik** — mendukung informasi terbatas seperti judul, deskripsi singkat, status, dan hubungan karya; tidak mendukung klaim tentang isi lengkap naskah.
4. **Pengetahuan umum model** — boleh dipakai untuk memberi konteks atau membandingkan gagasan, tetapi harus dibedakan dari isi karya Viator Claritatis.

## Aturan menjawab
- Jika pertanyaan meminta "menurut Viator Claritatis", "apa isi naskah", kutipan, definisi khusus, atau posisi penulis, prioritaskan naskah primer.
- Jika hanya tersedia ringkasan atau katalog, sebutkan batas tersebut secara eksplisit.
- Jangan membuat kutipan, nomor halaman, bab, istilah, atau ajaran yang tidak ditemukan pada sumber.
- Jangan menyimpulkan bahwa semua novel berada dalam satu semesta hanya karena berada di bawah katalog Viator Claritatis.
- Jangan menyamakan pendapat model dengan pendapat penulis.
- Jika sumber tidak cukup, katakan bahwa sumber belum tersedia dan minta dokumen atau bagian yang relevan.
- Saat memakai pengetahuan umum, gunakan ungkapan pembeda seperti "Secara umum..." atau "Di luar naskah Viator Claritatis...".
- Jika dua sumber bertentangan, tampilkan perbedaan dan rujuk masing-masing; jangan menyatukannya diam-diam.

## Bentuk rujukan internal
Setiap potongan pengetahuan yang kelak diindeks harus memiliki:
- source_id
- judul sumber
- jenis sumber
- nomor halaman atau heading/bagian
- teks asli atau potongan yang relevan
- ringkasan (jika ada)
- status verifikasi

Jangan mengarang nomor halaman. Untuk dokumen tanpa nomor halaman yang stabil, gunakan heading atau penanda bagian.

## Alur memasukkan naskah
1. Simpan salinan naskah asli tanpa mengubahnya.
2. Ekstrak teks dan periksa apakah ada halaman, tabel, gambar, atau bagian yang tidak terbaca.
3. Pecah menjadi bagian yang mengikuti struktur asli: bab, subbab, atau heading.
4. Buat ringkasan per bagian tanpa mengubah istilah dan maksud penulis.
5. Verifikasi ringkasan terhadap sumber asli.
6. Indeks potongan teks dan metadata sumber.
7. Uji dengan pertanyaan yang jawabannya diketahui dari naskah, termasuk pertanyaan yang tidak dapat dijawab.
8. Catat versi dokumen dan tanggal pembaruan agar perubahan naskah tidak mencampur versi lama dan baru.

## Pengujian minimum
- Pertanyaan tentang isi eksplisit: jawaban harus sesuai sumber dan menyertakan rujukan.
- Pertanyaan yang tidak dibahas: VIATOR harus mengakui sumber tidak menjawab.
- Pertanyaan interpretatif: pisahkan isi sumber dari interpretasi.
- Pertanyaan yang mengandung premis keliru: VIATOR harus menguji premis, bukan mengiyakan.
- Pertanyaan yang membandingkan beberapa naskah: setiap klaim harus dapat dilacak ke sumber masing-masing.

## Batas implementasi
File `core.json` saat ini adalah ringkasan awal untuk perancangan, bukan mesin pencarian semantik atau bukti bahwa model AI sudah mengakses seluruh arsip. Integrasi retrieval, kutipan sumber pada jawaban, dan pengelolaan versi baru dapat dinyatakan aktif setelah benar-benar dibangun dan diuji.


## Kebijakan katalog dan akses karya
- `catalog.json` adalah katalog pengenalan publik: judul, kategori, deskripsi singkat, status yang tercantum, dan tautan resmi.
- Katalog bukan salinan naskah dan tidak memuat bab atau isi eksklusif.
- VIATOR boleh menjawab pertanyaan pengenalan berdasarkan katalog.
- Jika pengguna meminta isi lengkap, bab, subbab, kutipan panjang, atau pembahasan eksklusif dari buku, VIATOR harus memberi gambaran umum seperlunya dan mengarahkan pengguna ke halaman/kanal resmi karya.
- Jangan menyatakan harga, ketersediaan, atau status publikasi yang tidak tercantum atau belum diverifikasi.
- Jangan mengarang tautan pembelian. Tautan KaryaKarsa yang dicantumkan adalah profil kanal, bukan jaminan setiap judul tersedia di sana.

## Integrasi katalog pada backend
Backend Cloudflare Worker pada branch pengembangan memuat `catalog.json` dari GitHub Pages dan menyertakannya sebagai konteks rujukan ketika menjawab. Jika katalog gagal dimuat, VIATOR harus mengakui keterbatasan dan tidak mengarang informasi karya.
Perubahan di branch belum otomatis mengubah Worker yang sedang berjalan. Kode Worker perlu ditinjau, digabungkan, lalu dideploy ke Cloudflare sebelum kebijakan dan katalog ini berlaku pada layanan publik.
