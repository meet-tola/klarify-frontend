"use client";

import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuthContext } from "@/context/auth-provider";
import { useEffect } from "react";
import LoadingScreen from "@/components/loading-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // Exclude layout for "/my-learning/[id]/content"
  if (pathname.match(/^\/my-learning\/[^/]+\/content$/)) {
    return <>{children}</>;
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (!loading && !user?.user?.learningPath || user?.user.learningPath.length === 0) {
      router.push("/roadmap");
    }
  }, [user, loading, router]);

  if (loading) return <LoadingScreen message={"Loading.."} />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 md:px-12">{children}</main>
      <Footer />
    </div>
  );
}
