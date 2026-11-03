import { 
  Destinasi, 
  Kunjungan, 
  TransaksiRetribusi, 
  User, 
  DashboardStats,
  FilterLaporan
} from "./types";
import { generateId, generateNomorKarcis } from "./utils";

// Data Awal Akun Demo
export const DEMO_USERS: User[] = [
  {
    id: "usr-admin-01",
    nama: "Budi Santoso, S.Kom (Admin Dinas)",
    email: "admin.dinas@tanggamus.go.id",
    role: "admin_dinas",
    destinasi_id: null,
    is_active: true
  },
  {
    id: "usr-kiluan-01",
    nama: "Ahmad Fauzi (Petugas Loket)",
    email: "petugas.kiluan@wisata.id",
    role: "petugas_loket",
    destinasi_id: "dest-kiluan",
    destinasi_nama: "Teluk Kiluan",
    is_active: true
  },
  {
    id: "usr-waylalaan-01",
    nama: "Siti Rahma (Petugas Loket)",
    email: "petugas.waylalaan@wisata.id",
    role: "petugas_loket",
    destinasi_id: "dest-waylalaan",
    destinasi_nama: "Air Terjun Way Lalaan",
    is_active: true
  },
  {
    id: "usr-gigihiu-01",
    nama: "Hendra Wijaya (Petugas Loket)",
    email: "petugas.gigihiu@wisata.id",
    role: "petugas_loket",
    destinasi_id: "dest-gigihiu",
    destinasi_nama: "Pantai Gigi Hiu (Pegadungan)",
    is_active: true
  }
];

// Data Awal Destinasi Wisata Kabupaten Tanggamus
export const INITIAL_DESTINASI: Destinasi[] = [
  {
    id: "dest-kiluan",
    kode_destinasi: "TGM-KLN-01",
    nama_destinasi: "Teluk Kiluan",
    kategori: "bahari",
    kecamatan: "Kelumbayan",
    desa_pekon: "Pekon Kiluan Negeri",
    deskripsi: "Destinasi wisata bahari unggulan Tanggamus dengan atraksi lumba-lumba hidung botol di laut lepas, laguna alami Pulau Kelapa, dan snorkeling terumbu karang.",
    harga_tiket_domestik: 15000,
    harga_tiket_mancanegara: 50000,
    persentase_retribusi_pad: 10, // 10% disetor sebagai retribusi PAD Pemda Tanggamus
    kuota_harian_maksimal: 600,
    status: "aktif",
    created_at: "2026-10-01T08:00:00Z"
  },
  {
    id: "dest-gigihiu",
    kode_destinasi: "TGM-KLN-02",
    nama_destinasi: "Pantai Gigi Hiu (Pegadungan)",
    kategori: "bahari",
    kecamatan: "Kelumbayan",
    desa_pekon: "Pekon Pegadungan",
    deskripsi: "Gugusan batuan karang artistik menjulang tajam menyerupai taring gigi hiu dengan deburan ombak Samudra Hindia dan panorama sunrise spektakuler.",
    harga_tiket_domestik: 20000,
    harga_tiket_mancanegara: 60000,
    persentase_retribusi_pad: 10,
    kuota_harian_maksimal: 400,
    status: "aktif",
    created_at: "2026-10-02T08:00:00Z"
  },
  {
    id: "dest-waylalaan",
    kode_destinasi: "TGM-KTA-01",
    nama_destinasi: "Air Terjun Way Lalaan",
    kategori: "air_terjun",
    kecamatan: "Kota Agung Timur",
    desa_pekon: "Pekon Kampung Baru",
    deskripsi: "Air terjun bertingkat legendaris di kaki Gunung Tanggamus yang telah terkelola sejak era kolonial, airnya sejuk bersumber langsung dari pegunungan.",
    harga_tiket_domestik: 10000,
    harga_tiket_mancanegara: 30000,
    persentase_retribusi_pad: 15,
    kuota_harian_maksimal: 800,
    status: "aktif",
    created_at: "2026-10-03T08:00:00Z"
  },
  {
    id: "dest-lembahpelangi",
    kode_destinasi: "TGM-ULB-01",
    nama_destinasi: "Air Terjun Lembah Pelangi",
    kategori: "air_terjun",
    kecamatan: "Ulu Belu",
    desa_pekon: "Pekon Sukamaju",
    deskripsi: "Air terjun alami dengan fenomena pembiasan pelangi pada percikan uap air di dataran tinggi perkebunan kopi dan geotermal Ulu Belu.",
    harga_tiket_domestik: 10000,
    harga_tiket_mancanegara: 25000,
    persentase_retribusi_pad: 10,
    kuota_harian_maksimal: 500,
    status: "aktif",
    created_at: "2026-10-04T08:00:00Z"
  },
  {
    id: "dest-margotirto",
    kode_destinasi: "TGM-GST-01",
    nama_destinasi: "Dam Margo Tirto",
    kategori: "agrowisata",
    kecamatan: "Gisting",
    desa_pekon: "Pekon Campang",
    deskripsi: "Kawasan bendungan peninggalan era kolonial di kaki gunung yang disulap menjadi rekreasi kolam air tawar sejuk dan asri untuk keluarga.",
    harga_tiket_domestik: 5000,
    harga_tiket_mancanegara: 15000,
    persentase_retribusi_pad: 10,
    kuota_harian_maksimal: 700,
    status: "aktif",
    created_at: "2026-10-05T08:00:00Z"
  },
  {
    id: "dest-gunungtanggamus",
    kode_destinasi: "TGM-KTA-02",
    nama_destinasi: "Gunung Tanggamus",
    kategori: "alam_pegunungan",
    kecamatan: "Kota Agung",
    desa_pekon: "Pekon Kampung Baru",
    deskripsi: "Puncak tertinggi Kabupaten Tanggamus (2.102 mdpl) yang memukau dengan jalur pendakian hutan lumut mistis dan panorama Teluk Semangka.",
    harga_tiket_domestik: 15000,
    harga_tiket_mancanegara: 40000,
    persentase_retribusi_pad: 10,
    kuota_harian_maksimal: 300,
    status: "aktif",
    created_at: "2026-10-06T08:00:00Z"
  }
];

