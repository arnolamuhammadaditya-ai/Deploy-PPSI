"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Palmtree, ShieldCheck, Ticket, LogIn, Sparkles, CheckCircle2 } from "lucide-react";
import { WisataTrackStore, DEMO_USERS } from "@/lib/store";
import { User } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin.dinas@tanggamus.go.id");
  const [password, setPassword] = useState("admin123");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const result = WisataTrackStore.login(email);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setErrorMsg(result.message || "Email atau kata sandi tidak valid.");
    }
  };

  const handleSelectDemoUser = (user: User) => {
    setEmail(user.email);
    setPassword(user.role === "admin_dinas" ? "admin123" : "petugas123");
    WisataTrackStore.setCurrentUser(user);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-800 text-white rounded-2xl shadow-lg">
            <Palmtree className="w-8 h-8 text-emerald-300" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tanggamus WisataTrack
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi PAD Pariwisata Kabupaten Tanggamus
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Masuk ke Sistem</h2>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              PPSI 2026
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alamat Email Pengguna
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                placeholder="nama@tanggamus.go.id"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Aplikasi</span>
            </button>
          </form>

          {/* Quick Demo Access Switcher for Sidang / Presentation */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Pintasan Cepat Akun Demo (Sidang / Evaluasi):</span>
            </div>
            
            <div className="space-y-1.5">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectDemoUser(user)}
                  type="button"
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs flex items-center justify-between group"
                >
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-emerald-900 flex items-center gap-1.5">
                      {user.role === "admin_dinas" ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Ticket className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span>{user.nama}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {user.email}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-2xs">
                    Pilih
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-400">
          Tugas Mata Kuliah Proyek Pengembangan Sistem Informasi (PPSI)
        </p>
      </div>
    </div>
  );
}
