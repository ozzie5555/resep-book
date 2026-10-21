"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Cookie,
  ShieldCheck,
  Database,
  WifiOff,
  Eye,
  EyeOff,
  ArrowRight,
  BadgePercent,
  Calendar,
  Lock,
  Mail,
  Quote,
  Sparkles,
  Key,
  BadgeCheck,
  Flame,
  ChefHat,
  ShoppingBag,
  Store,
} from "lucide-react";
import { toast } from "sonner";
import { DataStore, INITIAL_PROFILES } from "@/lib/data-store";
import { Profile } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@dapurlebaran.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"owner" | "baker" | "cashier">("owner");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      id: "owner",
      title: "Owner / Admin",
      name: "Bu Nur Laila",
      desc: "Finansial & Margin HPP",
      email: "owner@dapurlebaran.id",
      password: "password123",
      role: "owner" as const,
      icon: Store,
    },
    {
      id: "baker",
      title: "Staff & Baker",
      name: "Siti Aminah",
      desc: "Resep & Stok Bahan",
      email: "siti.aminah@dapurlebaran.id",
      password: "password123",
      role: "staff" as const,
      icon: ChefHat,
    },
    {
      id: "cashier",
      title: "Kasir & Kurir",
      name: "Budi Santoso",
      desc: "Invoice & Tagih WA",
      email: "staff@dapurlebaran.id",
      password: "password123",
      role: "staff" as const,
      icon: ShoppingBag,
    },
  ];

  const handleSelectRole = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.id as any);
    setEmail(acc.email);
    setPassword(acc.password);
    toast.info(`Profil dipilih: ${acc.name} (${acc.title})`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Determine user profile based on email or role
      let userProfile: Profile;
      if (email.toLowerCase().includes("owner")) {
        userProfile = INITIAL_PROFILES[0];
      } else if (email.toLowerCase().includes("siti")) {
        userProfile = {
          id: "u_siti_aminah",
          nama: "Siti Aminah",
          email: "siti.aminah@dapurlebaran.id",
          role: "staff",
          aktif: true,
          created_at: new Date().toISOString(),
        };
      } else {
        userProfile = INITIAL_PROFILES[1];
      }

      DataStore.setCurrentUser(userProfile);
      toast.success(`Autentikasi Berhasil! Selamat datang, ${userProfile.nama}`);
      setIsLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3B2A1E] flex flex-col justify-between selection:bg-[#1F6F50] selection:text-white">
      {/* Top Slim System Utility Strip */}
      <header className="w-full bg-white border-b border-[#E8DFCC] py-2 px-4 md:px-8 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#7A6A5C]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#1F6F50] animate-pulse shrink-0" />
            <span className="text-[#3B2A1E] font-medium">Portal Produksi Internal Lebaran 1447H</span>
            <span className="hidden sm:inline text-[#E8DFCC]">•</span>
            <span className="hidden sm:inline text-[#7A6A5C]">
              Terhubung ke Supabase RLS Cluster Jakarta (JKT-01)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FDFBF7] text-[#1F6F50] text-[11px] font-semibold border border-[#E8DFCC]">
              <Lock className="w-3 h-3 text-[#1F6F50]" />
              <span>Akses Internal Terenkripsi</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Showcase Container (Split View) */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 md:p-10">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-sm border border-[#E8DFCC] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          {/* KOLOM KIRI: Visual Showcase Operasional Lebaran (5/12) */}
          <section className="lg:col-span-5 relative bg-[#1F6F50] text-white flex flex-col justify-between p-8 sm:p-10 overflow-hidden">
            {/* Ambient Background Glow & Festive Accent Texture */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#17583F] blur-3xl opacity-70 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C8962E] blur-3xl opacity-30 pointer-events-none" />
            <div
              className="absolute inset-0 z-0 opacity-15 mix-blend-overlay pointer-events-none bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=1200&auto=format&fit=crop&q=80')",
              }}
            />

            {/* Top Header & Badges */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                  <Cookie className="w-6 h-6 text-[#FFDEA7]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#A5F3CC]">
                    Dapur Lebaran Studio
                  </span>
                  <h1 className="font-heading text-lg font-bold tracking-tight text-white leading-tight">
                    Operasional Nastar & Kue Kering
                  </h1>
                </div>
              </div>

              {/* Feature Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 backdrop-blur-xs text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFDEA7]" />
                  <span>Internal Operational Only</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 backdrop-blur-xs text-white">
                  <Database className="w-3.5 h-3.5 text-[#8AD6B0]" />
                  <span>Supabase RLS Active</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 backdrop-blur-xs text-white">
                  <WifiOff className="w-3.5 h-3.5 text-[#FFDEA7]" />
                  <span>PWA Offline Ready</span>
                </span>
              </div>
            </div>

            {/* Middle Content / Value & Live Status Cards */}
            <div className="relative z-10 my-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[#FFDEA7] text-xs font-bold tracking-wide uppercase">
                  Sistem Terintegrasi Musim Raya
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Sistem Operasi Produksi & Penjualan Kue Kering Idul Fitri 1447H
                </h2>
                <p className="text-sm text-white/85 pt-1 leading-relaxed">
                  Platform hulu ke hilir untuk penimbangan butter Wijsman, penjadwalan kloter oven, pencetakan struk pesanan hampers, hingga kontrol keuangan HPP toples.
                </p>
              </div>

              {/* Live Production Status Bento Card */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFDEA7] animate-ping" />
                    <span className="text-xs font-bold text-white">Status Dapur Live</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFDEA7]/20 text-[#FFDEA7] border border-[#FFDEA7]/30">
                    Shift Pagi Aktif
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                  <div>
                    <span className="text-[11px] text-white/70 block">Batch Oven Aktif</span>
                    <span className="text-sm font-bold text-white">#18 Nastar Wijsman</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-white/70 block">Kapasitas Harian</span>
                    <span className="text-sm font-bold text-[#FFDEA7]">840 / 1.200 Toples</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#C8962E] h-full rounded-full transition-all duration-500"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Quote / Motivation */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#FFDEA7] shrink-0 mt-0.5" />
              <p className="text-xs text-white/85 italic leading-relaxed">
                &quot;Mendukung target 1.200 toples kue kering berkualitas untuk Idul Fitri yang penuh berkah, rapi dalam pembukuan, amanah dalam timbangan rasa.&quot;
              </p>
            </div>
          </section>

          {/* KOLOM KANAN: Panel Form Autentikasi Internal (7/12) */}
          <section className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1F6F50]/15 text-[#1F6F50] flex items-center justify-center font-bold">
                    <Cookie className="w-4 h-4 text-[#1F6F50]" />
                  </div>
                  <span className="font-heading text-lg font-bold text-[#1F6F50]">
                    Dapur Lebaran
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1F6F50]/10 text-[#1F6F50]">
                    Internal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#7A6A5C]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ramadhan / Syawal 1447H</span>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-[#3B2A1E] tracking-tight">
                  Masuk ke Sistem Operasi Dapur
                </h2>
                <p className="text-sm text-[#7A6A5C] mt-1">
                  Gunakan akun terdaftar staf produksi, kasir pengiriman, atau akun owner superadmin Bu Nur Laila.
                </p>
              </div>

              {/* Quick Demo Switch / Role Selector Pills */}
              <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E8DFCC] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7A6A5C]">
                  <span className="flex items-center gap-1.5 font-bold text-[#1F6F50]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pilih Akses Cepat (Quick Role Demo):</span>
                  </span>
                  <span className="text-[11px] text-[#7A6A5C] hidden sm:inline">
                    Klik untuk autofill akun
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {demoAccounts.map((acc) => {
                    const Icon = acc.icon;
                    const isSelected = selectedRole === acc.id;

                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleSelectRole(acc)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "border-[#1F6F50] bg-white shadow-xs ring-1 ring-[#1F6F50]"
                            : "border-[#E8DFCC] bg-white/70 hover:bg-white text-[#3B2A1E]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? "text-[#1F6F50]" : "text-[#3B2A1E]"
                            }`}
                          >
                            {acc.title}
                          </span>
                          <Icon
                            className={`w-3.5 h-3.5 ${
                              isSelected ? "text-[#C8962E]" : "text-[#7A6A5C]"
                            }`}
                          />
                        </div>
                        <div className="text-xs font-semibold text-[#3B2A1E] truncate">
                          {acc.name}
                        </div>
                        <div className="text-[10px] text-[#7A6A5C] leading-tight truncate mt-0.5">
                          {acc.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Authentication Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email / Username Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#3B2A1E]" htmlFor="email">
                    Email / ID Staf Dapur
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A6A5C]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@dapurlebaran.id"
                      required
                      className="block w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8DFCC] bg-white text-[#3B2A1E] placeholder:text-[#7A6A5C]/60 focus:outline-none focus:border-[#1F6F50] focus:ring-2 focus:ring-[#1F6F50]/15 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Password Input with Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#3B2A1E]" htmlFor="password">
                      Kata Sandi Akses
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        toast.info(
                          "Silakan hubungi Bu Nur Laila (Superadmin) di meja kasir pusat untuk mereset kunci PIN/Kata Sandi akun Anda."
                        )
                      }
                      className="text-xs font-medium text-[#1F6F50] hover:underline"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A6A5C]">
                      <Key className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      required
                      className="block w-full h-12 pl-10 pr-12 rounded-xl border border-[#E8DFCC] bg-white text-[#3B2A1E] placeholder:text-[#7A6A5C]/60 focus:outline-none focus:border-[#1F6F50] focus:ring-2 focus:ring-[#1F6F50]/15 transition-all text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title="Lihat / Sembunyikan Kata Sandi"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7A6A5C] hover:text-[#3B2A1E] transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Session Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1F6F50] border-[#E8DFCC] focus:ring-[#1F6F50]"
                    />
                    <span className="text-xs text-[#3B2A1E]">
                      Ingat sesi di perangkat dapur ini (Tablet / Oven PC)
                    </span>
                  </label>
                </div>

                {/* Action Button CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition-all"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Memverifikasi RLS & Sesi...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Dapur Lebaran</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Row-Level Security Notice */}
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8DFCC] flex items-start gap-2.5">
                <BadgeCheck className="w-4 h-4 text-[#1F6F50] shrink-0 mt-0.5" />
                <div className="text-xs text-[#7A6A5C] leading-relaxed">
                  <strong className="text-[#3B2A1E] font-semibold">
                    Row-Level Security (RLS) Aktif.
                  </strong>{" "}
                  Hak akses data finansial, daftar resep rahasia Wijsman, dan rekap omzet terisolasi otomatis berdasarkan role profil Anda.
                </div>
              </div>
            </div>

            {/* Footer / App Versioning */}
            <div className="pt-6 mt-6 border-t border-[#E8DFCC] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6A5C] gap-2">
              <div>Dapur Lebaran v2.4 PROD • Hak Cipta Terlindungi</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F6F50]" />
                <span>Khusus Penggunaan Internal Toko</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
