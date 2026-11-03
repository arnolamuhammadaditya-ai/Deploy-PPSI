# Tanggamus WisataTrack 🌴
**Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi Pendapatan Destinasi Wisata Kabupaten Tanggamus**

Aplikasi web *full-stack* modern yang dikembangkan untuk mengelola data objek wisata, mencatat arus kunjungan wisatawan secara *real-time*, memproses transaksi karcis masuk, memisahkan porsi retribusi Pendapatan Asli Daerah (PAD) resmi Pemerintah Kabupaten Tanggamus, serta menyediakan dashboard analitik dan laporan rekapitulasi periode.

Proyek ini disusun untuk memenuhi tugas mata kuliah **Proyek Pengembangan Sistem Informasi (PPSI)**.

---

## 📌 Ringkasan Fitur Inti (P0 - MVP)

1. **Dashboard Analitik & Monitoring Pariwisata (`/dashboard`)**
   - Kartu metrik KPI: Akumulasi Wisatawan, Total Penerimaan Bruto Karcis, Estimasi Potensi Retribusi PAD Daerah, dan Total Objek Wisata Aktif.
   - Grafik interaktif tren kunjungan harian & alokasi PAD daerah.
   - Perankingan 5 Destinasi Wisata Terpopuler di Tanggamus.
   - Penanda transparansi akademik (*Mode Simulasi Akademik*).

2. **Master Data Destinasi Wisata Tanggamus (`/destinasi`)**
   - Manajemen objek wisata: Teluk Kiluan, Pantai Gigi Hiu, Air Terjun Way Lalaan, Air Terjun Lembah Pelangi, Dam Margo Tirto, Gunung Tanggamus.
   - Form Tambah, Ubah (Edit), dan Hapus Destinasi.
   - Konfigurasi tarif tiket wisatawan domestik vs mancanegara, kuota harian pengunjung, dan persentase setoran retribusi PAD daerah (10% - 15%).
   - Pencarian instan dan filter berdasarkan kategori (Bahari, Pegunungan, Air Terjun, Agrowisata).

3. **Pencatatan Kunjungan Wisatawan (`/kunjungan`)**
   - Input log arus masuk wisatawan dengan rincian komposisi (Dewasa, Anak-anak, Mancanegara).
   - Validasi minimal 1 pengunjung dan kalkulasi otomatis.
   - Pencatatan kondisi cuaca & kelayakan lapangan (ombak laut, debit air, kabut).

4. **Transaksi Karcis & Retribusi Daerah (`/transaksi`)**
   - Penerbitan karcis masuk elektronik dengan penomoran unik otomatis (`TKT-YYYYMMDD-XXX`).
   - **Kaidah Finansial PRD:** Pemisahan tegas antara nilai bruto penerimaan loket dengan porsi retribusi PAD resmi Pemkab Tanggamus.
   - Metode bayar: Tunai (*Cash* di Loket), QRIS Dinamis (Simulasi), dan Transfer Bank Daerah (Simulasi).
   - Fitur pratinjau dan cetak struk karcis resmi.

5. **Laporan & Rekapitulasi Periode (`/laporan`)**
   - Filter rentang tanggal fleksibel dan filter spesifik per destinasi.
   - Ringkasan statistik periode dan tabel rincian transaksi terverifikasi.
   - **Ekspor CSV/Excel:** Mengunduh file `.csv` yang langsung kompatibel dengan Microsoft Excel.
   - **Cetak Dokumen Resmi (PDF/Print):** Tampilan kop surat resmi Pemerintah Kabupaten Tanggamus Dinas Pariwisata dan kolom tanda tangan pengesahan.

6. **Autentikasi & Multi-Role Access Control (`/login`)**
   - **Admin Dinas Pariwisata**: Akses penuh ke seluruh destinasi se-kabupaten, CRUD master data, rekap PAD global, dan cetak laporan.
   - **Petugas Loket / Lapangan**: Akses terbatas pada destinasi tempat bertugas untuk mencatat kunjungan dan menerbitkan karcis.
   - Dilengkapi *Quick Role Switcher* untuk kemudahan demonstrasi saat sidang/presentasi tugas.

---

## 🛠️ Stack Teknologi

