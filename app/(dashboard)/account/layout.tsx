import type React from "react"
import type { Metadata } from "next"
import AccountLayoutClient from "@/components/account/account-layout"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings and preferences.",
}

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return <AccountLayoutClient children={children} />
}
