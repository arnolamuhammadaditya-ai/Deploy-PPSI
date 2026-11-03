# PROMPT 3 — UI/UX DESIGN TANGGAMUS WISATATRACK

## 1. Peran

Bertindaklah sebagai Senior UI/UX Designer, Product Designer, Design System Specialist, dan Frontend Design Architect.

Saya sedang mengembangkan proyek mata kuliah Proyek Pengembangan Sistem Informasi berupa aplikasi web bernama Tanggamus WisataTrack.

Tugas Anda adalah merancang UI/UX yang profesional, konsisten, mudah digunakan, responsif, dan siap diterjemahkan menjadi aplikasi web full-stack.

Desain harus mengikuti kebutuhan dalam PRD, bukan menciptakan produk baru yang tidak sesuai dengan spesifikasi.

## 2. Konteks Produk

Nama: Tanggamus WisataTrack.

Deskripsi:
Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi Pendapatan Destinasi Wisata Kabupaten Tanggamus.

Platform: responsive web application.

Target pengguna:
- Admin sistem.
- Pengelola destinasi wisata.
- Petugas operasional.
- Pengguna laporan atau manajemen jika termasuk dalam PRD.

Tujuan utama:
- Mengelola data destinasi.
- Mencatat kunjungan.
- Mencatat transaksi sesuai kebutuhan dan kewenangan.
- Memantau statistik kunjungan dan penerimaan tercatat.
- Membuat laporan berdasarkan periode dan destinasi.

## 3. Dokumen Acuan

Gunakan PRD final berikut sebagai sumber kebenaran utama.

[TEMPELKAN PRD FINAL DARI PROMPT 2 DI SINI]

Jika PRD dan instruksi visual bertentangan, prioritaskan kebutuhan fungsional dan aturan bisnis dalam PRD. Jelaskan jika ada informasi yang belum lengkap sebelum membuat asumsi desain.

Jangan menambahkan fitur di luar PRD tanpa alasan dan persetujuan.

## 4. Arah Visual

Buat desain dengan karakteristik berikut:

- Modern, bersih, profesional, dan mudah dipahami.
- Terinspirasi oleh lingkungan alam Kabupaten Tanggamus tanpa menggunakan ornamen berlebihan.
- Mengutamakan keterbacaan data dan efisiensi pekerjaan.
- Menggunakan layout dashboard administratif yang rapi.
- Menghindari tampilan generik yang dipenuhi gradient, kartu berlebihan, atau dekorasi yang tidak fungsional.
- Menggunakan bahasa Indonesia pada label, navigasi, tabel, formulir, dan pesan sistem.

### Rekomendasi palet warna awal

- Primary green: #166534.
- Dark green: #14532D.
- Light green: #DCFCE7.
- Background: #F8FAFC.
- Surface: #FFFFFF.
- Primary text: #0F172A.
- Secondary text: #64748B.
- Border: #E2E8F0.
- Success: #15803D.
- Warning: #D97706.
- Error: #DC2626.

Palet tersebut adalah rekomendasi awal. Sesuaikan kontras dan penggunaannya agar teks tetap mudah dibaca.

### Tipografi

Gunakan font sans-serif yang mudah dibaca, seperti Inter atau font setara.

Terapkan hierarki tipografi yang konsisten untuk:
- Judul halaman.
- Judul bagian.
- Angka statistik.
- Label tabel.
- Isi tabel.
- Label dan helper text formulir.
- Notifikasi dan pesan kesalahan.

## 5. Design System

Buat design system yang mencakup:

1. Color tokens.
2. Typography scale.
3. Spacing scale.
4. Grid dan container.
5. Border radius.
6. Elevation dan shadow.
7. Tombol utama, sekunder, dan destruktif.
8. Text input, select, date picker, dan textarea.
9. Tabel data.
10. Kartu statistik.
11. Badge status.
12. Modal konfirmasi.
13. Dropdown dan popover.
14. Toast notification.
15. Pagination.
16. Search dan filter.
17. Breadcrumb.
18. Sidebar dan top navigation.
19. Chart container.
20. Empty, loading, error, dan success states.

