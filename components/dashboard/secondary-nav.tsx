"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const secondaryNavItems = [
  { title: "Home", href: "/dashboard" },
  { title: "Learning Path", href: "/learning-path" },
  { title: "Projects", href: "/projects" },
  { title: "Networking", href: "/networking" },
  { title: "Jobs", href: "/jobs" },
]

export default function SecondaryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="sticky top-16 px-6 md:px-12 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-14 items-center overflow-x-auto scrollbar-none">
        {showLeftScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-10 hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto px-4 scrollbar-none md:px-8"
          onScroll={checkScroll}
        >
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors hover:text-primary"
            >
              <Button variant={"ghost"}>
              {item.title}
              </Button>
            </Link>
          ))}
        </div>

        {showRightScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-10 hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

