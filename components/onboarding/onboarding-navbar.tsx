"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../logo";
import { useAuthContext } from "@/context/auth-provider";
import { logout as logoutAPI } from "@/lib/api";
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
import { HelpDialog } from "../help-dialog";

export default function OnboardingNavbar() {
  const { user, setUser } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [buttonSize, setButtonSize] = useState<
    "icon" | "default" | "md" | "sm" | null
  >("icon");

  // Always check for user
  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleResize = () => {
      setButtonSize(window.innerWidth < 640 ? "icon" : "md");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutAPI();
      setUser(null);

      toast.success("Logged out successfully", {
        description: "See you next time!",
      });
    } catch (error) {
      toast.error("Logout failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center space-x-4">
            {/* Help Button */}
            <HelpDialog buttonSize={buttonSize} />

            {user && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size={buttonSize}
                      className="rounded-full flex items-center justify-center"
                    >
                      <LogOut className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out and will need to sign in again
                        next time.
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
      </div>
    </header>
  );
}