Gunakan komponen reusable dan konsisten.

Jelaskan state normal, hover, focus, disabled, dan loading untuk komponen interaktif yang relevan.

## 6. Struktur Navigasi

Rancang struktur navigasi berdasarkan fitur yang benar-benar tercantum dalam PRD.

Pertimbangkan kelompok halaman berikut jika sesuai:

- Dashboard.
- Data destinasi.
- Data kunjungan.
- Transaksi.
- Laporan.
- Pengguna dan pengaturan.

Gunakan sidebar pada desktop jika sesuai dengan kebutuhan aplikasi.

Pada perangkat mobile, ubah navigasi menjadi pola yang sesuai, misalnya drawer atau menu ringkas.

Jangan menampilkan menu yang tidak dapat digunakan atau tidak memiliki implementasi.

## 7. Halaman yang Harus Dirancang

Buat seluruh halaman yang diperlukan untuk fitur P0 dalam PRD.

Pertimbangkan halaman berikut apabila relevan:

### A. Login
- Form email atau identitas pengguna sesuai sistem autentikasi.
- Input kata sandi.
- Validasi.
- Pesan kesalahan.
- Loading state.

### B. Dashboard
- Ringkasan jumlah kunjungan.
- Ringkasan nilai transaksi atau penerimaan tercatat sesuai definisi dalam PRD.
- Grafik kunjungan berdasarkan waktu.
- Grafik penerimaan berdasarkan waktu.
- Ringkasan destinasi.
- Filter periode.
- Informasi sumber dan status data.

Jangan menyamakan estimasi, nilai transaksi, dan penerimaan resmi.

### C. Manajemen Destinasi
- Tabel destinasi.
- Pencarian.
- Filter.
- Tombol tambah destinasi.
- Form tambah dan edit.
- Detail destinasi jika dibutuhkan.
- Konfirmasi penghapusan.
- Empty state dan error state.

### D. Pencatatan Kunjungan
- Form pencatatan kunjungan.
- Pilihan destinasi.
- Tanggal kunjungan.
- Jumlah pengunjung atau kategori sesuai PRD.
- Validasi input.
- Tabel riwayat kunjungan.
- Filter periode dan destinasi.

### E. Transaksi
- Daftar transaksi.
- Form pencatatan transaksi.
- Kategori atau referensi transaksi sesuai model data.
- Nilai transaksi.
- Status transaksi.
- Tanggal dan waktu.
- Detail transaksi bila dibutuhkan.
- Konfirmasi tindakan penting.

Jika transaksi bersifat simulasi, tampilkan label yang jelas.

### F. Laporan
- Filter tanggal.
- Filter destinasi.
- Ringkasan data.
- Tabel hasil.
- Grafik bila relevan.
- Ekspor laporan jika termasuk fitur P0 atau P1 yang disetujui.

### G. Pengguna
- Daftar pengguna.
- Peran pengguna.
- Form pengelolaan pengguna jika termasuk ruang lingkup.
- Informasi pembatasan hak akses.

Halaman yang tidak dibutuhkan oleh PRD tidak perlu dibuat.

## 8. Spesifikasi Interaksi

Untuk setiap halaman, jelaskan:

- Tujuan halaman.
- Peran yang dapat mengakses.
- Komponen utama.
- Data yang ditampilkan.
- Aksi utama.
- Aksi sekunder.
- Navigasi menuju halaman lain.
- Validasi.
- Konfirmasi tindakan destruktif.
- Loading state.
- Empty state.
- Error state.
- Success state.

Pastikan setiap tombol memiliki fungsi yang jelas.

Jangan menggunakan tombol dekoratif yang tidak mempunyai tujuan.

Buat alur interaksi yang realistis dari login hingga pengelolaan data dan pembuatan laporan.

## 9. Responsive Design

Rancang layout untuk:
- Desktop.
- Tablet.
- Mobile.

