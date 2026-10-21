"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ChefHat,
  Scale,
  Sparkles,
  Edit2,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataStore } from "@/lib/data-store";
import { formatRupiah } from "@/lib/utils";
import { Profile, Resep } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function ResepDetailContent({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);

  const [resep, setResep] = useState<Resep | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Multiplier state (1x, 2x, 3x, custom)
  const [pengali, setPengali] = useState<number>(1);
  const [customPengaliInput, setCustomPengaliInput] = useState<string>("1");

  // Mode Masak State
  const [isCookingMode, setIsCookingMode] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Modal Edit State (Owner only)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Resep | null>(null);

  useEffect(() => {
    const found = DataStore.getResepById(id);
    if (!found) {
      router.push("/resep");
      return;
    }
    setResep(found);
    setEditFormData(JSON.parse(JSON.stringify(found)));
    setCurrentUser(DataStore.getCurrentUser());

    if (searchParams.get("mode") === "masak") {
      setIsCookingMode(true);
    }
  }, [id, router, searchParams]);

  if (!resep) return null;

  const isOwner = currentUser?.role === "owner";

  const handleSetPengali = (val: number) => {
    setPengali(val);
    setCustomPengaliInput(String(val));
  };

  const handleCustomPengaliChange = (valStr: string) => {
    setCustomPengaliInput(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed > 0) {
      setPengali(parsed);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;
    try {
      const updated = DataStore.updateResep(editFormData);
      setResep({ ...updated });
      setIsEditModalOpen(false);
      toast.success(`Formulasi resep ${updated.nama} berhasil diperbarui!`);
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui resep");
    }
  };

  return (
    <>
      {/* MODE MASAK LAYAR PENUH (SATU LANGKAH PER LAYAR) */}
      {isCookingMode && (
        <div className="fixed inset-0 z-50 bg-[#FBF6EC] text-[#3B2A1E] flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in">
          {/* Top Bar Mode Masak */}
          <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F6F50] text-white flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1F6F50] uppercase tracking-wider block">
                  Mode Masak Layar Penuh ({pengali}x Adonan)
                </span>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-[#3B2A1E]">
                  {resep.nama}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCookingMode(false)}
              className="px-4 py-2 rounded-xl border border-[#E8DFCC] bg-white hover:bg-[#FBF6EC] text-xs font-semibold flex items-center gap-1.5 text-[#7A6A5C] hover:text-[#3B2A1E]"
            >
              <X className="w-4 h-4" />
              <span>Keluar Mode Masak</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 py-4">
            <div className="flex justify-between text-xs font-bold text-[#7A6A5C]">
              <span>
                Langkah {currentStepIndex + 1} dari {resep.langkah.length}
              </span>
              <span>
                {Math.round(((currentStepIndex + 1) / resep.langkah.length) * 100)}% Selesai
              </span>
            </div>
            <div className="w-full bg-[#E8DFCC] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#1F6F50] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / resep.langkah.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step Main Content (Large Kitchen Text) */}
          <div className="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#C8962E]/15 text-[#C8962E] font-heading font-bold text-2xl flex items-center justify-center border-2 border-[#C8962E]/30">
              #{resep.langkah[currentStepIndex].nomor_langkah}
            </div>

            <p className="text-xl sm:text-3xl font-heading font-semibold text-[#3B2A1E] leading-relaxed">
              {resep.langkah[currentStepIndex].instruksi}
            </p>

            {resep.langkah[currentStepIndex].durasi_menit && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F6F50]/10 text-[#1F6F50] text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>Estimasi: ±{resep.langkah[currentStepIndex].durasi_menit} Menit</span>
              </div>
            )}
          </div>

          {/* Bottom Nav Stepper Controls */}
          <div className="flex items-center justify-between border-t border-[#E8DFCC] pt-4 max-w-3xl mx-auto w-full gap-4">
            <button
              type="button"
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className={`h-14 px-6 rounded-2xl font-bold text-sm flex items-center gap-2 border transition-all ${
                currentStepIndex === 0
                  ? "border-[#E8DFCC] text-[#7A6A5C]/40 cursor-not-allowed bg-transparent"
                  : "border-[#E8DFCC] bg-white hover:bg-[#FBF6EC] text-[#3B2A1E] shadow-xs active:scale-95"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Sebelumnya</span>
            </button>

            {currentStepIndex < resep.langkah.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                className="h-14 px-8 rounded-2xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-bold text-base flex items-center gap-2 shadow-warm-fab active:scale-95 transition-all"
              >
                <span>Langkah Selanjutnya</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  toast.success(`Batch ${resep.nama} selesai dimasak! Selamat!`);
                  setIsCookingMode(false);
                }}
                className="h-14 px-8 rounded-2xl bg-[#2E8B57] hover:bg-[#257347] text-white font-bold text-base flex items-center gap-2 shadow-warm-fab active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Selesai Memasak</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* REGULAR PAGE VIEW */}
      <AppLayout>
        <div className="w-full space-y-6 pb-12">
          {/* Header & Back */}
          <div className="flex items-center justify-between">
            <Link
              href="/resep"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F50] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Koleksi Resep</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCookingMode(true)}
                className="h-11 px-5 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <ChefHat className="w-4 h-4" />
                <span>Mode Masak Layar Penuh</span>
              </button>

              {isOwner && (
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="h-11 px-3 rounded-xl border border-[#E8DFCC] bg-white hover:bg-[#FBF6EC] text-xs font-semibold flex items-center gap-1.5 text-[#3B2A1E]"
                  title="Ubah Formulasi (Owner Only)"
                >
                  <Edit2 className="w-4 h-4 text-[#1F6F50]" />
                  <span className="hidden sm:inline">Ubah Formulasi</span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Recipe Card */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm overflow-hidden flex flex-col md:flex-row">
            <div className="relative h-64 md:h-auto md:w-80 bg-[#FBF6EC] shrink-0">
              <Image
                src={resep.foto}
                alt={resep.nama}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 space-y-4 flex-1">
              <div>
                <span className="text-xs font-bold text-[#1F6F50] uppercase tracking-wider">
                  Formula Kue Kering Tradisional
                </span>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E] mt-1">
                  {resep.nama}
                </h1>
                <p className="text-sm text-[#7A6A5C] mt-2 leading-relaxed">{resep.deskripsi}</p>
              </div>

              <div className="pt-2 border-t border-[#E8DFCC] flex items-center justify-between text-xs text-[#7A6A5C]">
                <span>
                  Harga Jual Default:{" "}
                  <strong className="text-[#1F6F50] font-heading text-sm">
                    {formatRupiah(resep.harga_jual_default)}
                  </strong>
                </span>
                <span>Porsi Standar: 1 Toples (500 gr)</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC PENGALI ADONAN (MULTIPLIER CARD) */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#E8DFCC] pb-4">
              <div>
                <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#C8962E]" />
                  <span>Pengali Adonan Dapur</span>
                </h2>
                <p className="text-xs text-[#7A6A5C]">
                  Takaran bahan di bawah akan otomatis dikalkulasi sesuai pengali adonan yang dipilih.
                </p>
              </div>

              {/* Multiplier Preset Chips + Custom input */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {[1, 2, 3].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSetPengali(val)}
                    className={`h-11 px-4 rounded-xl text-xs font-bold border transition-all ${
                      pengali === val
                        ? "bg-[#C8962E] text-white border-[#C8962E] shadow-xs"
                        : "bg-white text-[#3B2A1E] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                    }`}
                  >
                    {val}x
                  </button>
                ))}

                <div className="flex items-center gap-1 bg-[#FBF6EC] border border-[#E8DFCC] rounded-xl px-2 h-11">
                  <span className="text-xs font-semibold text-[#7A6A5C]">Bebas:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={customPengaliInput}
                    onChange={(e) => handleCustomPengaliChange(e.target.value)}
                    className="w-12 text-center text-xs font-bold text-[#3B2A1E] bg-transparent outline-none"
                  />
                  <span className="text-xs font-bold text-[#1F6F50]">x</span>
                </div>
              </div>
            </div>

            {/* Calculated Ingredients Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1F6F50] uppercase tracking-wider block">
                Takaran Bahan ({pengali}x Adonan = {pengali * resep.porsi_default} Toples):
              </span>

              <div className="border border-[#E8DFCC] rounded-xl overflow-hidden divide-y divide-[#E8DFCC]">
                {resep.bahan.map((b) => {
                  const calculatedTakaran = b.takaran * pengali;

                  return (
                    <div
                      key={b.id}
                      className="p-3.5 flex justify-between items-center bg-white text-sm hover:bg-[#FBF6EC]/30"
                    >
                      <span className="font-semibold text-[#3B2A1E]">
                        {b.nama_bahan || "Bahan Baku"}
                      </span>
                      <div className="text-right">
                        <span className="font-bold text-[#1F6F50] font-heading text-base">
                          {calculatedTakaran.toLocaleString("id-ID")} {b.satuan}
                        </span>
                        {pengali !== 1 && (
                          <span className="text-xs text-[#7A6A5C] block">
                            (Dasar: {b.takaran} {b.satuan})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Langkah Pembuatan Resep */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
            <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2 border-b border-[#E8DFCC] pb-3">
              <Sparkles className="w-5 h-5 text-[#1F6F50]" />
              <span>Instruksi Langkah Memasak</span>
            </h2>

            <div className="space-y-3">
              {resep.langkah.map((l) => (
                <div
                  key={l.id}
                  className="p-4 rounded-xl border border-[#E8DFCC] bg-white flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#1F6F50]/10 text-[#1F6F50] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    {l.nomor_langkah}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#3B2A1E] font-medium leading-relaxed">
                      {l.instruksi}
                    </p>
                    {l.durasi_menit && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#7A6A5C] mt-2">
                        <Clock className="w-3.5 h-3.5 text-[#1F6F50]" />
                        <span>Estimasi ±{l.durasi_menit} menit</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Edit Formulasi (Owner Only) */}
        {isEditModalOpen && isOwner && editFormData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
                  Ubah Formulasi & Bahan Resep
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">Nama Resep</label>
                  <input
                    type="text"
                    required
                    value={editFormData.nama}
                    onChange={(e) => setEditFormData({ ...editFormData, nama: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">Deskripsi</label>
                  <textarea
                    rows={2}
                    value={editFormData.deskripsi}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, deskripsi: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-[#E8DFCC] text-sm bg-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Harga Jual Default (Rp)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={editFormData.harga_jual_default}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        harga_jual_default: Number(e.target.value),
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-bold bg-white"
                  />
                </div>

                {/* Takaran Bahan list editor */}
                <div className="space-y-2 pt-2 border-t border-[#E8DFCC]">
                  <label className="text-xs font-bold text-[#1F6F50]">
                    Takaran Bahan Pokok (per 1 batch):
                  </label>
                  <div className="space-y-2">
                    {editFormData.bahan.map((b, idx) => (
                      <div key={b.id} className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#3B2A1E] flex-1">
                          {b.nama_bahan}
                        </span>
                        <input
                          type="number"
                          value={b.takaran}
                          onChange={(e) => {
                            const updatedBahan = [...editFormData.bahan];
                            updatedBahan[idx].takaran = Number(e.target.value);
                            setEditFormData({ ...editFormData, bahan: updatedBahan });
                          }}
                          className="w-20 h-10 px-2 rounded-lg border border-[#E8DFCC] text-xs font-bold text-center"
                        />
                        <span className="text-xs text-[#7A6A5C] w-12">{b.satuan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFCC] text-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1F6F50] text-white text-sm font-semibold"
                  >
                    Simpan Formula
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AppLayout>
    </>
  );
}

export default function ResepDetailPage(props: PageProps) {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-[#7A6A5C]">Memuat resep...</div>}>
      <ResepDetailContent {...props} />
    </React.Suspense>
  );
}
