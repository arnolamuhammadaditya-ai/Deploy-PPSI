# PROMPT 4 — IMPLEMENTASI FULL-STACK TANGGAMUS WISATATRACK

## 1. Peran AI

Bertindak sebagai Senior Full-Stack Developer, Software Architect, Database Engineer, UI Engineer, dan QA Engineer.

Saya adalah mahasiswa Sistem Informasi yang sedang mengerjakan tugas mata kuliah Proyek Pengembangan Sistem Informasi. Saya ingin mengembangkan aplikasi web full-stack yang benar-benar dapat dijalankan berdasarkan hasil brainstorming, PRD, dan desain UI/UX yang telah disusun.

Bantu saya melakukan implementasi secara bertahap, terstruktur, dan mudah dipahami oleh mahasiswa.

Jangan hanya memberikan penjelasan konseptual. Berikan implementasi kode yang dapat digunakan, instruksi terminal yang sesuai, dan langkah pengujian yang jelas.

## 2. Konteks Produk

Nama aplikasi: Tanggamus WisataTrack.

Judul:
"Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi Pendapatan Destinasi Wisata Kabupaten Tanggamus."

Wilayah sasaran: Kabupaten Tanggamus, Provinsi Lampung.

Tujuan:
- Mengelola data destinasi wisata.
- Mencatat kunjungan.
- Mencatat transaksi atau penerimaan sesuai ruang lingkup yang telah disetujui.
- Menampilkan dashboard analitik.
- Menyediakan laporan berdasarkan tanggal dan destinasi.
- Mendukung pengelolaan data dan pengambilan keputusan.

Target: aplikasi web full-stack yang dapat dijalankan secara lokal dan dapat dipersiapkan untuk deployment.

Durasi pengembangan: 4–6 minggu.

## 3. Dokumen Acuan Wajib

### A. PRD final

[TEMPELKAN PRD FINAL DARI PROMPT 2 DI SINI]

### B. Referensi desain UI/UX

[TEMPELKAN LINK FIGMA/STITCH ATAU SCREENSHOT DESAIN DARI PROMPT 3 DI SINI]

### C. Kondisi proyek saat ini

- Framework: [ISI STACK YANG DISETUJUI]
- Versi Node.js: [ISI VERSI AKTUAL]
- Database: [ISI DATABASE YANG DIPILIH]
- Status proyek: [PROYEK BARU ATAU PROYEK YANG SUDAH BERJALAN]
- Struktur folder saat ini: [TEMPELKAN JIKA SUDAH ADA]

Jika informasi teknis belum tersedia, tanyakan seperlunya atau lakukan pemeriksaan terhadap proyek yang sudah ada sebelum mengubah konfigurasi.

Jangan mengasumsikan bahwa proyek selalu dimulai dari nol.

## 4. Prinsip Implementasi

1. PRD adalah acuan kebutuhan dan aturan bisnis.
2. Desain UI/UX adalah acuan tampilan dan interaksi.
3. Jangan mengubah fitur, teknologi, atau arsitektur utama tanpa alasan yang jelas.
4. Jangan membangun ulang proyek jika cukup memperbaiki bagian yang ada.
5. Prioritaskan fitur P0 dalam PRD.
6. Pastikan setiap tombol dan formulir mempunyai fungsi nyata.
7. Jangan menggunakan data hardcoded sebagai pengganti database untuk fitur yang diwajibkan menggunakan backend.
8. Data simulasi boleh digunakan jika diberi label dengan jelas.
9. Jangan mengklaim integrasi pembayaran atau pemerintah yang belum tersedia.
10. Jangan menyatakan aplikasi berhasil dijalankan atau diuji sebelum benar-benar diperiksa.

## 5. Tahap A — Audit dan Persiapan Proyek

Sebelum menulis kode:

1. Periksa struktur folder dan file yang tersedia.
2. Periksa package.json dan dependensi.
3. Identifikasi versi framework dan runtime.
4. Periksa konfigurasi environment.
5. Cocokkan kondisi proyek dengan PRD dan desain.
6. Identifikasi fitur yang belum tersedia.
7. Susun rencana implementasi berdasarkan dependensi fitur.

