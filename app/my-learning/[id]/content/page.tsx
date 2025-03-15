"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronDown, CheckCircle, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Progress } from "@/components/ui/progress"

interface Week {
  number: number
  title: string
  completed: boolean
  current: boolean
}

interface Phase {
  id: number
  title: string
  weeks: Week[]
  completed: boolean
  current: boolean
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Phase 1: Foundations (Week 1-4) – Understanding Design Basics",
    completed: false,
    current: true,
    weeks: [
      { number: 1, title: "Introduction to UX/UI", completed: true, current: false },
      { number: 2, title: "Design Thinking & User Research", completed: false, current: true },
      { number: 3, title: "Wireframing & Prototyping", completed: false, current: false },
      { number: 4, title: "UI Design Basics", completed: false, current: false },
    ],
  },
  {
    id: 2,
    title: "Phase 2: Intermediate (Week 5-8) – Hands-on Design & Industry Tools",
    completed: false,
    current: false,
    weeks: [
      { number: 5, title: "Advanced UI Design Principles", completed: false, current: false },
      { number: 6, title: "Design Systems & Components", completed: false, current: false },
      { number: 7, title: "Interactive Prototyping", completed: false, current: false },
      { number: 8, title: "User Testing & Iteration", completed: false, current: false },
    ],
  },
  {
    id: 3,
    title: "Phase 3: Advanced & Real-World Application (Week 9-12)",
    completed: false,
    current: false,
    weeks: [
      { number: 9, title: "Portfolio Development", completed: false, current: false },
      { number: 10, title: "Case Studies", completed: false, current: false },
      { number: 11, title: "Industry Best Practices", completed: false, current: false },
      { number: 12, title: "Final Project & Presentation", completed: false, current: false },
    ],
  },
]

const courseContent = {
  title: "Creating Engaging Learning Journeys UI/UX Best Practices",
  description:
    "Designing an effective and engaging learning journey requires thoughtful UI/UX design that enhances user experience, promotes retention, and keeps learners motivated. Below are key UI/UX best practices to consider when crafting an impactful learning experience:",
  sections: [
    {
      title: "1. User-Centered Design (UCD)",
      content: [
        "Design with the learner's needs, behaviors, and preferences in mind.",
        "Conduct user research through surveys, interviews, and usability testing to understand pain points.",
        "Use personas to represent different learner types and their learning styles.",
      ],
    },
    {
      title: "2. Clear Navigation and Structure",
      content: [
        "Implement intuitive navigation that helps learners understand their progress and location.",
        "Create a logical content hierarchy with clear sections and subsections.",
        "Use consistent layouts and patterns throughout the learning experience.",
      ],
    },
    {
      title: "3. Visual Design and Accessibility",
      content: [
        "Apply consistent typography, color schemes, and visual elements.",
        "Ensure sufficient contrast and readable text sizes.",
        "Support different learning preferences with multimedia content.",
      ],
    },
  ],
}