// Data Awal Kunjungan
export const INITIAL_KUNJUNGAN: Kunjungan[] = [
  {
    id: "kjg-101",
    destinasi_id: "dest-kiluan",
    destinasi_nama: "Teluk Kiluan",
    user_id: "usr-kiluan-01",
    petugas_nama: "Ahmad Fauzi",
    tanggal_kunjungan: "2026-10-18",
    jumlah_dewasa: 45,
    jumlah_anak: 12,
    jumlah_mancanegara: 4,
    total_pengunjung: 61,
    catatan_cuaca_kondisi: "Cuaca cerah, lumba-lumba terlihat aktif di Teluk Kiluan",
    created_at: "2026-10-18T09:30:00Z"
  },
  {
    id: "kjg-102",
    destinasi_id: "dest-waylalaan",
    destinasi_nama: "Air Terjun Way Lalaan",
    user_id: "usr-waylalaan-01",
    petugas_nama: "Siti Rahma",
    tanggal_kunjungan: "2026-10-18",
    jumlah_dewasa: 80,
    jumlah_anak: 35,
    jumlah_mancanegara: 2,
    total_pengunjung: 117,
    catatan_cuaca_kondisi: "Kunjungan ramai akhir pekan keluarga, debit air jernih",
    created_at: "2026-10-18T10:15:00Z"
  },
  {
    id: "kjg-103",
    destinasi_id: "dest-gigihiu",
    destinasi_nama: "Pantai Gigi Hiu (Pegadungan)",
    user_id: "usr-gigihiu-01",
    petugas_nama: "Hendra Wijaya",
    tanggal_kunjungan: "2026-10-19",
    jumlah_dewasa: 28,
    jumlah_anak: 5,
    jumlah_mancanegara: 6,
    total_pengunjung: 39,
    catatan_cuaca_kondisi: "Rombongan fotografer lanskap berburu matahari terbenam",
    created_at: "2026-10-19T14:40:00Z"
  },
  {
    id: "kjg-104",
    destinasi_id: "dest-kiluan",
    destinasi_nama: "Teluk Kiluan",
    user_id: "usr-kiluan-01",
    petugas_nama: "Ahmad Fauzi",
    tanggal_kunjungan: "2026-10-20",
    jumlah_dewasa: 35,
    jumlah_anak: 10,
    jumlah_mancanegara: 2,
    total_pengunjung: 47,
    catatan_cuaca_kondisi: "Kondisi laut tenang, perahu wisata beroperasi lancar",
    created_at: "2026-10-20T08:20:00Z"
  }
];

