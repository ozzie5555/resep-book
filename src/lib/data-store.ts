"use client";

import { Bahan, Pelanggan, Penjualan, Profile, Resep, UserRole } from "@/types";

// SEED DATA SESUAI PRD
export const INITIAL_PROFILES: Profile[] = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    email: "owner@dapurlebaran.id",
    nama: "Ibu Nur Laila",
    role: "owner",
    aktif: true,
    created_at: "2026-10-01T00:00:00Z",
  },
  {
    id: "a0000000-0000-0000-0000-000000000002",
    email: "staff@dapurlebaran.id",
    nama: "Budi Santoso",
    role: "staff",
    aktif: true,
    created_at: "2026-10-05T00:00:00Z",
  },
];

export const INITIAL_BAHAN: Bahan[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    nama: "Butter Wijsman Canned",
    stok: 3.5,
    satuan: "kg",
    stok_minimum: 10.0,
    harga_beli_terakhir: 315000,
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T09:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    nama: "Keju Edam Tua (Ayam Mas)",
    stok: 2.1,
    satuan: "kg",
    stok_minimum: 5.0,
    harga_beli_terakhir: 240000,
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T09:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    nama: "Tepung Terigu Protein Rendah",
    stok: 25.0,
    satuan: "kg",
    stok_minimum: 10.0,
    harga_beli_terakhir: 14000,
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T09:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    nama: "Selai Nanas Homemade Blitar",
    stok: 12.0,
    satuan: "kg",
    stok_minimum: 5.0,
    harga_beli_terakhir: 65000,
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T09:00:00Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    nama: "Kacang Mede Panggang Cincang",
    stok: 8.0,
    satuan: "kg",
    stok_minimum: 5.0,
    harga_beli_terakhir: 165000,
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T09:00:00Z",
  },
];