const materials = {
  videos: [
    {
      title: "Introduction to UI/UX Design Principles",
      platform: "YouTube",
      duration: "15:30",
      link: "https://youtube.com/watch?v=example1",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Understanding User Research Methods",
      platform: "YouTube",
      duration: "12:45",
      link: "https://youtube.com/watch?v=example2",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Wireframing Best Practices",
      platform: "Vimeo",
      duration: "18:20",
      link: "https://vimeo.com/example3",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ],
  articles: [
    {
      title: "The Importance of User-Centered Design",
      source: "UX Collective",
      readTime: "5 min read",
      link: "https://uxdesign.cc/example1",
    },
    {
      title: "Design Systems: A Comprehensive Guide",
      source: "Smashing Magazine",
      readTime: "8 min read",
      link: "https://smashingmagazine.com/example2",
    },
    {
      title: "Prototyping Tools Comparison",
      source: "Nielsen Norman Group",
      readTime: "6 min read",
      link: "https://nngroup.com/example3",
    },
  ],
  resources: [
    {
      title: "UI/UX Design Toolkit",
      type: "Resource Pack",
      description: "A collection of templates, UI kits, and design resources",
      link: "https://example.com/toolkit",
    },
    {
      title: "Accessibility Checklist",
      type: "PDF Guide",
      description: "Comprehensive checklist for ensuring accessible design",
      link: "https://example.com/accessibility",
    },
    {
      title: "User Research Templates",
      type: "Figma File",
      description: "Ready-to-use templates for user research documentation",
      link: "https://figma.com/example",
    },
  ],
}

export default function LearningPage() {
  const router = useRouter()
  const [expandedPhase, setExpandedPhase] = useState<number>(1)
  const [activeTab, setActiveTab] = useState("content")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reset roadmap visibility when screen size changes
    if (!isMobile) {
      setShowRoadmap(false)
    }
  }, [isMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return

      const scrollHeight = mainRef.current.scrollHeight
      const scrollTop = mainRef.current.scrollTop
      const clientHeight = mainRef.current.clientHeight

      // Calculate scroll percentage
      const scrolled = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100))
      setScrollProgress(isNaN(scrolled) ? 0 : scrolled)
    }

    const mainElement = mainRef.current
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll)

      return () => {
        mainElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleNextChapter = () => {
    // Find current phase and week
    const currentPhase = phases.find((p) => p.current)
    if (!currentPhase) return

    const currentWeekIndex = currentPhase.weeks.findIndex((w) => w.current)
    if (currentWeekIndex === -1) return

    // Navigate to next week or phase
    if (currentWeekIndex < currentPhase.weeks.length - 1) {
      router.push(`/learning/${currentPhase.id}/${currentWeekIndex + 2}`)
    } else {
      const nextPhase = phases.find((p) => p.id === currentPhase.id + 1)
      if (nextPhase) {
        router.push(`/learning/${nextPhase.id}/1`)
      }
    }
  }

  const toggleRoadmap = () => {
    setShowRoadmap(!showRoadmap)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-md">{courseContent.title}</h1>
          </div>

          {/* Custom Tabs - Desktop */}
          <div className="hidden md:flex border rounded-md overflow-hidden">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "content" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "materials" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
              onClick={() => setActiveTab("materials")}
            >
              Materials/Guide
            </button>
          </div>

          {/* Mobile Tabs - Moved to the bottom for mobile */}
          <div className="md:hidden invisible">
            {/* This is a placeholder to maintain layout, actual tabs moved to bottom */}
          </div>
        </div>
      </header>

      {/* Mobile Roadmap Toggle */}
      {isMobile && (
        <div className="sticky top-16 z-40 bg-background border-b">
          <button className="container flex items-center justify-between w-full py-3" onClick={toggleRoadmap}>
            <span className="font-medium">Course Progress</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", showRoadmap && "rotate-180")} />
          </button>

          {/* Mobile Roadmap Dropdown */}
          {showRoadmap && (
            <div className="container pb-4 space-y-2 max-h-[50vh] overflow-y-auto">
              {phases.map((phase) => (
                <div key={phase.id} className="border rounded-lg overflow-hidden">
                  <button
                    className={cn(
                      "w-full p-3 text-left flex items-center gap-3",
                      expandedPhase === phase.id ? "bg-accent" : "hover:bg-accent/50",
                    )}
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? 0 : phase.id)}
                  >
                    <div className="flex-shrink-0">
                      {phase.completed ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border-2",
                            phase.current ? "border-primary" : "border-muted",
                          )}
                        />
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium">{phase.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 text-muted-foreground transition-transform",
                        expandedPhase === phase.id && "rotate-180",
                      )}
                    />
                  </button>

                  {expandedPhase === phase.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="border-t"
                    >
                      {phase.weeks.map((week) => (
                        <div
                          key={week.number}
                          className={cn("flex items-center gap-3 p-3", week.current && "bg-accent")}
                        >
                          <div className="flex-shrink-0">
                            {week.completed ? (
                              <CheckCircle className="h-3 w-3 text-primary" />
                            ) : (
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full border-2",
                                  week.current ? "border-primary" : "border-muted",
                                )}
                              />
                            )}
                          </div>
                          <span className="text-xs">
                            Week {week.number}: {week.title}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <main ref={mainRef} className="flex-1 container py-6 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          {activeTab === "content" && (
            <div className="flex-1 prose prose-slate max-w-none">
              <h1>{courseContent.title}</h1>
              <p className="lead">{courseContent.description}</p>

              {courseContent.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2>{section.title}</h2>
                  <ul>
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Materials Tab Content */}
          {activeTab === "materials" && (
            <div className="flex-1 space-y-10">
              {/* Videos Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg overflow-hidden border hover:border-primary transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{video.platform}</span>
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Articles Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Articles</h2>
                <div className="space-y-4">
                  {materials.articles.map((article, index) => (
                    <a
                      key={index}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Resources Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {materials.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-6 rounded-lg border hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{resource.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                      <div className="flex items-center text-sm text-primary">
                        <span>Download</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="hidden lg:block lg:w-80 space-y-4">
              {phases.map((phase) => (
                <div key={phase.id} className="border rounded-lg overflow-hidden">
                  <button
                    className={cn(
                      "w-full p-4 text-left flex items-center gap-4",
                      expandedPhase === phase.id ? "bg-accent" : "hover:bg-accent/50",
                    )}
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? 0 : phase.id)}
                  >
                    <div className="flex-shrink-0">
                      {phase.completed ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border-2",
                            phase.current ? "border-primary" : "border-muted",
                          )}
                        />
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium">{phase.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        expandedPhase === phase.id && "rotate-180",
                      )}
                    />
                  </button>

                  {expandedPhase === phase.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="border-t"
                    >
                      {phase.weeks.map((week) => (
                        <div
                          key={week.number}
                          className={cn("flex items-center gap-4 p-4", week.current && "bg-accent")}
                        >
                          <div className="flex-shrink-0">
                            {week.completed ? (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            ) : (
                              <div
                                className={cn(
                                  "h-4 w-4 rounded-full border-2",
                                  week.current ? "border-primary" : "border-muted",
                                )}
                              />
                            )}
                          </div>
                          <span className="text-sm">
                            Week {week.number}: {week.title}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Tabs - Sticky bottom tabs for mobile view */}
      {isMobile && (
        <div className="sticky bottom-16 z-40 border-t bg-background">
          <div className="flex w-full">
            <button
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors",
                activeTab === "content" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors",
                activeTab === "materials" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
              onClick={() => setActiveTab("materials")}
            >
              Materials
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="sticky bottom-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Progress indicator */}
        <div className="w-full">
          <div className="flex items-center justify-between px-4 pt-1 text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{scrollProgress}%</span>
          </div>
          <Progress value={scrollProgress} className="h-1" />
        </div>

        {/* Navigation buttons - now grouped together */}
        <div className="container flex items-center justify-center gap-4 h-16">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNextChapter}>Next Chapter</Button>
        </div>
      </footer>
    </div>
  )
}

