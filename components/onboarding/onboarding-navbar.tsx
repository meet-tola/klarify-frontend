"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "../logo"
import { useAuthContext } from "@/context/auth-provider"
import { logout as logoutAPI } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function OnboardingNavbar() {
  const { user, setUser } = useAuthContext()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await logoutAPI()
      setUser(null)

      toast.success("Logged out successfully", {
        description: "Redirecting to login page...",
      })

      router.push("/login")
    } catch (error) {
      toast.error("Logout failed", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center space-x-4">
            {/* Help Button */}
            <Button variant="outline" className="rounded-full" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Get Help</span>
            </Button>

            {user && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="rounded-full" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out and redirected to the login page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut}>
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

