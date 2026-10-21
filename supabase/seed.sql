-- ============================================================
-- Dapur Lebaran - Seed Data Sesuai PRD
-- 1 Owner, 1 Staff, 5 Bahan, 3 Resep, 5 Pelanggan, 10 Penjualan
-- ============================================================

-- 1. PROFILES (1 Owner, 1 Staff)
-- ID dummy UUID untuk local/seed
INSERT INTO profiles (id, email, nama, role, aktif)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'owner@dapurlebaran.id', 'Ibu Nur Laila', 'owner', true),
    ('a0000000-0000-0000-0000-000000000002', 'staff@dapurlebaran.id', 'Budi Santoso', 'staff', true)
ON CONFLICT (id) DO UPDATE 
SET nama = EXCLUDED.nama, role = EXCLUDED.role;

-- 2. 5 BAHAN BAKU
INSERT INTO bahan (id, nama, stok, satuan, stok_minimum, harga_beli_terakhir)
VALUES
    ('b0000000-0000-0000-0000-000000000001', 'Butter Wijsman Canned', 3.5, 'kg', 10.0, 315000),
    ('b0000000-0000-0000-0000-000000000002', 'Keju Edam Tua (Ayam Mas)', 2.1, 'kg', 5.0, 240000),
    ('b0000000-0000-0000-0000-000000000003', 'Tepung Terigu Protein Rendah', 25.0, 'kg', 10.0, 14000),
    ('b0000000-0000-0000-0000-000000000004', 'Selai Nanas Homemade Blitar', 12.0, 'kg', 5.0, 65000),
    ('b0000000-0000-0000-0000-000000000005', 'Kacang Mede Panggang Cincang', 8.0, 'kg', 5.0, 165000)
ON CONFLICT (id) DO NOTHING;

-- 3. 3 RESEP LENGKAP DENGAN BAHAN & LANGKAH
INSERT INTO resep (id, nama, foto, porsi_default, harga_jual_default, deskripsi)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop&q=80', 1, 125000, 'Nastar premium mentega Wijsman dengan selai nanas asli asam manis lumer di mulut.'),
    ('c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80', 1, 135000, 'Kastengel gurih klasik menggunakan 100% keju edam tua dengan taburan cheddar renyah.'),
    ('c0000000-0000-0000-0000-000000000003', 'Putri Salju Mede Lembut', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', 1, 115000, 'Kue putri salju dengan paduan gurih kacang mede panggang dan taburan gula dingin halus.')
ON CONFLICT (id) DO NOTHING;

-- Resep Bahan
INSERT INTO resep_bahan (resep_id, bahan_id, takaran, satuan)
VALUES
    -- Nastar
    ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 250, 'gram'),
    ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 350, 'gram'),
    ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 300, 'gram'),
    -- Kastengel
    ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 200, 'gram'),
    ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 200, 'gram'),
    ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', 250, 'gram'),
    -- Putri Salju
    ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 200, 'gram'),
    ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 250, 'gram'),
    ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000005', 150, 'gram')
ON CONFLICT DO NOTHING;

