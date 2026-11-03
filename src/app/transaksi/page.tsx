"use client";

import React, { useState, useEffect } from "react";
import { 
  Receipt, 
  Plus, 
  Search, 
  CheckCircle2, 
  Printer, 
  CreditCard, 
  AlertCircle, 
  Building2,
  DollarSign
} from "lucide-react";
import { WisataTrackStore } from "@/lib/store";
import { TransaksiRetribusi, Destinasi, User, MetodePembayaran, StatusTransaksi } from "@/lib/types";
import { formatRupiah, formatTanggalIndo, formatWaktuIndo, formatAngka } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function TransaksiPage() {
  const [transaksiList, setTransaksiList] = useState<TransaksiRetribusi[]>([]);
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptModalItem, setReceiptModalItem] = useState<TransaksiRetribusi | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    destinasi_id: "",
    qty_domestik: 2,
    qty_mancanegara: 0,
    metode_bayar: "tunai" as MetodePembayaran,
    keterangan: "Karcis tiket masuk wisatawan",
  });

  useEffect(() => {
    const user = WisataTrackStore.getCurrentUser();
    setCurrentUser(user);
    const dests = WisataTrackStore.getDestinasiList();
    setDestinasiList(dests);
    
    const defaultDestId = user.destinasi_id || (dests.length > 0 ? dests[0].id : "");
    setFormData(prev => ({ ...prev, destinasi_id: defaultDestId }));

    loadTransaksi();
  }, []);

  const loadTransaksi = () => {
    setTransaksiList(WisataTrackStore.getTransaksiList());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedDestinasiObj = destinasiList.find(d => d.id === formData.destinasi_id);
  const hargaDomestik = selectedDestinasiObj?.harga_tiket_domestik || 0;
  const hargaMancanegara = selectedDestinasiObj?.harga_tiket_mancanegara || 0;
  const persenPAD = (selectedDestinasiObj?.persentase_retribusi_pad || 10) / 100;

  const totalBrutoKalkulasi = (Number(formData.qty_domestik) * hargaDomestik) + 
                             (Number(formData.qty_mancanegara) * hargaMancanegara);
  const porsiPADKalkulasi = Math.round(totalBrutoKalkulasi * persenPAD);

  const handleOpenModal = () => {
    const user = WisataTrackStore.getCurrentUser();
    const defaultDestId = user.destinasi_id || (destinasiList.length > 0 ? destinasiList[0].id : "");
    setFormData({
      destinasi_id: defaultDestId,
      qty_domestik: 2,
      qty_mancanegara: 0,
      metode_bayar: "tunai",
      keterangan: "Pembayaran tiket masuk",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(formData.qty_domestik) + Number(formData.qty_mancanegara) <= 0) {
      alert("Minimal harus memesan 1 karcis tiket.");
      return;
    }

    try {
      const created = WisataTrackStore.createTransaksi(formData);
      setIsModalOpen(false);
      loadTransaksi();
      showToast(`Karcis ${created.nomor_karcis} berhasil diterbitkan!`);
    } catch (err: any) {
      alert(err.message || "Gagal membuat transaksi.");
    }
  };

  const handleUpdateStatus = (trx: TransaksiRetribusi, newStatus: StatusTransaksi) => {
    WisataTrackStore.updateStatusTransaksi(trx.id, newStatus);
    loadTransaksi();
    showToast(`Status transaksi diubah menjadi ${newStatus}.`);
  };

  const filteredList = transaksiList.filter(t => {
    const matchSearch = t.nomor_karcis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (t.destinasi_nama || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (t.petugas_nama || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    
    let matchRole = true;
    if (currentUser?.role === "petugas_loket" && currentUser.destinasi_id) {
      matchRole = t.destinasi_id === currentUser.destinasi_id;
    }

    return matchSearch && matchStatus && matchRole;
  });

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
            Transaksi Karcis & Retribusi Daerah
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pencatatan karcis masuk dan pemisahan porsi Pendapatan Asli Daerah (PAD) Kabupaten Tanggamus.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Terbitkan Karcis Baru</span>
        </button>
      </div>

      {/* Financial Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <Building2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-emerald-900">
            Mekanisme Bagi Hasil & Retribusi Daerah Pemkab Tanggamus:
          </p>
          <p className="text-emerald-800 mt-0.5">
            Setiap penerbitan karcis memisahkan secara eksplisit antara <strong>Penerimaan Bruto</strong> dan <strong>Alokasi Retribusi PAD</strong> (disetor ke Kas Daerah sesuai ketentuan perda pariwisata).
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nomor karcis (e.g. TKT-202610...), destinasi, atau nama petugas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
        >
          <option value="all">Semua Status Transaksi</option>
          <option value="lunas">Status: Lunas</option>
          <option value="pending">Status: Menunggu Pembayaran</option>
          <option value="dibatalkan">Status: Dibatalkan</option>
        </select>
      </div>

      {/* Tabel Transaksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nomor Karcis</th>
                <th className="py-3.5 px-4">Waktu Transaksi</th>
                <th className="py-3.5 px-4">Destinasi & Petugas</th>
                <th className="py-3.5 px-4 text-center">Jumlah Tiket</th>
                <th className="py-3.5 px-4">Penerimaan Bruto</th>
                <th className="py-3.5 px-4">Porsi Retribusi PAD</th>
                <th className="py-3.5 px-4">Metode Bayar</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-slate-400">
                    Belum ada transaksi karcis retribusi yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredList.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {trx.nomor_karcis}
                      <span className="block text-[10px] text-purple-700 font-sans font-medium">
                        • Simulasi Akademik
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {formatWaktuIndo(trx.tanggal_transaksi)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{trx.destinasi_nama}</div>
                      <div className="text-[11px] text-slate-500">{trx.petugas_nama}</div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-medium">
                      <span className="text-slate-800">{trx.qty_domestik + trx.qty_mancanegara} lembar</span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        ({trx.qty_domestik} lok / {trx.qty_mancanegara} asg)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {formatRupiah(trx.total_transaksi_bruto)}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 bg-emerald-50/40">
                      {formatRupiah(trx.potensi_pad_daerah)}
                    </td>

                    <td className="py-3.5 px-4 capitalize text-slate-700 font-medium">
                      {trx.metode_bayar.replace("_", " ")}
                    </td>

                    <td className="py-3.5 px-4">
                      {trx.status === "lunas" && <Badge variant="success">Lunas</Badge>}
                      {trx.status === "pending" && <Badge variant="warning">Pending</Badge>}
                      {trx.status === "dibatalkan" && <Badge variant="danger">Batal</Badge>}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setReceiptModalItem(trx)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Lihat & Cetak Struk Karcis"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        {currentUser?.role === "admin_dinas" && trx.status === "lunas" && (
                          <button
                            onClick={() => handleUpdateStatus(trx, "dibatalkan")}
                            className="text-[10px] text-rose-600 hover:underline px-1.5 py-0.5"
                            title="Batalkan transaksi ini"
                          >
                            Batalkan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Terbitkan Karcis Baru */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Penerbitan Karcis / Tiket Masuk Baru"
        subtitle="Sistem Loket Elektronik Destinasi Wisata Tanggamus"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Destinasi Wisata <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.destinasi_id}
              disabled={currentUser?.role === "petugas_loket"}
              onChange={(e) => setFormData({ ...formData, destinasi_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium disabled:opacity-75 disabled:bg-slate-100"
            >
              {destinasiList.map(d => (
                <option key={d.id} value={d.id}>
                  {d.nama_destinasi} (Dom: {formatRupiah(d.harga_tiket_domestik)} | Asing: {formatRupiah(d.harga_tiket_mancanegara)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Karcis Domestik (@ {formatRupiah(hargaDomestik)})
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.qty_domestik}
                onChange={(e) => setFormData({ ...formData, qty_domestik: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden text-center font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Karcis Mancanegara (@ {formatRupiah(hargaMancanegara)})
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.qty_mancanegara}
                onChange={(e) => setFormData({ ...formData, qty_mancanegara: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden text-center font-bold text-sm"
              />
            </div>
          </div>

          {/* Breakdown Kalkulasi Keuangan */}
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="flex justify-between items-center text-slate-700">
              <span>Total Karcis Terbit:</span>
              <span className="font-semibold">{Number(formData.qty_domestik) + Number(formData.qty_mancanegara)} Lembar</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 font-semibold text-sm">
              <span>Penerimaan Bruto Kasir:</span>
              <span className="font-mono font-bold text-slate-900">{formatRupiah(totalBrutoKalkulasi)}</span>
            </div>
            <div className="pt-2 border-t border-emerald-200/60 flex justify-between items-center text-emerald-900 text-xs">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                Porsi Retribusi PAD Tanggamus ({selectedDestinasiObj?.persentase_retribusi_pad || 10}%):
              </span>
              <span className="font-mono font-bold text-emerald-800">{formatRupiah(porsiPADKalkulasi)}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Metode Pembayaran
            </label>
            <select
              value={formData.metode_bayar}
              onChange={(e) => setFormData({ ...formData, metode_bayar: e.target.value as MetodePembayaran })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden capitalize"
            >
              <option value="tunai">Uang Tunai (Cash di Loket)</option>
              <option value="qris_simulasi">QRIS Dinamis (Simulasi Akademik)</option>
              <option value="transfer_bank_simulasi">Transfer Bank Daerah (Simulasi)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Keterangan Tambahan
            </label>
            <input
              type="text"
              placeholder="Contoh: Rombongan bus pariwisata, tiket wisata terusan"
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
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
              Cetak Karcis & Simpan
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Preview Struk Karcis */}
      <Modal
        isOpen={!!receiptModalItem}
        onClose={() => setReceiptModalItem(null)}
        title="Struk Karcis Retribusi Masuk"
        subtitle="Dokumen bukti bayar resmi destinasi wisata Tanggamus"
        maxWidth="sm"
      >
        {receiptModalItem && (
          <div className="space-y-4 text-xs font-mono">
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <h4 className="font-bold text-slate-900 text-sm">PEMERINTAH KABUPATEN TANGGAMUS</h4>
              <p className="text-[11px] text-slate-600 font-sans">Dinas Pariwisata & Kebudayaan</p>
              <div className="mt-2 py-1 bg-slate-100 rounded text-slate-800 font-bold">
                {receiptModalItem.destinasi_nama}
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">No. Karcis:</span>
                <span className="font-bold">{receiptModalItem.nomor_karcis}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu:</span>
                <span>{formatWaktuIndo(receiptModalItem.tanggal_transaksi)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Petugas:</span>
                <span>{receiptModalItem.petugas_nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode:</span>
                <span className="uppercase">{receiptModalItem.metode_bayar.replace("_", " ")}</span>
              </div>
            </div>

            <div className="py-2 border-y border-dashed border-slate-300 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Tiket Domestik x{receiptModalItem.qty_domestik}</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Tiket Mancanegara x{receiptModalItem.qty_mancanegara}</span>
                <span>-</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-slate-200">
                <span>TOTAL BAYAR:</span>
                <span className="text-slate-900">{formatRupiah(receiptModalItem.total_transaksi_bruto)}</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 text-[10px]">
              <div className="flex justify-between font-bold text-emerald-900">
                <span>Porsi Retribusi PAD:</span>
                <span>{formatRupiah(receiptModalItem.potensi_pad_daerah)}</span>
              </div>
              <span className="text-[9px] text-emerald-700 block mt-0.5">
                Alokasi Pembangunan Daerah Kab. Tanggamus
              </span>
            </div>

            <div className="text-center pt-2 text-[10px] text-slate-400 font-sans">
              Terima kasih atas kunjungan Anda. Harap jaga kebersihan alam Tanggamus.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold font-sans flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Struk Karcis</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
