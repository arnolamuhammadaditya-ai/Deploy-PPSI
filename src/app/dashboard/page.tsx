"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Wallet, 
  Building2, 
  MapPin, 
  ArrowUpRight, 
  PlusCircle, 
  Receipt, 
  FileText,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { Badge } from "@/components/ui/Badge";
import { WisataTrackStore } from "@/lib/store";
import { formatRupiah, formatAngka } from "@/lib/utils";
import { DashboardStats, Destinasi, User } from "@/lib/types";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  const [selectedDestinasi, setSelectedDestinasi] = useState<string>("");

  useEffect(() => {
    const user = WisataTrackStore.getCurrentUser();
    setCurrentUser(user);
    setDestinasiList(WisataTrackStore.getDestinasiList());
    
    // Default filter destinasi
    const initialFilter = user.role === "petugas_loket" ? (user.destinasi_id || "") : "";
    setSelectedDestinasi(initialFilter);
    setStats(WisataTrackStore.getDashboardStats(initialFilter || null));
  }, []);

  const handleFilterChange = (destId: string) => {
    setSelectedDestinasi(destId);
    setStats(WisataTrackStore.getDashboardStats(destId ? destId : null));
  };

  if (!stats || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Dashboard Analitik Pariwisata
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-sm">
              Kab. Tanggamus
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitoring arus kunjungan wisatawan dan estimasi penerimaan Pendapatan Asli Daerah (PAD).
          </p>
        </div>

        {/* Action Shortcut Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/kunjungan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Catat Kunjungan</span>
          </Link>
          <Link
            href="/transaksi"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Receipt className="w-4 h-4" />
            <span>Karcis Baru</span>
          </Link>
        </div>
      </div>

      {/* Filter Destinasi (Hanya untuk Admin Dinas) */}
      {currentUser.role === "admin_dinas" && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-900">Filter Cakupan Destinasi:</span>{" "}
            Pilih destinasi spesifik atau seluruh Kabupaten Tanggamus.
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedDestinasi}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
            >
              <option value="">Semua Destinasi Se-Kabupaten (Agregat)</option>
              {destinasiList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama_destinasi} ({d.kecamatan})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Kunjungan"
          value={`${formatAngka(stats.totalKunjunganBulanIni)} org`}
          subValue="Akumulasi wisatawan tercatat"
          icon={Users}
          variant="tanggamus"
          trend={{ label: "12% bulan ini", positive: true }}
        />

        <StatCard
          title="Total Transaksi Masuk"
          value={formatRupiah(stats.totalTransaksiBruto)}
          subValue="Penerimaan bruto karcis masuk"
          icon={Wallet}
          variant="default"
        />

        <StatCard
          title="Estimasi Potensi PAD"
          value={formatRupiah(stats.totalEstimasiPAD)}
          subValue="Porsi resmi retribusi daerah Pemkab"
          icon={Building2}
          variant="warning"
          trend={{ label: "Target 10-15%", positive: true }}
        />

        <StatCard
          title="Destinasi Aktif"
          value={`${stats.totalDestinasiAktif} Lokasi`}
          subValue="Destinasi wisata siap kunjung"
          icon={MapPin}
          variant="info"
        />
      </div>

      {/* Academic / Financial Disclosure Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Kaidah Akuntansi & Ruang Lingkup PRD:
          </p>
          <p className="text-amber-800">
            Angka <strong>Potensi Retribusi PAD Daerah</strong> dihitung berdasarkan porsi tarif retribusi resmi (10% - 15% sesuai Perda/simulasi), bukan disamakan dengan total seluruh transaksi bruto yang diterima pihak pengelola. Seluruh data berlabel simulasi untuk kebutuhan akademik tugas PPSI.
          </p>
        </div>
      </div>

      {/* Charts & Top Destinations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Bar Chart: 2 Columns */}
        <div className="lg:col-span-2">
          <SimpleBarChart 
            data={stats.trenKunjunganHarian} 
            title="Tren Kunjungan Harian & Alokasi Retribusi PAD" 
          />
        </div>

        {/* Top 5 Destinations Ranking */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Destinasi Terpopuler
              </h3>
              <Badge variant="neutral" className="text-[10px]">
                Bulan Ini
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              {stats.destinasiTerpopuler.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Belum ada data kunjungan.
                </p>
              ) : (
                stats.destinasiTerpopuler.map((dest, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                        {dest.nama}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">
                      {formatAngka(dest.totalKunjungan)} <span className="font-normal text-[10px] text-slate-500">org</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link
              href="/laporan"
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Buka Rekapitulasi Laporan Lengkap</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
