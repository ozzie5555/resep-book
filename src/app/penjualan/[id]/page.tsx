"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Receipt,
  Calendar,
  MessageCircle,
  User,
  Printer,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataStore } from "@/lib/data-store";
import { formatRupiah, formatTanggal, formatWhatsapp } from "@/lib/utils";
import { Penjualan, Profile, StatusPembayaran } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function PenjualanDetailContent({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [penjualan, setPenjualan] = useState<Penjualan | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const data = DataStore.getPenjualanById(id);
    if (!data) {
      router.push("/penjualan");
      return;
    }
    setPenjualan(data);
    setCurrentUser(DataStore.getCurrentUser());
  }, [id, router]);

  if (!penjualan) return null;

  const isOwner = currentUser?.role === "owner";
  // Staff can only update if created by themselves AND on the same day
  const isCreatedToday =
    new Date(penjualan.created_at).toISOString().slice(0, 10) ===
    new Date().toISOString().slice(0, 10);
  const isCreator = penjualan.user_id === currentUser?.id;
  const canEdit = isOwner || (isCreator && isCreatedToday);

  const sisa = Math.max(0, penjualan.total - (penjualan.jumlah_dp || 0));
  const waPhone = formatWhatsapp(penjualan.pelanggan?.whatsapp || "");
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Halo ${penjualan.pelanggan?.nama}, berikut rincian pesanan #${penjualan.nomor_invoice} di Dapur Lebaran:\n${penjualan.items
      .map((it) => `- ${it.jumlah}x ${it.nama_kue} (${formatRupiah(it.subtotal)})`)
      .join("\n")}\n\nTotal: ${formatRupiah(penjualan.total)}\nStatus: ${penjualan.status_bayar}${
      penjualan.status_bayar !== "Lunas" ? `\nSisa Tagihan: ${formatRupiah(sisa)}` : ""
    }\n\nTerima kasih atas pesanan Anda!`
  )}`;

  const handleUpdateStatus = (newStatus: StatusPembayaran) => {
    if (!canEdit) {
      toast.error(
        isOwner
          ? "Tidak dapat mengubah data"
          : "Staff hanya dapat mengubah penjualan miliknya di hari yang sama"
      );
      return;
    }

    try {
      const updated = DataStore.updatePenjualan(penjualan.id, {
        status_bayar: newStatus,
        jumlah_dp: newStatus === "Lunas" ? 0 : penjualan.jumlah_dp,
      });
      setPenjualan(updated);
      toast.success(`Status pembayaran berhasil diubah menjadi ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui status");
    }
  };

  const handleDelete = () => {
    try {
      DataStore.deletePenjualan(penjualan.id);
      toast.success("Pesanan berhasil dihapus");
      router.push("/penjualan");
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus pesanan");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 pb-12">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/penjualan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F50] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Penjualan</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="h-9 px-3 rounded-xl border border-[#E8DFCC] bg-white text-[#3B2A1E] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#FBF6EC]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Nota</span>
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="h-9 px-3 rounded-xl border border-[#F1BFBA] bg-[#FBEBE9] text-[#B93A2E] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#B93A2E] hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus</span>
              </button>
            )}
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-md p-6 md:p-8 space-y-6 print:border-none print:shadow-none">
          {/* Header Nota */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8DFCC] pb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#1F6F50] bg-[#1F6F50]/10 px-2.5 py-1 rounded-full inline-block mb-2">
                Nota Penjualan Internal
              </span>
              <h1 className="font-heading text-2xl font-bold text-[#3B2A1E]">
                {penjualan.nomor_invoice}
              </h1>
              <p className="text-xs text-[#7A6A5C] flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatTanggal(penjualan.tanggal)}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <StatusBadge status={penjualan.status_bayar} jumlahDp={penjualan.jumlah_dp} />
              <p className="text-xs text-[#7A6A5C] mt-2 flex items-center sm:justify-end gap-1">
                <User className="w-3.5 h-3.5 text-[#1F6F50]" />
                <span>Kasir: {penjualan.user_nama || "Staf Dapur"}</span>
              </p>
            </div>
          </div>

          {/* Customer Info Card */}
          <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs text-[#7A6A5C] block">Penerima Pesanan:</span>
              <Link
                href={`/pelanggan/${penjualan.pelanggan_id}`}
                className="font-heading text-base font-bold text-[#1F6F50] hover:underline"
              >
                {penjualan.pelanggan?.nama}
              </Link>
              <p className="text-xs font-mono text-[#7A6A5C] mt-0.5">
                {penjualan.pelanggan?.whatsapp}
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Nota via WA</span>
            </a>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-[#3B2A1E] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#1F6F50]" />
              <span>Rincian Item Kue</span>
            </h3>

            <div className="border border-[#E8DFCC] rounded-xl overflow-hidden divide-y divide-[#E8DFCC]">
              {penjualan.items.map((item, idx) => (
                <div key={item.id || idx} className="p-3.5 flex justify-between items-center bg-white text-sm">
                  <div>
                    <span className="font-semibold text-[#3B2A1E] block">{item.nama_kue}</span>
                    <span className="text-xs text-[#7A6A5C]">
                      {item.jumlah} toples × {formatRupiah(item.harga_satuan)}
                    </span>
                  </div>
                  <span className="font-bold text-[#3B2A1E] font-heading">
                    {formatRupiah(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-2 pt-2 border-t border-[#E8DFCC]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#7A6A5C]">Total Belanja:</span>
              <span className="font-heading text-xl font-bold text-[#1F6F50]">
                {formatRupiah(penjualan.total)}
              </span>
            </div>

            {penjualan.status_bayar === "DP" && (
              <>
                <div className="flex justify-between items-center text-sm text-[#9E7000]">
                  <span>Uang Muka (DP) Terbayar:</span>
                  <span className="font-semibold">-{formatRupiah(penjualan.jumlah_dp)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#B93A2E] pt-1 border-t border-[#E8DFCC]/60">
                  <span>Sisa Pelunasan:</span>
                  <span className="font-heading text-lg">{formatRupiah(sisa)}</span>
                </div>
              </>
            )}

            {penjualan.status_bayar === "Belum lunas" && (
              <div className="flex justify-between items-center text-sm font-bold text-[#B93A2E] pt-1 border-t border-[#E8DFCC]/60">
                <span>Tagihan Belum Dibayar:</span>
                <span className="font-heading text-lg">{formatRupiah(penjualan.total)}</span>
              </div>
            )}
          </div>

          {penjualan.catatan && (
            <div className="p-3 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC] text-xs text-[#7A6A5C]">
              <span className="font-semibold text-[#3B2A1E] block mb-0.5">Catatan Pesanan:</span>
              {penjualan.catatan}
            </div>
          )}

          {/* Quick Status Update Section (Subject to RLS permissions) */}
          <div className="pt-4 border-t border-[#E8DFCC] space-y-2">
            <span className="text-xs font-semibold text-[#7A6A5C] block">
              Ubah Status Pembayaran Cepat:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("Lunas")}
                disabled={!canEdit}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  penjualan.status_bayar === "Lunas"
                    ? "bg-[#2E8B57] text-white border-[#2E8B57]"
                    : "bg-white text-[#2E8B57] border-[#B8E2C8] hover:bg-[#EAF5EE]"
                } ${!canEdit ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tandai Lunas</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateStatus("DP")}
                disabled={!canEdit}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  penjualan.status_bayar === "DP"
                    ? "bg-[#D99A00] text-white border-[#D99A00]"
                    : "bg-white text-[#9E7000] border-[#F4DB96] hover:bg-[#FDF6E2]"
                } ${!canEdit ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>Set DP</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateStatus("Belum lunas")}
                disabled={!canEdit}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  penjualan.status_bayar === "Belum lunas"
                    ? "bg-[#B93A2E] text-white border-[#B93A2E]"
                    : "bg-white text-[#B93A2E] border-[#F1BFBA] hover:bg-[#FBEBE9]"
                } ${!canEdit ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>Belum Lunas</span>
              </button>
            </div>

            {!canEdit && (
              <p className="text-[11px] text-[#7A6A5C] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#C2512F]" />
                <span>
                  RLS Aktif: Staff hanya diizinkan mengubah penjualan miliknya di hari yang sama.
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Delete Dialog */}
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="Hapus Pesanan?"
          description={`Apakah Anda yakin ingin menghapus nota penjualan ${penjualan.nomor_invoice}? Data transaksi akan dihapus secara permanen.`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      </div>
    </AppLayout>
  );
}

export default function PenjualanDetailPage(props: PageProps) {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-[#7A6A5C]">Memuat nota pesanan...</div>}>
      <PenjualanDetailContent {...props} />
    </React.Suspense>
  );
}