Jika proyek belum ada, berikan langkah pembuatan proyek yang sesuai dengan stack yang telah disetujui.

Jika proyek sudah ada, jangan menjalankan perintah inisialisasi yang dapat menimpa file penting.

Berikan hasil audit dan rencana sebelum melakukan perubahan besar.

## 6. Tahap B — Setup dan Struktur Aplikasi

Siapkan:
- Konfigurasi framework.
- TypeScript.
- Tailwind CSS.
- Struktur folder.
- Layout utama.
- Routing.
- Komponen bersama.
- Konfigurasi environment.
- Penanganan error dasar.

Jika menggunakan Next.js App Router, susun struktur yang sesuai dengan versi Next.js yang benar-benar digunakan.

Jelaskan fungsi setiap folder dan file penting.

Jangan membuat terlalu banyak abstraksi yang tidak dibutuhkan oleh MVP.

## 7. Tahap C — Database dan Autentikasi

Jika menggunakan Supabase dan PostgreSQL:

1. Buat rancangan schema sesuai ERD.
2. Buat SQL migration.
3. Definisikan primary key dan foreign key.
4. Terapkan constraint dan indeks yang relevan.
5. Siapkan data awal untuk demonstrasi.
6. Konfigurasikan Supabase client sesuai lingkungan.
7. Implementasikan autentikasi jika termasuk PRD.
8. Terapkan pembatasan akses berdasarkan peran.
9. Konfigurasikan Row Level Security (RLS) jika diperlukan.
10. Uji akses baca dan tulis untuk setiap peran.

Jangan meletakkan service-role key atau rahasia server di kode frontend.

Jangan mengandalkan penyembunyian tombol sebagai mekanisme otorisasi. Pemeriksaan izin harus dilakukan pada sisi server dan database sesuai arsitektur.

Berikan instruksi SQL yang lengkap, lokasi file migration, dan langkah verifikasi schema.

## 8. Tahap D — Implementasi Frontend

Bangun antarmuka berdasarkan desain yang disepakati.

Prioritaskan:
- Layout dan navigasi.
- Dashboard.
- Manajemen destinasi.
- Pencatatan kunjungan.
- Transaksi jika termasuk MVP.
- Laporan.
- Login dan pengelolaan pengguna jika diperlukan.

Implementasikan:
- Komponen reusable.
- Formulir dengan validasi.
- Tabel data.
- Search dan filter.
- Pagination jika dibutuhkan.
- Grafik.
- Modal konfirmasi.
- Notifikasi.
- Loading state.
- Empty state.
- Error state.
- Success state.
- Tampilan responsif.

Gunakan TypeScript dengan tipe data yang konsisten.

Jangan menggunakan any secara berlebihan.

Jangan membuat seluruh aplikasi hanya dalam satu file besar.

## 9. Tahap E — Implementasi Backend

Implementasikan proses backend berdasarkan functional requirements dan business rules.

Gunakan Server Actions atau Route Handlers sesuai kebutuhan dan arsitektur.

Pastikan:
- Validasi dilakukan di server.
- Hak akses diperiksa di server.
- Data tidak dipercaya hanya karena dikirim dari frontend.
- Error ditangani secara aman.
- Respons backend konsisten.
- Operasi tulis menjaga integritas data.
- Pengguna tidak dapat memanipulasi nilai transaksi atau hak akses.

Setiap operasi backend harus dapat ditelusuri ke requirement dalam PRD.

Jangan membuat API yang tidak diperlukan.

## 10. Tahap F — Implementasi Fitur Inti

Untuk setiap fitur P0, lakukan urutan berikut:

1. Periksa requirement dan acceptance criteria.
2. Pastikan schema database mendukung fitur.
3. Implementasikan proses backend.
4. Hubungkan frontend dengan backend.
5. Tambahkan validasi.
6. Tambahkan penanganan error.
7. Uji skenario normal dan skenario gagal.
8. Catat status penyelesaian.

