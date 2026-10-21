"use client";

import React, { useState } from "react";
import { AppNavbar } from "./AppNavbar";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-[#FDFBF7] text-[#3B2A1E] antialiased">
      {/* Desktop Sidebar (Left Edge-to-Edge) */}
      <Sidebar
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Shell (Right Area Spanning Full Remaining Width) */}
      <div className="flex-1 w-full min-w-0 flex flex-col min-h-screen">
        {/* Topbar spanning edge-to-edge across main content */}
        <AppNavbar onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)} />

        {/* Dynamic Page Content Wrapper */}
        <main className="flex-1 w-full px-4 md:px-8 py-6 space-y-6 max-w-none pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation & FAB */}
      <BottomNav />
    </div>
  );
}
