"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  BookOpen,
  Map,
  Lightbulb,
  BookMarked,
  Briefcase,
  Users,
  ChevronDown,
  BookOpenText,
  UserRound,
  HelpCircle,
  BarChart2,
  Code,
  Palette,
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
import Logo from "@/components/logo";
import { useAuthContext } from "@/context/auth-provider";
import { logout as logoutAPI } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { slugify } from "@/lib/slugify";

// Dropdown item type
type DropdownItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

// Dropdown data
const toolsDropdown: DropdownItem[] = [
  {
    title: "Career Simulator",
    href: "/tools/career-simulator",
    description: "Experience a day in the life of different digital roles",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Skill Comparison Tool",
    href: "/tools/skill-comparison",
    description: "Compare skills based on demand, salary, and difficulty",
    icon: <ChevronDown className="h-5 w-5" />,
  },
  {
    title: "What Can I Become?",
    href: "/tools/what-can-i-become",
    description: "Discover careers based on your skills and interests",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

const resourcesDropdown: DropdownItem[] = [
  {
    title: "Learning Paths",
    href: "/resources/learning-paths",
    description: "Curated learning journeys for different career goals",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Free Courses",
    href: "/resources/courses",
    description: "High-quality free courses from top providers",
    icon: <BookMarked className="h-5 w-5" />,
  },
  {
    title: "E-Books & Guides",
    href: "/resources/ebooks",
    description: "Downloadable resources to help you learn",
    icon: <BookOpenText className="h-5 w-5" />,
  },
];

const inspirationDropdown: DropdownItem[] = [
  {
    title: "Success Stories",
    href: "/inspiration/stories",
    description: "Real stories from people who changed their careers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Industry Insights",
    href: "/inspiration/insights",
    description: "Trends and opportunities in the digital industry",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Career Profiles",
    href: "/inspiration/profiles",
    description: "Detailed looks at different digital careers",
    icon: <UserRound className="h-5 w-5" />,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path) || false;
  };

  // Handle logout
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href={"/"}>
              <Button
                variant={"ghost"}
                className={`transition-colors 0 px-4 font-medium ${
                  isActive("/")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Home
              </Button>
            </Link>

            <Link href={"/careers"}>
              <Button
                variant={"ghost"}
                className={`transition-colors 0 px-4 font-medium ${
                  isActive("/careers")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Careers
              </Button>
            </Link>
            {/* Tools Dropdown */}
            <div
              ref={(el) => {
                dropdownRefs.current["tools"] = el;
              }}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("tools")}
                className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                  isActive("/tools")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tools
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    activeDropdown === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "tools" && (
                  <NavDropdownMenu items={toolsDropdown} />
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              ref={(el) => {
                dropdownRefs.current["resources"] = el;
              }}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("resources")}
                className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                  isActive("/resources")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Resources
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    activeDropdown === "resources" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <NavDropdownMenu items={resourcesDropdown} />
                )}
              </AnimatePresence>
            </div>

            {/* Inspiration Dropdown */}
            <div
              ref={(el) => {
                dropdownRefs.current["inspiration"] = el;
              }}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("inspiration")}
                className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                  isActive("/inspiration")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Inspiration
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    activeDropdown === "inspiration" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "inspiration" && (
                  <NavDropdownMenu items={inspirationDropdown} />
                )}
              </AnimatePresence>
            </div>

            <Link href={"/#community"}>
              <Button
                variant={"ghost"}
                className={`transition-colors 0 px-4 font-medium ${
                  isActive("/commiunity")
                    ? "text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Community
              </Button>
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {/* My Learning Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">My Learning</Button>
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
                    {/* User Nav Items */}
                    <DropdownMenuItem asChild>
                      <Link href="/my-learning" className="cursor-pointer">
                        <BookOpenText className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/my-learning/${slugify(user.user.pickedSkill)}`}
                        className="cursor-pointer"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Learning</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/my-learning/skills"
                        className="cursor-pointer"
                      >
                        <Map className="mr-2 h-4 w-4" />
                        <span>Skills</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/networking" className="cursor-pointer">
                        <UserRound className="mr-2 h-4 w-4" />
                        <span>Networking</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="relative">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div className="w-full cursor-pointer text-sm text-red-500 focus:text-red-500 px-2 py-1.5 hover:bg-slate-100 rounded">
                            Logout
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to logout?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              You will be logged out and redirected to the login
                              page.
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
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="outline" size={"md"} asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size={"md"} asChild>
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
      <AnimatePresence>
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
                      <p className="font-medium">
                        {user?.user?.name || "User"}
                      </p>
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
                    <Link
                      href="/my-learning"
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      onClick={toggleMenu}
                    >
                      <BookOpenText className="h-5 w-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                      href={`/my-learning/${slugify(user.user.pickedSkill)}`}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      onClick={toggleMenu}
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">Learning</span>
                    </Link>
                    <Link
                      href="/my-learning/skills"
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      onClick={toggleMenu}
                    >
                      <Map className="h-5 w-5" />
                      <span className="font-medium">Skills</span>
                    </Link>
                    <Link
                      href="/networking"
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      onClick={toggleMenu}
                    >
                      <UserRound className="h-5 w-5" />
                      <span className="font-medium">Networking</span>
                    </Link>
                  </nav>
                </div>
              )}

              <div className="p-4">
                <p className="font-semibold text-sm uppercase text-slate-500 mb-2">
                  Explore
                </p>
                <nav className="space-y-2">
                  {/* Mobile Dropdowns */}
                  <Link href={"/"} className="">
                    <Button
                      variant={"ghost"}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive("/")
                          ? "text-primary"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href={"/career"} className="">
                    <Button
                      variant={"ghost"}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive("/careers")
                          ? "text-primary"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Careers
                    </Button>
                  </Link>
                  <MobileDropdown
                    title="Tools"
                    items={toolsDropdown}
                    isActive={isActive("/tools")}
                  />
                  <MobileDropdown
                    title="Resources"
                    items={resourcesDropdown}
                    isActive={isActive("/resources")}
                  />
                  <MobileDropdown
                    title="Inspiration"
                    items={inspirationDropdown}
                    isActive={isActive("/inspiration")}
                  />
                  <Link href={"/#community"} className="">
                    <Button
                      variant={"ghost"}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive("/#community")
                          ? "text-primary"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Community
                    </Button>
                  </Link>
                </nav>
              </div>

              <div className="p-4 mt-auto border-t">
                {user ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full rounded-full bg-slate-800 hover:bg-slate-700">
                        Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to logout?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be logged out and redirected to the login
                          page.
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
      </AnimatePresence>
    </header>
  );
}

// Desktop Dropdown Menu
function NavDropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start">
              {item.icon && (
                <div className="mt-0.5 mr-3 text-primary">{item.icon}</div>
              )}
              <div>
                <span className="block text-sm font-medium text-slate-900">
                  {item.title}
                </span>
                {item.description && (
                  <span className="block mt-1 text-xs text-slate-500">
                    {item.description}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// Mobile Dropdown
function MobileDropdown({
  title,
  items,
  isActive,
}: {
  title: string;
  items: DropdownItem[];
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${
          isActive
            ? "text-primary"
            : "text-slate-700 hover:text-primary hover:bg-slate-50"
        }`}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-6 pr-3 py-2 space-y-1 border-l border-slate-100 ml-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-700 hover:text-primary hover:bg-slate-50"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
