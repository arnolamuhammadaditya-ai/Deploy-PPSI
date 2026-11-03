export type RolePengguna = 'admin_dinas' | 'petugas_loket';

export type KategoriWisata = 
  | 'bahari' 
  | 'alam_pegunungan' 
  | 'air_terjun' 
  | 'budaya_sejarah' 
  | 'agrowisata';

export type StatusDestinasi = 'aktif' | 'pemeliharaan' | 'tutup_sementara';

export type StatusTransaksi = 'lunas' | 'pending' | 'dibatalkan';

export type MetodePembayaran = 'tunai' | 'qris_simulasi' | 'transfer_bank_simulasi';

export interface User {
  id: string;
  nama: string;
  email: string;
  role: RolePengguna;
  destinasi_id?: string | null;
  destinasi_nama?: string | null;
  is_active: boolean;
}

export interface Destinasi {
  id: string;
  kode_destinasi: string;
  nama_destinasi: string;
  kategori: KategoriWisata;
  kecamatan: string;
  desa_pekon: string;
  deskripsi: string;
  harga_tiket_domestik: number;
  harga_tiket_mancanegara: number;
  persentase_retribusi_pad: number; // Misal 10% untuk PAD
  kuota_harian_maksimal: number;
  status: StatusDestinasi;
  created_at?: string;
  updated_at?: string;
}

export interface Kunjungan {
  id: string;
  destinasi_id: string;
  destinasi_nama?: string;
  user_id: string;
  petugas_nama?: string;
  tanggal_kunjungan: string; // YYYY-MM-DD
  jumlah_dewasa: number;
  jumlah_anak: number;
  jumlah_mancanegara: number;
  total_pengunjung: number;
  catatan_cuaca_kondisi?: string;
  created_at?: string;
}

export interface TransaksiRetribusi {
  id: string;
  nomor_karcis: string;
  destinasi_id: string;
  destinasi_nama?: string;
  user_id: string;
  petugas_nama?: string;
  tanggal_transaksi: string; // ISO string
  qty_domestik: number;
  qty_mancanegara: number;
  total_transaksi_bruto: number;
  potensi_pad_daerah: number; // Nilai PAD yang disisihkan (bukan seluruh transaksi)
  metode_bayar: MetodePembayaran;
  status: StatusTransaksi;
  is_simulasi: boolean;
  keterangan?: string;
  created_at?: string;
}

export interface DashboardStats {
  totalKunjunganBulanIni: number;
  totalTransaksiBruto: number;
  totalEstimasiPAD: number;
  totalDestinasiAktif: number;
  destinasiTerpopuler: {
    nama: string;
    totalKunjungan: number;
  }[];
  trenKunjunganHarian: {
    tanggal: string;
    kunjungan: number;
    pad: number;
  }[];
}

export interface FilterLaporan {
  tanggalMulai: string;
  tanggalSelesai: string;
  destinasiId?: string;
  statusTransaksi?: string;
}