export const INITIAL_RESEP: Resep[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    nama: "Nastar Wijsman Lumer",
    foto: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop&q=80",
    porsi_default: 1,
    harga_jual_default: 125000,
    deskripsi: "Nastar premium mentega Wijsman dengan selai nanas asli asam manis lumer di mulut.",
    bahan: [
      { id: "rb1", resep_id: "c0000000-0000-0000-0000-000000000001", bahan_id: "b0000000-0000-0000-0000-000000000001", nama_bahan: "Butter Wijsman Canned", takaran: 250, satuan: "gram" },
      { id: "rb2", resep_id: "c0000000-0000-0000-0000-000000000001", bahan_id: "b0000000-0000-0000-0000-000000000003", nama_bahan: "Tepung Terigu Protein Rendah", takaran: 350, satuan: "gram" },
      { id: "rb3", resep_id: "c0000000-0000-0000-0000-000000000001", bahan_id: "b0000000-0000-0000-0000-000000000004", nama_bahan: "Selai Nanas Homemade Blitar", takaran: 300, satuan: "gram" },
    ],
    langkah: [
      { id: "rl1", resep_id: "c0000000-0000-0000-0000-000000000001", nomor_langkah: 1, instruksi: "Kocok butter Wijsman dan gula halus dengan mixer kecepatan rendah selama 1-2 menit saja hingga lembut.", durasi_menit: 2 },
      { id: "rl2", resep_id: "c0000000-0000-0000-0000-000000000001", nomor_langkah: 2, instruksi: "Masukkan kuning telur satu per satu sambil diaduk rata menggunakan spatula kayu.", durasi_menit: 3 },
      { id: "rl3", resep_id: "c0000000-0000-0000-0000-000000000001", nomor_langkah: 3, instruksi: "Ayak tepung terigu dan susu bubuk ke dalam adonan, aduk perlahan dengan gerakan melipat hingga kalis.", durasi_menit: 5 },
      { id: "rl4", resep_id: "c0000000-0000-0000-0000-000000000001", nomor_langkah: 4, instruksi: "Bentuk adonan menjadi bulatan 7 gram, pipihkan dan beri isian selai nanas 4 gram. Bulatkan kembali secara rapat.", durasi_menit: 15 },
      { id: "rl5", resep_id: "c0000000-0000-0000-0000-000000000001", nomor_langkah: 5, instruksi: "Panggang dalam oven suhu 140°C selama 25 menit. Keluarkan, oles kuning telur, lalu panggang lagi 10 menit hingga keemasan.", durasi_menit: 35 },
    ],
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T00:00:00Z",
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    nama: "Kastengel Keju Edam Renyah",
    foto: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    porsi_default: 1,
    harga_jual_default: 135000,
    deskripsi: "Kastengel gurih klasik menggunakan 100% keju edam tua dengan taburan cheddar renyah.",
    bahan: [
      { id: "rb4", resep_id: "c0000000-0000-0000-0000-000000000002", bahan_id: "b0000000-0000-0000-0000-000000000001", nama_bahan: "Butter Wijsman Canned", takaran: 200, satuan: "gram" },
      { id: "rb5", resep_id: "c0000000-0000-0000-0000-000000000002", bahan_id: "b0000000-0000-0000-0000-000000000002", nama_bahan: "Keju Edam Tua (Ayam Mas)", takaran: 200, satuan: "gram" },
      { id: "rb6", resep_id: "c0000000-0000-0000-0000-000000000002", bahan_id: "b0000000-0000-0000-0000-000000000003", nama_bahan: "Tepung Terigu Protein Rendah", takaran: 250, satuan: "gram" },
    ],
    langkah: [
      { id: "rl6", resep_id: "c0000000-0000-0000-0000-000000000002", nomor_langkah: 1, instruksi: "Kocok butter dan kuning telur hingga lembut merata.", durasi_menit: 3 },
      { id: "rl7", resep_id: "c0000000-0000-0000-0000-000000000002", nomor_langkah: 2, instruksi: "Masukkan parutan keju edam tua yang sudah diangin-anginkan agar renyah, aduk dengan spatula.", durasi_menit: 4 },
      { id: "rl8", resep_id: "c0000000-0000-0000-0000-000000000002", nomor_langkah: 3, instruksi: "Masukkan tepung terigu dan maizena secara bertahap hingga adonan kalis dan bisa digilas.", durasi_menit: 5 },
      { id: "rl9", resep_id: "c0000000-0000-0000-0000-000000000002", nomor_langkah: 4, instruksi: "Gilas setebal 0.8 cm, potong balok panjang 4 cm, oles kuning telur dan beri taburan keju cheddar parut.", durasi_menit: 15 },
      { id: "rl10", resep_id: "c0000000-0000-0000-0000-000000000002", nomor_langkah: 5, instruksi: "Panggang pada suhu 130°C hingga keju keemasan dan matang garing (sekitar 35 menit).", durasi_menit: 35 },
    ],
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T00:00:00Z",
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    nama: "Putri Salju Mede Lembut",
    foto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    porsi_default: 1,
    harga_jual_default: 115000,
    deskripsi: "Kue putri salju dengan paduan gurih kacang mede panggang dan taburan gula dingin halus.",
    bahan: [
      { id: "rb7", resep_id: "c0000000-0000-0000-0000-000000000003", bahan_id: "b0000000-0000-0000-0000-000000000001", nama_bahan: "Butter Wijsman Canned", takaran: 200, satuan: "gram" },
      { id: "rb8", resep_id: "c0000000-0000-0000-0000-000000000003", bahan_id: "b0000000-0000-0000-0000-000000000003", nama_bahan: "Tepung Terigu Protein Rendah", takaran: 250, satuan: "gram" },
      { id: "rb9", resep_id: "c0000000-0000-0000-0000-000000000003", bahan_id: "b0000000-0000-0000-0000-000000000005", nama_bahan: "Kacang Mede Panggang Cincang", takaran: 150, satuan: "gram" },
    ],
    langkah: [
      { id: "rl11", resep_id: "c0000000-0000-0000-0000-000000000003", nomor_langkah: 1, instruksi: "Kocok butter dan gula bubuk hingga pucat lembut merata.", durasi_menit: 3 },
      { id: "rl12", resep_id: "c0000000-0000-0000-0000-000000000003", nomor_langkah: 2, instruksi: "Masukkan bubuk kacang mede panggang yang sudah dihaluskan, aduk rata.", durasi_menit: 4 },
      { id: "rl13", resep_id: "c0000000-0000-0000-0000-000000000003", nomor_langkah: 3, instruksi: "Tambahkan tepung terigu yang diayak, aduk hingga adonan kalis lembut.", durasi_menit: 5 },
      { id: "rl14", resep_id: "c0000000-0000-0000-0000-000000000003", nomor_langkah: 4, instruksi: "Gilas dan cetak adonan menjadi bentuk bulan sabit klasik dengan rapi.", durasi_menit: 10 },
      { id: "rl15", resep_id: "c0000000-0000-0000-0000-000000000003", nomor_langkah: 5, instruksi: "Panggang suhu 140°C selama 20 menit. Saat masih hangat, balur segera dengan gula halus dingin.", durasi_menit: 25 },
    ],
    created_at: "2026-10-01T00:00:00Z",
    updated_at: "2026-10-21T00:00:00Z",
  },
];

