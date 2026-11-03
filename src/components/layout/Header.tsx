"use client";

import React, { useState, useEffect } from "react";
import { formatTanggalIndo } from "@/lib/utils";
import { WisataTrackStore } from "@/lib/store";
import { User } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [todayStr, setTodayStr] = useState<string>("");

  useEffect(() => {
    setCurrentUser(WisataTrackStore.getCurrentUser());
    const now = new Date();
    setTodayStr(formatTanggalIndo(now.toISOString()));
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3 pl-12 lg:pl-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">
              Kabupaten Tanggamus, Lampung
            </h2>
            <Badge variant="simulation" className="text-[10px] py-0 px-2 font-mono">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              Mode Simulasi Akademik
            </Badge>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block">
            Sistem Informasi Manajemen Kunjungan & Monitoring PAD Pariwisata
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
          <span>{todayStr || "20 Oktober 2026"}</span>
        </div>

        {/* User Badge */}
        {currentUser && (
          <div className="flex items-center gap-2 text-right">
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                {currentUser.nama.split(" (")[0]}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                {currentUser.role === "admin_dinas" ? "Dinas Pariwisata" : currentUser.destinasi_nama || "Petugas Loket"}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.nama.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
