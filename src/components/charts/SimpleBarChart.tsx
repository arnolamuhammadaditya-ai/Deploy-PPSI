"use client";

import React, { useState } from "react";
import { formatTanggalIndo, formatAngka, formatRupiah } from "@/lib/utils";

interface DataPoint {
  tanggal: string;
  kunjungan: number;
  pad: number;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  title?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  title = "Tren Kunjungan & Potensi Retribusi Harian" 
}) => {
  const [activeItem, setActiveItem] = useState<DataPoint | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 text-center text-slate-400 py-12">
        Belum ada data riwayat kunjungan untuk ditampilkan dalam grafik.
      </div>
    );
  }

  const maxKunjungan = Math.max(...data.map(d => d.kunjungan), 10);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan aktivitas kunjungan dan porsi retribusi PAD Tanggamus
          </p>
        </div>
        
        {/* Info Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block"></span>
            <span>Jumlah Wisatawan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-200 inline-block"></span>
            <span>Porsi Retribusi PAD</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 h-56 flex items-end gap-3 sm:gap-6 pt-6 px-2 border-b border-slate-200">
        {data.map((item, idx) => {
          const heightPercent = Math.min(100, Math.round((item.kunjungan / maxKunjungan) * 100));

          return (
            <div 
              key={idx} 
              className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer"
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {/* Tooltip Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 pointer-events-none bg-slate-900 text-white text-[11px] rounded-lg py-1.5 px-2.5 shadow-lg whitespace-nowrap">
                <p className="font-semibold">{formatTanggalIndo(item.tanggal)}</p>
                <p className="text-emerald-300">{formatAngka(item.kunjungan)} Pengunjung</p>
                <p className="text-emerald-100 font-mono text-[10px]">{formatRupiah(item.pad)} PAD</p>
              </div>

              {/* Bar Column */}
              <div className="w-full max-w-[48px] bg-slate-100 rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover:bg-emerald-50">
                <div 
                  className="w-full bg-emerald-600 group-hover:bg-emerald-700 transition-all rounded-t-md relative flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ height: `${Math.max(12, heightPercent)}%` }}
                >
                  {item.kunjungan > 0 && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.kunjungan}
                    </span>
                  )}
                </div>
              </div>

              {/* X-axis Label */}
              <div className="mt-2 text-[11px] font-medium text-slate-500 truncate w-full text-center">
                {item.tanggal.split("-").slice(1).join("/")}
              </div>
            </div>
          );
        })}
      </div>

        {/* Active Item detail strip if selected */}
        {activeItem && (
          <div className="mt-4 p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg flex items-center justify-between text-xs animate-in fade-in">
            <span className="font-semibold text-emerald-900">
              📅 {formatTanggalIndo(activeItem.tanggal)}
            </span>
            <div className="flex gap-4">
              <span className="text-slate-700">
                Total Pengunjung: <strong className="text-emerald-800">{formatAngka(activeItem.kunjungan)} orang</strong>
              </span>
              <span className="text-slate-700">
                Potensi Retribusi Daerah: <strong className="text-emerald-800 font-mono">{formatRupiah(activeItem.pad)}</strong>
              </span>
            </div>
          </div>
        )}
    </div>
  );
};
