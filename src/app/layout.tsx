import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Tanggamus WisataTrack — Sistem Monitoring Kunjungan & Pendapatan Wisata",
  description: "Sistem Informasi Manajemen Kunjungan dan Monitoring Potensi Pendapatan Destinasi Wisata Kabupaten Tanggamus, Provinsi Lampung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <footer className="py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white/60">
            © 2026 Tanggamus WisataTrack • Proyek Pengembangan Sistem Informasi (PPSI) • Pemerintah Kabupaten Tanggamus
          </footer>
        </div>
      </body>
    </html>
  );
}
