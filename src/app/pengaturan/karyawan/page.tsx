"use client";

import React, { useState } from "react";
import {
  Plus,
  Mail,
  Shield,
  KeyRound,
  Power,
  Lock,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser, useProfilesList } from "@/lib/use-store";
import { formatTanggal } from "@/lib/utils";
import { Profile, UserRole } from "@/types";

export default function KelolaKaryawanPage() {
  const profiles = useProfilesList();
  const currentUser = useCurrentUser();

  // Modal Tambah Karyawan
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("staff");

  const isOwner = currentUser.role === "owner";

  if (!isOwner) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FBEBE9] text-[#B93A2E] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-xl font-bold text-[#3B2A1E]">
            Akses Terbatas Khusus Pemilik Toko
          </h2>
          <p className="text-sm text-[#7A6A5C] leading-relaxed">
            Staf dapur tidak memiliki izin untuk mengelola akun karyawan atau mengatur hak akses.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => DataStore.switchRole("owner")}
              className="px-5 py-2.5 rounded-xl bg-[#1F6F50] text-white text-xs font-semibold"
            >
              Beralih ke Akun Owner (Demo)
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const handleToggleAktif = (p: Profile) => {
    if (p.id === currentUser?.id) {
      toast.error("Anda tidak dapat menonaktifkan akun sendiri");
      return;
    }
    DataStore.toggleKaryawanAktif(p.id);
    toast.success(
      `Status akun ${p.nama} berhasil diubah menjadi ${p.aktif ? "Nonaktif" : "Aktif"}`
    );
  };

  const handleResetSandi = (p: Profile) => {
    toast.success(
      `Instruksi reset kata sandi telah dikirimkan ke email ${p.email}!`
    );
  };

  const handleTambahKaryawan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim()) {
      toast.error("Nama dan email wajib diisi");
      return;
    }
    try {
      DataStore.addKaryawan(nama, email, role);
      toast.success(`Karyawan baru ${nama} berhasil ditambahkan!`);
      setIsTambahModalOpen(false);
      setNama("");
      setEmail("");
      setRole("staff");
    } catch (err: any) {
      toast.error(err.message || "Gagal menambah karyawan");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
                Kelola Akun Karyawan
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1F6F50]/15 text-[#1F6F50]">
                Owner Only
              </span>
            </div>
            <p className="text-sm text-[#7A6A5C]">
              Atur hak akses staf produksi kue dan pantau akun internal dapur.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTambahModalOpen(true)}
            className="h-11 px-4 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>+ Tambah Karyawan</span>
          </button>
        </div>

        {/* Info Box RLS */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8DFCC] shadow-warm-sm flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#1F6F50] shrink-0 mt-0.5" />
          <div className="text-xs text-[#7A6A5C] space-y-1">
            <p className="font-semibold text-[#3B2A1E]">
              Aturan Hak Akses Peran Supabase RLS:
            </p>
            <p>
              • <strong>Owner:</strong> Akses penuh semua modul (omzet, harga beli bahan, ubah formulasi resep, hapus data).
            </p>
            <p>
              • <strong>Staff:</strong> Operasional dapur (lihat resep, catat belanja bahan, catat penjualan, lihat pelanggan). Tidak bisa lihat omzet/harga beli, hanya boleh ubah penjualan miliknya di hari yang sama.
            </p>
          </div>
        </div>

        {/* Employees Cards List */}
        <div className="space-y-3">
          {profiles.map((p) => {
            const isMe = p.id === currentUser?.id;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#1F6F50] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1F6F50]/10 text-[#1F6F50] flex items-center justify-center font-heading font-bold text-base shrink-0">
                    {p.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-base font-bold text-[#3B2A1E]">
                        {p.nama}
                      </h2>
                      {isMe && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F6F50]/10 text-[#1F6F50]">
                          Anda
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          p.role === "owner"
                            ? "bg-[#C8962E]/15 text-[#C8962E] border border-[#C8962E]/30"
                            : "bg-[#1F6F50]/15 text-[#1F6F50] border border-[#1F6F50]/30"
                        }`}
                      >
                        {p.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6A5C] flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{p.email}</span>
                    </p>
                    <p className="text-[11px] text-[#7A6A5C] mt-0.5">
                      Status:{" "}
                      <strong className={p.aktif ? "text-[#2E8B57]" : "text-[#B93A2E]"}>
                        {p.aktif ? "Aktif" : "Nonaktif"}
                      </strong>{" "}
                      • Dibuat: {formatTanggal(p.created_at)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => handleResetSandi(p)}
                    className="h-10 px-3 rounded-xl border border-[#E8DFCC] hover:bg-[#FBF6EC] text-xs font-semibold text-[#3B2A1E] flex items-center gap-1.5 transition-colors"
                    title="Kirim instruksi reset kata sandi"
                  >
                    <KeyRound className="w-4 h-4 text-[#C8962E]" />
                    <span>Reset Sandi</span>
                  </button>

                  {!isMe && (
                    <button
                      type="button"
                      onClick={() => handleToggleAktif(p)}
                      className={`h-10 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        p.aktif
                          ? "bg-[#FBEBE9] hover:bg-[#B93A2E] text-[#B93A2E] hover:text-white border border-[#F1BFBA]"
                          : "bg-[#EAF5EE] hover:bg-[#2E8B57] text-[#2E8B57] hover:text-white border border-[#B8E2C8]"
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      <span>{p.aktif ? "Nonaktifkan" : "Aktifkan"}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Tambah Karyawan */}
        {isTambahModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
                  Tambah Karyawan Dapur
                </h3>
                <button
                  type="button"
                  onClick={() => setIsTambahModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleTambahKaryawan} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Nama Lengkap <span className="text-[#B93A2E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Siti Aisyah"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Email Login <span className="text-[#B93A2E]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@dapurlebaran.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">Peran & Hak Akses</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white font-medium"
                  >
                    <option value="staff">Staff (Operasional Dapur & Kasir)</option>
                    <option value="owner">Owner (Akses Penuh Keuangan & Resep)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
                  <button
                    type="button"
                    onClick={() => setIsTambahModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFCC] text-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1F6F50] text-white text-sm font-semibold"
                  >
                    Simpan Karyawan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
