"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import OnboardingNavbar from "@/components/onboarding/onboarding-navbar";
import LoadingScreen from "@/components/loading-screen";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAllowedPath = 
      pathname === "/signup" || 
      pathname === "/reset-password" ||
      pathname.startsWith("/reset-password/"); 

    if (!loading && !user && !isAllowedPath) {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) return <LoadingScreen message={"Loading.."} />;

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <OnboardingNavbar />
      {children}
    </main>
  );
}