export const INITIAL_PELANGGAN: Pelanggan[] = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    nama: "Bu Siti Rahayu",
    whatsapp: "6281244558899",
    catatan: "Langganan komplek perumahan Rafles, suka nastar matang kering.",
    created_at: "2026-10-10T00:00:00Z",
    updated_at: "2026-10-21T09:15:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    nama: "dr. Maya Anggraini",
    whatsapp: "6281399887766",
    catatan: "Dokter RSUD, pesan hamper eksklusif untuk kolega dokter.",
    created_at: "2026-10-12T00:00:00Z",
    updated_at: "2026-10-20T14:00:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    nama: "Pak Hendra Gunawan",
    whatsapp: "6281234567890",
    catatan: "Kantor BUMN, minta nota bertanda tangan untuk klaim kantor.",
    created_at: "2026-10-14T00:00:00Z",
    updated_at: "2026-10-21T10:40:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    nama: "Ibu Ratna Kartika",
    whatsapp: "6281987654321",
    catatan: "Suka packaging pita merah emas, minta dikirim pagi.",
    created_at: "2026-10-15T00:00:00Z",
    updated_at: "2026-10-21T11:20:00Z",
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    nama: "Bpk. Agus Setiawan",
    whatsapp: "6285211223344",
    catatan: "Pesanan keluarga besar, minta toples kaca tebal.",
    created_at: "2026-10-15T00:00:00Z",
    updated_at: "2026-10-19T16:30:00Z",
  },
];

