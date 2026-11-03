-- ====================================================================
-- SEED DATA AWAL: DESTINASI WISATA KABUPATEN TANGGAMUS, LAMPUNG
-- Sistem Informasi Tanggamus WisataTrack
-- Digunakan untuk demonstrasi awal, pengujian, dan sidang proyek
-- ====================================================================

-- 1. SEED PENGGUNA AWAL
-- Catatan: Password demo adalah 'admin123' dan 'petugas123'
INSERT INTO users (id, nama, email, password_hash, role, destinasi_id, is_active) VALUES
('usr-admin-01', 'Budi Santoso, S.Kom', 'admin.dinas@tanggamus.go.id', 'demo_hash_admin123', 'admin_dinas', NULL, TRUE),
('usr-kiluan-01', 'Ahmad Fauzi (Petugas Kiluan)', 'petugas.kiluan@wisata.id', 'demo_hash_petugas123', 'petugas_loket', 'dest-kiluan', TRUE),
('usr-waylalaan-01', 'Siti Rahma (Petugas Way Lalaan)', 'petugas.waylalaan@wisata.id', 'demo_hash_petugas123', 'petugas_loket', 'dest-waylalaan', TRUE),
('usr-gigihiu-01', 'Hendra Wijaya (Petugas Gigi Hiu)', 'petugas.gigihiu@wisata.id', 'demo_hash_petugas123', 'petugas_loket', 'dest-gigihiu', TRUE);

-- 2. SEED MASTER DESTINASI WISATA TANGGAMUS
INSERT INTO destinasi (
    id, kode_destinasi, nama_destinasi, kategori, kecamatan, desa_pekon, 
    deskripsi, harga_tiket_domestik, harga_tiket_mancanegara, persentase_retribusi_pad, kuota_harian_maksimal, status
) VALUES
(
    'dest-kiluan',
    'TGM-KLN-01',
    'Teluk Kiluan',
    'bahari',
    'Kelumbayan',
    'Pekon Kiluan Negeri',
    'Destinasi wisata bahari unggulan Tanggamus yang terkenal dengan atraksi lumba-lumba hidung botol di laut lepas, laguna alami Pulau Kelapa, dan snorkeling terumbu karang.',
    15000.00,
    50000.00,
    10.00,
    600,
    'aktif'
),
(
    'dest-gigihiu',
    'TGM-KLN-02',
    'Pantai Gigi Hiu (Pegadungan)',
    'bahari',
    'Kelumbayan',
    'Pekon Pegadungan',
    'Formasi batuan karang artistik yang menjulang tajam menyerupai gigi hiu dengan pemandangan ombak Samudra Hindia yang dramatis dan panorama matahari terbit.',
    20000.00,
    60000.00,
    10.00,
    400,
    'aktif'
),
(
    'dest-waylalaan',
    'TGM-KTA-01',
    'Air Terjun Way Lalaan',
    'air_terjun',
    'Kota Agung Timur',
    'Pekon Kampung Baru',
    'Air terjun bertingkat legendaris di kaki Gunung Tanggamus yang telah dikelola sejak zaman kolonial Belanda, dengan aliran air sejuk dan area rekreasi keluarga yang asri.',
    10000.00,
    30000.00,
    15.00,
    800,
    'aktif'
),
(
    'dest-lembahpelangi',
    'TGM-ULB-01',
    'Air Terjun Lembah Pelangi',
    'air_terjun',
    'Ulu Belu',
    'Pekon Sukamaju',
    'Air terjun bertingkat yang membiaskan spektrum pelangi dari uap air geotermal di kawasan dataran tinggi perkebunan kopi Ulu Belu.',
    10000.00,
    25000.00,
    10.00,
    500,
    'aktif'
),
(
    'dest-margotirto',
    'TGM-GST-01',
    'Dam Margo Tirto',
    'agrowisata',
    'Gisting',
    'Pekon Campang',
    'Wisata kolam air tawar dan peninggalan bendungan bersejarah di hawa sejuk perbukitan Gisting yang ramah keluarga.',
    5000.00,
    15000.00,
    10.00,
    700,
    'aktif'
),
(
    'dest-gunungtanggamus',
    'TGM-KTA-02',
    'Gunung Tanggamus',
    'alam_pegunungan',
    'Kota Agung',
    'Pekon Kampung Baru',
    'Puncak tertinggi di Tanggamus dengan ketinggian 2.102 mdpl yang menyajikan hutan lumut mistis, jalur pendakian sejuk, dan panorama Teluk Semangka.',
    15000.00,
    40000.00,
    10.00,
    300,
    'aktif'
);

-- 3. SEED CONTOH KUNJUNGAN WISATAWAN
INSERT INTO kunjungan (id, destinasi_id, user_id, tanggal_kunjungan, jumlah_dewasa, jumlah_anak, jumlah_mancanegara, catatan_cuaca_kondisi) VALUES
('kjg-001', 'dest-kiluan', 'usr-kiluan-01', CURRENT_DATE - INTERVAL '2 days', 45, 12, 4, 'Cerah berawan, ombak tenang lumba-lumba terlihat banyak'),
('kjg-002', 'dest-waylalaan', 'usr-waylalaan-01', CURRENT_DATE - INTERVAL '2 days', 80, 35, 2, 'Akhir pekan ramai keluarga, debit air normal'),
('kjg-003', 'dest-gigihiu', 'usr-gigihiu-01', CURRENT_DATE - INTERVAL '1 days', 28, 5, 6, 'Spot foto sunset padat fotografer lanskap'),
('kjg-004', 'dest-kiluan', 'usr-kiluan-01', CURRENT_DATE, 35, 10, 2, 'Kondisi laut aman untuk perahu katir');

-- 4. SEED CONTOH TRANSAKSI RETRIBUSI & TIKET
INSERT INTO transaksi_retribusi (
    id, nomor_karcis, destinasi_id, user_id, tanggal_transaksi, 
    qty_domestik, qty_mancanegara, total_transaksi_bruto, potensi_pad_daerah, 
    metode_bayar, status, is_simulasi, keterangan
) VALUES
('trx-001', 'TKT-20261018-001', 'dest-kiluan', 'usr-kiluan-01', CURRENT_TIMESTAMP - INTERVAL '2 days', 57, 4, 1055000.00, 105500.00, 'tunai', 'lunas', TRUE, 'Pembayaran rombongan wisatawan lokal & asing'),
('trx-002', 'TKT-20261018-002', 'dest-waylalaan', 'usr-waylalaan-01', CURRENT_TIMESTAMP - INTERVAL '2 days', 115, 2, 1210000.00, 181500.00, 'qris_simulasi', 'lunas', TRUE, 'Tiket masuk akhir pekan'),
('trx-003', 'TKT-20261019-001', 'dest-gigihiu', 'usr-gigihiu-01', CURRENT_TIMESTAMP - INTERVAL '1 days', 33, 6, 1020000.00, 102000.00, 'tunai', 'lunas', TRUE, 'Wisatawan komunitas fotografi'),
('trx-004', 'TKT-20261020-001', 'dest-kiluan', 'usr-kiluan-01', CURRENT_TIMESTAMP, 45, 2, 775000.00, 77500.00, 'qris_simulasi', 'lunas', TRUE, 'Kunjungan pagi hari');
