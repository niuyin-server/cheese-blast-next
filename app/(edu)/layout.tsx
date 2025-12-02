"use client"

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { USER_PROFILE } from "@/app/data/content";
import Header from "@/app/(edu)/components/layout/Header";
import Sidebar from "@/app/(edu)/components/layout/Sidebar";
import { ThemeProvider } from "@/app/(edu)/providers/ThemeProvider";

type EduGroupLayoutProps = {
  children: ReactNode;
};

export default function EduGroupLayout({ children }: EduGroupLayoutProps) {
  const pathname = usePathname();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans selection:bg-cyan-500/30">
        <Header profile={USER_PROFILE} />
        <Sidebar activePath={pathname} />

        <main className="pl-0 md:pl-20 lg:pl-48 pt-16 min-h-screen transition-all duration-300">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}


