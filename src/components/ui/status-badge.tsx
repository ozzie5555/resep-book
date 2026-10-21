import React from "react";
import { StatusPembayaran } from "@/types";

interface StatusBadgeProps {
  status: StatusPembayaran;
  jumlahDp?: number;
  className?: string;
}

export function StatusBadge({ status, jumlahDp, className = "" }: StatusBadgeProps) {
  if (status === "Lunas") {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF5EE] text-[#2E8B57] border border-[#B8E2C8] ${className}`}
      >
        LUNAS
      </span>
    );
  }

  if (status === "DP") {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDF6E2] text-[#9E7000] border border-[#F4DB96] ${className}`}
      >
        DP {jumlahDp ? `Rp ${(jumlahDp / 1000).toFixed(0)}rb` : ""}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FBEBE9] text-[#B93A2E] border border-[#F1BFBA] ${className}`}
    >
      BELUM LUNAS
    </span>
  );
}
