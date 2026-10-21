"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Receipt,
  Search,
  Plus,
  MessageCircle,
  Calendar,
  Eye,
  Trash2,
  TrendingUp,
  CreditCard,
  Cookie,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser, usePenjualanList } from "@/lib/use-store";
import { formatRupiah, formatTanggal, formatWhatsapp } from "@/lib/utils";
import { Penjualan } from "@/types";

export default function PenjualanPage() {
  const penjualanList = usePenjualanList();
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<Penjualan | null>(null);

  const isOwner = currentUser.role === "owner";

  // Filter & Search logic
  const filtered = penjualanList.filter((p) => {
    const matchesSearch =
      p.nomor_invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pelanggan?.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.items.some((it) => it.nama_kue.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterStatus === "all") return true;
    return p.status_bayar === filterStatus;
  });

  // Aggregated calculations for the 4 Bento Stat Cards
  const totalOmzet = penjualanList.reduce((sum, p) => sum + p.total, 0);
  const totalToples = penjualanList.reduce(
    (sum, p) => sum + p.items.reduce((s, it) => s + it.jumlah, 0),
    0
  );

  const listLunas = penjualanList.filter((p) => p.status_bayar === "Lunas");
  const nominalLunas = listLunas.reduce((sum, p) => sum + p.total, 0);

  const listDp = penjualanList.filter((p) => p.status_bayar === "DP");
  const nominalDp = listDp.reduce((sum, p) => sum + (p.jumlah_dp || 0), 0);

  const listBelumLunas = penjualanList.filter((p) => p.status_bayar === "Belum lunas");

  // Total sisa piutang yang belum terbayar
  const totalSisaPiutang = penjualanList.reduce((sum, p) => {
    if (p.status_bayar === "Lunas") return sum;
    const dp = p.jumlah_dp || 0;
    return sum + (p.total - dp);
  }, 0);

  const countBelumLunasTotal = listDp.length + listBelumLunas.length;

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    try {
      DataStore.deletePenjualan(deleteTarget.id);
      toast.success(`Nota ${deleteTarget.nomor_invoice} berhasil dihapus`);
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus penjualan");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
              Daftar Seluruh Penjualan
            </h1>
            <p className="text-sm text-[#7A6A5C] mt-0.5">
              Pencatatan kasir pesanan kue Idul Fitri 1447H, pelunasan DP, dan antrean pengiriman.
            </p>
          </div>
          <Link
            href="/penjualan/baru"
            className="h-11 px-5 rounded-xl bg-[#C8962E] hover:bg-[#b58525] text-white font-semibold text-sm flex items-center gap-2 shadow-warm-fab active:scale-95 transition-all shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>+ Catat Pesanan Baru</span>
          </Link>
        </div>

        {/* 4 Bento Stat Cards (Membentang Penuh 4 Kolom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Total Omzet */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Omzet</span>
              <div className="w-8 h-8 rounded-lg bg-[#1F6F50]/10 text-[#1F6F50] flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isOwner ? (
                <>
                  <span className="text-2xl font-bold text-[#1F6F50] font-heading block tracking-tight">
                    {formatRupiah(totalOmzet)}
                  </span>
                  <p className="text-xs text-[#2E8B57] font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{penjualanList.length} transaksi tercatat</span>
                  </p>
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-[#7A6A5C] font-mono block">
                    [Disembunyikan]
                  </span>
                  <p className="text-xs text-[#7A6A5C] mt-1">Akses omzet dibatasi RLS</p>
                </>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C]">
              Berdasarkan seluruh batch Idul Fitri
            </div>
          </div>

          {/* Card 2: Total Toples Terpesan */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Toples</span>
              <div className="w-8 h-8 rounded-lg bg-[#C8962E]/10 text-[#C8962E] flex items-center justify-center">
                <Cookie className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading block tracking-tight">
                {totalToples} Toples
              </span>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E8B57]">
                  {listLunas.length} Lunas
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FDF6E2] text-[#9E7000]">
                  {listDp.length} DP
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FBEBE9] text-[#B93A2E]">
                  {listBelumLunas.length} Belum
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C]">
              Rata-rata {Math.round(totalToples / (penjualanList.length || 1))} toples/nota
            </div>
          </div>

          {/* Card 3: Pesanan Lunas */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pesanan Lunas</span>
              <div className="w-8 h-8 rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#2E8B57] font-heading block tracking-tight">
                {listLunas.length} Nota Lunas
              </span>
              <p className="text-xs text-[#7A6A5C] font-medium mt-1">
                {isOwner ? `Terkumpul ${formatRupiah(nominalLunas)}` : "Siap dipacking & kirim"}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#2E8B57] font-medium flex items-center gap-1">
              <span>{Math.round((listLunas.length / (penjualanList.length || 1)) * 100)}% transaksi selesai</span>
            </div>
          </div>

          {/* Card 4: Sisa Piutang / Belum Lunas */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#7A6A5C] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Perlu Ditagih</span>
              <div className="w-8 h-8 rounded-lg bg-[#B93A2E]/10 text-[#B93A2E] flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#B93A2E] font-heading block tracking-tight">
                {formatRupiah(totalSisaPiutang)}
              </span>
              <p className="text-xs text-[#B93A2E] font-medium mt-1">
                {countBelumLunasTotal} pesanan menanti pelunasan
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8DFCC]/60 text-[11px] text-[#7A6A5C]">
              Tersedia tombol tagih otomatis ke WhatsApp
            </div>
          </div>
        </div>

        {/* Filter Bar & Search (Full Width Alignment) */}
        <div className="w-full bg-white p-3.5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                filterStatus === "all"
                  ? "bg-[#1F6F50] text-white shadow-xs"
                  : "bg-[#FDFBF7] text-[#7A6A5C] border border-[#E8DFCC] hover:bg-white hover:text-[#3B2A1E]"
              }`}
            >
              Semua ({penjualanList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("Lunas")}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                filterStatus === "Lunas"
                  ? "bg-[#2E8B57] text-white shadow-xs"
                  : "bg-[#FDFBF7] text-[#7A6A5C] border border-[#E8DFCC] hover:bg-white hover:text-[#3B2A1E]"
              }`}
            >
              Lunas ({listLunas.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("DP")}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                filterStatus === "DP"
                  ? "bg-[#D99A00] text-white shadow-xs"
                  : "bg-[#FDFBF7] text-[#7A6A5C] border border-[#E8DFCC] hover:bg-white hover:text-[#3B2A1E]"
              }`}
            >
              DP ({listDp.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("Belum lunas")}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                filterStatus === "Belum lunas"
                  ? "bg-[#B93A2E] text-white shadow-xs"
                  : "bg-[#FDFBF7] text-[#7A6A5C] border border-[#E8DFCC] hover:bg-white hover:text-[#3B2A1E]"
              }`}
            >
              Belum Lunas ({listBelumLunas.length})
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari invoice, pelanggan, atau nama kue..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E8DFCC] text-sm bg-[#FDFBF7] focus:bg-white focus:border-[#1F6F50] focus:ring-2 focus:ring-[#1F6F50]/15 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-[#7A6A5C] absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Tabel Data (Lebar Penuh & Tidak Tercekik) */}
        <div className="w-full bg-white rounded-2xl shadow-sm border border-[#E8DFCC] overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-[#FDFBF7] text-[#7A6A5C] text-xs font-semibold uppercase tracking-wider border-b border-[#E8DFCC]">
                <tr>
                  <th className="py-4 px-6 whitespace-nowrap">Invoice & Tanggal</th>
                  <th className="py-4 px-6 whitespace-nowrap">Pelanggan</th>
                  <th className="py-4 px-6">Rincian Item Kue</th>
                  <th className="py-4 px-6 whitespace-nowrap">Status Pembayaran</th>
                  <th className="py-4 px-6 whitespace-nowrap">Total</th>
                  <th className="py-4 px-6 text-center whitespace-nowrap">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFCC]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7A6A5C]">
                      Tidak ada transaksi yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const sisa = p.total - (p.jumlah_dp || 0);
                    const waPhone = formatWhatsapp(p.pelanggan?.whatsapp || "");
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Halo ${p.pelanggan?.nama}, dari Dapur Lebaran mengenai pesanan #${p.nomor_invoice}. Total ${formatRupiah(
                        p.total
                      )}, sisa tagihan ${formatRupiah(sisa)}. Terima kasih!`
                    )}`;

                    return (
                      <tr key={p.id} className="hover:bg-[#FDFBF7]/60 transition-colors">
                        {/* Invoice & Tanggal */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <Link
                            href={`/penjualan/${p.id}`}
                            className="font-mono text-xs font-semibold text-[#1F6F50] hover:underline block"
                          >
                            {p.nomor_invoice}
                          </Link>
                          <p className="text-xs text-[#7A6A5C] flex items-center gap-1.5 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-[#7A6A5C]" />
                            <span>{formatTanggal(p.tanggal)}</span>
                          </p>
                        </td>

                        {/* Pelanggan */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="font-semibold text-[#3B2A1E] block">
                            {p.pelanggan?.nama || "Pelanggan Umum"}
                          </span>
                          <span className="text-xs text-[#7A6A5C] font-mono">
                            {p.pelanggan?.whatsapp || "-"}
                          </span>
                        </td>

                        {/* Rincian Item Kue */}
                        <td className="py-4 px-6 min-w-[200px]">
                          <div className="flex flex-col gap-1">
                            {p.items.map((it) => (
                              <span key={it.id} className="text-xs text-[#3B2A1E] font-medium">
                                • {it.jumlah} toples {it.nama_kue}
                              </span>
                            ))}
                          </div>
                          {p.catatan && (
                            <p className="text-[11px] text-[#7A6A5C] italic mt-1 line-clamp-1">
                              &quot;{p.catatan}&quot;
                            </p>
                          )}
                        </td>

                        {/* Status Bayar */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div>
                            <StatusBadge status={p.status_bayar} jumlahDp={p.jumlah_dp} />
                            {p.status_bayar !== "Lunas" && (
                              <p className="text-[11px] text-[#B93A2E] font-semibold mt-1">
                                Sisa: {formatRupiah(sisa)}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Total Nominal */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="font-bold text-[#1F6F50] font-heading text-base block">
                            {formatRupiah(p.total)}
                          </span>
                          <span className="text-[10px] text-[#7A6A5C]">
                            Dicatat: {p.user_nama}
                          </span>
                        </td>

                        {/* Aksi Cepat */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            {/* Tombol Tagih WA */}
                            {p.pelanggan?.whatsapp && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Kirim Tagihan / Update via WhatsApp"
                                className="h-9 px-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-semibold text-xs flex items-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span className="hidden xl:inline">WA</span>
                              </a>
                            )}

                            {/* Tombol Lihat Detail */}
                            <Link
                              href={`/penjualan/${p.id}`}
                              title="Lihat Detail Transaksi"
                              className="w-9 h-9 rounded-lg border border-[#E8DFCC] bg-white hover:bg-[#FDFBF7] text-[#3B2A1E] flex items-center justify-center transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            {/* Tombol Hapus (Owner Only) */}
                            {isOwner && (
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(p)}
                                title="Hapus Transaksi (Owner)"
                                className="w-9 h-9 rounded-lg border border-[#B93A2E]/20 bg-[#FBEBE9] hover:bg-[#B93A2E] text-[#B93A2E] hover:text-white flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog Hapus Penjualan */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Hapus Data Penjualan?"
        description={`Apakah Anda yakin ingin menghapus transaksi invoice ${deleteTarget?.nomor_invoice} atas nama ${deleteTarget?.pelanggan?.nama}? Data yang dihapus tidak dapat dikembalikan.`}
        confirmLabel="Ya, Hapus Penjualan"
        cancelLabel="Batal"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AppLayout>
  );
}
