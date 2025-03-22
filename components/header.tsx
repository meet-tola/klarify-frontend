"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  User,
  BookOpen,
  Map,
  Home,
  Lightbulb,
  BookMarked,
  Briefcase,
  Users,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/logo";
import { useAuthContext } from "@/context/auth-provider";
import { logout as logoutAPI } from "@/lib/api";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useAuthContext();

  // Handle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutAPI();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const mainNavItems = [
    {
      title: "Inspiration",
      href: "/inspiration",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      title: "Resources",
      href: "/resources",
      icon: <BookMarked className="h-5 w-5" />,
    },
    {
      title: "Career Exploration",
      href: "/career",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Community Forum",
      href: "/community",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const userNavItems = [
    {
      title: "Dashboard",
      href: "/my-learning",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Learning",
      href: "/my-learning/path",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Skills",
      href: "/my-learning/skill",
      icon: <Map className="h-5 w-5" />,
    },
    {
      title: "Networking",
      href: "/networking",
      icon: <Map className="h-5 w-5" />,
    },
  ];

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user?.user?.name) return "U";
    return user?.user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
              <div className="flex items-center space-x-2">
                {/* My Learning Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      My Learning
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.user?.profileImage || ""}
                            alt={user?.user?.name || "User"}
                          />
                          <AvatarFallback className="bg-slate-800 text-white text-xs">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            {user?.user?.name || "User"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {user?.user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Visit Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-semibold text-slate-500">
                      Learning
                    </DropdownMenuLabel>
                    {userNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="cursor-pointer">
                          {item.icon && (
                            <span className="mr-2">{item.icon}</span>
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500 focus:text-red-500 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="rounded-full bg-slate-800 hover:bg-slate-700"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide from right */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleMenu}
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4 border-b">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {user && (
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.user?.profileImage || ""}
                      alt={user?.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-slate-800 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.user?.name || "User"}</p>
                    <p className="text-sm text-slate-500">
                      {user?.user?.email || ""}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Visit Profile
                  </Link>
                </Button>
              </div>
            )}

            {user && (
              <div className="p-4 border-b">
                <p className="font-semibold text-sm uppercase text-slate-500 mb-2">
                  Your Learning
                </p>
                <nav className="space-y-2">
                  {userNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            <div className="p-4">
              <p className="font-semibold text-sm uppercase text-slate-500 mb-2">
                Explore
              </p>
              <nav className="space-y-2">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 mt-auto border-t">
              {user ? (
                <Button
                  className="w-full rounded-full bg-slate-800 hover:bg-slate-700"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    asChild
                  >
                    <Link href="/login" onClick={toggleMenu}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="w-full rounded-full bg-slate-800 hover:bg-slate-700"
                    asChild
                  >
                    <Link href="/signup" onClick={toggleMenu}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
}
