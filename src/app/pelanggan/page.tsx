"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  MessageCircle,
  Award,
  Trash2,
  Edit2,
  Receipt,
  X,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser, usePelangganList, usePenjualanList } from "@/lib/use-store";
import { formatRupiah, formatWhatsapp } from "@/lib/utils";
import { Pelanggan } from "@/types";

export default function PelangganPage() {
  const pelangganList = usePelangganList();
  const penjualanList = usePenjualanList();
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPelanggan, setEditingPelanggan] = useState<Pelanggan | null>(null);
  const [formData, setFormData] = useState({ nama: "", whatsapp: "", catatan: "" });

  // Delete Confirm State
  const [deleteTarget, setDeleteTarget] = useState<Pelanggan | null>(null);

  const isOwner = currentUser.role === "owner";

  // Filter list
  const filtered = pelangganList.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.nama.toLowerCase().includes(q) || p.whatsapp.includes(q);
  });

  // Calculate metrics per customer
  const getCustomerMetrics = (pelangganId: string) => {
    const orders = penjualanList.filter((p) => p.pelanggan_id === pelangganId);
    const totalBelanja = orders.reduce((sum, p) => sum + p.total, 0);
    const isLangganan = orders.length >= 2 || totalBelanja >= 1000000;
    return { count: orders.length, totalBelanja, isLangganan };
  };

  const handleOpenAdd = () => {
    setEditingPelanggan(null);
    setFormData({ nama: "", whatsapp: "", catatan: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Pelanggan) => {
    setEditingPelanggan(p);
    setFormData({ nama: p.nama, whatsapp: p.whatsapp, catatan: p.catatan || "" });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.whatsapp.trim()) {
      toast.error("Nama dan nomor WhatsApp wajib diisi");
      return;
    }

    try {
      if (editingPelanggan) {
        DataStore.updatePelanggan(
          editingPelanggan.id,
          formData.nama,
          formData.whatsapp,
          formData.catatan
        );
        toast.success(`Data pelanggan ${formData.nama} berhasil diperbarui`);
      } else {
        DataStore.addPelanggan(formData.nama, formData.whatsapp, formData.catatan);
        toast.success(`Pelanggan baru ${formData.nama} berhasil ditambahkan`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan data pelanggan");
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    try {
      DataStore.deletePelanggan(deleteTarget.id);
      toast.success(`Pelanggan ${deleteTarget.nama} berhasil dihapus`);
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus pelanggan");
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
              Data Pelanggan & Kontak
            </h1>
            <p className="text-sm text-[#7A6A5C] mt-0.5">
              Daftar pemesan kue lebaran, riwayat belanja toples, dan nomor WhatsApp valid.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="h-11 px-5 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>+ Tambah Pelanggan</span>
          </button>
        </div>

        {/* 3 Bento Stat Cards (Membentang Penuh) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Total Pelanggan
              </span>
              <span className="text-2xl font-bold text-[#1F6F50] font-heading mt-1 block">
                {pelangganList.length} Kontak
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1F6F50]/10 text-[#1F6F50] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Pernah Memesan
              </span>
              <span className="text-2xl font-bold text-[#C8962E] font-heading mt-1 block">
                {new Set(penjualanList.map((p) => p.pelanggan_id)).size} Pelanggan
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C8962E]/10 text-[#C8962E] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCC] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7A6A5C] uppercase tracking-wider block">
                Total Transaksi
              </span>
              <span className="text-2xl font-bold text-[#3B2A1E] font-heading mt-1 block">
                {penjualanList.length} Nota Idul Fitri
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Full-width Search Bar */}
        <div className="w-full bg-white p-3.5 rounded-2xl border border-[#E8DFCC] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau nomor WhatsApp..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E8DFCC] text-sm bg-[#FDFBF7] focus:bg-white focus:border-[#1F6F50] outline-none transition-all"
            />
            <Search className="w-4 h-4 text-[#7A6A5C] absolute left-3.5 top-3" />
          </div>
          <span className="text-xs text-[#7A6A5C] px-2 font-medium">
            Menampilkan {filtered.length} dari {pelangganList.length} pelanggan
          </span>
        </div>

        {/* Pelanggan Grid (Full Width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {filtered.map((p) => {
            const { count, totalBelanja, isLangganan } = getCustomerMetrics(p.id);
            const waPhone = formatWhatsapp(p.whatsapp);
            const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
              `Halo ${p.nama}, terima kasih telah memesan kue di Dapur Lebaran!`
            )}`;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 flex flex-col justify-between hover:border-[#1F6F50] transition-colors relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-heading text-base font-bold text-[#3B2A1E]">
                          {p.nama}
                        </h2>
                        {isLangganan && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF6E2] text-[#9E7000] border border-[#F4DB96]">
                            <Award className="w-3 h-3 text-[#9E7000]" />
                            <span>Langganan</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-[#7A6A5C] mt-0.5">{p.whatsapp}</p>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors shadow-xs"
                      title="Chat WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                  {p.catatan && (
                    <p className="text-xs text-[#7A6A5C] bg-[#FBF6EC] p-2.5 rounded-xl border border-[#E8DFCC]/60 mb-3">
                      {p.catatan}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-[#E8DFCC]/60">
                    <div>
                      <span className="text-[#7A6A5C] block">Total Pesanan</span>
                      <span className="font-semibold text-[#3B2A1E] flex items-center gap-1 mt-0.5">
                        <Receipt className="w-3.5 h-3.5 text-[#1F6F50]" />
                        <span>{count} Transaksi</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7A6A5C] block">Total Belanja</span>
                      <span className="font-bold text-[#1F6F50] block mt-0.5">
                        {formatRupiah(totalBelanja)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DFCC] flex items-center justify-between mt-3 text-xs">
                  <Link
                    href={`/pelanggan/${p.id}`}
                    className="font-semibold text-[#1F6F50] hover:underline"
                  >
                    Lihat Riwayat Beli →
                  </Link>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg hover:bg-[#FBF6EC] text-[#7A6A5C] hover:text-[#3B2A1E]"
                      title="Ubah"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 rounded-lg hover:bg-[#FBEBE9] text-[#B93A2E]"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#E8DFCC] p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-[#7A6A5C] mx-auto opacity-50" />
            <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
              Tidak Ada Pelanggan Ditemukan
            </h3>
            <p className="text-sm text-[#7A6A5C]">
              Coba kata kunci lain atau tambahkan pelanggan baru.
            </p>
          </div>
        )}

        {/* Modal Tambah/Edit Pelanggan */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-5">
              <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
                <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">
                  {editingPelanggan ? "Edit Data Pelanggan" : "Tambah Pelanggan Baru"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C] hover:text-[#3B2A1E]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Nama Pelanggan <span className="text-[#B93A2E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: Ibu Fatimah"
                    className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Nomor WhatsApp <span className="text-[#B93A2E]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="08123456789 (otomatis format 628xx)"
                      className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E8DFCC] text-sm font-mono focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none"
                    />
                    <Phone className="w-4 h-4 text-[#7A6A5C] absolute left-3 top-3.5" />
                  </div>
                  <p className="text-[11px] text-[#7A6A5C]">
                    Nomor `08xx` akan otomatis diubah ke `628xx` untuk koneksi chat WA.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2A1E]">Catatan Khusus</label>
                  <textarea
                    rows={2}
                    value={formData.catatan}
                    onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                    placeholder="Alamat, preferensi kue, catatan kemasan..."
                    className="w-full p-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#E8DFCC] text-sm font-medium text-[#3B2A1E] hover:bg-[#FBF6EC]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#1F6F50] hover:bg-[#17583F] text-white text-sm font-semibold transition-colors"
                  >
                    Simpan Pelanggan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dialog Konfirmasi Hapus */}
        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Hapus Pelanggan?"
          description={`Apakah Anda yakin ingin menghapus pelanggan "${deleteTarget?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AppLayout>
  );
}
