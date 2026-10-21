"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChefHat, Sparkles, Scale } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useResepList } from "@/lib/use-store";
import { formatRupiah } from "@/lib/utils";

export default function ResepPage() {
  const resepList = useResepList();

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
              Koleksi Resep Kue Lebaran
            </h1>
            <p className="text-sm text-[#7A6A5C] mt-0.5">
              Formulasi takaran bahan baku, pengali batch adonan otomatis, dan mode panduan memasak dapur.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1F6F50]/10 text-[#1F6F50] flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4 text-[#C8962E]" />
            <span>3 Formula Emas Idul Fitri</span>
          </span>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {resepList.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm overflow-hidden flex flex-col justify-between hover:border-[#1F6F50] transition-colors"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-48 w-full bg-[#FBF6EC] overflow-hidden">
                  <Image
                    src={r.foto}
                    alt={r.nama}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#1F6F50] shadow-xs">
                    {formatRupiah(r.harga_jual_default)} / toples
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#3B2A1E]">{r.nama}</h2>
                    <p className="text-xs text-[#7A6A5C] mt-1 line-clamp-2">{r.deskripsi}</p>
                  </div>

                  {/* Bahan Quick Preview */}
                  <div className="p-3 bg-[#FBF6EC] rounded-xl border border-[#E8DFCC]/60 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#1F6F50] block flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" />
                      <span>Bahan Pokok (1 Batch):</span>
                    </span>
                    <ul className="text-xs text-[#3B2A1E] space-y-0.5">
                      {r.bahan.slice(0, 3).map((b) => (
                        <li key={b.id} className="flex justify-between">
                          <span>{b.nama_bahan || "Bahan"}</span>
                          <span className="font-semibold text-[#7A6A5C]">
                            {b.takaran} {b.satuan}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-[#7A6A5C] flex items-center justify-between pt-1">
                    <span>{r.langkah.length} Langkah Proses</span>
                    <span>Porsi Dasar: {r.porsi_default} Toples</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/resep/${r.id}`}
                  className="h-11 rounded-xl border border-[#E8DFCC] hover:bg-[#FBF6EC] text-[#3B2A1E] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Scale className="w-4 h-4 text-[#1F6F50]" />
                  <span>Pengali Adonan</span>
                </Link>

                <Link
                  href={`/resep/${r.id}?mode=masak`}
                  className="h-11 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Mode Masak</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
