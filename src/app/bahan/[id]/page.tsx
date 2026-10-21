"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  Lock,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataStore } from "@/lib/data-store";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { Bahan, Profile } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function BahanDetailContent({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [bahan, setBahan] = useState<Bahan | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [jumlahTambah, setJumlahTambah] = useState<number>(5);
  const [hargaBeli, setHargaBeli] = useState<number>(0);

  useEffect(() => {
    const item = DataStore.getBahanById(id);
    if (!item) {
      router.push("/bahan");
      return;
    }
    setBahan(item);
    setHargaBeli(item.harga_beli_terakhir || 0);
    setCurrentUser(DataStore.getCurrentUser());
  }, [id, router]);

  if (!bahan) return null;

  const isOwner = currentUser?.role === "owner";
  const isKritis = bahan.stok < bahan.stok_minimum * 0.5;
  const isWaspada = bahan.stok < bahan.stok_minimum && !isKritis;

  const handleBelanja = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = DataStore.catatBelanjaBahan(
        bahan.id,
        jumlahTambah,
        isOwner ? hargaBeli : undefined
      );
      setBahan({ ...updated });
      toast.success(
        `Berhasil menambah stok ${bahan.nama} (+${jumlahTambah} ${bahan.satuan})`
      );
    } catch (err: any) {
      toast.error(err.message || "Gagal mencatat belanja");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 pb-12">
        <Link
          href="/bahan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F50] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Inventaris Bahan</span>
        </Link>

        {/* Card Detail */}
        <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-[#E8DFCC] pb-4">
            <div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-2 ${
                  isKritis
                    ? "bg-[#FBEBE9] text-[#B93A2E]"
                    : isWaspada
                    ? "bg-[#FDF6E2] text-[#9E7000]"
                    : "bg-[#EAF5EE] text-[#2E8B57]"
                }`}
              >
                {isKritis ? "STATUS: KRITIS" : isWaspada ? "STATUS: WASPADA" : "STATUS: AMAN"}
              </span>
              <h1 className="font-heading text-2xl font-bold text-[#3B2A1E]">
                {bahan.nama}
              </h1>
              <p className="text-xs text-[#7A6A5C] mt-1">
                Terakhir diperbarui: {formatTanggal(bahan.updated_at)}
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-[#1F6F50]/10 text-[#1F6F50] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC]">
              <span className="text-xs text-[#7A6A5C] block">Stok Saat Ini</span>
              <span className="text-2xl font-bold text-[#1F6F50] font-heading block mt-1">
                {bahan.stok} {bahan.satuan}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC]">
              <span className="text-xs text-[#7A6A5C] block">Stok Minimum</span>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading block mt-1">
                {bahan.stok_minimum} {bahan.satuan}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC] col-span-2 sm:col-span-1">
              <span className="text-xs text-[#7A6A5C] block">Harga Beli Terakhir</span>
              {isOwner ? (
                <span className="text-lg font-bold text-[#3B2A1E] block mt-1">
                  {bahan.harga_beli_terakhir
                    ? `${formatRupiah(bahan.harga_beli_terakhir)}`
                    : "-"}
                </span>
              ) : (
                <span className="text-sm font-semibold text-[#7A6A5C] flex items-center gap-1 font-mono mt-2">
                  <Lock className="w-3.5 h-3.5 text-[#7A6A5C]" />
                  <span>[Privat Owner]</span>
                </span>
              )}
            </div>
          </div>

          {/* Form Tambah Belanja Cepat */}
          <div className="p-5 rounded-2xl border border-[#E8DFCC] bg-[#FBF6EC]/50 space-y-4">
            <h3 className="font-heading text-sm font-bold text-[#3B2A1E] flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#1F6F50]" />
              <span>Catat Belanja / Tambah Stok</span>
            </h3>

            <form onSubmit={handleBelanja} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Jumlah Tambahan ({bahan.satuan})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={jumlahTambah}
                    onChange={(e) => setJumlahTambah(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                  />
                </div>

                {isOwner && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3B2A1E]">
                      Harga Beli Satuan (Rp)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={hargaBeli}
                      onChange={(e) => setHargaBeli(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Tambahan Stok</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function BahanDetailPage(props: PageProps) {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-[#7A6A5C]">Memuat data bahan...</div>}>
      <BahanDetailContent {...props} />
    </React.Suspense>
  );
}
