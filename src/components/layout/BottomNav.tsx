"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Menu,
  Plus,
  Package,
  BookOpen,
  BarChart3,
  UserCheck,
  X,
  LogOut,
  User,
} from "lucide-react";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser } from "@/lib/use-store";

export function BottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useCurrentUser();

  const navItems = [
    { label: "Beranda", href: "/", icon: LayoutDashboard },
    { label: "Penjualan", href: "/penjualan", icon: Receipt },
    { label: "Pelanggan", href: "/pelanggan", icon: Users },
  ];

  return (
    <>
      {/* FAB "+ Penjualan" Warna Emas (Mobile Only) */}
      {!pathname.includes("/penjualan/baru") && (
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <Link
            href="/penjualan/baru"
            className="flex items-center gap-2 h-12 px-4 rounded-full bg-[#C8962E] hover:bg-[#b58525] text-white font-semibold text-sm shadow-warm-fab active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span>+ Penjualan</span>
          </Link>
        </div>
      )}

      {/* Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8DFCC] shadow-lg flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
                isActive ? "text-[#1F6F50] font-semibold" : "text-[#7A6A5C] hover:text-[#3B2A1E]"
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "text-[#1F6F50]" : "text-[#7A6A5C]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Lainnya Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            isMenuOpen ||
            pathname.startsWith("/bahan") ||
            pathname.startsWith("/resep") ||
            pathname.startsWith("/ringkasan") ||
            pathname.startsWith("/pengaturan")
              ? "text-[#1F6F50] font-semibold"
              : "text-[#7A6A5C] hover:text-[#3B2A1E]"
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>Lainnya</span>
        </button>
      </nav>

      {/* Drawer Menu Lainnya */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl border-t border-[#E8DFCC] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8DFCC] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#1F6F50]/15 text-[#1F6F50] flex items-center justify-center font-bold text-xs font-heading">
                  {currentUser.nama[0]}
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#3B2A1E]">
                    {currentUser.nama}
                  </h3>
                  <p className="text-xs text-[#7A6A5C] capitalize">Peran: {currentUser.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#7A6A5C] hover:text-[#3B2A1E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <Link
                href="/bahan"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col gap-2 p-4 rounded-2xl border border-[#E8DFCC] bg-[#FBF6EC]/50 hover:bg-[#FBF6EC] transition-colors"
              >
                <Package className="w-6 h-6 text-[#1F6F50]" />
                <div>
                  <p className="text-sm font-semibold text-[#3B2A1E]">Bahan Baku</p>
                  <p className="text-[11px] text-[#7A6A5C]">Stok & Belanja</p>
                </div>
              </Link>

              <Link
                href="/resep"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col gap-2 p-4 rounded-2xl border border-[#E8DFCC] bg-[#FBF6EC]/50 hover:bg-[#FBF6EC] transition-colors"
              >
                <BookOpen className="w-6 h-6 text-[#1F6F50]" />
                <div>
                  <p className="text-sm font-semibold text-[#3B2A1E]">Resep Kue</p>
                  <p className="text-[11px] text-[#7A6A5C]">Takaran & Masak</p>
                </div>
              </Link>

              {currentUser.role === "owner" && (
                <>
                  <Link
                    href="/ringkasan"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col gap-2 p-4 rounded-2xl border border-[#E8DFCC] bg-[#FBF6EC]/50 hover:bg-[#FBF6EC] transition-colors"
                  >
                    <BarChart3 className="w-6 h-6 text-[#C8962E]" />
                    <div>
                      <p className="text-sm font-semibold text-[#3B2A1E]">Ringkasan</p>
                      <p className="text-[11px] text-[#7A6A5C]">Omzet & Top Kue</p>
                    </div>
                  </Link>

                  <Link
                    href="/pengaturan/karyawan"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col gap-2 p-4 rounded-2xl border border-[#E8DFCC] bg-[#FBF6EC]/50 hover:bg-[#FBF6EC] transition-colors"
                  >
                    <UserCheck className="w-6 h-6 text-[#1F6F50]" />
                    <div>
                      <p className="text-sm font-semibold text-[#3B2A1E]">Karyawan</p>
                      <p className="text-[11px] text-[#7A6A5C]">Kelola Staff</p>
                    </div>
                  </Link>
                </>
              )}
            </div>

            {/* Quick role change in drawer */}
            <div className="pt-2 border-t border-[#E8DFCC]">
              <p className="text-xs font-semibold text-[#7A6A5C] mb-2">Ganti Mode Akun:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    DataStore.switchRole("owner");
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    currentUser.role === "owner"
                      ? "border-[#1F6F50] bg-[#1F6F50] text-white"
                      : "border-[#E8DFCC] text-[#3B2A1E]"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Owner (Akses Penuh)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    DataStore.switchRole("staff");
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    currentUser.role === "staff"
                      ? "border-[#1F6F50] bg-[#1F6F50] text-white"
                      : "border-[#E8DFCC] text-[#3B2A1E]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Staff (Dapur)</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8DFCC] flex items-center justify-between text-xs text-[#7A6A5C]">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#B93A2E] flex items-center gap-1.5 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun</span>
              </Link>
              <span>Dapur Lebaran v1.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