// Data Awal Transaksi Karcis Retribusi
export const INITIAL_TRANSAKSI: TransaksiRetribusi[] = [
  {
    id: "trx-201",
    nomor_karcis: "TKT-20261018-001",
    destinasi_id: "dest-kiluan",
    destinasi_nama: "Teluk Kiluan",
    user_id: "usr-kiluan-01",
    petugas_nama: "Ahmad Fauzi",
    tanggal_transaksi: "2026-10-18T09:30:00Z",
    qty_domestik: 57,
    qty_mancanegara: 4,
    total_transaksi_bruto: 1055000,
    potensi_pad_daerah: 105500, // 10%
    metode_bayar: "tunai",
    status: "lunas",
    is_simulasi: true,
    keterangan: "Tiket karcis masuk wisatawan rombongan",
    created_at: "2026-10-18T09:30:00Z"
  },
  {
    id: "trx-202",
    nomor_karcis: "TKT-20261018-002",
    destinasi_id: "dest-waylalaan",
    destinasi_nama: "Air Terjun Way Lalaan",
    user_id: "usr-waylalaan-01",
    petugas_nama: "Siti Rahma",
    tanggal_transaksi: "2026-10-18T10:15:00Z",
    qty_domestik: 115,
    qty_mancanegara: 2,
    total_transaksi_bruto: 1210000,
    potensi_pad_daerah: 181500, // 15%
    metode_bayar: "qris_simulasi",
    status: "lunas",
    is_simulasi: true,
    keterangan: "Pembayaran karcis non-tunai QRIS simulasi",
    created_at: "2026-10-18T10:15:00Z"
  },
  {
    id: "trx-203",
    nomor_karcis: "TKT-20261019-001",
    destinasi_id: "dest-gigihiu",
    destinasi_nama: "Pantai Gigi Hiu (Pegadungan)",
    user_id: "usr-gigihiu-01",
    petugas_nama: "Hendra Wijaya",
    tanggal_transaksi: "2026-10-19T14:40:00Z",
    qty_domestik: 33,
    qty_mancanegara: 6,
    total_transaksi_bruto: 1020000,
    potensi_pad_daerah: 102000, // 10%
    metode_bayar: "tunai",
    status: "lunas",
    is_simulasi: true,
    keterangan: "Tiket spot foto tebing Gigi Hiu",
    created_at: "2026-10-19T14:40:00Z"
  },
  {
    id: "trx-204",
    nomor_karcis: "TKT-20261020-001",
    destinasi_id: "dest-kiluan",
    destinasi_nama: "Teluk Kiluan",
    user_id: "usr-kiluan-01",
    petugas_nama: "Ahmad Fauzi",
    tanggal_transaksi: "2026-10-20T08:20:00Z",
    qty_domestik: 45,
    qty_mancanegara: 2,
    total_transaksi_bruto: 775000,
    potensi_pad_daerah: 77500, // 10%
    metode_bayar: "qris_simulasi",
    status: "lunas",
    is_simulasi: true,
    keterangan: "Kunjungan pagi hari kapal katir",
    created_at: "2026-10-20T08:20:00Z"
  }
];

// Helper Storage Keys
const STORAGE_KEYS = {
  CURRENT_USER: "tw_current_user",
  DESTINASI: "tw_destinasi_data",
  KUNJUNGAN: "tw_kunjungan_data",
  TRANSAKSI: "tw_transaksi_data",
};