-- Resep Langkah (Untuk Mode Masak Layar Penuh)
INSERT INTO resep_langkah (resep_id, nomor_langkah, instruksi, durasi_menit)
VALUES
    -- Nastar
    ('c0000000-0000-0000-0000-000000000001', 1, 'Kocok butter Wijsman dan gula halus dengan mixer kecepatan rendah selama 1-2 menit saja hingga rata dan lembut.', 2),
    ('c0000000-0000-0000-0000-000000000001', 2, 'Masukkan kuning telur satu per satu sambil diaduk rata menggunakan spatula kayu.', 3),
    ('c0000000-0000-0000-0000-000000000001', 3, 'Ayak tepung terigu dan susu bubuk ke dalam adonan, aduk perlahan dengan gerakan melipat hingga kalis.', 5),
    ('c0000000-0000-0000-0000-000000000001', 4, 'Bentuk adonan menjadi bulatan 7 gram, pipihkan dan isi dengan selai nanas 4 gram. Rapatkan kembali.', 15),
    ('c0000000-0000-0000-0000-000000000001', 5, 'Panggang dalam oven suhu 140°C selama 25 menit. Olesi kuning telur saat setengah matang lalu panggang lagi 10 menit.', 35),
    -- Kastengel
    ('c0000000-0000-0000-0000-000000000002', 1, 'Kocok butter dan kuning telur hingga lembut merata.', 3),
    ('c0000000-0000-0000-0000-000000000002', 2, 'Masukkan parutan keju edam tua, aduk rata dengan spatula.', 4),
    ('c0000000-0000-0000-0000-000000000002', 3, 'Masukkan tepung terigu dan maizena secara bertahap hingga adonan bisa digilas.', 5),
    ('c0000000-0000-0000-0000-000000000002', 4, 'Gilas setebal 0.8 cm, potong balok persegi panjang, oles kuning telur dan taburi parutan keju cheddar.', 15),
    ('c0000000-0000-0000-0000-000000000002', 5, 'Panggang pada suhu 130°C hingga keju keemasan dan matang kering sempurna (30-35 menit).', 35),
    -- Putri Salju
    ('c0000000-0000-0000-0000-000000000003', 1, 'Kocok butter dan gula halus hingga pucat lembut.', 3),
    ('c0000000-0000-0000-0000-000000000003', 2, 'Campurkan bubuk kacang mede panggang yang sudah digiling halus.', 4),
    ('c0000000-0000-0000-0000-000000000003', 3, 'Tambahkan tepung terigu yang sudah diayak, aduk rata hingga kalis.', 5),
    ('c0000000-0000-0000-0000-000000000003', 4, 'Cetak bentuk bulan sabit menggunakan cetakan putri salju.', 10),
    ('c0000000-0000-0000-0000-000000000003', 5, 'Panggang suhu 140°C selama 20 menit. Saat masih hangat, gulingkan segera ke dalam gula halus dingin.', 25)
ON CONFLICT DO NOTHING;

-- 4. 5 PELANGGAN
INSERT INTO pelanggan (id, nama, whatsapp, catatan)
VALUES
    ('d0000000-0000-0000-0000-000000000001', 'Bu Siti Rahayu', '6281244558899', 'Langganan komplek perumahan Rafles, suka nastar matang kering.'),
    ('d0000000-0000-0000-0000-000000000002', 'dr. Maya Anggraini', '6281399887766', 'Dokter RSUD, pesan hamper eksklusif untuk kolega dokter.'),
    ('d0000000-0000-0000-0000-000000000003', 'Pak Hendra Gunawan', '6281234567890', 'Kantor BUMN, minta nota bertanda tangan untuk klaim kantor.'),
    ('d0000000-0000-0000-0000-000000000004', 'Ibu Ratna Kartika', '6281987654321', 'Suka packaging pita merah emas, minta dikirim pagi.'),
    ('d0000000-0000-0000-0000-000000000005', 'Bpk. Agus Setiawan', '6285211223344', 'Pesanan keluarga besar, minta toples kaca tebal.')
ON CONFLICT (id) DO NOTHING;

-- 5. 10 PENJUALAN & ITEM
-- Penjualan 1: Lunas (Bu Siti Rahayu)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000001', '#INV-20261021-01', '2026-10-21', 'd0000000-0000-0000-0000-000000000001', 'Lunas', 0, 645000, 'Kirim via Gosend Instant jam 13.00 WIB', 'a0000000-0000-0000-0000-000000000001', '2026-10-21 09:15:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 3, 125000, 375000),
    ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 2, 135000, 270000)
ON CONFLICT DO NOTHING;

-- Penjualan 2: DP (Pak Hendra Gunawan)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000002', '#INV-20261021-02', '2026-10-21', 'd0000000-0000-0000-0000-000000000003', 'DP', 200000, 575000, 'DP via transfer BCA, pelunasan saat ambil H-3 Lebaran', 'a0000000-0000-0000-0000-000000000002', '2026-10-21 10:40:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000003', 'Putri Salju Mede Lembut', 5, 115000, 575000)
ON CONFLICT DO NOTHING;

