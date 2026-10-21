-- ============================================================
-- Dapur Lebaran - Skema Database & Row Level Security (RLS)
-- ============================================================

-- 1. ENUMS & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('owner', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_pembayaran AS ENUM ('Lunas', 'DP', 'Belum lunas');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABEL PROFILES (Pengguna & Peran)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'staff',
    aktif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Helper functions for RLS
CREATE OR REPLACE FUNCTION is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'owner' AND aktif = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_active_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND aktif = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. TABEL PELANGGAN
CREATE TABLE IF NOT EXISTS pelanggan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT NOT NULL,
    whatsapp TEXT UNIQUE NOT NULL,
    catatan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. TABEL BAHAN BAKU
CREATE TABLE IF NOT EXISTS bahan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT NOT NULL,
    stok NUMERIC(10, 2) NOT NULL DEFAULT 0,
    satuan TEXT NOT NULL DEFAULT 'kg',
    stok_minimum NUMERIC(10, 2) NOT NULL DEFAULT 5,
    harga_beli_terakhir NUMERIC(12, 2), -- Hanya boleh dilihat owner via view / RLS
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- View bahan untuk staff (tanpa harga_beli_terakhir)
CREATE OR REPLACE VIEW bahan_staff_view AS
SELECT id, nama, stok, satuan, stok_minimum, created_at, updated_at
FROM bahan;

-- 5. TABEL RIWAYAT BAHAN (Belanja & Penyesuaian)
CREATE TABLE IF NOT EXISTS riwayat_bahan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bahan_id UUID NOT NULL REFERENCES bahan(id) ON DELETE CASCADE,
    tipe TEXT NOT NULL CHECK (tipe IN ('belanja', 'penyesuaian', 'produksi')),
    jumlah NUMERIC(10, 2) NOT NULL,
    harga_beli NUMERIC(12, 2),
    catatan TEXT,
    user_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Trigger untuk menambah stok otomatis saat belanja/penyesuaian
CREATE OR REPLACE FUNCTION update_stok_bahan()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.tipe = 'belanja' THEN
        UPDATE bahan
        SET stok = stok + NEW.jumlah,
            harga_beli_terakhir = COALESCE(NEW.harga_beli, harga_beli_terakhir),
            updated_at = timezone('utc', now())
        WHERE id = NEW.bahan_id;
    ELSIF NEW.tipe = 'penyesuaian' THEN
        UPDATE bahan
        SET stok = NEW.jumlah, -- penyesuaian langsung set ke nilai baru
            updated_at = timezone('utc', now())
        WHERE id = NEW.bahan_id;
    ELSIF NEW.tipe = 'produksi' THEN
        UPDATE bahan
        SET stok = GREATEST(0, stok - NEW.jumlah),
            updated_at = timezone('utc', now())
        WHERE id = NEW.bahan_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_stok_bahan ON riwayat_bahan;
CREATE TRIGGER trg_update_stok_bahan
AFTER INSERT ON riwayat_bahan
FOR EACH ROW EXECUTE FUNCTION update_stok_bahan();

-- 6. TABEL RESEP
CREATE TABLE IF NOT EXISTS resep (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama TEXT NOT NULL,
    foto TEXT,
    porsi_default INT NOT NULL DEFAULT 1,
    harga_jual_default NUMERIC(12, 2) NOT NULL DEFAULT 0,
    deskripsi TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. TABEL RESEP BAHAN
CREATE TABLE IF NOT EXISTS resep_bahan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resep_id UUID NOT NULL REFERENCES resep(id) ON DELETE CASCADE,
    bahan_id UUID NOT NULL REFERENCES bahan(id) ON DELETE RESTRICT,
    takaran NUMERIC(10, 2) NOT NULL,
    satuan TEXT NOT NULL DEFAULT 'gram',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 8. TABEL RESEP LANGKAH
CREATE TABLE IF NOT EXISTS resep_langkah (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resep_id UUID NOT NULL REFERENCES resep(id) ON DELETE CASCADE,
    nomor_langkah INT NOT NULL,
    instruksi TEXT NOT NULL,
    durasi_menit INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 9. TABEL PENJUALAN
CREATE TABLE IF NOT EXISTS penjualan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomor_invoice TEXT UNIQUE NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    pelanggan_id UUID NOT NULL REFERENCES pelanggan(id) ON DELETE RESTRICT,
    status_bayar status_pembayaran NOT NULL DEFAULT 'Belum lunas',
    jumlah_dp NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    catatan TEXT,
    user_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 10. TABEL PENJUALAN ITEM
CREATE TABLE IF NOT EXISTS penjualan_item (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    penjualan_id UUID NOT NULL REFERENCES penjualan(id) ON DELETE CASCADE,
    resep_id UUID REFERENCES resep(id) ON DELETE SET NULL,
    nama_kue TEXT NOT NULL,
    jumlah INT NOT NULL CHECK (jumlah > 0),
    harga_satuan NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pelanggan ENABLE ROW LEVEL SECURITY;
ALTER TABLE bahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE riwayat_bahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE resep ENABLE ROW LEVEL SECURITY;
ALTER TABLE resep_bahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE resep_langkah ENABLE ROW LEVEL SECURITY;
ALTER TABLE penjualan ENABLE ROW LEVEL SECURITY;
ALTER TABLE penjualan_item ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- PROFILES POLICIES
-- Owner: akses penuh. Staff: hanya boleh lihat profile sendiri.
-- ------------------------------------------------------------
CREATE POLICY "Profiles: Owner can do all" ON profiles
    FOR ALL USING (is_owner());

CREATE POLICY "Profiles: Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- ------------------------------------------------------------
-- PELANGGAN POLICIES
-- Owner & Staff: lihat & tambah. Hanya Owner: hapus.
-- ------------------------------------------------------------
CREATE POLICY "Pelanggan: Read by active users" ON pelanggan
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Pelanggan: Insert by active users" ON pelanggan
    FOR INSERT WITH CHECK (is_active_staff());

CREATE POLICY "Pelanggan: Update by active users" ON pelanggan
    FOR UPDATE USING (is_active_staff());

CREATE POLICY "Pelanggan: Delete only by owner" ON pelanggan
    FOR DELETE USING (is_owner());

-- ------------------------------------------------------------
-- BAHAN POLICIES
-- Owner & Staff: lihat & tambah. Hanya Owner: update & hapus & lihat harga beli.
-- ------------------------------------------------------------
CREATE POLICY "Bahan: Read by active users" ON bahan
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Bahan: Insert by active users" ON bahan
    FOR INSERT WITH CHECK (is_active_staff());

CREATE POLICY "Bahan: Update by owner or stock adjust" ON bahan
    FOR UPDATE USING (is_active_staff());

CREATE POLICY "Bahan: Delete only by owner" ON bahan
    FOR DELETE USING (is_owner());

-- ------------------------------------------------------------
-- RESEP & LANGKAH POLICIES
-- Staff: hanya lihat. Owner: insert, update, delete.
-- ------------------------------------------------------------
CREATE POLICY "Resep: Read by all active users" ON resep
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Resep: Mutate only by owner" ON resep
    FOR ALL USING (is_owner());

CREATE POLICY "Resep Bahan: Read by all active users" ON resep_bahan
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Resep Bahan: Mutate only by owner" ON resep_bahan
    FOR ALL USING (is_owner());

CREATE POLICY "Resep Langkah: Read by all active users" ON resep_langkah
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Resep Langkah: Mutate only by owner" ON resep_langkah
    FOR ALL USING (is_owner());

-- ------------------------------------------------------------
-- PENJUALAN POLICIES
-- Owner: akses penuh (baca, tambah, ubah kapan saja, hapus).
-- Staff: boleh baca, boleh tambah, TIDAK boleh hapus.
-- Staff HANYA boleh ubah penjualan miliknya di HARI YANG SAMA.
-- ------------------------------------------------------------
CREATE POLICY "Penjualan: Owner full access" ON penjualan
    FOR ALL USING (is_owner());

CREATE POLICY "Penjualan: Staff read all" ON penjualan
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Penjualan: Staff insert" ON penjualan
    FOR INSERT WITH CHECK (is_active_staff() AND user_id = auth.uid());

CREATE POLICY "Penjualan: Staff update own on same day" ON penjualan
    FOR UPDATE USING (
        is_active_staff()
        AND user_id = auth.uid()
        AND created_at::date = CURRENT_DATE
    );

-- Items
CREATE POLICY "Penjualan Item: Owner full access" ON penjualan_item
    FOR ALL USING (is_owner());

CREATE POLICY "Penjualan Item: Staff read all" ON penjualan_item
    FOR SELECT USING (is_active_staff());

CREATE POLICY "Penjualan Item: Staff insert" ON penjualan_item
    FOR INSERT WITH CHECK (is_active_staff());
