"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (career: string) => void
}

const suggestions = [
  { category: "Tech & Programming", color: "bg-blue-100" },
  { category: "Design & UX", color: "bg-purple-100" },
  { category: "Marketing & SEO", color: "bg-green-100" },
  { category: "AI & Data Science", color: "bg-orange-100" },
]

const searchResults = [
  {
    title: "UX/UI Design",
    description: "UX/UI designers create user-friendly digital experiences for apps and websites.",
  },
  {
    title: "Graphic Design",
    description:
      "Graphic designers craft visual content to communicate messages effectively using typography, imagery, and color.",
  },
  {
    title: "Web Development",
    description: "Web developers build and maintain websites, ensuring functionality, performance, and responsiveness.",
  },
  {
    title: "Product Management",
    description:
      "Product managers oversee product development from concept to launch, aligning cross-functional teams.",
  },
]

export default function SearchDialog({ isOpen, onClose, onSelect }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search for Skill</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion.category}
                      variant="secondary"
                      className={`cursor-pointer ${suggestion.color}`}
                      onClick={() => setSearchQuery(suggestion.category)}
                    >
                      {suggestion.category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Search Results</h3>
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.title}
                      className="p-3 rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => onSelect(result.title)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Learn More
              </Button>
              <Button onClick={onClose}>Next</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

