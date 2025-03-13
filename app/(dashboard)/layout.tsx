import type React from "react"
import MainNav from "@/components/dashboard/main.nav"
import SecondaryNav from "@/components/dashboard/secondary-nav"
import Footer from "@/components/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <SecondaryNav />
      <main className="flex-1 px-6 md:px-12">{children}</main>
      <Footer />
    </div>
  )
}

