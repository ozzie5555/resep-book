Bangun aplikasi web internal pencatatan usaha kue lebaran (BUKAN toko online).

STACK
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase (Postgres, Auth, Storage) + Zod + React Hook Form. Deploy ke Vercel. Dibuat sebagai PWA.

PERAN
- owner: akses penuh.
- staff: boleh lihat/tambah bahan, lihat resep, catat penjualan, lihat/tambah pelanggan.
  Staff TIDAK boleh: lihat harga beli bahan, lihat omzet/ringkasan, ubah resep,
  hapus data, kelola akun. Staff hanya boleh ubah penjualan miliknya di hari yang sama.
- Tegakkan lewat Row Level Security Supabase, bukan hanya sembunyikan di UI.

HALAMAN
/login, / (beranda), /penjualan, /penjualan/baru, /penjualan/[id], /pelanggan, /pelanggan/[id],
/bahan, /bahan/[id], /resep, /resep/[id], /ringkasan (owner), /pengaturan/karyawan (owner).
Bottom nav HP: Beranda, Penjualan, Pelanggan, Lainnya.

FITUR INTI
1. Penjualan: tanggal, pelanggan (cari atau tambah baru inline), item (kue, jumlah, harga,
   subtotal otomatis), total otomatis, status bayar (Lunas/DP/Belum lunas), catatan.
   Tombol Simpan sticky. Target input < 30 detik.
2. Pelanggan: nama, WhatsApp (08xx otomatis jadi 628xx, cegah duplikat), riwayat beli,
   total belanja, lencana "Langganan", tombol chat wa.me.
3. Bahan: stok dengan indikator hijau/kuning/merah, catat belanja (stok bertambah otomatis),
   penyesuaian stok manual, harga beli hanya tampil untuk owner.
4. Resep: foto, bahan+takaran, langkah, pengali adonan (1x/2x/3x/bebas),
   mode masak layar penuh satu langkah per layar.
5. Ringkasan (owner): penjualan hari ini/7 hari/total, grafik per hari,
   top 5 kue, top 5 pelanggan, daftar belum lunas + tombol WhatsApp.
6. Kelola karyawan (owner): tambah, nonaktifkan, reset sandi.

DESAIN
Hangat, bersih, mobile-first (360px), nuansa lebaran tapi tidak ramai.
Warna: primer #1F6F50, primer aktif #17583F, emas #C8962E, latar #FBF6EC, kartu #FFFFFF,
border #E8DFCC, teks #3B2A1E, teks sekunder #7A6A5C, terakota #C2512F,
lunas #2E8B57, DP #D99A00, belum lunas #B93A2E.
Font: Poppins 600 (judul), Inter 400/500 (isi). Teks dasar 16px.
Radius: kartu 16px, tombol/input 12px. Tinggi tombol/input 48px, area sentuh min 44px.
FAB "+ Penjualan" warna emas. Ikon Lucide. Tanpa dark mode.

ATURAN
- Semua UI Bahasa Indonesia. Rupiah: Rp 25.000. Tanggal: 21 Okt 2026.
- Hapus selalu pakai dialog konfirmasi. Toast setelah simpan. Skeleton saat loading.
- Jangan tambah fitur di luar daftar di atas.
- Buat seed data: 5 bahan, 3 resep, 5 pelanggan, 10 penjualan, 1 owner, 1 staff.

URUTAN KERJA
Setup+tema, skema DB+RLS+auth, layout+nav, pelanggan, penjualan, bahan, resep, ringkasan+karyawan, PWA+polish.