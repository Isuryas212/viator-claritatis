# VIATOR Workspace

Ruang dialog dan eksplorasi dalam situs Viator Claritatis.

## Status

- Antarmuka dialog dan riwayat lokal tersedia.
- Frontend hanya mengirim percakapan ke endpoint yang ditentukan melalui meta `viator-api-endpoint`.
- Endpoint masih kosong secara default. Jangan mengisi endpoint sebelum backend aman dipasang.
- API key tidak boleh disimpan di HTML, JavaScript browser, atau repository.

## Kontrak endpoint

Frontend mengirim:

```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Backend diharapkan membalas:

```json
{ "reply": "Jawaban VIATOR" }
```

Backend perlu:
- menerima hanya HTTPS dan membatasi CORS ke origin situs resmi;
- memvalidasi metode, ukuran request, jumlah pesan, dan panjang teks;
- menyimpan kredensial hanya dalam environment secrets;
- membatasi laju permintaan dan menangani kegagalan provider;
- menerapkan instruksi inti VIATOR di sisi server;
- tidak menyimpan percakapan ke arsip permanen tanpa persetujuan eksplisit pengguna.

Riwayat pada tahap ini hanya disimpan di browser pengguna melalui localStorage. Riwayat tersebut bukan arsip cloud dan tidak tersinkron antarperangkat.

## Sumber pengetahuan awal

Daftar rujukan ada di `knowledge/sources.json`. Daftar itu hanya menunjuk halaman publik situs yang sudah ada. Ia tidak menyatakan bahwa seluruh isi buku atau naskah sudah diindeks ke model. Penambahan korpus harus dilakukan dari naskah sumber yang benar-benar tersedia dan telah dipilih.
