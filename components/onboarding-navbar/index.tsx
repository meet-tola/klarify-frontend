"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../logo";
import { useAuthContext } from "@/context/auth-provider";
import { logout as logoutAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";

export default function OnboardingNavbar() {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutAPI();
      setUser(null);

      toast.success("Logged out successfully", {
        description: "Redirecting to login page...",
      });

      router.push("/login");
    } catch (error) {
      toast.error("Logout failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b h-[80px] py-4 px-6 md:px-12 bg-white border-b-gray-200 z-50 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-8 h-8 relative">
          <Logo />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Get Help
          </Button>
          {user && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out and redirected to the login page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