- **Frontend & Backend Framework:** Next.js 14 (App Router) dengan TypeScript
- **Styling & Design System:** Tailwind CSS dengan palet warna alam Tanggamus (*Forest & Emerald Green*)
- **Icons:** Lucide React
- **Database Architecture:**
  - SQL Skrip migrasi PostgreSQL / Supabase lengkap di folder `database/schema.sql` dan `database/seed.sql`
  - Engine penyimpanan persisten lokal (*Client Store*) yang langsung berjalan *out-of-the-box* tanpa ketergantungan server eksternal saat evaluasi lokal.

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js versi 18.x / 20.x / 22.x (telah diverifikasi pada Node `v22.19.0`)
- NPM `v10.x`

### Langkah-langkah
1. **Buka Terminal di Direktori Proyek:**
   ```bash
   cd "D:\MK ARUNO\KUIS PPSI"
   ```

2. **Instal Dependensi (jika belum dilakukan):**
   ```bash
   npm.cmd install
   # atau jika pada command prompt:
   npm install
   ```

3. **Jalankan Server Development:**
   ```bash
   npm.cmd run dev
   # atau
   npm run dev
   ```

4. **Buka Aplikasi di Browser:**
   Akses [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 👥 Akun Demo Pengujian

Aplikasi telah dilengkapi data awal dan tombol pintasan satu-klik untuk presentasi dosen penguji:

| Peran (Role) | Nama Pengguna | Alamat Email | Password Demo | Hak Akses |
|---|---|---|---|---|
| **Admin Dinas** | Budi Santoso, S.Kom | `admin.dinas@tanggamus.go.id` | `admin123` | Seluruh destinasi, CRUD master, ekspor rekap PAD |
| **Petugas Loket** | Ahmad Fauzi | `petugas.kiluan@wisata.id` | `petugas123` | Terbatas pada destinasi **Teluk Kiluan** |
| **Petugas Loket** | Siti Rahma | `petugas.waylalaan@wisata.id` | `petugas123` | Terbatas pada destinasi **Air Terjun Way Lalaan** |
| **Petugas Loket** | Hendra Wijaya | `petugas.gigihiu@wisata.id` | `petugas123` | Terbatas pada destinasi **Pantai Gigi Hiu** |

---

## 🗄️ Database & Schema SQL

Berkas skema database relasional telah disiapkan di direktori `database/`:
- `database/schema.sql`: Skema DDL lengkap untuk PostgreSQL / Supabase (definisi tabel `users`, `destinasi`, `kunjungan`, `transaksi_retribusi`, *constraints*, *indexes*, dan aturan RLS).
- `database/seed.sql`: Data awal objek wisata riil Kabupaten Tanggamus, akun demo, serta transaksi contoh.

---

## 📋 Catatan Implementasi AI (Audit Trail)

| Tanggal | Tahap | Prompt AI | File yang dibuat/diubah | Tujuan | Pengujian | Hasil |
|---|---|---|---|---|---|---|
| 2026-10-20 | Tahap A | Audit Lingkungan & Proyek | N/A (Pemeriksaan terminal) | Memeriksa ketersediaan node, npm, git, dan file eksisting | `node -v`, `npm.cmd -v`, `Get-ChildItem` | Node v22.19.0 & NPM 10.9.3 terdeteksi, direktori siap diinisialisasi |
| 2026-10-20 | Tahap B | Setup Fondasi & Config | `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.mjs` | Inisialisasi arsitektur Next.js 14 App Router & Design System Tanggamus | `npm.cmd install` | 108 paket terinstal sukses dalam 24 detik |
| 2026-10-20 | Tahap C | Database & Seed | `database/schema.sql`, `database/seed.sql` | Merancang ERD, DDL PostgreSQL Supabase, dan data wisata Tanggamus | Validasi SQL syntax & integrity | File skema dan data awal tersimpan rapi |
| 2026-10-20 | Tahap D | Store & Reusable UI | `src/lib/types.ts`, `src/lib/utils.ts`, `src/lib/store.ts`, `src/components/ui/*`, `src/components/layout/*`, `src/components/charts/*` | Menyiapkan state store, formatting IDR, komponen reusable, sidebar, dan header | TypeScript typecheck | Lulus typecheck tanpa error |
| 2026-10-20 | Tahap E & F | Implementasi Halaman P0 | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/dashboard/page.tsx`, `src/app/destinasi/page.tsx`, `src/app/kunjungan/page.tsx`, `src/app/transaksi/page.tsx`, `src/app/laporan/page.tsx`, `src/app/login/page.tsx` | Membangun seluruh antarmuka dan fungsi interaktif fitur P0 | `npm.cmd run build` & HTTP status check | Kompilasi 100% sukses, semua rute mengembalikan 200 OK |
