"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E8DFCC] shadow-warm-md space-y-4">
        <div className="flex items-center gap-3 text-[#B93A2E]">
          <div className="w-10 h-10 rounded-full bg-[#FBEBE9] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#B93A2E]" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#3B2A1E]">{title}</h3>
        </div>

        <p className="text-sm text-[#7A6A5C] leading-relaxed">{description}</p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFCC]">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-[#E8DFCC] text-sm font-medium text-[#3B2A1E] hover:bg-[#FBF6EC] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#B93A2E] hover:bg-[#962e24] text-white text-sm font-semibold transition-colors"
          >
            {isLoading ? "Menghapus..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