-- Penjualan 3: Belum lunas (Ibu Ratna Kartika)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000003', '#INV-20261021-03', '2026-10-21', 'd0000000-0000-0000-0000-000000000004', 'Belum lunas', 0, 250000, 'Sudah di-chat WhatsApp untuk konfirmasi pesanan', 'a0000000-0000-0000-0000-000000000002', '2026-10-21 11:20:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 2, 125000, 250000)
ON CONFLICT DO NOTHING;

-- Penjualan 4: Lunas (dr. Maya Anggraini)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000004', '#INV-20261020-01', '2026-10-20', 'd0000000-0000-0000-0000-000000000002', 'Lunas', 0, 1040000, 'Ambil di dapur langsung', 'a0000000-0000-0000-0000-000000000001', '2026-10-20 14:00:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 4, 125000, 500000),
    ('e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 4, 135000, 540000)
ON CONFLICT DO NOTHING;

-- Penjualan 5: Lunas (Bpk. Agus Setiawan)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000005', '#INV-20261019-01', '2026-10-19', 'd0000000-0000-0000-0000-000000000005', 'Lunas', 0, 750000, 'Packing kardus tebal untuk dibawa ke luar kota', 'a0000000-0000-0000-0000-000000000001', '2026-10-19 16:30:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 6, 125000, 750000)
ON CONFLICT DO NOTHING;

-- Penjualan 6: DP (Bu Siti Rahayu - Batch 2)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000006', '#INV-20261019-02', '2026-10-19', 'd0000000-0000-0000-0000-000000000001', 'DP', 300000, 675000, 'Tambahan pesanan untuk tetangga', 'a0000000-0000-0000-0000-000000000002', '2026-10-19 17:15:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 5, 135000, 675000)
ON CONFLICT DO NOTHING;

-- Penjualan 7: Lunas (dr. Maya Anggraini - Batch 2)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000007', '#INV-20261018-01', '2026-10-18', 'd0000000-0000-0000-0000-000000000002', 'Lunas', 0, 345000, 'Pesanan pribadi', 'a0000000-0000-0000-0000-000000000001', '2026-10-18 10:00:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000003', 'Putri Salju Mede Lembut', 3, 115000, 345000)
ON CONFLICT DO NOTHING;

-- Penjualan 8: Belum lunas (Bpk. Agus Setiawan - Batch 2)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000008', '#INV-20261017-01', '2026-10-17', 'd0000000-0000-0000-0000-000000000005', 'Belum lunas', 0, 405000, 'COD saat pengiriman hari Sabtu', 'a0000000-0000-0000-0000-000000000002', '2026-10-17 11:30:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 3, 135000, 405000)
ON CONFLICT DO NOTHING;

-- Penjualan 9: Lunas (Pak Hendra Gunawan - Batch 2)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000009', '#INV-20261016-01', '2026-10-16', 'd0000000-0000-0000-0000-000000000003', 'Lunas', 0, 500000, 'Pesanan direksi', 'a0000000-0000-0000-0000-000000000001', '2026-10-16 08:45:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 4, 125000, 500000)
ON CONFLICT DO NOTHING;

-- Penjualan 10: DP (Ibu Ratna Kartika - Batch 2)
INSERT INTO penjualan (id, nomor_invoice, tanggal, pelanggan_id, status_bayar, jumlah_dp, total, catatan, user_id, created_at)
VALUES ('e0000000-0000-0000-0000-000000000010', '#INV-20261015-01', '2026-10-15', 'd0000000-0000-0000-0000-000000000004', 'DP', 100000, 365000, 'DP via transfer', 'a0000000-0000-0000-0000-000000000002', '2026-10-15 13:20:00+07')
ON CONFLICT (id) DO NOTHING;
INSERT INTO penjualan_item (penjualan_id, resep_id, nama_kue, jumlah, harga_satuan, subtotal)
VALUES 
    ('e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000001', 'Nastar Wijsman Lumer', 1, 125000, 125000),
    ('e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000002', 'Kastengel Keju Edam Renyah', 1, 135000, 135000),
    ('e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000003', 'Putri Salju Mede Lembut', 1, 115000, 115000)
ON CONFLICT DO NOTHING;
