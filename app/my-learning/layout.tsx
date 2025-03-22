"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude layout for "/my-learning/[id]/content"
  if (pathname.match(/^\/my-learning\/[^/]+\/content$/)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 md:px-12">{children}</main>
      <Footer />
    </div>
  );
}
