"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Receipt, 
  FileSpreadsheet, 
  ShieldCheck, 
  Palmtree, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WisataTrackStore, DEMO_USERS } from "@/lib/store";
import { User } from "@/lib/types";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(WisataTrackStore.getCurrentUser());
  }, []);

  const navItems = [
    {
      name: "Dashboard Analitik",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin_dinas", "petugas_loket"],
    },
    {
      name: "Master Destinasi",
      href: "/destinasi",
      icon: MapPin,
      roles: ["admin_dinas", "petugas_loket"],
    },
    {
      name: "Catat Kunjungan",
      href: "/kunjungan",
      icon: Users,
      roles: ["admin_dinas", "petugas_loket"],
    },
    {
      name: "Transaksi Karcis",
      href: "/transaksi",
      icon: Receipt,
      roles: ["admin_dinas", "petugas_loket"],
    },
    {
      name: "Laporan & Rekap",
      href: "/laporan",
      icon: FileSpreadsheet,
      roles: ["admin_dinas", "petugas_loket"],
    },
  ];

  const handleSwitchRole = (user: User) => {
    WisataTrackStore.setCurrentUser(user);
    setCurrentUser(user);
    window.location.reload();
  };

  const handleResetData = () => {
    if (confirm("Reset ulang data demonstrasi ke kondisi awal Kabupaten Tanggamus?")) {
      WisataTrackStore.resetToInitialData();
      window.location.reload();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-900 transition-colors"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-30 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-xl",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div>
          <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md">
              <Palmtree className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white leading-tight">
                Tanggamus
              </h1>
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase block">
                WisataTrack
              </span>
            </div>
          </div>

          {/* Active Role Indicator */}
          {currentUser && (
            <div className="mx-4 mt-4 p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {currentUser.role === "admin_dinas" ? "Akses: Admin Dinas" : "Akses: Petugas Loket"}
                </span>
              </div>
              <p className="text-xs font-semibold text-white truncate">
                {currentUser.nama}
              </p>
              {currentUser.destinasi_nama && (
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  📍 {currentUser.destinasi_nama}
                </p>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 mt-5 space-y-1">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Menu Utama
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"
                    )} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-emerald-300" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Role Switcher Demo & Reset Button */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Ganti Peran Demo (Simulasi)
            </label>
            <select
              value={currentUser?.id || ""}
              onChange={(e) => {
                const selected = DEMO_USERS.find(u => u.id === e.target.value);
                if (selected) handleSwitchRole(selected);
              }}
              className="w-full text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 outline-hidden"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.role === "admin_dinas" ? "👑 " : "🎫 "} {u.nama.split(" (")[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
              title="Reset data ke kondisi awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <Link
              href="/login"
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