export const INITIAL_PENJUALAN: Penjualan[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    nomor_invoice: "#INV-20261021-01",
    tanggal: "2026-10-21",
    pelanggan_id: "d0000000-0000-0000-0000-000000000001",
    pelanggan: INITIAL_PELANGGAN[0],
    status_bayar: "Lunas",
    jumlah_dp: 0,
    total: 645000,
    catatan: "Kirim via Gosend Instant jam 13.00 WIB",
    user_id: "a0000000-0000-0000-0000-000000000001",
    user_nama: "Ibu Nur Laila",
    items: [
      { id: "pi1", penjualan_id: "e0000000-0000-0000-0000-000000000001", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 3, harga_satuan: 125000, subtotal: 375000 },
      { id: "pi2", penjualan_id: "e0000000-0000-0000-0000-000000000001", resep_id: "c0000000-0000-0000-0000-000000000002", nama_kue: "Kastengel Keju Edam Renyah", jumlah: 2, harga_satuan: 135000, subtotal: 270000 },
    ],
    created_at: "2026-10-21T09:15:00Z",
    updated_at: "2026-10-21T09:15:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    nomor_invoice: "#INV-20261021-02",
    tanggal: "2026-10-21",
    pelanggan_id: "d0000000-0000-0000-0000-000000000003",
    pelanggan: INITIAL_PELANGGAN[2],
    status_bayar: "DP",
    jumlah_dp: 200000,
    total: 575000,
    catatan: "DP via transfer BCA, pelunasan saat ambil H-3 Lebaran",
    user_id: "a0000000-0000-0000-0000-000000000002",
    user_nama: "Budi Santoso",
    items: [
      { id: "pi3", penjualan_id: "e0000000-0000-0000-0000-000000000002", resep_id: "c0000000-0000-0000-0000-000000000003", nama_kue: "Putri Salju Mede Lembut", jumlah: 5, harga_satuan: 115000, subtotal: 575000 },
    ],
    created_at: "2026-10-21T10:40:00Z",
    updated_at: "2026-10-21T10:40:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    nomor_invoice: "#INV-20261021-03",
    tanggal: "2026-10-21",
    pelanggan_id: "d0000000-0000-0000-0000-000000000004",
    pelanggan: INITIAL_PELANGGAN[3],
    status_bayar: "Belum lunas",
    jumlah_dp: 0,
    total: 250000,
    catatan: "Sudah di-chat WhatsApp untuk konfirmasi pesanan",
    user_id: "a0000000-0000-0000-0000-000000000002",
    user_nama: "Budi Santoso",
    items: [
      { id: "pi4", penjualan_id: "e0000000-0000-0000-0000-000000000003", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 2, harga_satuan: 125000, subtotal: 250000 },
    ],
    created_at: "2026-10-21T11:20:00Z",
    updated_at: "2026-10-21T11:20:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    nomor_invoice: "#INV-20261020-01",
    tanggal: "2026-10-20",
    pelanggan_id: "d0000000-0000-0000-0000-000000000002",
    pelanggan: INITIAL_PELANGGAN[1],
    status_bayar: "Lunas",
    jumlah_dp: 0,
    total: 1040000,
    catatan: "Ambil di dapur langsung",
    user_id: "a0000000-0000-0000-0000-000000000001",
    user_nama: "Ibu Nur Laila",
    items: [
      { id: "pi5", penjualan_id: "e0000000-0000-0000-0000-000000000004", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 4, harga_satuan: 125000, subtotal: 500000 },
      { id: "pi6", penjualan_id: "e0000000-0000-0000-0000-000000000004", resep_id: "c0000000-0000-0000-0000-000000000002", nama_kue: "Kastengel Keju Edam Renyah", jumlah: 4, harga_satuan: 135000, subtotal: 540000 },
    ],
    created_at: "2026-10-20T14:00:00Z",
    updated_at: "2026-10-20T14:00:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000005",
    nomor_invoice: "#INV-20261019-01",
    tanggal: "2026-10-19",
    pelanggan_id: "d0000000-0000-0000-0000-000000000005",
    pelanggan: INITIAL_PELANGGAN[4],
    status_bayar: "Lunas",
    jumlah_dp: 0,
    total: 750000,
    catatan: "Packing kardus tebal untuk dibawa ke luar kota",
    user_id: "a0000000-0000-0000-0000-000000000001",
    user_nama: "Ibu Nur Laila",
    items: [
      { id: "pi7", penjualan_id: "e0000000-0000-0000-0000-000000000005", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 6, harga_satuan: 125000, subtotal: 750000 },
    ],
    created_at: "2026-10-19T16:30:00Z",
    updated_at: "2026-10-19T16:30:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000006",
    nomor_invoice: "#INV-20261019-02",
    tanggal: "2026-10-19",
    pelanggan_id: "d0000000-0000-0000-0000-000000000001",
    pelanggan: INITIAL_PELANGGAN[0],
    status_bayar: "DP",
    jumlah_dp: 300000,
    total: 675000,
    catatan: "Tambahan pesanan untuk tetangga",
    user_id: "a0000000-0000-0000-0000-000000000002",
    user_nama: "Budi Santoso",
    items: [
      { id: "pi8", penjualan_id: "e0000000-0000-0000-0000-000000000006", resep_id: "c0000000-0000-0000-0000-000000000002", nama_kue: "Kastengel Keju Edam Renyah", jumlah: 5, harga_satuan: 135000, subtotal: 675000 },
    ],
    created_at: "2026-10-19T17:15:00Z",
    updated_at: "2026-10-19T17:15:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000007",
    nomor_invoice: "#INV-20261018-01",
    tanggal: "2026-10-18",
    pelanggan_id: "d0000000-0000-0000-0000-000000000002",
    pelanggan: INITIAL_PELANGGAN[1],
    status_bayar: "Lunas",
    jumlah_dp: 0,
    total: 345000,
    catatan: "Pesanan pribadi dr. Maya",
    user_id: "a0000000-0000-0000-0000-000000000001",
    user_nama: "Ibu Nur Laila",
    items: [
      { id: "pi9", penjualan_id: "e0000000-0000-0000-0000-000000000007", resep_id: "c0000000-0000-0000-0000-000000000003", nama_kue: "Putri Salju Mede Lembut", jumlah: 3, harga_satuan: 115000, subtotal: 345000 },
    ],
    created_at: "2026-10-18T10:00:00Z",
    updated_at: "2026-10-18T10:00:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000008",
    nomor_invoice: "#INV-20261017-01",
    tanggal: "2026-10-17",
    pelanggan_id: "d0000000-0000-0000-0000-000000000005",
    pelanggan: INITIAL_PELANGGAN[4],
    status_bayar: "Belum lunas",
    jumlah_dp: 0,
    total: 405000,
    catatan: "COD saat pengiriman hari Sabtu",
    user_id: "a0000000-0000-0000-0000-000000000002",
    user_nama: "Budi Santoso",
    items: [
      { id: "pi10", penjualan_id: "e0000000-0000-0000-0000-000000000008", resep_id: "c0000000-0000-0000-0000-000000000002", nama_kue: "Kastengel Keju Edam Renyah", jumlah: 3, harga_satuan: 135000, subtotal: 405000 },
    ],
    created_at: "2026-10-17T11:30:00Z",
    updated_at: "2026-10-17T11:30:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000009",
    nomor_invoice: "#INV-20261016-01",
    tanggal: "2026-10-16",
    pelanggan_id: "d0000000-0000-0000-0000-000000000003",
    pelanggan: INITIAL_PELANGGAN[2],
    status_bayar: "Lunas",
    jumlah_dp: 0,
    total: 500000,
    catatan: "Pesanan direksi kantor",
    user_id: "a0000000-0000-0000-0000-000000000001",
    user_nama: "Ibu Nur Laila",
    items: [
      { id: "pi11", penjualan_id: "e0000000-0000-0000-0000-000000000009", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 4, harga_satuan: 125000, subtotal: 500000 },
    ],
    created_at: "2026-10-16T08:45:00Z",
    updated_at: "2026-10-16T08:45:00Z",
  },
  {
    id: "e0000000-0000-0000-0000-000000000010",
    nomor_invoice: "#INV-20261015-01",
    tanggal: "2026-10-15",
    pelanggan_id: "d0000000-0000-0000-0000-000000000004",
    pelanggan: INITIAL_PELANGGAN[3],
    status_bayar: "DP",
    jumlah_dp: 100000,
    total: 375000,
    catatan: "DP via transfer, pelunasan saat kirim",
    user_id: "a0000000-0000-0000-0000-000000000002",
    user_nama: "Budi Santoso",
    items: [
      { id: "pi12", penjualan_id: "e0000000-0000-0000-0000-000000000010", resep_id: "c0000000-0000-0000-0000-000000000001", nama_kue: "Nastar Wijsman Lumer", jumlah: 1, harga_satuan: 125000, subtotal: 125000 },
      { id: "pi13", penjualan_id: "e0000000-0000-0000-0000-000000000010", resep_id: "c0000000-0000-0000-0000-000000000002", nama_kue: "Kastengel Keju Edam Renyah", jumlah: 1, harga_satuan: 135000, subtotal: 135000 },
      { id: "pi14", penjualan_id: "e0000000-0000-0000-0000-000000000010", resep_id: "c0000000-0000-0000-0000-000000000003", nama_kue: "Putri Salju Mede Lembut", jumlah: 1, harga_satuan: 115000, subtotal: 115000 },
    ],
    created_at: "2026-10-15T13:20:00Z",
    updated_at: "2026-10-15T13:20:00Z",
  },
];