Pastikan:
- Sidebar dapat berubah menjadi navigasi mobile.
- Tabel data tetap dapat digunakan pada layar kecil.
- Formulir nyaman diisi melalui sentuhan.
- Grafik tidak terpotong.
- Tombol aksi utama mudah ditemukan.
- Modal tidak keluar dari viewport.
- Informasi penting tidak hilang hanya karena ukuran layar berubah.

## 10. Aksesibilitas

Terapkan prinsip aksesibilitas dasar:

- Kontras teks yang memadai.
- Label pada input.
- Fokus keyboard yang terlihat.
- Ukuran teks yang nyaman.
- Status tidak hanya dibedakan melalui warna.
- Pesan validasi yang jelas.
- Struktur heading yang konsisten.
- Area interaksi yang memadai untuk pengguna mobile.

## 11. Aturan Data dan Visualisasi

Gunakan data dummy yang masuk akal untuk mengisi desain.

Tandai data tersebut sebagai data demo atau simulasi.

Jangan mengarang angka statistik sebagai fakta Kabupaten Tanggamus.

Untuk grafik:
- Tampilkan judul.
- Tampilkan periode.
- Cantumkan satuan.
- Gunakan format rupiah untuk nilai uang.
- Gunakan format angka yang konsisten.
- Bedakan data kosong dengan nilai nol.
- Jelaskan indikator yang digunakan.

## 12. Output yang Wajib Dihasilkan

Hasil desain harus meliputi:

1. Sitemap.
2. User flow.
3. Design system.
4. Layout utama.
5. Seluruh halaman fitur P0.
6. Komponen reusable.
7. Variasi responsif.
8. Loading, empty, error, dan success states.
9. Spesifikasi interaksi.
10. Daftar komponen dan perilakunya.
11. Catatan handoff untuk developer.
12. Pemetaan halaman ke functional requirements dalam PRD.

Jika alat mendukung prototipe interaktif, hubungkan navigasi antarlayar dan buat interaksi utama dapat dicoba.

Jika alat mendukung ekspor kode, pastikan kode yang dihasilkan sesuai dengan stack teknologi yang ditentukan dalam PRD.

Jangan mengklaim prototipe atau kode telah dibuat jika alat hanya menghasilkan gambar atau deskripsi desain.

## 13. Design Handoff

Buat tabel handoff dengan format:

| Halaman | Requirement terkait | Komponen | Data yang dibutuhkan | Aksi pengguna | State yang harus tersedia |

Tambahkan panduan implementasi untuk developer, termasuk:
- Struktur layout.
- Komponen bersama.
- Pola formulir.
- Pola tabel.
- Pola grafik.
- Penggunaan design tokens.
- Responsivitas.
- Penanganan state.

## 14. Dokumentasi Prompt AI

Buat dokumentasi prompt yang digunakan untuk:
- Design system.
- Dashboard.
- Manajemen destinasi.
- Pencatatan kunjungan.
- Transaksi.
- Laporan.
- Responsive design.
- Revisi berdasarkan evaluasi.

Dokumentasikan output yang benar-benar dihasilkan, alat yang digunakan, dan perubahan yang dilakukan.

Jangan mengarang bukti bahwa suatu alat telah menghasilkan desain atau prototipe.

## 15. Batasan

- Jangan mengubah requirement utama dalam PRD.
- Jangan membuat fitur baru tanpa alasan.
- Jangan menggunakan data sensitif.
- Jangan membuat klaim penerimaan pemerintah yang tidak dapat dibuktikan.
- Jangan membuat integrasi resmi yang belum tersedia.
- Jangan mulai implementasi backend pada tahap desain.
- Fokus pada desain yang realistis untuk diselesaikan dalam 4–6 minggu.

Mulailah dengan menganalisis PRD, menentukan daftar layar dan design system, lalu merancang halaman secara konsisten.

Akhiri dengan checklist kualitas desain dan rekomendasi kesiapan menuju implementasi full-stack pada Prompt 4.