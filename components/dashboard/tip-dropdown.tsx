"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TipDropdownProps {
  title: string
  content: string
  defaultOpen?: boolean
}

export function TipDropdown({ title, content, defaultOpen = true }: TipDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-100 rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "transform rotate-180")} />
      </button>
      {isOpen && (
        <div className="p-3 text-sm text-gray-600">
          <p>{content}</p>
        </div>
      )}
    </div>
  )
}

