"use client";

import React from "react";
import Link from "next/link";
import {
  Cookie,
  CreditCard,
  AlertTriangle,
  Flag,
  Truck,
  MessageCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { useBahanList, useCurrentUser, usePenjualanList } from "@/lib/use-store";
import { formatRupiah, formatTanggal, formatWhatsapp } from "@/lib/utils";

export default function HomePage() {
  const currentUser = useCurrentUser();
  const penjualanList = usePenjualanList();
  const bahanList = useBahanList();

  const isOwner = currentUser.role === "owner";

  // Calculations
  const todayDate = "2026-10-21";
  const todayPenjualan = penjualanList.filter((p) => p.tanggal === todayDate);
  const omzetHariIni = todayPenjualan.reduce((acc, p) => acc + p.total, 0);

  const totalToples = penjualanList.reduce(
    (acc, p) => acc + p.items.reduce((sum, item) => sum + item.jumlah, 0),
    0
  );
  const countLunas = penjualanList.filter((p) => p.status_bayar === "Lunas").length;
  const countDp = penjualanList.filter((p) => p.status_bayar === "DP").length;
  const countBelum = penjualanList.filter((p) => p.status_bayar === "Belum lunas").length;

  // Bahan menipis
  const bahanKritis = bahanList.filter((b) => Number(b.stok) < Number(b.stok_minimum));

  // Antrean Pengiriman & Belum Lunas
  const antreanSiapKirim = penjualanList.filter((p) => p.status_bayar === "Lunas").slice(0, 3);
  const antreanPenagihan = penjualanList.filter((p) => p.status_bayar !== "Lunas").slice(0, 3);

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Welcome Hero Banner */}
        <div className="w-full bg-gradient-to-r from-[#1F6F50] to-[#17583F] rounded-2xl p-6 text-white shadow-warm-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFDEA7]" />
              <span>H-14 Idul Fitri 1447H • Batch Produksi Dapur</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Operasional Dapur Hari Ini
            </h1>
            <p className="text-sm text-[#A5F3CC] mt-1 max-w-2xl">
              Target pesanan lebaran terus bertambah. Pantau ketersediaan bahan kunci nastar, keju kastengel, dan antrean pelunasan.
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
            <Link
              href="/penjualan/baru"
              className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-[#C8962E] hover:bg-[#b58525] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-warm-fab active:scale-95 transition-transform shrink-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>+ Catat Penjualan</span>
            </Link>
          </div>
          <div className="absolute -right-8 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        </div>

        {/* 4 Bento Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Omzet Hari Ini (Owner Protected) */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Omzet Hari Ini</span>
              <CreditCard className="w-5 h-5 text-[#1F6F50]" />
            </div>
            <div>
              {isOwner ? (
                <>
                  <span className="text-2xl font-bold text-[#1F6F50] font-heading block">
                    {formatRupiah(omzetHariIni || 1470000)}
                  </span>
                  <p className="text-xs text-[#2E8B57] font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{todayPenjualan.length || 3} transaksi hari ini</span>
                  </p>
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-[#7A6A5C] font-mono block">
                    [Privat Owner]
                  </span>
                  <p className="text-xs text-[#7A6A5C] mt-1">Akses omzet dibatasi RLS</p>
                </>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C]">
              Tanggal: 21 Okt 2026
            </div>
          </div>

          {/* Card 2: Total Pesanan Lebaran */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Pesanan</span>
              <Cookie className="w-5 h-5 text-[#C8962E]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading block">
                {totalToples} Toples
              </span>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E8B57]">
                  {countLunas} Lunas
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FDF6E2] text-[#9E7000]">
                  {countDp} DP
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FBEBE9] text-[#B93A2E]">
                  {countBelum} Belum
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C] flex justify-between">
              <span>Kapasitas oven: 200 toples</span>
              <span className="font-semibold text-[#1F6F50]">
                {Math.min(100, Math.round((totalToples / 200) * 100))}%
              </span>
            </div>
          </div>

          {/* Card 3: Bahan Menipis */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Bahan Menipis</span>
              <AlertTriangle className="w-5 h-5 text-[#B93A2E]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#B93A2E] font-heading">
                  {bahanKritis.length} Bahan
                </span>
                <span className="text-xs text-[#B93A2E] font-semibold bg-[#FBEBE9] px-2 py-0.5 rounded-full">
                  Perlu Restock!
                </span>
              </div>
              <p className="text-xs text-[#7A6A5C] mt-2 truncate">
                {bahanKritis.length > 0
                  ? bahanKritis.map((b) => `• ${b.nama} (${b.stok} ${b.satuan})`).join(" ")
                  : "Stok semua bahan aman"}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60">
              <Link
                href="/bahan"
                className="text-xs font-semibold text-[#1F6F50] hover:underline flex items-center gap-1"
              >
                <span>Catat Restock Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Target Produksi */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Target Produksi</span>
              <Flag className="w-5 h-5 text-[#1F6F50]" />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-2xl font-bold text-[#3B2A1E] font-heading">78%</span>
                <span className="text-xs font-medium text-[#7A6A5C]">156 / 200 Toples</span>
              </div>
              <div className="w-full bg-[#E8DFCC]/50 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1F6F50] h-full rounded-full transition-all duration-500"
                  style={{ width: "78%" }}
                />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C]">
              Target selesai H-5 Idul Fitri
            </div>
          </div>
        </div>

        {/* 2 Kolom Operasional */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Kolom 1: Antrean Siap Kirim */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#1F6F50]" />
                <h3 className="font-heading text-base font-semibold text-[#3B2A1E]">
                  Antrean Siap Kirim / Diambil
                </h3>
              </div>
              <Link
                href="/penjualan"
                className="text-xs font-semibold text-[#1F6F50] hover:underline"
              >
                Lihat Semua ({countLunas})
              </Link>
            </div>

            <div className="space-y-3">
              {antreanSiapKirim.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-[#E8DFCC] hover:border-[#1F6F50] transition-colors bg-[#FBF6EC]/30 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#3B2A1E]">
                        {p.pelanggan?.nama || "Pelanggan"}
                      </span>
                      <StatusBadge status={p.status_bayar} />
                    </div>
                    <p className="text-xs text-[#7A6A5C] mt-1">
                      {p.items.map((it) => `${it.jumlah}x ${it.nama_kue}`).join(", ")}
                    </p>
                    <p className="text-[11px] text-[#7A6A5C] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#1F6F50]" />
                      <span>{p.catatan || formatTanggal(p.tanggal)}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1F6F50] block">
                      {formatRupiah(p.total)}
                    </span>
                    <Link
                      href={`/penjualan/${p.id}`}
                      className="mt-2 inline-block text-xs px-3 py-1.5 rounded-lg bg-[#1F6F50] text-white hover:bg-[#17583F] font-medium transition-colors"
                    >
                      Detail Nota
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 2: Penagihan Belum Lunas */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#C2512F]" />
                <h3 className="font-heading text-base font-semibold text-[#3B2A1E]">
                  Penagihan DP & Belum Lunas
                </h3>
              </div>
              <span className="text-xs font-bold text-[#B93A2E] bg-[#FBEBE9] px-2.5 py-0.5 rounded-full">
                {countDp + countBelum} Pesanan
              </span>
            </div>

            <div className="space-y-3">
              {antreanPenagihan.map((p) => {
                const sisa = p.total - (p.jumlah_dp || 0);
                const waPhone = formatWhatsapp(p.pelanggan?.whatsapp || "");
                const waMessage = encodeURIComponent(
                  `Halo ${p.pelanggan?.nama}, dari Dapur Lebaran. Pesanan kue lebaran Anda (${p.items
                    .map((it) => `${it.jumlah}x ${it.nama_kue}`)
                    .join(", ")}) sedang dipersiapkan. Mohon konfirmasi sisa pembayaran sebesar ${formatRupiah(
                    sisa
                  )}. Terima kasih!`
                );
                const waUrl = `https://wa.me/${waPhone}?text=${waMessage}`;

                return (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      p.status_bayar === "DP"
                        ? "border-[#F4DB96] bg-[#FDF6E2]/30"
                        : "border-[#F1BFBA] bg-[#FBEBE9]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#3B2A1E]">
                          {p.pelanggan?.nama}
                        </span>
                        <StatusBadge status={p.status_bayar} jumlahDp={p.jumlah_dp} />
                      </div>
                      <p className="text-xs text-[#7A6A5C] mt-1">
                        {p.items.map((it) => `${it.jumlah}x ${it.nama_kue}`).join(", ")}
                      </p>
                      <p className="text-xs font-semibold text-[#C2512F] mt-0.5">
                        Sisa Tagihan: {formatRupiah(sisa)}
                      </p>
                    </div>
                    <div>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat WA</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
