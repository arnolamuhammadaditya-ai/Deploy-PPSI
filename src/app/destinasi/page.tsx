"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  MapPin, 
  Edit, 
  Trash2, 
  Ticket, 
  Filter, 
  Percent, 
  Users,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { WisataTrackStore } from "@/lib/store";
import { Destinasi, User, KategoriWisata, StatusDestinasi } from "@/lib/types";
import { formatRupiah, formatAngka } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function DestinasiPage() {
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestinasi, setEditingDestinasi] = useState<Destinasi | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    kode_destinasi: "",
    nama_destinasi: "",
    kategori: "bahari" as KategoriWisata,
    kecamatan: "",
    desa_pekon: "",
    deskripsi: "",
    harga_tiket_domestik: 15000,
    harga_tiket_mancanegara: 50000,
    persentase_retribusi_pad: 10,
    kuota_harian_maksimal: 500,
    status: "aktif" as StatusDestinasi,
  });

  useEffect(() => {
    setCurrentUser(WisataTrackStore.getCurrentUser());
    loadDestinasi();
  }, []);

  const loadDestinasi = () => {
    setDestinasiList(WisataTrackStore.getDestinasiList());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingDestinasi(null);
    setFormData({
      kode_destinasi: `TGM-${Math.floor(100 + Math.random() * 900)}`,
      nama_destinasi: "",
      kategori: "bahari",
      kecamatan: "Kota Agung",
      desa_pekon: "Pekon ",
      deskripsi: "",
      harga_tiket_domestik: 10000,
      harga_tiket_mancanegara: 30000,
      persentase_retribusi_pad: 10,
      kuota_harian_maksimal: 500,
      status: "aktif",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dest: Destinasi) => {
    setEditingDestinasi(dest);
    setFormData({
      kode_destinasi: dest.kode_destinasi,
      nama_destinasi: dest.nama_destinasi,
      kategori: dest.kategori,
      kecamatan: dest.kecamatan,
      desa_pekon: dest.desa_pekon || "",
      deskripsi: dest.deskripsi || "",
      harga_tiket_domestik: dest.harga_tiket_domestik,
      harga_tiket_mancanegara: dest.harga_tiket_mancanegara,
      persentase_retribusi_pad: dest.persentase_retribusi_pad,
      kuota_harian_maksimal: dest.kuota_harian_maksimal,
      status: dest.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_destinasi.trim()) {
      alert("Nama destinasi tidak boleh kosong.");
      return;
    }

    WisataTrackStore.saveDestinasi({
      id: editingDestinasi ? editingDestinasi.id : undefined,
      ...formData,
      harga_tiket_domestik: Number(formData.harga_tiket_domestik),
      harga_tiket_mancanegara: Number(formData.harga_tiket_mancanegara),
      persentase_retribusi_pad: Number(formData.persentase_retribusi_pad),
      kuota_harian_maksimal: Number(formData.kuota_harian_maksimal),
    });

    setIsModalOpen(false);
    loadDestinasi();
    showToast(editingDestinasi ? "Destinasi berhasil diperbarui!" : "Destinasi baru berhasil ditambahkan!");
  };

  const handleDelete = (dest: Destinasi) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data destinasi "${dest.nama_destinasi}"?`)) {
      WisataTrackStore.deleteDestinasi(dest.id);
      loadDestinasi();
      showToast("Destinasi berhasil dihapus.");
    }
  };

  // Filtering
  const filteredList = destinasiList.filter((d) => {
    const matchSearch =
      d.nama_destinasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.kode_destinasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === "all" || d.kategori === categoryFilter;
    return matchSearch && matchCategory;
  });

  const getStatusBadge = (status: StatusDestinasi) => {
    switch (status) {
      case "aktif":
        return <Badge variant="success">Aktif Siap Kunjung</Badge>;
      case "pemeliharaan":
        return <Badge variant="warning">Dalam Pemeliharaan</Badge>;
      case "tutup_sementara":
        return <Badge variant="danger">Tutup Sementara</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Master Data Destinasi Wisata
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola objek wisata Kabupaten Tanggamus, tarif retribusi tiket, dan kuota pengunjung.
          </p>
        </div>

        {currentUser?.role === "admin_dinas" && (
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Destinasi Baru</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama destinasi, kecamatan (e.g. Kelumbayan, Kota Agung)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
          >
            <option value="all">Semua Kategori</option>
            <option value="bahari">Wisata Bahari (Pantai/Laut)</option>
            <option value="air_terjun">Air Terjun</option>
            <option value="alam_pegunungan">Pegunungan / Pendakian</option>
            <option value="agrowisata">Agrowisata / Rekreasi</option>
          </select>
        </div>
      </div>

      {/* Destinations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Destinasi & Lokasi</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Tarif Tiket Masuk</th>
                <th className="py-3.5 px-4">Alokasi PAD</th>
                <th className="py-3.5 px-4">Kuota / Hari</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    Tidak ada data destinasi wisata yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((dest) => (
                  <tr key={dest.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {dest.nama_destinasi}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Kec. {dest.kecamatan}</span>
                        {dest.desa_pekon && <span>• {dest.desa_pekon}</span>}
                      </div>
                      <span className="inline-block mt-1 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {dest.kode_destinasi}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 capitalize font-medium text-slate-700">
                      {dest.kategori.replace("_", " ")}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        Domestik: <span className="font-mono text-emerald-800">{formatRupiah(dest.harga_tiket_domestik)}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Asing: <span className="font-mono">{formatRupiah(dest.harga_tiket_mancanegara)}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 font-mono">
                        {dest.persentase_retribusi_pad}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Kas Pemda Tanggamus
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800">
                        {formatAngka(dest.kuota_harian_maksimal)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">wisatawan</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(dest.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {currentUser?.role === "admin_dinas" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(dest)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Ubah data destinasi"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dest)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus destinasi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Hanya Baca</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Destinasi */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDestinasi ? "Ubah Data Destinasi Wisata" : "Tambah Destinasi Wisata Baru"}
        subtitle="Master data objek wisata Kabupaten Tanggamus, Lampung"
        maxWidth="xl"
      >
        <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kode Destinasi
              </label>
              <input
                type="text"
                required
                value={formData.kode_destinasi}
                onChange={(e) => setFormData({ ...formData, kode_destinasi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kategori Wisata
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value as KategoriWisata })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden capitalize"
              >
                <option value="bahari">Wisata Bahari / Pantai</option>
                <option value="air_terjun">Air Terjun</option>
                <option value="alam_pegunungan">Alam / Pegunungan</option>
                <option value="agrowisata">Agrowisata / Rekreasi</option>
                <option value="budaya_sejarah">Budaya / Sejarah</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama Objek Wisata <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Teluk Kiluan, Air Terjun Way Lalaan"
              value={formData.nama_destinasi}
              onChange={(e) => setFormData({ ...formData, nama_destinasi: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kecamatan di Tanggamus <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Kelumbayan, Kota Agung, Gisting"
                value={formData.kecamatan}
                onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Desa / Pekon
              </label>
              <input
                type="text"
                placeholder="Contoh: Pekon Kiluan Negeri"
                value={formData.desa_pekon}
                onChange={(e) => setFormData({ ...formData, desa_pekon: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tiket Domestik (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                required
                value={formData.harga_tiket_domestik}
                onChange={(e) => setFormData({ ...formData, harga_tiket_domestik: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tiket Asing (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                required
                value={formData.harga_tiket_mancanegara}
                onChange={(e) => setFormData({ ...formData, harga_tiket_mancanegara: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alokasi PAD (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={formData.persentase_retribusi_pad}
                onChange={(e) => setFormData({ ...formData, persentase_retribusi_pad: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kuota Maksimal Harian
              </label>
              <input
                type="number"
                min="50"
                required
                value={formData.kuota_harian_maksimal}
                onChange={(e) => setFormData({ ...formData, kuota_harian_maksimal: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Status Operasional
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusDestinasi })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
              >
                <option value="aktif">Aktif Siap Kunjung</option>
                <option value="pemeliharaan">Dalam Pemeliharaan</option>
                <option value="tutup_sementara">Tutup Sementara</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Deskripsi & Daya Tarik
            </label>
            <textarea
              rows={2}
              placeholder="Deskripsi keunggulan destinasi..."
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
            >
              {editingDestinasi ? "Simpan Perubahan" : "Tambahkan Destinasi"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
