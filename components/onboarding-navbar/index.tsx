"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface NavbarProps {
  isLoggedIn?: boolean
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname()
  
  // Determine if we should show the help button based on the current path
  const showHelpButton = !pathname.includes("/dashboard")
  
  return (
    <header className="border-b py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
              <path
                d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-bold">Klarify</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {showHelpButton && (
            <Button variant="outline" size="sm">
              Get Help
            </Button>
          )}
          
          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