export class WisataTrackStore {
  // 1. AUTENTIKASI & USER SESSION
  static getCurrentUser(): User {
    if (typeof window === "undefined") return DEMO_USERS[0];
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) {
      // Default: Admin Dinas
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
      return DEMO_USERS[0];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_USERS[0];
    }
  }

  static setCurrentUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  }

  static login(email: string): { success: boolean; user?: User; message?: string } {
    const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "Email tidak ditemukan. Silakan gunakan akun demo yang tersedia." };
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
    }
  }

  // 2. DATA DESTINASI
  static getDestinasiList(): Destinasi[] {
    if (typeof window === "undefined") return INITIAL_DESTINASI;
    const stored = localStorage.getItem(STORAGE_KEYS.DESTINASI);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.DESTINASI, JSON.stringify(INITIAL_DESTINASI));
      return INITIAL_DESTINASI;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_DESTINASI;
    }
  }

  static getDestinasiById(id: string): Destinasi | undefined {
    return this.getDestinasiList().find(d => d.id === id);
  }

  static saveDestinasi(destinasi: Omit<Destinasi, "id"> & { id?: string }): Destinasi {
    const list = this.getDestinasiList();
    if (destinasi.id) {
      // Update
      const index = list.findIndex(d => d.id === destinasi.id);
      if (index !== -1) {
        list[index] = { 
          ...list[index], 
          ...destinasi, 
          updated_at: new Date().toISOString() 
        } as Destinasi;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.DESTINASI, JSON.stringify(list));
        }
        return list[index];
      }
    }
    // Create new
    const newDest: Destinasi = {
      ...destinasi,
      id: generateId("dest"),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Destinasi;
    list.unshift(newDest);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.DESTINASI, JSON.stringify(list));
    }
    return newDest;
  }

  static deleteDestinasi(id: string): boolean {
    const list = this.getDestinasiList();
    const filtered = list.filter(d => d.id !== id);
    if (filtered.length !== list.length) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.DESTINASI, JSON.stringify(filtered));
      }
      return true;
    }
    return false;
  }

  // 3. DATA KUNJUNGAN
  static getKunjunganList(): Kunjungan[] {
    if (typeof window === "undefined") return INITIAL_KUNJUNGAN;
    const stored = localStorage.getItem(STORAGE_KEYS.KUNJUNGAN);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.KUNJUNGAN, JSON.stringify(INITIAL_KUNJUNGAN));
      return INITIAL_KUNJUNGAN;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_KUNJUNGAN;
    }
  }

  static addKunjungan(data: {
    destinasi_id: string;
    tanggal_kunjungan: string;
    jumlah_dewasa: number;
    jumlah_anak: number;
    jumlah_mancanegara: number;
    catatan_cuaca_kondisi?: string;
  }): Kunjungan {
    const user = this.getCurrentUser();
    const destinasi = this.getDestinasiById(data.destinasi_id);
    const list = this.getKunjunganList();
    
    const total = Number(data.jumlah_dewasa) + Number(data.jumlah_anak) + Number(data.jumlah_mancanegara);

    const newKunjungan: Kunjungan = {
      id: generateId("kjg"),
      destinasi_id: data.destinasi_id,
      destinasi_nama: destinasi?.nama_destinasi || "Destinasi",
      user_id: user.id,
      petugas_nama: user.nama,
      tanggal_kunjungan: data.tanggal_kunjungan,
      jumlah_dewasa: Number(data.jumlah_dewasa),
      jumlah_anak: Number(data.jumlah_anak),
      jumlah_mancanegara: Number(data.jumlah_mancanegara),
      total_pengunjung: total,
      catatan_cuaca_kondisi: data.catatan_cuaca_kondisi || "Normal",
      created_at: new Date().toISOString()
    };

    list.unshift(newKunjungan);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.KUNJUNGAN, JSON.stringify(list));
    }
    return newKunjungan;
  }

  // 4. DATA TRANSAKSI RETRIBUSI & TIKET
  static getTransaksiList(): TransaksiRetribusi[] {
    if (typeof window === "undefined") return INITIAL_TRANSAKSI;
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSAKSI);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.TRANSAKSI, JSON.stringify(INITIAL_TRANSAKSI));
      return INITIAL_TRANSAKSI;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TRANSAKSI;
    }
  }

  static createTransaksi(data: {
    destinasi_id: string;
    qty_domestik: number;
    qty_mancanegara: number;
    metode_bayar: TransaksiRetribusi["metode_bayar"];
    keterangan?: string;
  }): TransaksiRetribusi {
    const user = this.getCurrentUser();
    const destinasi = this.getDestinasiById(data.destinasi_id);
    if (!destinasi) throw new Error("Destinasi tidak ditemukan.");

    const hargaDomestik = destinasi.harga_tiket_domestik;
    const hargaMancanegara = destinasi.harga_tiket_mancanegara;
    const persenPAD = destinasi.persentase_retribusi_pad / 100;

    const totalBruto = (Number(data.qty_domestik) * hargaDomestik) + 
                       (Number(data.qty_mancanegara) * hargaMancanegara);
    
    // Perhitungan Potensi PAD resmi daerah sesuai PRD (tidak menyamakan seluruh bruto dengan PAD!)
    const porsiPAD = Math.round(totalBruto * persenPAD);

    const newTrx: TransaksiRetribusi = {
      id: generateId("trx"),
      nomor_karcis: generateNomorKarcis(),
      destinasi_id: data.destinasi_id,
      destinasi_nama: destinasi.nama_destinasi,
      user_id: user.id,
      petugas_nama: user.nama,
      tanggal_transaksi: new Date().toISOString(),
      qty_domestik: Number(data.qty_domestik),
      qty_mancanegara: Number(data.qty_mancanegara),
      total_transaksi_bruto: totalBruto,
      potensi_pad_daerah: porsiPAD,
      metode_bayar: data.metode_bayar,
      status: "lunas",
      is_simulasi: true, // Label simulasi akademik
      keterangan: data.keterangan || "Transaksi karcis tiket masuk",
      created_at: new Date().toISOString()
    };

    const list = this.getTransaksiList();
    list.unshift(newTrx);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TRANSAKSI, JSON.stringify(list));
    }
    return newTrx;
  }

  static updateStatusTransaksi(id: string, newStatus: TransaksiRetribusi["status"]): boolean {
    const list = this.getTransaksiList();
    const item = list.find(t => t.id === id);
    if (item) {
      item.status = newStatus;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TRANSAKSI, JSON.stringify(list));
      }
      return true;
    }
    return false;
  }

  // 5. DASHBOARD STATS AGREGAT
  static getDashboardStats(destinasiFilterId?: string | null): DashboardStats {
    const kunjungan = this.getKunjunganList();
    const transaksi = this.getTransaksiList();
    const destinasiList = this.getDestinasiList();

    // Filter berdasarkan kewenangan role atau parameter
    const user = this.getCurrentUser();
    const targetDestId = (user.role === 'petugas_loket' && user.destinasi_id) 
      ? user.destinasi_id 
      : destinasiFilterId;

    const filteredKunjungan = targetDestId 
      ? kunjungan.filter(k => k.destinasi_id === targetDestId)
      : kunjungan;

    const filteredTransaksi = targetDestId
      ? transaksi.filter(t => t.destinasi_id === targetDestId)
      : transaksi;

    const totalKunjungan = filteredKunjungan.reduce((acc, curr) => acc + curr.total_pengunjung, 0);
    const totalTransaksiBruto = filteredTransaksi
      .filter(t => t.status === "lunas")
      .reduce((acc, curr) => acc + curr.total_transaksi_bruto, 0);
    const totalEstimasiPAD = filteredTransaksi
      .filter(t => t.status === "lunas")
      .reduce((acc, curr) => acc + curr.potensi_pad_daerah, 0);

    // Hitung destinasi terpopuler
    const kunjunganPerDest: Record<string, { nama: string; total: number }> = {};
    destinasiList.forEach(d => {
      kunjunganPerDest[d.id] = { nama: d.nama_destinasi, total: 0 };
    });
    filteredKunjungan.forEach(k => {
      if (kunjunganPerDest[k.destinasi_id]) {
        kunjunganPerDest[k.destinasi_id].total += k.total_pengunjung;
      }
    });

    const destinasiTerpopuler = Object.values(kunjunganPerDest)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
      .map(item => ({ nama: item.nama, totalKunjungan: item.total }));

    // Tren harian (7 hari terakhir simulasi/aktual)
    const mapTanggal: Record<string, { kunjungan: number; pad: number }> = {};
    filteredKunjungan.forEach(k => {
      const tgl = k.tanggal_kunjungan;
      if (!mapTanggal[tgl]) mapTanggal[tgl] = { kunjungan: 0, pad: 0 };
      mapTanggal[tgl].kunjungan += k.total_pengunjung;
    });

    filteredTransaksi.filter(t => t.status === "lunas").forEach(t => {
      const tgl = t.tanggal_transaksi.split("T")[0];
      if (!mapTanggal[tgl]) mapTanggal[tgl] = { kunjungan: 0, pad: 0 };
      mapTanggal[tgl].pad += t.potensi_pad_daerah;
    });

    const trenKunjunganHarian = Object.entries(mapTanggal)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7)
      .map(([tanggal, val]) => ({
        tanggal,
        kunjungan: val.kunjungan,
        pad: val.pad
      }));

    return {
      totalKunjunganBulanIni: totalKunjungan,
      totalTransaksiBruto,
      totalEstimasiPAD,
      totalDestinasiAktif: destinasiList.filter(d => d.status === "aktif").length,
      destinasiTerpopuler,
      trenKunjunganHarian
    };
  }

  // 6. FILTER LAPORAN
  static getLaporanData(filter: FilterLaporan) {
    const user = this.getCurrentUser();
    let destinasiFilter = filter.destinasiId;
    if (user.role === 'petugas_loket' && user.destinasi_id) {
      destinasiFilter = user.destinasi_id;
    }

    const kunjungan = this.getKunjunganList().filter(k => {
      const inDateRange = (!filter.tanggalMulai || k.tanggal_kunjungan >= filter.tanggalMulai) &&
                          (!filter.tanggalSelesai || k.tanggal_kunjungan <= filter.tanggalSelesai);
      const matchDest = !destinasiFilter || k.destinasi_id === destinasiFilter;
      return inDateRange && matchDest;
    });

    const transaksi = this.getTransaksiList().filter(t => {
      const tglTrx = t.tanggal_transaksi.split("T")[0];
      const inDateRange = (!filter.tanggalMulai || tglTrx >= filter.tanggalMulai) &&
                          (!filter.tanggalSelesai || tglTrx <= filter.tanggalSelesai);
      const matchDest = !destinasiFilter || t.destinasi_id === destinasiFilter;
      const matchStatus = !filter.statusTransaksi || t.status === filter.statusTransaksi;
      return inDateRange && matchDest && matchStatus;
    });

    const totalKunjungan = kunjungan.reduce((acc, curr) => acc + curr.total_pengunjung, 0);
    const totalTransaksi = transaksi.reduce((acc, curr) => acc + curr.total_transaksi_bruto, 0);
    const totalPAD = transaksi
      .filter(t => t.status === "lunas")
      .reduce((acc, curr) => acc + curr.potensi_pad_daerah, 0);

    return {
      kunjungan,
      transaksi,
      totalKunjungan,
      totalTransaksi,
      totalPAD
    };
  }

  // 7. RESET ULANG DATA KE DEFAULT (Berguna untuk demonstrasi & sidang)
  static resetToInitialData(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.DESTINASI, JSON.stringify(INITIAL_DESTINASI));
      localStorage.setItem(STORAGE_KEYS.KUNJUNGAN, JSON.stringify(INITIAL_KUNJUNGAN));
      localStorage.setItem(STORAGE_KEYS.TRANSAKSI, JSON.stringify(INITIAL_TRANSAKSI));
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
    }
  }
}
