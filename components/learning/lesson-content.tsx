"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface LessonContentProps {
  lessonId: string
  onBack: () => void
  activeTab: "content" | "materials"
}

// Mock lesson data
const lessonData = {
  id: "1-2",
  title: "Mastering Components: Advanced Techniques and Variations",
  module: "Advanced Figma Fundamentals & Workflow Optimization",
  moduleNumber: 1,
  lessonNumber: 2,
  totalLessons: 6,
  content: `
  <h1>Mastering Components: Advanced Techniques and Variations</h1>
  
  <p>Components are one of the most powerful features in Figma, allowing designers to create reusable elements that can be used across designs. In this lesson, we'll dive deep into advanced component techniques and learn how to create flexible, scalable component systems.</p>
  
  <h2>Understanding Component Architecture</h2>
  
  <p>Before diving into advanced techniques, it's important to understand the fundamental architecture of components in Figma:</p>
  
  <ul>
    <li>Main Components: The original component that serves as the source of truth</li>
    <li>Instances: Copies of the main component that can be customized</li>
    <li>Variants: Different states or versions of a component organized in a single component set</li>
    <li>Properties: Customizable aspects of a component that can be adjusted in instances</li>
  </ul>
  
  <h2>Creating Flexible Component Systems</h2>
  
  <p>The key to effective component systems is flexibility. Here's how to create components that can adapt to different contexts:</p>
  
  <ol>
    <li>Use Auto Layout for responsive components that can adapt to different content sizes</li>
    <li>Implement smart naming conventions to keep your component library organized</li>
    <li>Utilize component properties to create customizable instances</li>
    <li>Create component variants to handle different states and configurations</li>
  </ol>
  
  <h2>Advanced Variant Techniques</h2>
  
  <p>Variants allow you to combine multiple component states into a single component. Here are some advanced techniques:</p>
  
  <ul>
    <li>Multi-dimensional variants: Combining multiple properties (e.g., size, state, color)</li>
    <li>Boolean properties: Creating toggle-able features within components</li>
    <li>Instance swapping: Dynamically changing parts of a component based on properties</li>
  </ul>
`,
  summary: `
  <h3>Key Takeaways</h3>
  <ul>
    <li>Components are the building blocks of scalable design systems in Figma</li>
    <li>Variants allow you to create flexible components with multiple states</li>
    <li>Component properties provide customization options for instances</li>
    <li>Auto Layout makes components responsive to content changes</li>
    <li>Proper organization and naming conventions are crucial for component management</li>
  </ul>
`,
  materials: {
    videos: [
      {
        title: "Advanced Component Techniques in Figma",
        platform: "YouTube",
        duration: "15:30",
        link: "https://youtube.com/watch?v=example1",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        title: "Creating Flexible Component Systems",
        platform: "Figma",
        duration: "12:45",
        link: "https://figma.com/watch?v=example2",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ],
    articles: [
      {
        title: "The Power of Component Variants",
        source: "Figma Blog",
        readTime: "5 min read",
        link: "https://figma.com/blog/example1",
      },
      {
        title: "Component Architecture Best Practices",
        source: "UX Collective",
        readTime: "8 min read",
        link: "https://uxdesign.cc/example2",
      },
    ],
    resources: [
      {
        title: "Component Starter Kit",
        type: "Figma File",
        description: "A collection of pre-built components to jumpstart your design system",
        link: "https://figma.com/community/file/example1",
      },
      {
        title: "Component Naming Convention Guide",
        type: "PDF Guide",
        description: "Best practices for naming and organizing components",
        link: "https://example.com/guide",
      },
    ],
  },
}

export default function LessonContent({ lessonId, onBack, activeTab }: LessonContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const scrollHeight = contentRef.current.scrollHeight
      const scrollTop = contentRef.current.scrollTop
      const clientHeight = contentRef.current.clientHeight

      // Calculate scroll percentage
      const scrolled = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100))
      setScrollProgress(isNaN(scrolled) ? 0 : scrolled)

      // Mark as completed when scrolled to 90%
      if (scrolled >= 90) {
        setIsLessonCompleted(true)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)

      return () => {
        contentElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const handlePreviousLesson = () => {
    // Logic to navigate to previous lesson
    console.log("Navigate to previous lesson")
  }

  const handleNextLesson = () => {
    // Logic to navigate to next lesson
    console.log("Navigate to next lesson")
  }

  const handleMarkAsRead = () => {
    setIsLessonCompleted(true)
    // Additional logic to mark as read in your system
  }

  return (
    <div ref={contentRef} className="h-full overflow-y-auto pb-20">
      {activeTab === "content" ? (
        <div className="py-6 max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: lessonData.content }} />

          <div className="mt-10 p-4 bg-muted rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: lessonData.summary }} />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" className="gap-2" onClick={handlePreviousLesson}>
              <ArrowLeft className="h-4 w-4" /> Previous Lesson
            </Button>
            <Button className="gap-2" onClick={handleNextLesson}>
              Next Lesson <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-6 space-y-10">
          {/* Videos Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessonData.materials.videos.map((video, index) => (
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
              {lessonData.materials.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{article.title}</h3>
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
              {lessonData.materials.resources.map((resource, index) => (
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

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-8 md:right-[20rem] lg:right-[24rem] bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-30 md:z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium">
              Lesson {lessonData.lessonNumber} of {lessonData.totalLessons}
            </div>
            <Button
              variant={isLessonCompleted ? "outline" : "default"}
              size="sm"
              onClick={handleMarkAsRead}
              disabled={isLessonCompleted}
              className="h-7 text-xs"
            >
              {isLessonCompleted ? "Completed" : "Mark as Read"}
            </Button>
          </div>
          <Progress value={scrollProgress} className="h-1" />
        </div>
      </div>
    </div>
  )
}

