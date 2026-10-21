"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Cookie, Lock, Mail, ShieldAlert, User, Users } from "lucide-react";
import { toast } from "sonner";
import { DataStore, INITIAL_PROFILES } from "@/lib/data-store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@dapurlebaran.id");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Find matching profile
      const found =
        INITIAL_PROFILES.find((p) => p.email.toLowerCase() === email.toLowerCase()) ||
        INITIAL_PROFILES[0];

      DataStore.setCurrentUser(found);
      toast.success(`Selamat datang kembali, ${found.nama} (${found.role})`);
      setIsLoading(false);
      router.push("/");
    }, 400);
  };

  const handleQuickSelect = (role: "owner" | "staff") => {
    const profile = role === "owner" ? INITIAL_PROFILES[0] : INITIAL_PROFILES[1];
    setEmail(profile.email);
    setPassword("password123");
    DataStore.setCurrentUser(profile);
    toast.info(`Akun demo ${profile.nama} (${profile.role}) dipilih`);
  };

  return (
    <div className="min-h-screen bg-[#FBF6EC] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo & Headline */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-[#1F6F50] text-white items-center justify-center shadow-warm-md mx-auto mb-2">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#1F6F50]">
            Dapur Lebaran
          </h1>
          <p className="text-sm text-[#7A6A5C]">
            Portal Operasional & Pencatatan Produksi Kue Lebaran
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8DFCC] shadow-warm-md space-y-6">
          {/* Quick Demo Switcher */}
          <div className="bg-[#FBF6EC] border border-[#E8DFCC] rounded-xl p-3">
            <p className="text-xs font-semibold text-[#7A6A5C] mb-2 text-center">
              Pilih Akun Cepat (Demo):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect("owner")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  email === INITIAL_PROFILES[0].email
                    ? "bg-[#1F6F50] text-white border-[#1F6F50]"
                    : "bg-white text-[#3B2A1E] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Owner (Akses Penuh)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("staff")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  email === INITIAL_PROFILES[1].email
                    ? "bg-[#1F6F50] text-white border-[#1F6F50]"
                    : "bg-white text-[#3B2A1E] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Staff (Dapur)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3B2A1E]">Email Karyawan</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nama@dapurlebaran.id"
                  className="w-full h-12 pl-10 pr-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-2 focus:ring-[#1F6F50]/20 bg-white text-[#3B2A1E] outline-none transition-all"
                />
                <Mail className="w-5 h-5 text-[#7A6A5C] absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3B2A1E]">Kata Sandi</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-2 focus:ring-[#1F6F50]/20 bg-white text-[#3B2A1E] outline-none transition-all"
                />
                <Lock className="w-5 h-5 text-[#7A6A5C] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-semibold text-sm shadow-warm-sm transition-all active:scale-98 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? "Memproses..." : "Masuk ke Sistem"}
            </button>
          </form>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-[#7A6A5C] flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#C8962E]" />
              <span>Akses internal dilindungi Supabase Row Level Security</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-center text-[#7A6A5C]">
          © 2026 Dapur Lebaran • Khusus Operasional Dapur & Usaha
        </p>
      </div>
    </div>
  );
}
