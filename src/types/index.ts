export type UserRole = "owner" | "staff";

export type StatusPembayaran = "Lunas" | "DP" | "Belum lunas";

export interface Profile {
  id: string;
  email: string;
  nama: string;
  role: UserRole;
  aktif: boolean;
  created_at: string;
}

export interface Pelanggan {
  id: string;
  nama: string;
  whatsapp: string; // 628xxx
  catatan?: string;
  created_at: string;
  updated_at: string;
}

export interface Bahan {
  id: string;
  nama: string;
  stok: number;
  satuan: string;
  stok_minimum: number;
  harga_beli_terakhir?: number | null; // disembunyikan dari staff
  created_at: string;
  updated_at: string;
}

export interface RiwayatBahan {
  id: string;
  bahan_id: string;
  tipe: "belanja" | "penyesuaian" | "produksi";
  jumlah: number;
  harga_beli?: number;
  catatan?: string;
  user_id: string;
  created_at: string;
}

export interface ResepBahan {
  id: string;
  resep_id: string;
  bahan_id: string;
  nama_bahan?: string;
  takaran: number;
  satuan: string;
}

export interface ResepLangkah {
  id: string;
  resep_id: string;
  nomor_langkah: number;
  instruksi: string;
  durasi_menit?: number;
}

export interface Resep {
  id: string;
  nama: string;
  foto: string;
  porsi_default: number;
  harga_jual_default: number;
  deskripsi: string;
  bahan: ResepBahan[];
  langkah: ResepLangkah[];
  created_at: string;
  updated_at: string;
}

export interface PenjualanItem {
  id: string;
  penjualan_id: string;
  resep_id?: string;
  nama_kue: string;
  jumlah: number;
  harga_satuan: number;
  subtotal: number;
}

export interface Penjualan {
  id: string;
  nomor_invoice: string;
  tanggal: string; // YYYY-MM-DD
  pelanggan_id: string;
  pelanggan?: Pelanggan;
  status_bayar: StatusPembayaran;
  jumlah_dp: number;
  total: number;
  catatan?: string;
  user_id: string;
  user_nama?: string;
  items: PenjualanItem[];
  created_at: string;
  updated_at: string;
}
