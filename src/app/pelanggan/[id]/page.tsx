"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Receipt,
  Calendar,
  Award,
  Phone,
  Clock,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataStore } from "@/lib/data-store";
import { formatRupiah, formatTanggal, formatWhatsapp } from "@/lib/utils";
import { Pelanggan, Penjualan } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function PelangganDetailContent({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [pelanggan, setPelanggan] = useState<Pelanggan | null>(null);
  const [riwayatPenjualan, setRiwayatPenjualan] = useState<Penjualan[]>([]);

  useEffect(() => {
    const cust = DataStore.getPelangganById(id);
    if (!cust) {
      router.push("/pelanggan");
      return;
    }
    setPelanggan(cust);

    const allPenjualan = DataStore.getPenjualan();
    const orders = allPenjualan.filter((p) => p.pelanggan_id === id);
    setRiwayatPenjualan(orders);
  }, [id, router]);

  if (!pelanggan) return null;

  const totalBelanja = riwayatPenjualan.reduce((sum, p) => sum + p.total, 0);
  const isLangganan = riwayatPenjualan.length >= 2 || totalBelanja >= 1000000;
  const waPhone = formatWhatsapp(pelanggan.whatsapp);
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Halo ${pelanggan.nama}, terima kasih telah mempercayakan pesanan kue lebaran di Dapur Lebaran!`
  )}`;

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Back navigation */}
        <Link
          href="/pelanggan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F50] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Data Pelanggan</span>
        </Link>

        {/* Customer Header Card */}
        <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8DFCC] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-[#3B2A1E]">
                  {pelanggan.nama}
                </h1>
                {isLangganan && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FDF6E2] text-[#9E7000] border border-[#F4DB96]">
                    <Award className="w-3.5 h-3.5 text-[#9E7000]" />
                    <span>Pelanggan Langganan</span>
                  </span>
                )}
              </div>
              <p className="text-sm font-mono text-[#7A6A5C] flex items-center gap-1.5 mt-1">
                <Phone className="w-4 h-4 text-[#1F6F50]" />
                <span>{pelanggan.whatsapp}</span>
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC]/60">
              <span className="text-xs text-[#7A6A5C] block">Total Belanja</span>
              <span className="text-xl font-bold text-[#1F6F50] font-heading mt-1 block">
                {formatRupiah(totalBelanja)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC]/60">
              <span className="text-xs text-[#7A6A5C] block">Jumlah Pesanan</span>
              <span className="text-xl font-bold text-[#3B2A1E] font-heading mt-1 block">
                {riwayatPenjualan.length} Pesanan
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFCC]/60">
              <span className="text-xs text-[#7A6A5C] block">Terdaftar Sejak</span>
              <span className="text-sm font-semibold text-[#3B2A1E] mt-1 block">
                {formatTanggal(pelanggan.created_at)}
              </span>
            </div>
          </div>

          {pelanggan.catatan && (
            <div className="bg-[#FBF6EC] p-3 rounded-xl border border-[#E8DFCC] text-xs text-[#7A6A5C]">
              <span className="font-semibold text-[#3B2A1E] block mb-0.5">Catatan Khusus:</span>
              {pelanggan.catatan}
            </div>
          )}
        </div>

        {/* Purchase History List */}
        <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
            <h2 className="font-heading text-lg font-bold text-[#3B2A1E] flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#1F6F50]" />
              <span>Riwayat Pesanan ({riwayatPenjualan.length})</span>
            </h2>
            <Link
              href="/penjualan/baru"
              className="text-xs font-semibold text-[#1F6F50] hover:underline"
            >
              + Buat Pesanan Baru
            </Link>
          </div>

          <div className="space-y-3">
            {riwayatPenjualan.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-[#E8DFCC] hover:border-[#1F6F50] transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#1F6F50]">
                      {p.nomor_invoice}
                    </span>
                    <StatusBadge status={p.status_bayar} jumlahDp={p.jumlah_dp} />
                    <span className="text-xs text-[#7A6A5C] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatTanggal(p.tanggal)}
                    </span>
                  </div>
                  <div className="text-xs text-[#3B2A1E] font-medium mt-1.5 flex flex-wrap gap-2">
                    {p.items.map((it) => (
                      <span key={it.id} className="bg-[#FBF6EC] px-2 py-0.5 rounded-md border border-[#E8DFCC]/60">
                        {it.jumlah}x {it.nama_kue} ({formatRupiah(it.subtotal)})
                      </span>
                    ))}
                  </div>
                  {p.catatan && (
                    <p className="text-[11px] text-[#7A6A5C] flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-[#1F6F50]" />
                      <span>{p.catatan}</span>
                    </p>
                  )}
                </div>

                <div className="text-right sm:self-center shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 pt-2 sm:pt-0">
                  <span className="text-base font-bold text-[#1F6F50] block font-heading">
                    {formatRupiah(p.total)}
                  </span>
                  <Link
                    href={`/penjualan/${p.id}`}
                    className="mt-1 text-xs px-3 py-1.5 rounded-lg bg-[#1F6F50] text-white hover:bg-[#17583F] font-medium transition-colors"
                  >
                    Detail Nota
                  </Link>
                </div>
              </div>
            ))}

            {riwayatPenjualan.length === 0 && (
              <p className="text-center py-8 text-sm text-[#7A6A5C]">
                Belum ada catatan pesanan untuk pelanggan ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function PelangganDetailPage(props: PageProps) {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-[#7A6A5C]">Memuat data pelanggan...</div>}>
      <PelangganDetailContent {...props} />
    </React.Suspense>
  );
}
