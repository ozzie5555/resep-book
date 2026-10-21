"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  UserPlus,
  Cookie,
  CreditCard,
  Check,
  Calendar,
  X,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataStore } from "@/lib/data-store";
import { formatRupiah } from "@/lib/utils";
import { Pelanggan, PenjualanItem, Resep, StatusPembayaran } from "@/types";

interface FormItem {
  id: string;
  resep_id?: string;
  nama_kue: string;
  jumlah: number;
  harga_satuan: number;
  subtotal: number;
}

export default function PenjualanBaruPage() {
  const router = useRouter();
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [resepList, setResepList] = useState<Resep[]>([]);

  // Form Fields
  const [tanggal, setTanggal] = useState("2026-10-21");
  const [selectedPelangganId, setSelectedPelangganId] = useState("");
  const [statusBayar, setStatusBayar] = useState<StatusPembayaran>("Lunas");
  const [jumlahDp, setJumlahDp] = useState<number>(0);
  const [catatan, setCatatan] = useState("");

  // Items
  const [items, setItems] = useState<FormItem[]>([
    {
      id: "it_1",
      resep_id: "c0000000-0000-0000-0000-000000000001",
      nama_kue: "Nastar Wijsman Lumer",
      jumlah: 1,
      harga_satuan: 125000,
      subtotal: 125000,
    },
  ]);

  // Inline New Customer State
  const [showInlineCust, setShowInlineCust] = useState(false);
  const [newCustNama, setNewCustNama] = useState("");
  const [newCustWa, setNewCustWa] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const custs = DataStore.getPelanggan();
    const reseps = DataStore.getResep();
    setPelangganList(custs);
    setResepList(reseps);
    if (custs.length > 0) {
      setSelectedPelangganId(custs[0].id);
    }
  }, []);

  // Update item field
  const updateItem = (id: string, updates: Partial<FormItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = { ...item, ...updates };
          next.subtotal = Number(next.jumlah) * Number(next.harga_satuan);
          return next;
        }
        return item;
      })
    );
  };

  const handleSelectResep = (itemId: string, resepId: string) => {
    const found = resepList.find((r) => r.id === resepId);
    if (found) {
      updateItem(itemId, {
        resep_id: found.id,
        nama_kue: found.nama,
        harga_satuan: found.harga_jual_default,
      });
    }
  };

  const addItem = () => {
    const defaultResep = resepList[0];
    const newItem: FormItem = {
      id: "it_" + Date.now(),
      resep_id: defaultResep?.id,
      nama_kue: defaultResep?.nama || "Kue Pilihan",
      jumlah: 1,
      harga_satuan: defaultResep?.harga_jual_default || 120000,
      subtotal: defaultResep?.harga_jual_default || 120000,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      toast.error("Minimal harus ada 1 item kue dalam pesanan");
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Inline Customer Creation
  const handleCreateInlineCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustNama.trim() || !newCustWa.trim()) {
      toast.error("Nama dan WhatsApp pelanggan wajib diisi");
      return;
    }
    try {
      const created = DataStore.addPelanggan(newCustNama, newCustWa);
      setPelangganList(DataStore.getPelanggan());
      setSelectedPelangganId(created.id);
      setShowInlineCust(false);
      setNewCustNama("");
      setNewCustWa("");
      toast.success(`Pelanggan baru ${created.nama} langsung dipilih`);
    } catch (err: any) {
      toast.error(err.message || "Gagal menambah pelanggan");
    }
  };

  const grandTotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPelangganId) {
      toast.error("Silakan pilih pelanggan terlebih dahulu");
      return;
    }
    if (items.length === 0) {
      toast.error("Minimal ada 1 item pesanan");
      return;
    }
    if (statusBayar === "DP" && (!jumlahDp || jumlahDp <= 0 || jumlahDp >= grandTotal)) {
      toast.error("Nominal DP harus lebih dari 0 dan kurang dari total pembayaran");
      return;
    }

    setIsSubmitting(true);
    try {
      const cust = pelangganList.find((p) => p.id === selectedPelangganId);
      const penjualanItems: PenjualanItem[] = items.map((it, idx) => ({
        id: "pi_" + Date.now() + "_" + idx,
        penjualan_id: "",
        resep_id: it.resep_id,
        nama_kue: it.nama_kue,
        jumlah: it.jumlah,
        harga_satuan: it.harga_satuan,
        subtotal: it.subtotal,
      }));

      const newPenjualan = DataStore.addPenjualan({
        tanggal,
        pelanggan_id: selectedPelangganId,
        pelanggan: cust,
        status_bayar: statusBayar,
        jumlah_dp: statusBayar === "DP" ? jumlahDp : 0,
        total: grandTotal,
        catatan,
        user_id: "",
        items: penjualanItems,
      });

      toast.success(`Pesanan ${newPenjualan.nomor_invoice} berhasil disimpan!`);
      router.push(`/penjualan/${newPenjualan.id}`);
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan pesanan");
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/penjualan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F50] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Penjualan</span>
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1F6F50]/10 text-[#1F6F50] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1F6F50]" />
            <span>Kasir Cepat &lt; 30 Detik</span>
          </span>
        </div>

        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#3B2A1E]">
            Catat Penjualan Baru
          </h1>
          <p className="text-sm text-[#7A6A5C]">
            Lengkapi data pesanan kue lebaran dengan cepat dan akurat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Tanggal & Pelanggan */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 md:p-6 space-y-4">
            <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2 border-b border-[#E8DFCC] pb-3">
              <Calendar className="w-5 h-5 text-[#1F6F50]" />
              <span>Tanggal & Pelanggan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-1">
                <label className="text-xs font-semibold text-[#3B2A1E]">Tanggal Transaksi</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none bg-white font-mono"
                  required
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#3B2A1E]">
                    Pilih Pelanggan <span className="text-[#B93A2E]">*</span>
                  </label>
                  {!showInlineCust && (
                    <button
                      type="button"
                      onClick={() => setShowInlineCust(true)}
                      className="text-xs font-bold text-[#1F6F50] hover:underline flex items-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Tambah Baru Inline</span>
                    </button>
                  )}
                </div>

                {!showInlineCust ? (
                  <select
                    value={selectedPelangganId}
                    onChange={(e) => setSelectedPelangganId(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none bg-white font-medium"
                    required
                  >
                    {pelangganList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama} ({p.whatsapp})
                      </option>
                    ))}
                  </select>
                ) : (
                  /* Inline Add Customer Form */
                  <div className="p-3.5 rounded-xl border-2 border-[#1F6F50]/30 bg-[#FBF6EC] space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F6F50]">
                        Input Cepat Pelanggan Baru:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowInlineCust(false)}
                        className="text-[#7A6A5C] hover:text-[#3B2A1E]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nama Pemesan"
                        value={newCustNama}
                        onChange={(e) => setNewCustNama(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-[#E8DFCC] text-xs bg-white outline-none"
                      />
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="081234xxx"
                          value={newCustWa}
                          onChange={(e) => setNewCustWa(e.target.value)}
                          className="w-full h-10 pl-8 pr-3 rounded-lg border border-[#E8DFCC] text-xs bg-white outline-none font-mono"
                        />
                        <Phone className="w-3.5 h-3.5 text-[#7A6A5C] absolute left-2.5 top-3" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCreateInlineCustomer}
                      className="w-full py-2 rounded-lg bg-[#1F6F50] hover:bg-[#17583F] text-white text-xs font-semibold"
                    >
                      Simpan & Pilih Langsung
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Item Kue & Jumlah */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
              <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2">
                <Cookie className="w-5 h-5 text-[#C8962E]" />
                <span>Item Kue Pesanan ({items.length})</span>
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="h-9 px-3 rounded-xl bg-[#FBF6EC] hover:bg-[#E8DFCC]/50 text-[#1F6F50] font-semibold text-xs flex items-center gap-1.5 border border-[#E8DFCC]"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Kue</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E8DFCC] bg-[#FBF6EC]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 w-full sm:w-auto">
                    <span className="text-[11px] font-bold text-[#7A6A5C] block mb-1">
                      Kue #{index + 1}
                    </span>
                    <select
                      value={item.resep_id}
                      onChange={(e) => handleSelectResep(item.id, e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-[#E8DFCC] text-sm font-semibold bg-white outline-none"
                    >
                      {resepList.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nama} ({formatRupiah(r.harga_jual_default)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Stepper Jumlah */}
                    <div>
                      <span className="text-[11px] font-bold text-[#7A6A5C] block mb-1">
                        Jumlah (Toples)
                      </span>
                      <div className="flex items-center border border-[#E8DFCC] bg-white rounded-xl overflow-hidden h-11">
                        <button
                          type="button"
                          onClick={() => updateItem(item.id, { jumlah: Math.max(1, item.jumlah - 1) })}
                          className="w-10 h-full flex items-center justify-center font-bold text-base hover:bg-[#FBF6EC] text-[#3B2A1E]"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.jumlah}
                          onChange={(e) =>
                            updateItem(item.id, { jumlah: Math.max(1, parseInt(e.target.value) || 1) })
                          }
                          className="w-12 text-center text-sm font-bold text-[#3B2A1E] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => updateItem(item.id, { jumlah: item.jumlah + 1 })}
                          className="w-10 h-full flex items-center justify-center font-bold text-base hover:bg-[#FBF6EC] text-[#3B2A1E]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[100px]">
                      <span className="text-[11px] font-bold text-[#7A6A5C] block mb-1">
                        Subtotal
                      </span>
                      <span className="text-sm font-bold text-[#1F6F50] font-heading block h-11 flex items-center justify-end">
                        {formatRupiah(item.subtotal)}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#7A6A5C] hover:text-[#B93A2E] rounded-lg mt-4 sm:mt-0"
                      title="Hapus Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Status Bayar & Catatan */}
          <div className="bg-white rounded-2xl border border-[#E8DFCC] shadow-warm-sm p-5 md:p-6 space-y-4">
            <h2 className="font-heading text-base font-bold text-[#3B2A1E] flex items-center gap-2 border-b border-[#E8DFCC] pb-3">
              <CreditCard className="w-5 h-5 text-[#1F6F50]" />
              <span>Status Pembayaran & Catatan</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#3B2A1E] block mb-2">
                  Status Pembayaran Saat Ini
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatusBayar("Lunas")}
                    className={`h-12 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      statusBayar === "Lunas"
                        ? "bg-[#2E8B57] text-white border-[#2E8B57] shadow-sm"
                        : "bg-white text-[#7A6A5C] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                    }`}
                  >
                    {statusBayar === "Lunas" && <Check className="w-4 h-4" />}
                    <span>Lunas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusBayar("DP")}
                    className={`h-12 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      statusBayar === "DP"
                        ? "bg-[#D99A00] text-white border-[#D99A00] shadow-sm"
                        : "bg-white text-[#7A6A5C] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                    }`}
                  >
                    {statusBayar === "DP" && <Check className="w-4 h-4" />}
                    <span>DP (Uang Muka)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusBayar("Belum lunas")}
                    className={`h-12 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      statusBayar === "Belum lunas"
                        ? "bg-[#B93A2E] text-white border-[#B93A2E] shadow-sm"
                        : "bg-white text-[#7A6A5C] border-[#E8DFCC] hover:bg-[#FBF6EC]"
                    }`}
                  >
                    {statusBayar === "Belum lunas" && <Check className="w-4 h-4" />}
                    <span>Belum Lunas</span>
                  </button>
                </div>
              </div>

              {/* Jumlah DP input if DP selected */}
              {statusBayar === "DP" && (
                <div className="p-4 rounded-xl bg-[#FDF6E2] border border-[#F4DB96] space-y-2 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#9E7000]">
                      Nominal DP yang Diterima (Rp)
                    </label>
                    <span className="text-xs font-semibold text-[#7A6A5C]">
                      Sisa: {formatRupiah(Math.max(0, grandTotal - jumlahDp))}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={jumlahDp || ""}
                    onChange={(e) => setJumlahDp(Number(e.target.value))}
                    placeholder="Contoh: 200000"
                    className="w-full h-12 px-3 rounded-xl border border-[#F4DB96] text-sm font-bold text-[#3B2A1E] bg-white outline-none"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3B2A1E]">Catatan Pesanan</label>
                <input
                  type="text"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: Kirim jam 13.00 WIB, packing mika pita emas, dll."
                  className="w-full h-12 px-3 rounded-xl border border-[#E8DFCC] text-sm focus:border-[#1F6F50] focus:ring-1 focus:ring-[#1F6F50] outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* Sticky Bottom Save Action */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFCC] py-3.5 px-4 md:px-8 shadow-xl">
            <div className="w-full flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7A6A5C] block">Total Pembayaran:</span>
                <span className="text-xl md:text-2xl font-bold text-[#1F6F50] font-heading block">
                  {formatRupiah(grandTotal)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/penjualan"
                  className="px-4 py-3 rounded-xl border border-[#E8DFCC] text-sm font-medium text-[#3B2A1E] hover:bg-[#FBF6EC]"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-6 rounded-xl bg-[#C8962E] hover:bg-[#b58525] text-white font-semibold text-sm shadow-warm-fab active:scale-95 transition-all flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{isSubmitting ? "Menyimpan..." : "Simpan Pesanan"}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
