"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Calendar, 
  MapPin, 
  CloudSun, 
  Search, 
  CheckCircle2, 
  UserCheck 
} from "lucide-react";
import { WisataTrackStore } from "@/lib/store";
import { Kunjungan, Destinasi, User } from "@/lib/types";
import { formatTanggalIndo, formatAngka } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

export default function KunjunganPage() {
  const [kunjunganList, setKunjunganList] = useState<Kunjungan[]>([]);
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [destinasiFilter, setDestinasiFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Kunjungan State
  const [formData, setFormData] = useState({
    destinasi_id: "",
    tanggal_kunjungan: new Date().toISOString().split("T")[0],
    jumlah_dewasa: 10,
    jumlah_anak: 2,
    jumlah_mancanegara: 0,
    catatan_cuaca_kondisi: "Cerah, kondisi kondusif",
  });

  useEffect(() => {
    const user = WisataTrackStore.getCurrentUser();
    setCurrentUser(user);
    const dests = WisataTrackStore.getDestinasiList();
    setDestinasiList(dests);
    
    // Inisialisasi destinasi default form
    const defaultDestId = user.destinasi_id || (dests.length > 0 ? dests[0].id : "");
    setFormData(prev => ({ ...prev, destinasi_id: defaultDestId }));
    
    loadKunjungan();
  }, []);

  const loadKunjungan = () => {
    setKunjunganList(WisataTrackStore.getKunjunganList());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenModal = () => {
    const user = WisataTrackStore.getCurrentUser();
    const defaultDestId = user.destinasi_id || (destinasiList.length > 0 ? destinasiList[0].id : "");
    setFormData({
      destinasi_id: defaultDestId,
      tanggal_kunjungan: new Date().toISOString().split("T")[0],
      jumlah_dewasa: 15,
      jumlah_anak: 5,
      jumlah_mancanegara: 0,
      catatan_cuaca_kondisi: "Cerah, arus wisatawan lancar",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(formData.jumlah_dewasa) + Number(formData.jumlah_anak) + Number(formData.jumlah_mancanegara);
    if (total <= 0) {
      alert("Jumlah pengunjung minimal harus 1 orang.");
      return;
    }

    WisataTrackStore.addKunjungan(formData);
    setIsModalOpen(false);
    loadKunjungan();
    showToast("Pencatatan kunjungan baru berhasil disimpan ke sistem!");
  };

  // Filter Kunjungan
  const filteredList = kunjunganList.filter(k => {
    const matchSearch = (k.destinasi_nama || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (k.catatan_cuaca_kondisi || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (k.petugas_nama || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchDest = true;
    if (currentUser?.role === "petugas_loket" && currentUser.destinasi_id) {
      matchDest = k.destinasi_id === currentUser.destinasi_id;
    } else if (destinasiFilter) {
      matchDest = k.destinasi_id === destinasiFilter;
    }

    return matchSearch && matchDest;
  });

  const totalPengunjungForm = Number(formData.jumlah_dewasa) + Number(formData.jumlah_anak) + Number(formData.jumlah_mancanegara);

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
            Pencatatan Kunjungan Wisatawan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Log harian arus kedatangan wisatawan per destinasi objek wisata di Tanggamus.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Input Kunjungan Baru</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari berdasarkan destinasi, kondisi cuaca, atau nama petugas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
          />
        </div>

        {currentUser?.role === "admin_dinas" && (
          <div className="sm:w-64">
            <select
              value={destinasiFilter}
              onChange={(e) => setDestinasiFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
            >
              <option value="">Semua Objek Wisata</option>
              {destinasiList.map(d => (
                <option key={d.id} value={d.id}>{d.nama_destinasi}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tabel Kunjungan */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Tanggal Kunjungan</th>
                <th className="py-3.5 px-4">Destinasi Wisata</th>
                <th className="py-3.5 px-4">Rincian Wisatawan</th>
                <th className="py-3.5 px-4 text-center">Total Pengunjung</th>
                <th className="py-3.5 px-4">Catatan Kondisi / Cuaca</th>
                <th className="py-3.5 px-4">Petugas Pencatat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Belum ada data kunjungan wisatawan yang tercatat.
                  </td>
                </tr>
              ) : (
                filteredList.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{formatTanggalIndo(k.tanggal_kunjungan)}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        {k.destinasi_nama}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px] text-slate-600">
                        <span>Dewasa: <strong className="text-slate-800">{k.jumlah_dewasa}</strong></span> •{" "}
                        <span>Anak: <strong className="text-slate-800">{k.jumlah_anak}</strong></span> •{" "}
                        <span>Asing: <strong className="text-slate-800">{k.jumlah_mancanegara}</strong></span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                        {formatAngka(k.total_pengunjung)} org
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CloudSun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="italic">{k.catatan_cuaca_kondisi || "Kondusif"}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{k.petugas_nama || "Petugas Lapangan"}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Input Kunjungan */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Form Input Kunjungan Wisatawan"
        subtitle="Pencatatan real-time arus masuk pengunjung destinasi"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Destinasi Wisata Tanggamus <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.destinasi_id}
              disabled={currentUser?.role === "petugas_loket"}
              onChange={(e) => setFormData({ ...formData, destinasi_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium disabled:opacity-75 disabled:bg-slate-100"
            >
              {destinasiList.map(d => (
                <option key={d.id} value={d.id}>
                  {d.nama_destinasi} ({d.kecamatan})
                </option>
              ))}
            </select>
            {currentUser?.role === "petugas_loket" && (
              <p className="text-[10px] text-slate-500 mt-1">
                Terkunci untuk lokasi tugas operasional Anda.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tanggal Kunjungan
            </label>
            <input
              type="date"
              required
              value={formData.tanggal_kunjungan}
              onChange={(e) => setFormData({ ...formData, tanggal_kunjungan: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 block text-xs">
              Komposisi Kategori Wisatawan:
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Dewasa (Lokal)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.jumlah_dewasa}
                  onChange={(e) => setFormData({ ...formData, jumlah_dewasa: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Anak-anak (Lokal)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.jumlah_anak}
                  onChange={(e) => setFormData({ ...formData, jumlah_anak: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Mancanegara (Asing)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.jumlah_mancanegara}
                  onChange={(e) => setFormData({ ...formData, jumlah_mancanegara: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>
            </div>

            {/* Total Kalkulasi */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Total Akumulasi:</span>
              <span className="font-bold text-emerald-800 text-sm font-mono">
                {totalPengunjungForm} Orang Pengunjung
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Catatan Kondisi Cuaca / Lapangan
            </label>
            <input
              type="text"
              placeholder="Contoh: Ombak tenang di Teluk Kiluan, debit air Way Lalaan jernih"
              value={formData.catatan_cuaca_kondisi}
              onChange={(e) => setFormData({ ...formData, catatan_cuaca_kondisi: e.target.value })}
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
              Simpan Pencatatan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
