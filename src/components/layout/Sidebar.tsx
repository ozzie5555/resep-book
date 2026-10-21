"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Package,
  BookOpen,
  BarChart3,
  UserCheck,
  PlusCircle,
  LogOut,
  Cookie,
  X,
  Sparkles,
} from "lucide-react";
import { useCurrentUser } from "@/lib/use-store";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  const navItems = [
    { label: "Beranda", href: "/", icon: LayoutDashboard },
    { label: "Penjualan", href: "/penjualan", icon: Receipt },
    { label: "Pelanggan", href: "/pelanggan", icon: Users },
    { label: "Bahan Baku", href: "/bahan", icon: Package },
    { label: "Resep & Batch", href: "/resep", icon: BookOpen },
    ...(currentUser.role === "owner"
      ? [
          { label: "Ringkasan", href: "/ringkasan", icon: BarChart3 },
          { label: "Kelola Karyawan", href: "/pengaturan/karyawan", icon: UserCheck },
        ]
      : []),
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Brand Logo & Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E8DFCC]">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1F6F50] text-white flex items-center justify-center shadow-warm-sm shrink-0 group-hover:bg-[#17583F] transition-colors">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-lg font-bold text-[#1F6F50] tracking-tight">
                  Dapur Lebaran
                </span>
              </div>
              <p className="text-[11px] text-[#7A6A5C] font-medium leading-tight">
                Sistem Kue Idul Fitri 1447H
              </p>
            </div>
          </Link>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#7A6A5C] hover:bg-[#FDFBF7] hover:text-[#3B2A1E]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div>
          <p className="text-[11px] font-bold text-[#7A6A5C]/80 uppercase tracking-wider px-3 mb-2">
            Menu Operasional
          </p>
          <nav className="space-y-1">
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
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-[#1F6F50] text-white shadow-xs"
                      : "text-[#7A6A5C] hover:bg-[#FDFBF7] hover:text-[#3B2A1E]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? "text-white" : "text-[#7A6A5C]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer & User Profile */}
      <div className="space-y-4 pt-5 border-t border-[#E8DFCC]">
        {/* Quick CTA "+ Catat Penjualan" */}
        <Link
          href="/penjualan/baru"
          onClick={onCloseMobile}
          className="w-full h-11 rounded-xl bg-[#C8962E] hover:bg-[#b58525] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-warm-fab active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Catat Penjualan</span>
        </Link>

        {/* User Card */}
        <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E8DFCC] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-[#1F6F50]/15 text-[#1F6F50] font-bold text-xs flex items-center justify-center shrink-0 font-heading">
              {currentUser.nama
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-[#3B2A1E] truncate leading-tight">
                {currentUser.nama}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentUser.role === "owner" ? "bg-[#C8962E]" : "bg-[#1F6F50]"
                  }`}
                />
                <span className="text-[10px] text-[#7A6A5C] capitalize font-medium">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/login"
            onClick={onCloseMobile}
            title="Keluar / Ganti Akun"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A6A5C] hover:text-[#B93A2E] hover:bg-white transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 min-h-screen h-screen sticky top-0 bg-white border-r border-[#E8DFCC] p-5 lg:p-6 z-30 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer Body */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full p-5 flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