// DATA STORE CLIENT HELPER (LOCAL STORAGE SYNCED + SUPABASE HOOK)
const STORAGE_KEYS = {
  CURRENT_USER: "dapur_current_user",
  PROFILES: "dapur_profiles",
  BAHAN: "dapur_bahan",
  RESEP: "dapur_resep",
  PELANGGAN: "dapur_pelanggan",
  PENJUALAN: "dapur_penjualan",
};

// In-memory stable cache to satisfy React useSyncExternalStore referential equality
let cachedCurrentUser: Profile | null = null;
let cachedProfiles: Profile[] | null = null;
let cachedPelanggan: Pelanggan[] | null = null;
let cachedBahanRaw: Bahan[] | null = null;
let cachedBahanForStaff: Bahan[] | null = null;
let cachedResep: Resep[] | null = null;
let cachedPenjualan: Penjualan[] | null = null;

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEYS.CURRENT_USER) cachedCurrentUser = null;
    if (e.key === STORAGE_KEYS.PROFILES) cachedProfiles = null;
    if (e.key === STORAGE_KEYS.PELANGGAN) cachedPelanggan = null;
    if (e.key === STORAGE_KEYS.BAHAN) {
      cachedBahanRaw = null;
      cachedBahanForStaff = null;
    }
    if (e.key === STORAGE_KEYS.RESEP) cachedResep = null;
    if (e.key === STORAGE_KEYS.PENJUALAN) cachedPenjualan = null;
    window.dispatchEvent(new Event("dapur_data_changed"));
  });
}

export class DataStore {
  // Current user state
  static getCurrentUser(): Profile {
    if (typeof window === "undefined") return INITIAL_PROFILES[0];
    if (cachedCurrentUser) return cachedCurrentUser;

    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (stored) {
      try {
        cachedCurrentUser = JSON.parse(stored);
        return cachedCurrentUser!;
      } catch {
        // fallback
      }
    }
    cachedCurrentUser = INITIAL_PROFILES[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(cachedCurrentUser));
    return cachedCurrentUser;
  }

