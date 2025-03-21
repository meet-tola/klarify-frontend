"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useAuthContext } from "@/context/auth-provider"
import { logout as logoutAPI } from "@/lib/api"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, setUser } = useAuthContext()

  // Handle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutAPI()
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const mainNavItems = [
    { title: "Inspiration", href: "/inspiration" },
    { title: "Resources", href: "/resources" },
    { title: "Career Exploration", href: "/career" },
    { title: "Community Forum", href: "/community" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button className="rounded-full bg-slate-800 hover:bg-slate-700" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="rounded-full bg-slate-800 hover:bg-slate-700" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 border-t">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button className="w-full rounded-full bg-slate-800 hover:bg-slate-700" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full rounded-full bg-slate-800 hover:bg-slate-700" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

