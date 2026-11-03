import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format Angka ke Rupiah Indonesia (IDR)
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

// Format Angka Standar (Pemisah Ribuan)
export function formatAngka(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num || 0);
}

// Format Tanggal Bahasa Indonesia (contoh: 20 Oktober 2026)
export function formatTanggalIndo(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

// Format Tanggal & Jam Bahasa Indonesia (contoh: 20 Okt 2026, 14:30 WIB)
export function formatWaktuIndo(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d) + " WIB";
  } catch {
    return dateStr;
  }
}

// Generate ID Unik sederhana untuk entitas
export function generateId(prefix: string = "id"): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${randomStr}`;
}

// Generate Nomor Karcis/Kupon Otomatis (Contoh: TKT-20261020-049)
export function generateNomorKarcis(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(100 + Math.random() * 900);
  return `TKT-${yyyy}${mm}${dd}-${rand}`;
}
