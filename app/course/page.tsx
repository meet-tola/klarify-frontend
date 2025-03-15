"use client"

import { useState } from "react"
import { ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseHeader from "@/components/course/course-header"
import CourseOutline from "@/components/course/course-outline"
import CourseContent from "@/components/course/course-content"
import LessonContent from "@/components/course/lesson-content"
import MobileTabs from "@/components/course/mobile-tabs"
import { cn } from "@/lib/utils"

export default function CoursePage() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeView, setActiveView] = useState<"outline" | "lesson">("outline")
  const [activeTab, setActiveTab] = useState<"content" | "materials">("content")
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    // Prevent body scrolling when sidebar is open on mobile
    if (typeof document !== "undefined") {
      document.body.style.overflow = !showSidebar ? "hidden" : ""
    }
  }

  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId)
    setActiveView("lesson")
  }

  const handleBackToOutline = () => {
    setActiveView("outline")
    setActiveLessonId(null)
  }

  // Mock data for course progress
  const courseProgress = {
    completed: 8,
    total: 42,
    percentage: 19,
  }

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFF]">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="container py-2 px-6 md:px-12 flex items-center">
          <Button variant="ghost" size="sm" className="mr-auto gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to {activeView === "outline" ? "Dashboard" : "Course Outline"}</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </header>

      {/* Course Header */}
      <CourseHeader
        title="Intermediate UI Design with Figma"
        modules={7}
        lessons={42}
        showMenuButton={false}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
      />

      {/* Backdrop for mobile sidebar */}
      {showSidebar && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setShowSidebar(false)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            {activeView === "outline" ? (
              <CourseContent onStartLesson={handleStartLesson} />
            ) : (
              <LessonContent lessonId={activeLessonId || "1"} onBack={handleBackToOutline} activeTab={activeTab} />
            )}
          </div>
        </main>

        {/* Course Outline Sidebar - Now on the right */}
        <div
          className={cn(
            "md:block md:w-80 lg:w-96 border-l overflow-y-auto bg-white",
            showSidebar
              ? "fixed md:relative inset-y-0 right-0 z-30 bg-background w-80 md:w-80 lg:w-96 h-[calc(100vh-7.5rem)] "
              : "hidden md:block pr-6 md:pr-12",
          )}
        >
          <CourseOutline
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            onSelectLesson={handleStartLesson}
            activeView={activeView}
          />
        </div>
      </div>

      {/* Mobile Tabs with Progress - Only visible on mobile */}
      <MobileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        courseProgress={courseProgress}
        className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-20"
      />
    </div>
  )
}

