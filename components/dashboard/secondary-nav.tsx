"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const secondaryNavItems = [
  { title: "Home", href: "/my-learning" },
  { title: "Learn", href: "/my-learning/path" },
  { title: "Skills", href: "/my-learning/skills" },
  { title: "Networking", href: "/networking" },
  { title: "Jobs", href: "/jobs" },
]

export default function SecondaryNav() {
  // const scrollContainerRef = useRef<HTMLDivElement>(null)
  // const [showLeftScroll, setShowLeftScroll] = useState(false)
  // const [showRightScroll, setShowRightScroll] = useState(false)
  const pathname = usePathname()

  // const checkScroll = () => {
  //   if (scrollContainerRef.current) {
  //     const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
  //     setShowLeftScroll(scrollLeft > 0)
  //     setShowRightScroll(scrollLeft < scrollWidth - clientWidth)
  //   }
  // }

  // useEffect(() => {
  //   checkScroll()
  //   window.addEventListener("resize", checkScroll)
  //   return () => window.removeEventListener("resize", checkScroll)
  // }, [])

  // const scroll = (direction: "left" | "right") => {
  //   if (scrollContainerRef.current) {
  //     const scrollAmount = 200
  //     scrollContainerRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  return (
    <div className="sticky top-16 px-6 md:px-12 z-40 w-full border-b bg-white">
      <div className="relative">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-1"
        >
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex items-center whitespace-nowrap font-semiBold transition-colors hover:text-primary"
            >
              <Button
                variant={"ghost"}
                className={`text-[16px] px-4 ${
                  pathname === item.href ? "text-primary" : "text-gray-600"
                }`}
              >
                {item.title}
              </Button>
              {pathname === item.href && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}