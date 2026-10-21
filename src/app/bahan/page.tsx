"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  X,
  Lock,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataStore } from "@/lib/data-store";
import { useBahanList, useCurrentUser } from "@/lib/use-store";
import { formatRupiah } from "@/lib/utils";
import { Bahan } from "@/types";

export default function BahanPage() {
  const bahanList = useBahanList();
  const currentUser = useCurrentUser();

  // Modals
  const [isBelanjaModalOpen, setIsBelanjaModalOpen] = useState(false);
  const [selectedBahanForBelanja, setSelectedBahanForBelanja] = useState<Bahan | null>(null);
  const [jumlahBelanja, setJumlahBelanja] = useState<number>(5);
  const [hargaBeliBelanja, setHargaBeliBelanja] = useState<number>(0);

  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedBahanForAdjust, setSelectedBahanForAdjust] = useState<Bahan | null>(null);
  const [stokBaru, setStokBaru] = useState<number>(0);

  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [tambahForm, setTambahForm] = useState({
    nama: "",
    stokAwal: 5,
    satuan: "kg",
    stokMinimum: 5,
    hargaBeli: 0,
  });

  const [deleteTarget, setDeleteTarget] = useState<Bahan | null>(null);

  const isOwner = currentUser.role === "owner";

  // Quick Action Handlers
  const handleOpenBelanja = (b: Bahan) => {
    setSelectedBahanForBelanja(b);
    setJumlahBelanja(5);
    setHargaBeliBelanja(b.harga_beli_terakhir || 100000);
    setIsBelanjaModalOpen(true);
  };

  const handleSaveBelanja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBahanForBelanja) return;
    try {
      DataStore.catatBelanjaBahan(
        selectedBahanForBelanja.id,
        jumlahBelanja,
        isOwner ? hargaBeliBelanja : undefined
      );
      toast.success(
        `Berhasil menambah stok ${selectedBahanForBelanja.nama} (+${jumlahBelanja} ${selectedBahanForBelanja.satuan})`
      );
      setIsBelanjaModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Gagal mencatat belanja bahan");
    }
  };

  const handleOpenAdjust = (b: Bahan) => {
    setSelectedBahanForAdjust(b);
    setStokBaru(b.stok);
    setIsAdjustModalOpen(true);
  };

  const handleSaveAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBahanForAdjust) return;
    try {
      DataStore.sesuaikanStokBahan(selectedBahanForAdjust.id, stokBaru);
      toast.success(
        `Stok ${selectedBahanForAdjust.nama} disesuaikan menjadi ${stokBaru} ${selectedBahanForAdjust.satuan}`
      );
      setIsAdjustModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Gagal menyesuaikan stok");
    }
  };

  const handleSaveTambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tambahForm.nama.trim()) {
      toast.error("Nama bahan wajib diisi");
      return;
    }
    try {
      DataStore.addBahan(
        tambahForm.nama,
        tambahForm.stokAwal,
        tambahForm.satuan,
        tambahForm.stokMinimum,
        isOwner ? tambahForm.hargaBeli : undefined
      );
      toast.success(`Bahan ${tambahForm.nama} berhasil ditambahkan`);
      setIsTambahModalOpen(false);
      setTambahForm({ nama: "", stokAwal: 5, satuan: "kg", stokMinimum: 5, hargaBeli: 0 });
    } catch (err: any) {
      toast.error(err.message || "Gagal menambah bahan");
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    try {
      DataStore.deleteBahan(deleteTarget.id);
      toast.success(`Bahan ${deleteTarget.nama} berhasil dihapus`);
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus bahan");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
              Inventaris Bahan Baku
            </h1>
            <p className="text-sm text-[#7A6A5C] mt-0.5">
              Monitoring stok real-time, pencatatan belanja bahan dan penyesuaian timbangan dapur.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTambahModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>+ Tambah Bahan Baru</span>
          </button>
        </div>

        {/* 4 Bento Stat Cards (Membentang Penuh) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Total Komoditas
              </span>
              <span className="text-2xl font-bold text-[#1F6F50] font-heading mt-1 block">
                {bahanList.length} Bahan
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1F6F50]/10 text-[#1F6F50] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Stok Kritis / Kurang
              </span>
              <span className="text-2xl font-bold text-[#B93A2E] font-heading mt-1 block">
                {bahanList.filter((b) => b.stok < b.stok_minimum).length} Bahan
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#B93A2E]/10 text-[#B93A2E] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Stok Aman
              </span>
              <span className="text-2xl font-bold text-[#2E8B57] font-heading mt-1 block">
                {bahanList.filter((b) => b.stok >= b.stok_minimum).length} Bahan
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Nilai Inventaris
              </span>
              {isOwner ? (
                <span className="text-xl font-bold text-[#C8962E] font-heading mt-1 block">
                  {formatRupiah(
                    bahanList.reduce(
                      (acc, b) => acc + (b.harga_beli_terakhir || 0) * (b.stok || 0),
                      0
                    )
                  )}
                </span>
              ) : (
                <span className="text-sm font-bold text-[#7A6A5C] font-mono mt-1 block">
                  [Privat Owner]
                </span>
              )}
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C8962E]/10 text-[#C8962E] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Bahan Cards Grid (Full Width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {bahanList.map((b) => {
            const isKritis = b.stok < b.stok_minimum * 0.5;
            const isWaspada = b.stok < b.stok_minimum && !isKritis;
            const pct = Math.min(100, Math.round((b.stok / (b.stok_minimum * 2)) * 100));

            return (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border-2 p-5 shadow-warm-sm flex flex-col justify-between transition-colors ${
                  isKritis
                    ? "border-[#F1BFBA]"
                    : isWaspada
                    ? "border-[#F4DB96]"
                    : "border-[#E8DFCC]"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {isKritis ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FBEBE9] text-[#B93A2E] inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>KRITIS</span>
                        </span>
                      ) : isWaspada ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF6E2] text-[#9E7000] inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>WASPADA</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E8B57] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>STOK AMAN</span>
                        </span>
                      )}
                      <h2 className="font-heading text-lg font-bold text-[#3B2A1E] mt-2">
                        {b.nama}
                      </h2>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isKritis
                          ? "bg-[#FBEBE9] text-[#B93A2E]"
                          : isWaspada
                          ? "bg-[#FDF6E2] text-[#9E7000]"
                          : "bg-[#EAF5EE] text-[#1F6F50]"
                      }`}
                    >
                      <Package className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stock Gauge */}
                  <div className="my-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span
                        className={`text-2xl font-bold font-heading ${
                          isKritis
                            ? "text-[#B93A2E]"
                            : isWaspada
                            ? "text-[#D99A00]"
                            : "text-[#1F6F50]"
                        }`}
                      >
                        {b.stok} {b.satuan}
                      </span>
                      <span className="text-xs text-[#7A6A5C]">
                        Min. Aman: {b.stok_minimum} {b.satuan}
                      </span>
                    </div>

                    <div className="w-full bg-[#E8DFCC]/50 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isKritis
                            ? "bg-[#B93A2E]"
                            : isWaspada
                            ? "bg-[#D99A00]"
                            : "bg-[#1F6F50]"
                        }`}
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Price Info (Owner protected) */}
                  <div className="pt-3 border-t border-[#E8DFCC] flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[#7A6A5C] block">Harga Beli Terakhir:</span>
                      {isOwner ? (
                        <span className="font-bold text-[#3B2A1E]">
                          {b.harga_beli_terakhir
                            ? `${formatRupiah(b.harga_beli_terakhir)} / ${b.satuan}`
                            : "-"}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-[#7A6A5C] flex items-center gap-1 font-mono">
                          <Lock className="w-3 h-3 text-[#7A6A5C]" />
                          <span>[Privat Owner]</span>
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/bahan/${b.id}`}
                      className="font-semibold text-[#1F6F50] hover:underline"
                    >
                      Detail →
                    </Link>
                  </div>
                </div>

                {/* Actions Button */}
                <div className="pt-3 border-t border-[#E8DFCC] flex items-center justify-between gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleOpenBelanja(b)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Catat Belanja</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenAdjust(b)}
                    className="py-2 px-3 rounded-xl border border-[#E8DFCC] hover:bg-[#FBF6EC] text-[#3B2A1E] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Penyesuaian Manual"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sesuaikan</span>
                  </button>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(b)}
                      className="p-2 rounded-xl text-[#7A6A5C] hover:text-[#B93A2E] hover:bg-[#FBEBE9] transition-colors"
                      title="Hapus Bahan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Catat Belanja */}
        {isBelanjaModalOpen && selectedBahanForBelanja && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
                  Catat Belanja Bahan
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBelanjaModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-[#FBF6EC] rounded-xl text-xs text-[#3B2A1E]">
                <span className="font-semibold">{selectedBahanForBelanja.nama}</span>
                <span className="text-[#7A6A5C] block">
                  Stok saat ini: {selectedBahanForBelanja.stok} {selectedBahanForBelanja.satuan}
                </span>
              </div>

              <form onSubmit={handleSaveBelanja} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Jumlah Tambahan ({selectedBahanForBelanja.satuan})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={jumlahBelanja}
                    onChange={(e) => setJumlahBelanja(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                  />
                  <p className="text-[11px] text-[#2E8B57]">
                    Stok setelah belanja: {Number(selectedBahanForBelanja.stok) + Number(jumlahBelanja)}{" "}
                    {selectedBahanForBelanja.satuan}
                  </p>
                </div>

                {isOwner && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3B2A1E]">
                      Harga Beli per {selectedBahanForBelanja.satuan} (Rp)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={hargaBeliBelanja}
                      onChange={(e) => setHargaBeliBelanja(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
                  <button
                    type="button"
                    onClick={() => setIsBelanjaModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFCC] text-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1F6F50] text-white text-sm font-semibold"
                  >
                    Simpan Belanja
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Penyesuaian Stok Manual */}
        {isAdjustModalOpen && selectedBahanForAdjust && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
                  Penyesuaian Stok Manual
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-[#FBF6EC] rounded-xl text-xs text-[#3B2A1E]">
                <span className="font-semibold">{selectedBahanForAdjust.nama}</span>
                <span className="text-[#7A6A5C] block">
                  Stok tercatat di sistem: {selectedBahanForAdjust.stok}{" "}
                  {selectedBahanForAdjust.satuan}
                </span>
              </div>

              <form onSubmit={handleSaveAdjust} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Stok Fisik Aktual Dapur ({selectedBahanForAdjust.satuan})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={stokBaru}
                    onChange={(e) => setStokBaru(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                  />
                  <p className="text-[11px] text-[#7A6A5C]">
                    Gunakan saat stock opname berkala atau setelah produksi adonan.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
                  <button
                    type="button"
                    onClick={() => setIsAdjustModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFCC] text-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1F6F50] text-white text-sm font-semibold"
                  >
                    Simpan Penyesuaian
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Tambah Bahan Baru */}
        {isTambahModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">Tambah Bahan Baru</h3>
                <button
                  type="button"
                  onClick={() => setIsTambahModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTambah} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Nama Bahan Baku <span className="text-[#B93A2E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Susu Bubuk Full Cream"
                    value={tambahForm.nama}
                    onChange={(e) => setTambahForm({ ...tambahForm, nama: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3B2A1E]">Stok Awal</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={tambahForm.stokAwal}
                      onChange={(e) =>
                        setTambahForm({ ...tambahForm, stokAwal: Number(e.target.value) })
                      }
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3B2A1E]">Satuan</label>
                    <select
                      value={tambahForm.satuan}
                      onChange={(e) => setTambahForm({ ...tambahForm, satuan: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white"
                    >
                      <option value="kg">kg (Kilogram)</option>
                      <option value="gram">gram</option>
                      <option value="kaleng">kaleng</option>
                      <option value="butir">butir</option>
                      <option value="liter">liter</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3B2A1E]">Stok Minimum Aman</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={tambahForm.stokMinimum}
                      onChange={(e) =>
                        setTambahForm({ ...tambahForm, stokMinimum: Number(e.target.value) })
                      }
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                    />
                  </div>
                  {isOwner && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3B2A1E]">Harga Beli (Rp)</label>
                      <input
                        type="number"
                        step="500"
                        value={tambahForm.hargaBeli}
                        onChange={(e) =>
                          setTambahForm({ ...tambahForm, hargaBeli: Number(e.target.value) })
                        }
                        className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                      />
                    </div>
                  )}
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
                    Tambah Bahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Dialog */}
        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Hapus Bahan Baku?"
          description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama}" dari inventaris? Data yang dihapus tidak dapat dipulihkan.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AppLayout>
  );
}
