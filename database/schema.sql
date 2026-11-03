-- ====================================================================
-- SKEMA DATABASE: TANGGAMUS WISATATRACK
-- Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi Pendapatan
-- Destinasi Wisata Kabupaten Tanggamus, Provinsi Lampung
-- Dialek: PostgreSQL / Supabase
-- ====================================================================

-- 1. ENUM DEFINITIONS
CREATE TYPE role_pengguna AS ENUM ('admin_dinas', 'petugas_loket');
CREATE TYPE status_destinasi AS ENUM ('aktif', 'pemeliharaan', 'tutup_sementara');
CREATE TYPE status_transaksi AS ENUM ('lunas', 'pending', 'dibatalkan');
CREATE TYPE kategori_wisata AS ENUM ('bahari', 'alam_pegunungan', 'air_terjun', 'budaya_sejarah', 'agrowisata');
CREATE TYPE metode_pembayaran AS ENUM ('tunai', 'qris_simulasi', 'transfer_bank_simulasi');

-- 2. TABEL PENGGUNA (USERS & ROLE-BASED ACCESS CONTROL)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role role_pengguna NOT NULL DEFAULT 'petugas_loket',
    destinasi_id VARCHAR(36), -- Null jika admin_dinas (akses global)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL MASTER DESTINASI WISATA KABUPATEN TANGGAMUS
CREATE TABLE destinasi (
    id VARCHAR(36) PRIMARY KEY,
    kode_destinasi VARCHAR(20) UNIQUE NOT NULL, -- Contoh: TGM-KLN-01 (Teluk Kiluan)
    nama_destinasi VARCHAR(200) NOT NULL,
    kategori kategori_wisata NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,           -- e.g. Kelumbayan, Kota Agung, Gisting
    desa_pekon VARCHAR(100),                  -- Pekon / Desa setempat
    deskripsi TEXT,
    harga_tiket_domestik NUMERIC(12, 2) NOT NULL DEFAULT 10000.00 CHECK (harga_tiket_domestik >= 0),
    harga_tiket_mancanegara NUMERIC(12, 2) NOT NULL DEFAULT 25000.00 CHECK (harga_tiket_mancanegara >= 0),
    persentase_retribusi_pad NUMERIC(5, 2) NOT NULL DEFAULT 10.00 CHECK (persentase_retribusi_pad >= 0 AND persentase_retribusi_pad <= 100), -- Bagian PAD Pemda (misal 10%)
    kuota_harian_maksimal INT NOT NULL DEFAULT 500 CHECK (kuota_harian_maksimal > 0),
    status status_destinasi NOT NULL DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key link untuk user penanggung jawab destinasi
ALTER TABLE users ADD CONSTRAINT fk_user_destinasi 
    FOREIGN KEY (destinasi_id) REFERENCES destinasi(id) ON DELETE SET NULL;

-- 4. TABEL PENCATATAN KUNJUNGAN WISATAWAN
CREATE TABLE kunjungan (
    id VARCHAR(36) PRIMARY KEY,
    destinasi_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,              -- Petugas yang mencatat
    tanggal_kunjungan DATE NOT NULL DEFAULT CURRENT_DATE,
    jumlah_dewasa INT NOT NULL DEFAULT 0 CHECK (jumlah_dewasa >= 0),
    jumlah_anak INT NOT NULL DEFAULT 0 CHECK (jumlah_anak >= 0),
    jumlah_mancanegara INT NOT NULL DEFAULT 0 CHECK (jumlah_mancanegara >= 0),
    total_pengunjung INT GENERATED ALWAYS AS (jumlah_dewasa + jumlah_anak + jumlah_mancanegara) STORED,
    catatan_cuaca_kondisi VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_kunjungan_destinasi FOREIGN KEY (destinasi_id) REFERENCES destinasi(id) ON DELETE RESTRICT,
    CONSTRAINT fk_kunjungan_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_minimal_satu_pengunjung CHECK ((jumlah_dewasa + jumlah_anak + jumlah_mancanegara) > 0)
);

-- 5. TABEL TRANSAKSI RETRIBUSI & TIKET
CREATE TABLE transaksi_retribusi (
    id VARCHAR(36) PRIMARY KEY,
    nomor_karcis VARCHAR(50) UNIQUE NOT NULL, -- e.g. TKT-20261020-001
    destinasi_id VARCHAR(36) NOT NULL,
    kunjungan_id VARCHAR(36),                 -- Terhubung ke kunjungan terkait jika ada
    user_id VARCHAR(36) NOT NULL,             -- Petugas kasir/loket
    tanggal_transaksi TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Komposisi Pembelian
    qty_domestik INT NOT NULL DEFAULT 0 CHECK (qty_domestik >= 0),
    qty_mancanegara INT NOT NULL DEFAULT 0 CHECK (qty_mancanegara >= 0),
    
    -- Nilai Finansial
    total_transaksi_bruto NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (total_transaksi_bruto >= 0),
    potensi_pad_daerah NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (potensi_pad_daerah >= 0), -- Porsi resmi PAD
    
    metode_bayar metode_pembayaran NOT NULL DEFAULT 'tunai',
    status status_transaksi NOT NULL DEFAULT 'lunas',
    is_simulasi BOOLEAN NOT NULL DEFAULT TRUE, -- Penanda data simulasi akademik
    keterangan VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_transaksi_destinasi FOREIGN KEY (destinasi_id) REFERENCES destinasi(id) ON DELETE RESTRICT,
    CONSTRAINT fk_transaksi_kunjungan FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(id) ON DELETE SET NULL,
    CONSTRAINT fk_transaksi_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 6. INDEXING UNTUK OPTIMASI QUERY & LAPORAN
CREATE INDEX idx_kunjungan_tanggal ON kunjungan(tanggal_kunjungan);
CREATE INDEX idx_kunjungan_destinasi ON kunjungan(destinasi_id);
CREATE INDEX idx_transaksi_tanggal ON transaksi_retribusi(tanggal_transaksi);
CREATE INDEX idx_transaksi_destinasi ON transaksi_retribusi(destinasi_id);
CREATE INDEX idx_transaksi_status ON transaksi_retribusi(status);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES CONTOH SUPABASE
ALTER TABLE destinasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE kunjungan ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaksi_retribusi ENABLE ROW LEVEL SECURITY;

-- Policy Baca Global (Semua user terotentikasi dapat melihat destinasi)
CREATE POLICY "Semua pengguna dapat melihat destinasi" 
    ON destinasi FOR SELECT 
    USING (true);

-- Policy Tulis Destinasi: Hanya Admin Dinas
CREATE POLICY "Hanya Admin Dinas yang dapat mengelola destinasi" 
    ON destinasi FOR ALL 
    USING (auth.jwt() ->> 'role' = 'admin_dinas');

-- Policy Kunjungan: Petugas Loket hanya dapat mencatat untuk destinasinya
CREATE POLICY "Petugas loket melihat kunjungan destinasinya sendiri" 
    ON kunjungan FOR SELECT 
    USING (
        auth.jwt() ->> 'role' = 'admin_dinas' 
        OR destinasi_id = (auth.jwt() ->> 'destinasi_id')
    );
