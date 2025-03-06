"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "../logo";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname();

  // Determine if we should show the help button based on the current path
  const showHelpButton = !pathname.includes("/dashboard");

  return (
    <header className="border-b py-4 px-6 bg-white">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="w-8 h-8 relative">
          <Logo />
        </div>
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
  );
}
