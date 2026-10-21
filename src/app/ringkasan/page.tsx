"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Cookie,
  Users,
  MessageCircle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser } from "@/lib/use-store";
import { formatRupiah, formatWhatsapp } from "@/lib/utils";

export default function RingkasanPage() {
  const currentUser = useCurrentUser();

  const isOwner = currentUser.role === "owner";
  const ringkasan = isOwner ? DataStore.getRingkasan() : null;

  // If staff tries to access /ringkasan: enforce PRD restriction!
  if (!isOwner) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FBEBE9] text-[#B93A2E] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-xl font-bold text-[#3B2A1E]">
            Akses Dibatasi (Khusus Pemilik Toko)
          </h2>
          <p className="text-sm text-[#7A6A5C] leading-relaxed">
            Sesuai aturan keamanan operasional Dapur Lebaran, akun staf tidak memiliki izin untuk melihat data omzet keuangan dan ringkasan usaha.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => DataStore.switchRole("owner")}
              className="px-5 py-2.5 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold"
            >
              Beralih ke Akun Owner (Demo)
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Daily Chart mock representation
  const chartDays = [
    { day: "Kam", date: "16 Okt", total: 500000, height: "35%" },
    { day: "Jum", date: "17 Okt", total: 405000, height: "28%" },
    { day: "Sab", date: "18 Okt", total: 345000, height: "24%" },
    { day: "Min", date: "19 Okt", total: 1425000, height: "85%" },
    { day: "Sen", date: "20 Okt", total: 1040000, height: "65%" },
    { day: "Sel", date: "21 Okt", total: 1470000, height: "92%" },
  ];

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
                Ringkasan Bisnis & Omzet
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C8962E]/15 text-[#C8962E] border border-[#C8962E]/30">
                Owner View
              </span>
            </div>
            <p className="text-sm text-[#7A6A5C] mt-0.5">
              Laporan kinerja keuangan, statistik toples kue terjual, dan penagihan piutang Idul Fitri.
            </p>
          </div>
          <Link
            href="/pengaturan/karyawan"
            className="h-11 px-4 rounded-xl border border-[#E8DFCC] bg-white hover:bg-[#FDFBF7] text-[#3B2A1E] text-xs font-semibold flex items-center gap-2 shadow-2xs shrink-0"
          >
            <span>Kelola Staf Dapur</span>
            <ArrowRight className="w-4 h-4 text-[#1F6F50]" />
          </Link>
        </div>

        {/* 4 Financial Metric Cards */}
        {ringkasan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm">
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Omzet Hari Ini
              </span>
              <span className="text-2xl font-bold text-[#1F6F50] font-heading block mt-2">
                {formatRupiah(ringkasan.omzetHariIni || 1470000)}
              </span>
              <span className="text-xs text-[#2E8B57] font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Transaksi aktif hari ini</span>
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm">
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Omzet 7 Hari Terakhir
              </span>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading block mt-2">
                {formatRupiah(ringkasan.omzet7Hari || 5185000)}
              </span>
              <span className="text-xs text-[#7A6A5C] block mt-1">Periode aktif produksi</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm">
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Total Omzet Musim Ini
              </span>
              <span className="text-2xl font-bold text-[#C8962E] font-heading block mt-2">
                {formatRupiah(ringkasan.omzetTotal || 6050000)}
              </span>
              <span className="text-xs text-[#7A6A5C] block mt-1">Akumulasi seluruh batch</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-warm-sm">
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Total Toples Terjual
              </span>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading block mt-2">
                {ringkasan.totalToples || 45} Toples
              </span>
              <span className="text-xs text-[#1F6F50] font-medium block mt-1">
                Kapasitas produksi: 75%
              </span>
            </div>
          </div>
        )}

        {/* Visual Bar Chart: Penjualan Harian */}
        <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
            <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#1F6F50]" />
              <span>Grafik Penjualan Harian (7 Hari Terakhir)</span>
            </h2>
            <span className="text-xs text-[#7A6A5C]">Mata Uang: IDR (Rupiah)</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 pt-6 px-2 sm:px-6">
            {chartDays.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#1F6F50] hidden sm:block">
                  {(item.total / 1000).toFixed(0)}rb
                </span>
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-[#1F6F50] to-[#2E8B57] rounded-t-xl hover:brightness-110 transition-all cursor-pointer relative group"
                  style={{ height: item.height }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3B2A1E] text-white text-[10px] py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {formatRupiah(item.total)}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-[#3B2A1E] block">{item.day}</span>
                  <span className="text-[10px] text-[#7A6A5C] block">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Kue & Top 5 Pelanggan */}
        {ringkasan && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Top 5 Kue */}
            <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
              <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2 border-b border-[#E8DFCC] pb-3">
                <Cookie className="w-5 h-5 text-[#C8962E]" />
                <span>Top 5 Kue Paling Laris</span>
              </h2>

              <div className="space-y-3">
                {ringkasan.top5Kue.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#E8DFCC] flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#1F6F50]/10 text-[#1F6F50] font-heading font-bold text-sm flex items-center justify-center">
                        #{idx + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#3B2A1E] block">
                          {item.nama}
                        </span>
                        <span className="text-xs text-[#7A6A5C]">{item.jumlah} toples terjual</span>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm text-[#1F6F50]">
                      {formatRupiah(item.omzet)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 5 Pelanggan */}
            <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
              <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2 border-b border-[#E8DFCC] pb-3">
                <Users className="w-5 h-5 text-[#1F6F50]" />
                <span>Top 5 Pelanggan Terbesar</span>
              </h2>

              <div className="space-y-3">
                {ringkasan.top5Pelanggan.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#E8DFCC] flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C8962E]/15 text-[#C8962E] font-heading font-bold text-sm flex items-center justify-center">
                        #{idx + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#3B2A1E] block">
                          {item.pelanggan.nama}
                        </span>
                        <span className="text-xs text-[#7A6A5C]">{item.count} kali memesan</span>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm text-[#1F6F50]">
                      {formatRupiah(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Daftar Belum Lunas + Tombol WhatsApp Direct */}
        {ringkasan && (
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
              <h2 className="font-heading text-base font-bold text-[#B93A2E] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#B93A2E]" />
                <span>Daftar Pesanan Belum Lunas ({ringkasan.belumLunas.length})</span>
              </h2>
              <span className="text-xs text-[#7A6A5C]">Segera tindak lanjuti penagihan</span>
            </div>

            <div className="divide-y divide-[#E8DFCC]">
              {ringkasan.belumLunas.map((p: any) => {
                const sisa = p.total - (p.jumlah_dp || 0);
                const waPhone = formatWhatsapp(p.pelanggan?.whatsapp || "");
                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                  `Halo ${p.pelanggan?.nama}, dari Dapur Lebaran. Mengingatkan pesanan kue lebaran #${p.nomor_invoice} masih terdapat sisa pelunasan sebesar ${formatRupiah(
                    sisa
                  )}. Terima kasih!`
                )}`;

                return (
                  <div
                    key={p.id}
                    className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#3B2A1E]">
                          {p.pelanggan?.nama}
                        </span>
                        <StatusBadge status={p.status_bayar} jumlahDp={p.jumlah_dp} />
                        <span className="font-mono text-xs text-[#7A6A5C]">
                          {p.nomor_invoice}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6A5C] mt-1">
                        Total {formatRupiah(p.total)} • Sisa Tagihan:{" "}
                        <strong className="text-[#B93A2E]">{formatRupiah(sisa)}</strong>
                      </p>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Tagih via WhatsApp</span>
                    </a>
                  </div>
                );
              })}

              {ringkasan.belumLunas.length === 0 && (
                <p className="text-center py-6 text-sm text-[#2E8B57]">
                  Semua pesanan kue lebaran telah lunas!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
