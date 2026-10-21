"use client";

import React, { useState } from "react";
import {
  Menu,
  ShieldCheck,
  User,
  Users,
  RotateCw,
  Bell,
  CloudCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { DataStore } from "@/lib/data-store";
import { useCurrentUser } from "@/lib/use-store";
import { UserRole } from "@/types";

interface AppNavbarProps {
  onToggleMobileSidebar?: () => void;
}

export function AppNavbar({ onToggleMobileSidebar }: AppNavbarProps) {
  const currentUser = useCurrentUser();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRoleToggle = (role: UserRole) => {
    DataStore.switchRole(role);
    toast.info(
      `Peran dialihkan ke: ${role === "owner" ? "Owner (Akses Penuh)" : "Staff Dapur (Akses Terbatas)"}`,
      { duration: 2500 }
    );
  };

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      window.dispatchEvent(new Event("dapur_data_changed"));
      toast.success("Data inventaris & pesanan berhasil disinkronkan");
    }, 400);
  };

  return (
    <header className="w-full h-16 bg-white border-b border-[#E8DFCC] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-2xs">
      {/* Sisi Kiri: Mobile Trigger, RLS Status & Role Switcher */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#E8DFCC] flex items-center justify-center text-[#3B2A1E] hover:bg-[#FBF6EC] transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* RLS Status Telemetry */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EAF5EE] border border-[#2E8B57]/20 text-[#2E8B57] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse shrink-0" />
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline font-mono tracking-tight text-[11px]">
            RLS AKTIF
          </span>
        </div>

        {/* Interactive Role Switcher Pill */}
        <div className="flex items-center bg-[#FDFBF7] border border-[#E8DFCC] rounded-xl p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => handleRoleToggle("owner")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentUser.role === "owner"
                ? "bg-[#1F6F50] text-white shadow-xs"
                : "text-[#7A6A5C] hover:text-[#3B2A1E]"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Owner</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleToggle("staff")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentUser.role === "staff"
                ? "bg-[#1F6F50] text-white shadow-xs"
                : "text-[#7A6A5C] hover:text-[#3B2A1E]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Staff</span>
          </button>
        </div>
      </div>

      {/* Sisi Kanan: Live Sync, Quick Actions & Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sync Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#7A6A5C] border-r border-[#E8DFCC] pr-4">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
          <span>Tersinkron PWA</span>
        </div>

        {/* Sync / Refresh Button */}
        <button
          type="button"
          onClick={handleManualSync}
          title="Sinkronkan data sekarang"
          className="w-9 h-9 rounded-xl border border-[#E8DFCC] bg-[#FDFBF7] hover:bg-white text-[#7A6A5C] hover:text-[#1F6F50] flex items-center justify-center transition-colors"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#1F6F50]" : ""}`} />
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          title="Pemberitahuan"
          onClick={() => toast.info("Semua notifikasi operasional telah dibaca.")}
          className="relative w-9 h-9 rounded-xl border border-[#E8DFCC] bg-[#FDFBF7] hover:bg-white text-[#7A6A5C] hover:text-[#3B2A1E] flex items-center justify-center transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C2512F]" />
        </button>

        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="w-9 h-9 rounded-full bg-[#1F6F50]/15 text-[#1F6F50] font-bold text-xs flex items-center justify-center font-heading border border-[#1F6F50]/20 shrink-0">
            {currentUser.nama
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-[#3B2A1E] leading-tight">
              {currentUser.nama}
            </p>
            <p className="text-[10px] text-[#7A6A5C] capitalize font-medium">
              {currentUser.role === "owner" ? "Pemilik Dapur" : "Staf Operasional"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
