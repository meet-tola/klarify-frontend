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

const stories: Story[] = [
  {
    id: 1,
    name: "Treasure Ajefu",
    role: "Frontend Engineer",
    company: "TechCorp",
    image: "/placeholder.svg?height=200&width=200",
    story: "I was 17 years old when I joined the platform. They have the best instructors for live classes and recorded lessons. Since I completed my program, I have been able to get jobs as a software engineer. The platform gave me the roadmap and the learning experience that I wouldn't have gotten at any other place.",
    position: "left",
    featured: true,
    skills: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    name: "Samantha Gloria",
    role: "Backend Engineer",
    company: "DataSystems",
    image: "/placeholder.svg?height=200&width=200",
    story: "I think one of the best things that happened to me was learning from people from Nigeria, Kenya and other countries. You get a different perspective on learning and also enjoy a community that helps people grow in so many different ways. The platform equipped me with what I needed to get into the door. If I hadn't joined, I'd know nothing.",
    position: "right",
    featured: false,
    skills: ["Node.js", "Python", "Django"]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Data Scientist",
    company: "AnalyticsPro",
    image: "/placeholder.svg?height=200&width=200",
    story: "With a background in statistics, I taught myself Python and machine learning through the platform's courses. The structured curriculum and mentor support made all the difference. Now I build recommendation algorithms at a leading tech company and mentor others on their journey.",
    position: "left",
    featured: false,
    skills: ["Python", "Machine Learning", "TensorFlow"]
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    role: "UX Designer",
    company: "CreativeMinds",
    image: "/placeholder.svg?height=200&width=200",
    story: "Coming from a graphic design background, I was able to transition into UX design through the platform's comprehensive curriculum. The hands-on projects and portfolio guidance helped me land my first role within 3 months of completing the program.",
    position: "right",
    featured: true,
    skills: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: 5,
    name: "David Wilson",
    role: "DevOps Engineer",
    company: "CloudScale",
    image: "/placeholder.svg?height=200&width=200",
    story: "The platform's project-based approach gave me the practical experience I needed to break into DevOps. I went from knowing nothing about cloud infrastructure to managing deployments for a team of 20 engineers in under a year.",
    position: "left",
    featured: false,
    skills: ["AWS", "Docker", "Kubernetes"]
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    role: "Mobile Developer",
    company: "AppWorks",
    image: "/placeholder.svg?height=200&width=200",
    story: "As a self-taught developer, the platform provided the structure I needed to go from basics to building production-ready apps. The community support and code reviews were invaluable in my learning process.",
    position: "right",
    featured: false,
    skills: ["Flutter", "Dart", "Firebase"]
  },
  {
    id: 7,
    name: "James Peterson",
    role: "Fullstack Developer",
    company: "WebSolutions",
    image: "/placeholder.svg?height=200&width=200",
    story: "After years in marketing, I made a career switch at 35. The platform's intensive bootcamp gave me the skills and confidence to land my first developer job within 6 months of starting to learn.",
    position: "left",
    featured: false,
    skills: ["JavaScript", "React", "Node.js"]
  },
  {
    id: 8,
    name: "Olivia Kim",
    role: "Product Manager",
    company: "TechStart",
    image: "/placeholder.svg?height=200&width=200",
    story: "The product management course helped me bridge the gap between my business background and technical teams. I now lead product development for a growing SaaS platform.",
    position: "right",
    featured: false,
    skills: ["Agile", "Scrum", "Product Strategy"]
  },
  {
    id: 9,
    name: "Daniel Brown",
    role: "Cloud Architect",
    company: "InfraTech",
    image: "/placeholder.svg?height=200&width=200",
    story: "The cloud certification programs were exactly what I needed to advance my career. I went from junior sysadmin to cloud architect in 18 months thanks to the platform's resources.",
    position: "left",
    featured: false,
    skills: ["Azure", "Terraform", "CI/CD"]
  },
  {
    id: 10,
    name: "Sophia Lee",
    role: "AI Engineer",
    company: "DeepMind Labs",
    image: "/placeholder.svg?height=200&width=200",
    story: "The machine learning specialization gave me the mathematical foundation I was missing as a self-learner. The projects I built during the program became the centerpiece of my portfolio.",
    position: "right",
    featured: false,
    skills: ["Python", "PyTorch", "NLP"]
  }
]

const STORIES_PER_PAGE = 4

export default function SuccessStories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredStories = stories.filter(story => 
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
    <section className="py-12 md:py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Success Stories</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Meet the people who transformed their careers and lives through technology. Get inspired by their journeys
            and see what's possible for your future.
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
              placeholder="Search by name, role, company or skill..."
              className="pl-10 pr-4 py-6 text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
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
            <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
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
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-blue-600">{filteredStories.filter(story => story.featured)[0].role}</Badge>
                    <Badge variant="outline">{filteredStories.filter(story => story.featured)[0].company}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {filteredStories.filter(story => story.featured)[0].name}
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
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
            {searchTerm ? `Search Results (${filteredStories.length})` : "Success Stories"}
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
                        <div className="mb-2">
                          <h3 className="text-base font-bold text-blue-600">{story.role}</h3>
                          <p className="font-bold text-sm text-slate-800">{story.name}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {story.company}
                          </Badge>
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