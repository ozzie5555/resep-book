# Dapur Lebaran - Aplikasi Web Internal Pencatatan Usaha Kue

Aplikasi web internal (PWA, mobile-first min 360px) untuk manajemen operasional, formulasi resep, inventaris bahan baku, dan pencatatan pesanan usaha kue Idul Fitri.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Desain hangat nuansa Lebaran, tanpa dark mode)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Storage, Auth)
- **Icons**: Lucide React
- **Toast**: Sonner
- **PWA**: Manifest & Service Worker offline cache

---

## 👥 Peran & Hak Akses (Row Level Security)

1. **Owner (Pemilik Usaha)**:
   - Akses penuh ke seluruh modul sistem.
   - Melihat omzet keuangan, grafik performa, dan ringkasan usaha (`/ringkasan`).
   - Melihat harga beli bahan baku.
   - Mengubah formulasi takaran resep kue.
   - Mengelola akun karyawan (tambah, nonaktifkan, reset sandi di `/pengaturan/karyawan`).
   - Menghapus data transaksi atau master data.

2. **Staff (Staf Dapur / Kasir)**:
   - Akses operasional harian: input penjualan baru (< 30 detik), lihat/tambah pelanggan, lihat stok & catat belanja bahan baku, lihat formulasi resep kue & mode masak.
   - **Pembatasan RLS**:
     - *Dilarang* melihat harga beli bahan baku (ditampilkan `[Privat Owner]`).
     - *Dilarang* melihat omzet dan menu ringkasan.
     - *Dilarang* mengubah formulasi resep.
     - *Dilarang* menghapus data master maupun transaksi.
     - Hanya diizinkan mengubah nota penjualan miliknya sendiri di hari yang sama.

---

## 📱 Daftar Halaman & Rute

| Rute | Deskripsi |
| :--- | :--- |
| **`/login`** | Portal login staf dan pemilik usaha dengan selector akun demo cepat. |
| **`/`** | Beranda operasional dapur: metrik bento, antrean siap kirim, dan follow-up penagihan WA. |
| **`/penjualan`** | Daftar pesanan: filter status (Lunas, DP, Belum Lunas), pencarian, cetak nota. |
| **`/penjualan/baru`** | Formulir pencatatan penjualan cepat (< 30 detik), input pelanggan inline, sticky action bar. |
| **`/penjualan/[id]`** | Detail nota pesanan, status pembayaran, dan link penagihan WhatsApp langsung. |
| **`/pelanggan`** | Direktori pelanggan: format nomor WhatsApp `628xx`, lencana Langganan, riwayat beli. |
| **`/pelanggan/[id]`** | Profil riwayat belanja lengkap pelanggan. |
| **`/bahan`** | Inventaris stok bahan baku: indikator status (Kritis, Waspada, Aman), catat belanja, penyesuaian stok. |
| **`/bahan/[id]`** | Detail riwayat bahan baku. |
| **`/resep`** | Katalog resep kue kering (Nastar Wijsman, Kastengel Edam, Putri Salju Mede). |
| **`/resep/[id]`** | Formulasi bahan, pengali adonan (1x, 2x, 3x, bebas), & **Mode Masak Layar Penuh** per langkah. |
| **`/ringkasan`** | *(Owner Only)* Analitik omzet hari ini/7 hari/total, grafik harian, top 5 kue, top 5 pelanggan. |
| **`/pengaturan/karyawan`** | *(Owner Only)* Kelola staf dapur: tambah akun, nonaktifkan, reset kata sandi. |

---

## 🗄️ Database & Migrasi Supabase

File skema dan seed data SQL siap dijalankan di Supabase SQL Editor:
- **Skema & RLS**: [`supabase/schema.sql`](./supabase/schema.sql)
- **Seed Data Awal**: [`supabase/seed.sql`](./supabase/seed.sql) *(5 bahan, 3 resep, 5 pelanggan, 10 penjualan, 1 owner, 1 staff)*

### Variabel Lingkungan (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
*(Aplikasi juga dilengkapi local reactive DataStore sehingga dapat langsung dijalankan dan didemokan offline).*

---

## 🚀 Menjalankan Secara Lokal

```bash
# Instalasi dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Bangun untuk produksi
npm run build
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.
