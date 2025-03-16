"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Bell, X, Search, User, BookOpen, LogOut, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import Logo from "../logo"
import { useAuthContext } from "@/context/auth-provider"
import { logout as logoutAPI } from "@/lib/api"
import { useRouter } from "next/navigation"

const mainNavItems = [
  { title: "Inspiration", href: "/inspiration" },
  { title: "Resources", href: "/resources" },
  { title: "Career Exploration", href: "/career" },
  { title: "Community Forum", href: "/community" },
]

export default function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, setUser } = useAuthContext()
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAPI()
      setUser(null)


      toast.success("Logged out successfully", {
        description: "Redirecting to login page...",
      });

      router.push("/login");
    } catch (error) {
      toast.error("Logout failed", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  // Get the first letter of the user's name for the avatar fallback
  const getNameInitial = () => {
    if (user?.user?.name) {
      return user.user.name.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <header className="sticky top-0 px-6 md:px-12 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Logo />
                </Link>
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>

        <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-6">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden lg:block lg:flex-1 lg:max-w-sm">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={user?.user?.name || "User"}
                  />
                  <AvatarFallback>{getNameInitial()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.user?.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <Link href="/learning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <Link href="/roadmap/new">New Roadmap</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t lg:hidden"
          >
            <div className="container py-4">
              <Input type="search" placeholder="Search..." className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