Fitur yang dipertimbangkan meliputi:
- CRUD destinasi.
- Pencatatan kunjungan.
- Pencatatan transaksi.
- Pengelolaan status transaksi.
- Dashboard.
- Laporan berdasarkan periode.
- Pengelolaan pengguna dan hak akses.

Implementasikan hanya fitur yang disetujui dalam PRD.

## 11. Aturan Perhitungan dan Data

Pastikan perhitungan mengikuti definisi dalam PRD.

Bedakan:
- Jumlah kunjungan.
- Nilai transaksi.
- Nilai transaksi berdasarkan status.
- Estimasi pendapatan.
- Penerimaan yang benar-benar tercatat.
- PAD aktual yang telah diverifikasi.

Jangan menyamakan seluruh transaksi dengan PAD pemerintah daerah.

Gunakan tipe data yang sesuai untuk nilai uang dan hindari kesalahan pembulatan.

Gunakan zona waktu dan format tanggal yang konsisten.

Untuk laporan, pastikan hasil perhitungan sesuai dengan data sumber dan filter yang diterapkan.

Jika data masih simulasi, tampilkan penanda simulasi pada dashboard, laporan, dan transaksi yang relevan.

## 12. Tahap G — Pengujian dan Perbaikan

Buat test case berdasarkan acceptance criteria PRD.

Uji:
- Login dan logout.
- Hak akses setiap peran.
- CRUD.
- Validasi input.
- Penanganan data kosong.
- Perhitungan transaksi.
- Filter laporan.
- Konsistensi database.
- Error handling.
- Responsivitas.
- Navigasi.
- Keamanan akses.

Jika menemukan bug:
1. Jelaskan penyebabnya.
2. Identifikasi file yang terkait.
3. Berikan perbaikan yang terarah.
4. Jelaskan cara menjalankan ulang pengujian.
5. Catat hasil pengujian setelah perbaikan.

Jangan mengklaim pengujian lulus jika belum dijalankan.

## 13. Tahap H — Deployment dan Dokumentasi

Jika aplikasi sudah stabil, siapkan:
- README.md.
- Prasyarat instalasi.
- Instruksi instalasi dependensi.
- Instruksi konfigurasi environment.
- Instruksi migrasi database.
- Instruksi menjalankan aplikasi.
- Instruksi build production.
- Instruksi deployment jika diperlukan.
- Dokumentasi akun demo tanpa kredensial sensitif.
- Ringkasan fitur.
- Keterbatasan aplikasi.
- Hasil pengujian yang benar-benar telah dilakukan.

Pastikan rahasia tidak dimasukkan ke repository publik.

## 14. Dokumentasi Implementasi AI

Buat catatan implementasi dengan struktur:

| Tanggal | Tahap | Prompt AI | File yang dibuat/diubah | Tujuan | Pengujian | Hasil |
|---|---|---|---|---|---|---|

Dokumentasikan prompt yang benar-benar digunakan, perubahan yang benar-benar dilakukan, dan hasil pengujian yang benar-benar diperoleh.

Jangan mengarang riwayat implementasi atau bukti pengujian.

## 15. Cara Kerja

Kerjakan secara iteratif.

Jangan menghasilkan seluruh source code sekaligus tanpa memeriksa kondisi proyek.

Pada setiap tahap:
1. Jelaskan tujuan.
2. Tentukan file yang dibuat atau diubah.
3. Berikan kode lengkap untuk file terkait.
4. Berikan instruksi terminal.
5. Jelaskan cara menguji.
6. Tampilkan hasil yang diharapkan.
7. Catat risiko atau dependensi.
8. Tunggu konfirmasi atau hasil pengujian saya sebelum beralih jika tahap berikutnya bergantung pada keberhasilan tahap saat ini.

Jika muncul error, fokus menyelesaikan error tersebut sebelum menambahkan fitur baru.

Jika terdapat beberapa pendekatan, pilih yang paling sederhana, aman, dan sesuai PRD.

Mulailah dengan Tahap A: audit proyek dan rencana implementasi. Jangan langsung menulis seluruh aplikasi atau membuat ulang proyek tanpa memeriksa kondisi awal.