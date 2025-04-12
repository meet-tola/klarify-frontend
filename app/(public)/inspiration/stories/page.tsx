// success-stories.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import successStoriesData from "@/data/success-stories-data.json"

interface Story {
  id: number
  name: string
  role: string
  company: string
  image: string
  story: string
  position: "left" | "right"
  featured?: boolean
  skills?: string[]
}

const STORIES_PER_PAGE = 4

export default function SuccessStories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredStories = successStoriesData.stories.filter(story => 
    story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (story.skills && story.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  )

  // Get non-featured stories for pagination
  const nonFeaturedStories = filteredStories.filter(story => !story.featured)
  
  // Calculate pagination
  const totalPages = Math.ceil(nonFeaturedStories.length / STORIES_PER_PAGE)
  const currentStories = nonFeaturedStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 600,
      behavior: "smooth"
    })
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 roca-bold">Nigerian Tech Success Stories</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Discover how Nigeria's brightest tech minds are transforming industries and creating global impact from Lagos to Silicon Valley.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search Nigerian tech leaders by name, role, company or skill..."
              className="pl-10 pr-4 py-6 text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </motion.div>

        {/* Featured Story - Only shown when not searching */}
        {filteredStories.filter(story => story.featured).length > 0 && searchTerm === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Featured Nigerian Tech Leaders</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 lg:w-2/5 relative h-64 md:h-auto">
                  <Image
                    src={filteredStories.filter(story => story.featured)[0].image || "/placeholder.svg"}
                    alt={filteredStories.filter(story => story.featured)[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-1/2 lg:w-3/5">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {filteredStories.filter(story => story.featured)[0].name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        {filteredStories.filter(story => story.featured)[0].role}
                      </span>
                      <span className="hidden sm:block">•</span>
                      <span className="font-medium text-gray-700">
                        {filteredStories.filter(story => story.featured)[0].company}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                    "{filteredStories.filter(story => story.featured)[0].story}"
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredStories
                      .filter(story => story.featured)[0]
                      .skills?.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                  </div>
                  <Link href={`/stories/${filteredStories.filter(story => story.featured)[0].id}`}>
                    <Button>
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* All Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">
            {searchTerm ? `Search Results (${filteredStories.length})` : "More Nigerian Tech Stories"}
          </h2>
          
          {nonFeaturedStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No stories found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="space-y-8 md:space-y-12 mb-12">
                {currentStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`flex flex-col ${story.position === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-center`}
                  >
                    <div className="w-full md:w-1/5 flex justify-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-100 shadow-md">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-4/5">
                      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {story.name}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600">
                            <span className="font-medium text-blue-600">
                              {story.role}
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span className="font-medium text-gray-700">
                              {story.company}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4 text-sm md:text-base leading-relaxed">"{story.story}"</p>

                        {story.skills && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {story.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Link href={`/stories/${story.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs font-medium"
                          >
                            Read Full Story
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) handlePageChange(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show first pages, current page with neighbors, and last pages
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(pageNum)
                            }}
                            isActive={pageNum === currentPage}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) handlePageChange(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}