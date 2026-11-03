"use client";

import React, { useState, useEffect } from "react";
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Calendar, 
  Filter, 
  Building2, 
  Users, 
  Receipt,
  Palmtree
} from "lucide-react";
import { WisataTrackStore } from "@/lib/store";
import { Destinasi, User, FilterLaporan } from "@/lib/types";
import { formatRupiah, formatAngka, formatTanggalIndo } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default function LaporanPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  
  // Filter state
  const [filter, setFilter] = useState<FilterLaporan>({
    tanggalMulai: "2026-10-01",
    tanggalSelesai: "2026-10-31",
    destinasiId: "",
    statusTransaksi: "lunas"
  });

  const [laporanResult, setLaporanResult] = useState<{
    kunjungan: any[];
    transaksi: any[];
    totalKunjungan: number;
    totalTransaksi: number;
    totalPAD: number;
  }>({
    kunjungan: [],
    transaksi: [],
    totalKunjungan: 0,
    totalTransaksi: 0,
    totalPAD: 0
  });

  useEffect(() => {
    const user = WisataTrackStore.getCurrentUser();
    setCurrentUser(user);
    const dests = WisataTrackStore.getDestinasiList();
    setDestinasiList(dests);
    
    const initialDest = user.role === "petugas_loket" ? (user.destinasi_id || "") : "";
    const updatedFilter = { ...filter, destinasiId: initialDest };
    setFilter(updatedFilter);
    setLaporanResult(WisataTrackStore.getLaporanData(updatedFilter));
  }, []);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLaporanResult(WisataTrackStore.getLaporanData(filter));
  };

  const handleExportCSV = () => {
    const rows = [
      ["LAPORAN REKAPITULASI PENERIMAAN RETRIBUSI & KUNJUNGAN WISATA KABUPATEN TANGGAMUS"],
      ["Periode:", `${filter.tanggalMulai} s.d ${filter.tanggalSelesai}`],
      ["Status Data:", "Simulasi Akademik PPSI"],
      [],
      ["DATA TRANSAKSI KARCIS & POTENSI RETRIBUSI PAD"],
      ["No. Karcis", "Tanggal", "Destinasi", "Wisatawan Domestik", "Wisatawan Asing", "Total Bruto (Rp)", "Retribusi PAD Pemda (Rp)", "Metode Bayar", "Status"],
      ...laporanResult.transaksi.map(t => [
        t.nomor_karcis,
        t.tanggal_transaksi.split("T")[0],
        t.destinasi_nama,
        t.qty_domestik,
        t.qty_mancanegara,
        t.total_transaksi_bruto,
        t.potensi_pad_daerah,
        t.metode_bayar,
        t.status
      ]),
      [],
      ["TOTAL AKUMULASI PENDAPATAN BRUTO", laporanResult.totalTransaksi],
      ["TOTAL AKUMULASI POTENSI RETRIBUSI PAD TANGGAMUS", laporanResult.totalPAD],
      ["TOTAL SELURUH PENGUNJUNG TERCATAT", laporanResult.totalKunjungan]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + 
      rows.map(e => e.map(item => `"${item}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_WisataTrack_Tanggamus_${filter.tanggalMulai}_sd_${filter.tanggalSelesai}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedDestObj = destinasiList.find(d => d.id === filter.destinasiId);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 no-print">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Laporan & Rekapitulasi Data
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Rekapitulasi volume kunjungan dan realisasi potensi penerimaan retribusi PAD Tanggamus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Ekspor CSV / Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen Resmi</span>
          </button>
        </div>
      </div>

      {/* Filter Box (Hidden on Print) */}
      <form onSubmit={handleApplyFilter} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4 no-print text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-xs border-b border-slate-100 pb-2">
          <Filter className="w-4 h-4 text-emerald-700" />
          <span>Filter Periode & Destinasi Laporan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={filter.tanggalMulai}
              onChange={(e) => setFilter({ ...filter, tanggalMulai: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Tanggal Selesai
            </label>
            <input
              type="date"
              value={filter.tanggalSelesai}
              onChange={(e) => setFilter({ ...filter, tanggalSelesai: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Destinasi
            </label>
            <select
              value={filter.destinasiId || ""}
              disabled={currentUser?.role === "petugas_loket"}
              onChange={(e) => setFilter({ ...filter, destinasiId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden disabled:opacity-75"
            >
              <option value="">Semua Destinasi Se-Kabupaten</option>
              {destinasiList.map(d => (
                <option key={d.id} value={d.id}>{d.nama_destinasi}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </form>

      {/* Official Print Header (Only visible on Print) */}
      <div className="hidden print-only text-center mb-6 border-b-2 border-slate-900 pb-4">
        <h2 className="text-xl font-bold uppercase text-slate-900">
          PEMERINTAH KABUPATEN TANGGAMUS
        </h2>
        <h3 className="text-base font-semibold text-slate-800 uppercase">
          DINAS PARIWISATA DAN KEBUDAYAAN
        </h3>
        <p className="text-xs text-slate-600">
          Kompleks Perkantoran Pemkab Tanggamus, Jl. Samudra No. 01, Kota Agung, Lampung 35384
        </p>
        <p className="text-xs font-bold text-slate-900 mt-2">
          REKAPITULASI KUNJUNGAN DAN PENERIMAAN RETRIBUSI PARIWISATA DAERAH
        </p>
        <p className="text-xs text-slate-600">
          Periode: {formatTanggalIndo(filter.tanggalMulai)} s.d. {formatTanggalIndo(filter.tanggalSelesai)} | Destinasi: {selectedDestObj ? selectedDestObj.nama_destinasi : "Seluruh Kabupaten Tanggamus"}
        </p>
      </div>

      {/* Summary KPI Cards for Filtered Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Pengunjung</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {formatAngka(laporanResult.totalKunjungan)} <span className="text-xs font-normal text-slate-500">orang</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Berdasarkan filter periode</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Penerimaan Bruto Karcis</span>
            <Receipt className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {formatRupiah(laporanResult.totalTransaksi)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Total bruto transaksi</span>
        </div>

        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase">Potensi Retribusi PAD</span>
            <Building2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-800 mt-2 font-mono">
            {formatRupiah(laporanResult.totalPAD)}
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">Bagian Kas Daerah Pemkab Tanggamus</span>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">
            Rincian Transaksi & Retribusi Terverifikasi
          </h3>
          <Badge variant="simulation" className="text-[10px]">
            Data Laporan Akademik
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">No. Karcis</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Destinasi</th>
                <th className="py-3 px-4 text-center">Domestik</th>
                <th className="py-3 px-4 text-center">Asing</th>
                <th className="py-3 px-4">Penerimaan Bruto</th>
                <th className="py-3 px-4">Porsi Retribusi PAD</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {laporanResult.transaksi.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    Tidak ada transaksi pada filter periode ini.
                  </td>
                </tr>
              ) : (
                laporanResult.transaksi.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {t.nomor_karcis}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {t.tanggal_transaksi.split("T")[0]}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {t.destinasi_nama}
                    </td>
                    <td className="py-3 px-4 text-center">{t.qty_domestik}</td>
                    <td className="py-3 px-4 text-center">{t.qty_mancanegara}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {formatRupiah(t.total_transaksi_bruto)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      {formatRupiah(t.potensi_pad_daerah)}
                    </td>
                    <td className="py-3 px-4">
                      {t.status === "lunas" ? (
                        <Badge variant="success">Lunas</Badge>
                      ) : (
                        <Badge variant="warning">{t.status}</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Total Row */}
            {laporanResult.transaksi.length > 0 && (
              <tfoot>
                <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-300 text-slate-900">
                  <td colSpan={5} className="py-3 px-4 text-right uppercase">
                    TOTAL KESELURUHAN:
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-900">
                    {formatRupiah(laporanResult.totalTransaksi)}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-800">
                    {formatRupiah(laporanResult.totalPAD)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Signature Section on Print */}
      <div className="hidden print-only pt-8 flex justify-between text-xs text-slate-800">
        <div>
          <p>Mengetahui,</p>
          <p className="font-bold mt-1">Kepala Dinas Pariwisata Kab. Tanggamus</p>
          <div className="h-16"></div>
          <p className="font-bold underline">Drs. H. M. ZULFIKAR, M.Si</p>
          <p>NIP. 19740512 199903 1 002</p>
        </div>
        <div className="text-right">
          <p>Kota Agung, {formatTanggalIndo(new Date().toISOString())}</p>
          <p className="font-bold mt-1">Petugas Pengelola Data</p>
          <div className="h-16"></div>
          <p className="font-bold underline">{currentUser?.nama || "Budi Santoso, S.Kom"}</p>
          <p>NIP. 19880914 201201 1 005</p>
        </div>
      </div>
    </div>
  );
}
