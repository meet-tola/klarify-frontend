"use client";
import CommunityBanner from "@/components/community-banner";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude layout for "/my-learning/[slug]/content"
  if (pathname.match(/^\/my-learning\/[^/]+\/content$/)) {
    return <>{children}</>;
  }
  return (
    <div>
      {children}
      <CommunityBanner />
      <Footer />
    </div>
  );
}
