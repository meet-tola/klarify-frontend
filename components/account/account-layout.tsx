"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, User, Award, BarChart, CreditCard, Settings } from "lucide-react"
import Footer from "../footer"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayoutClient({ children }: AccountLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Don't show navigation on the main account page
  const shouldShowNav = pathname !== "/account"

  return (
    <div className="flex min-h-screen flex-col ">

      {/* Mobile dropdown menu - only visible on small screens */}
      {shouldShowNav && (
        <div className="border-b md:hidden">
          <div className="container mx-auto px-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between py-4 font-medium"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span>Account Menu</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMenuOpen && "rotate-180")} />
              </Button>

              {isMenuOpen && (
                <div className="absolute left-0 right-0 z-50 mt-1 rounded-md border bg-background p-2 shadow-md">
                  <NavMenu />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Desktop sidebar - only visible on medium screens and up */}
        {shouldShowNav && (
          <aside className="hidden border-r md:block md:w-64">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="flex flex-col gap-2 p-4 pt-6">
                <NavMenu />
              </div>
            </ScrollArea>
          </aside>
        )}

        <main className={cn("flex-1 p-4 md:p-6", !shouldShowNav && "md:container md:mx-auto")}>{children}</main>
      </div>
    </div>
  )
}


function NavMenu() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Profile",
      href: "/account/profile",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Achievements",
      href: "/account/achievements",
      icon: <Award className="h-4 w-4" />,
    },
    {
      title: "Activity",
      href: "/account/activity",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Billing",
      href: "/account/billing",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