  static setCurrentUser(user: Profile) {
    cachedCurrentUser = user;
    cachedBahanForStaff = null; // Recompute bahan visibility if role changed
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new Event("dapur_user_changed"));
    window.dispatchEvent(new Event("dapur_data_changed"));
  }

  // Switch role between Owner and Staff for testing/demo
  static switchRole(role: UserRole) {
    const profiles = DataStore.getProfiles();
    const user =
      profiles.find((p) => p.role === role) ||
      (role === "owner" ? INITIAL_PROFILES[0] : INITIAL_PROFILES[1]);
    DataStore.setCurrentUser(user);
  }

  // PROFILES (Karyawan)
  static getProfiles(): Profile[] {
    if (typeof window === "undefined") return INITIAL_PROFILES;
    if (cachedProfiles) return cachedProfiles;

    const stored = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (stored) {
      try {
        cachedProfiles = JSON.parse(stored);
        return cachedProfiles!;
      } catch {}
    }
    cachedProfiles = INITIAL_PROFILES;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
    return cachedProfiles;
  }

  static addKaryawan(nama: string, email: string, role: UserRole = "staff"): Profile {
    const profiles = DataStore.getProfiles();
    const newProfile: Profile = {
      id: "u_" + Date.now(),
      nama,
      email,
      role,
      aktif: true,
      created_at: new Date().toISOString(),
    };
    const updated = [...profiles, newProfile];
    cachedProfiles = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return newProfile;
  }

  static toggleKaryawanAktif(id: string): boolean {
    const profiles = DataStore.getProfiles();
    const target = profiles.find((p) => p.id === id);
    if (!target) return false;
    const updated = profiles.map((p) => (p.id === id ? { ...p, aktif: !p.aktif } : p));
    cachedProfiles = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return true;
  }

  // PELANGGAN
  static getPelanggan(): Pelanggan[] {
    if (typeof window === "undefined") return INITIAL_PELANGGAN;
    if (cachedPelanggan) return cachedPelanggan;

    const stored = localStorage.getItem(STORAGE_KEYS.PELANGGAN);
    if (stored) {
      try {
        cachedPelanggan = JSON.parse(stored);
        return cachedPelanggan!;
      } catch {}
    }
    cachedPelanggan = INITIAL_PELANGGAN;
    localStorage.setItem(STORAGE_KEYS.PELANGGAN, JSON.stringify(INITIAL_PELANGGAN));
    return cachedPelanggan;
  }

  static getPelangganById(id: string): Pelanggan | undefined {
    return DataStore.getPelanggan().find((p) => p.id === id);
  }

  static addPelanggan(nama: string, whatsapp: string, catatan?: string): Pelanggan {
    const list = DataStore.getPelanggan();
    // Normalisasi WA
    let wa = whatsapp.replace(/\D/g, "");
    if (wa.startsWith("0")) wa = "62" + wa.substring(1);
    else if (!wa.startsWith("62")) wa = "62" + wa;

    // Cek duplikat
    const existing = list.find((p) => p.whatsapp === wa);
    if (existing) {
      throw new Error(`Nomor WhatsApp ${wa} sudah terdaftar atas nama ${existing.nama}`);
    }

    const newCust: Pelanggan = {
      id: "cust_" + Date.now(),
      nama,
      whatsapp: wa,
      catatan,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newCust, ...list];
    cachedPelanggan = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PELANGGAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return newCust;
  }

  static updatePelanggan(id: string, nama: string, whatsapp: string, catatan?: string): Pelanggan {
    const list = DataStore.getPelanggan();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Pelanggan tidak ditemukan");

    let wa = whatsapp.replace(/\D/g, "");
    if (wa.startsWith("0")) wa = "62" + wa.substring(1);
    else if (!wa.startsWith("62")) wa = "62" + wa;

    // Cek duplikat ke pelanggan lain
    const dup = list.find((p) => p.whatsapp === wa && p.id !== id);
    if (dup) throw new Error(`Nomor WhatsApp ${wa} sudah digunakan oleh ${dup.nama}`);

    const updatedItem: Pelanggan = {
      ...list[idx],
      nama,
      whatsapp: wa,
      catatan,
      updated_at: new Date().toISOString(),
    };
    const updated = list.map((p) => (p.id === id ? updatedItem : p));
    cachedPelanggan = updated;

    // Also update customer in cachedPenjualan if present
    if (cachedPenjualan) {
      let salesChanged = false;
      const updatedSales = cachedPenjualan.map((p) => {
        if (p.pelanggan_id === id) {
          salesChanged = true;
          return { ...p, pelanggan: updatedItem };
        }
        return p;
      });
      if (salesChanged) {
        cachedPenjualan = updatedSales;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.PENJUALAN, JSON.stringify(updatedSales));
        }
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PELANGGAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return updatedItem;
  }

  static deletePelanggan(id: string): boolean {
    const currentUser = DataStore.getCurrentUser();
    if (currentUser.role !== "owner") {
      throw new Error("Staff tidak diizinkan menghapus data pelanggan");
    }
    const updated = DataStore.getPelanggan().filter((p) => p.id !== id);
    cachedPelanggan = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PELANGGAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return true;
  }

  // BAHAN
  private static getBahanRaw(): Bahan[] {
    if (typeof window === "undefined") return INITIAL_BAHAN;
    if (cachedBahanRaw) return cachedBahanRaw;

    const stored = localStorage.getItem(STORAGE_KEYS.BAHAN);
    if (stored) {
      try {
        cachedBahanRaw = JSON.parse(stored);
        return cachedBahanRaw!;
      } catch {}
    }
    cachedBahanRaw = INITIAL_BAHAN;
    localStorage.setItem(STORAGE_KEYS.BAHAN, JSON.stringify(INITIAL_BAHAN));
    return cachedBahanRaw;
  }

  private static saveBahanRaw(list: Bahan[]) {
    cachedBahanRaw = list;
    cachedBahanForStaff = null;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.BAHAN, JSON.stringify(list));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
  }

  static getBahan(): Bahan[] {
    const raw = DataStore.getBahanRaw();
    const currentUser = DataStore.getCurrentUser();
    // RLS staff protection: jika staff, sembunyikan harga_beli_terakhir
    if (currentUser.role === "staff") {
      if (!cachedBahanForStaff) {
        cachedBahanForStaff = raw.map((b) => ({ ...b, harga_beli_terakhir: null }));
      }
      return cachedBahanForStaff;
    }
    return raw;
  }

  static getBahanById(id: string): Bahan | undefined {
    return DataStore.getBahan().find((b) => b.id === id);
  }

  static addBahan(nama: string, stokAwal: number, satuan: string, stokMinimum: number, hargaBeli?: number): Bahan {
    const list = DataStore.getBahanRaw();
    const newBahan: Bahan = {
      id: "b_" + Date.now(),
      nama,
      stok: stokAwal,
      satuan,
      stok_minimum: stokMinimum,
      harga_beli_terakhir: hargaBeli || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [...list, newBahan];
    DataStore.saveBahanRaw(updated);
    return newBahan;
  }

  static catatBelanjaBahan(bahanId: string, jumlahTambah: number, hargaBeli?: number): Bahan {
    const list = DataStore.getBahanRaw();
    let found: Bahan | undefined;
    const updated = list.map((b) => {
      if (b.id === bahanId) {
        found = {
          ...b,
          stok: Number(b.stok) + Number(jumlahTambah),
          harga_beli_terakhir: hargaBeli !== undefined && hargaBeli > 0 ? hargaBeli : b.harga_beli_terakhir,
          updated_at: new Date().toISOString(),
        };
        return found;
      }
      return b;
    });
    if (!found) throw new Error("Bahan tidak ditemukan");
    DataStore.saveBahanRaw(updated);
    return found;
  }

  static sesuaikanStokBahan(bahanId: string, stokBaru: number): Bahan {
    const list = DataStore.getBahanRaw();
    let found: Bahan | undefined;
    const updated = list.map((b) => {
      if (b.id === bahanId) {
        found = {
          ...b,
          stok: Number(stokBaru),
          updated_at: new Date().toISOString(),
        };
        return found;
      }
      return b;
    });
    if (!found) throw new Error("Bahan tidak ditemukan");
    DataStore.saveBahanRaw(updated);
    return found;
  }

  static deleteBahan(id: string): boolean {
    const currentUser = DataStore.getCurrentUser();
    if (currentUser.role !== "owner") {
      throw new Error("Staff tidak diizinkan menghapus bahan baku");
    }
    const updated = DataStore.getBahanRaw().filter((b) => b.id !== id);
    DataStore.saveBahanRaw(updated);
    return true;
  }

  // RESEP
  static getResep(): Resep[] {
    if (typeof window === "undefined") return INITIAL_RESEP;
    if (cachedResep) return cachedResep;

    const stored = localStorage.getItem(STORAGE_KEYS.RESEP);
    if (stored) {
      try {
        cachedResep = JSON.parse(stored);
        return cachedResep!;
      } catch {}
    }
    cachedResep = INITIAL_RESEP;
    localStorage.setItem(STORAGE_KEYS.RESEP, JSON.stringify(INITIAL_RESEP));
    return cachedResep;
  }

  static getResepById(id: string): Resep | undefined {
    return DataStore.getResep().find((r) => r.id === id);
  }

  static updateResep(resep: Resep): Resep {
    const currentUser = DataStore.getCurrentUser();
    if (currentUser.role !== "owner") {
      throw new Error("Staff tidak diizinkan mengubah resep");
    }
    const list = DataStore.getResep();
    const idx = list.findIndex((r) => r.id === resep.id);
    if (idx === -1) throw new Error("Resep tidak ditemukan");

    const updatedItem: Resep = { ...resep, updated_at: new Date().toISOString() };
    const updated = list.map((r) => (r.id === resep.id ? updatedItem : r));
    cachedResep = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.RESEP, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return updatedItem;
  }

  // PENJUALAN
  static getPenjualan(): Penjualan[] {
    if (typeof window === "undefined") return INITIAL_PENJUALAN;
    if (cachedPenjualan) return cachedPenjualan;

    const stored = localStorage.getItem(STORAGE_KEYS.PENJUALAN);
    if (stored) {
      try {
        cachedPenjualan = JSON.parse(stored);
        return cachedPenjualan!;
      } catch {}
    }
    cachedPenjualan = INITIAL_PENJUALAN;
    localStorage.setItem(STORAGE_KEYS.PENJUALAN, JSON.stringify(INITIAL_PENJUALAN));
    return cachedPenjualan;
  }

  static getPenjualanById(id: string): Penjualan | undefined {
    return DataStore.getPenjualan().find((p) => p.id === id);
  }

  static addPenjualan(data: Omit<Penjualan, "id" | "nomor_invoice" | "created_at" | "updated_at">): Penjualan {
    const list = DataStore.getPenjualan();
    const currentUser = DataStore.getCurrentUser();
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const todayCount = list.filter((p) => p.nomor_invoice.includes(today)).length + 1;
    const invoiceNum = `#INV-${today}-${String(todayCount).padStart(2, "0")}`;

    const newPenjualan: Penjualan = {
      ...data,
      id: "pj_" + Date.now(),
      nomor_invoice: invoiceNum,
      user_id: currentUser.id,
      user_nama: currentUser.nama,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newPenjualan, ...list];
    cachedPenjualan = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PENJUALAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return newPenjualan;
  }

  static updatePenjualan(id: string, updates: Partial<Penjualan>): Penjualan {
    const list = DataStore.getPenjualan();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Penjualan tidak ditemukan");

    const target = list[idx];
    const currentUser = DataStore.getCurrentUser();

    // RLS Enforcement: Staff hanya boleh ubah penjualan miliknya di hari yang sama
    if (currentUser.role === "staff") {
      if (target.user_id !== currentUser.id) {
        throw new Error("Staff hanya boleh mengubah penjualan yang dicatat oleh dirinya sendiri");
      }
      const targetDate = new Date(target.created_at).toISOString().slice(0, 10);
      const todayDate = new Date().toISOString().slice(0, 10);
      if (targetDate !== todayDate) {
        throw new Error("Staff hanya boleh mengubah penjualan pada hari yang sama");
      }
    }

    const updatedItem: Penjualan = {
      ...target,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const updated = list.map((p) => (p.id === id ? updatedItem : p));
    cachedPenjualan = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PENJUALAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return updatedItem;
  }

  static deletePenjualan(id: string): boolean {
    const currentUser = DataStore.getCurrentUser();
    if (currentUser.role !== "owner") {
      throw new Error("Staff tidak diizinkan menghapus data penjualan");
    }
    const updated = DataStore.getPenjualan().filter((p) => p.id !== id);
    cachedPenjualan = updated;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PENJUALAN, JSON.stringify(updated));
      window.dispatchEvent(new Event("dapur_data_changed"));
    }
    return true;
  }

  // RINGKASAN METRICS (Owner Only Protection)
  static getRingkasan() {
    const currentUser = this.getCurrentUser();
    if (currentUser.role !== "owner") {
      return null;
    }
    const penjualan = this.getPenjualan();
    const todayStr = new Date().toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const penjualanHariIni = penjualan.filter((p) => p.tanggal === todayStr);
    const omzetHariIni = penjualanHariIni.reduce((acc, p) => acc + p.total, 0);

    const penjualan7Hari = penjualan.filter((p) => p.tanggal >= sevenDaysAgo);
    const omzet7Hari = penjualan7Hari.reduce((acc, p) => acc + p.total, 0);

    const omzetTotal = penjualan.reduce((acc, p) => acc + p.total, 0);
    const totalToples = penjualan.reduce((acc, p) => acc + p.items.reduce((sum, it) => sum + it.jumlah, 0), 0);

    // Top 5 Kue
    const kueCount: Record<string, { nama: string; jumlah: number; omzet: number }> = {};
    penjualan.forEach((p) => {
      p.items.forEach((it) => {
        if (!kueCount[it.nama_kue]) {
          kueCount[it.nama_kue] = { nama: it.nama_kue, jumlah: 0, omzet: 0 };
        }
        kueCount[it.nama_kue].jumlah += it.jumlah;
        kueCount[it.nama_kue].omzet += it.subtotal;
      });
    });
    const top5Kue = Object.values(kueCount)
      .sort((a, b) => b.jumlah - a.jumlah)
      .slice(0, 5);

    // Top 5 Pelanggan
    const custSpend: Record<string, { pelanggan: Pelanggan; total: number; count: number }> = {};
    penjualan.forEach((p) => {
      if (p.pelanggan) {
        if (!custSpend[p.pelanggan_id]) {
          custSpend[p.pelanggan_id] = { pelanggan: p.pelanggan, total: 0, count: 0 };
        }
        custSpend[p.pelanggan_id].total += p.total;
        custSpend[p.pelanggan_id].count += 1;
      }
    });
    const top5Pelanggan = Object.values(custSpend)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // Daftar Belum Lunas
    const belumLunas = penjualan.filter((p) => p.status_bayar !== "Lunas");

    return {
      omzetHariIni,
      omzet7Hari,
      omzetTotal,
      totalToples,
      penjualanHariIniCount: penjualanHariIni.length,
      top5Kue,
      top5Pelanggan,
      belumLunas,
    };
  }
}
