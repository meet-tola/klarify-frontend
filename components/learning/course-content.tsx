"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import CourseMaterials from "./course-materials"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { generateRoadmapSectionContent } from "@/lib/api"

interface CourseContentProps {
  onStartLesson: (lessonId: string) => void
  learningPath: any
  userId: string
  roadmap: {
    _id: string
    skill: string
    level: string
    phases: {
      phaseTitle: string
      lessons: {
        _id: string
        lessonTitle: string
        lessonSummary: {
          heading: string
          description: string
        }
        section?: any[]
      }[]
    }[]
  }
  activeTab: "content" | "materials"
  setActiveTab: (tab: "content" | "materials") => void
}

export default function CourseContent({ onStartLesson, roadmap, activeTab, learningPath, userId }: CourseContentProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Check if all lessons in the current phase have sections
  const checkPhaseSections = () => {
    const currentPhase = roadmap.phases[currentPhaseIndex]
    if (!currentPhase) return false

    // Check if all lessons have sections
    return currentPhase.lessons.every((lesson) => lesson.section && lesson.section.length > 0)
  }

  // Handle next phase button click
  const handleNextPhase = async () => {
    // If we have sections or we're already at the last phase, just navigate
    if (checkPhaseSections() || currentPhaseIndex >= roadmap.phases.length - 1) {
      setCurrentPhaseIndex((prev) => Math.min(prev + 1, roadmap.phases.length - 1))
    } else {
      // If no sections, show dialog
      setIsDialogOpen(true)
    }
  }

  // Generate content for the next phase
  const generateNextPhaseContent = async () => {
    setIsGenerating(true)
    try {
      await generateRoadmapSectionContent(userId, roadmap._id, currentPhaseIndex)
      // Move to next phase after generation
      setCurrentPhaseIndex((prev) => Math.min(prev + 1, roadmap.phases.length - 1))
    } catch (error) {
      console.error("Failed to generate content:", error)
    } finally {
      setIsGenerating(false)
      setIsDialogOpen(false)
    }
  }

  // Get current phase
  const currentPhase = roadmap.phases[currentPhaseIndex]
  // Check if there's a next phase
  const hasNextPhase = currentPhaseIndex < roadmap.phases.length - 1
  // Get next phase title if available
  const nextPhaseTitle = hasNextPhase ? roadmap.phases[currentPhaseIndex + 1].phaseTitle : ""

  return (
    <div className="py-6 md:py-8 space-y-6 md:space-y-8 px-4 md:px-8 bg-white mt-6 rounded-lg shadow-sm">
      {activeTab === "content" ? (
        <>
          {/* Course Title and Level */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-1">{roadmap.skill}</h1>
            <p className="text-sm text-muted-foreground">{roadmap.level}</p>
          </div>

          {/* Current Phase and Lessons */}
          <div className="space-y-8 md:space-y-10">
            {currentPhase && (
              <section>
                <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">{currentPhase.phaseTitle}</h2>

                <div className="space-y-3">
                  {currentPhase.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson._id}
                      onClick={() => onStartLesson(lesson._id)}
                      className="border rounded-lg p-3 md:p-4 flex items-start gap-3 cursor-pointer transition-all hover:bg-slate-50 hover:border-slate-300 group"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted text-xs md:text-sm font-medium mt-0.5">
                        {lessonIndex + 1}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-sm md:text-base">{lesson.lessonTitle}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                          {lesson.lessonSummary.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-center ml-2">
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Phase Button */}
                {hasNextPhase && (
                  <div className="mt-8 flex justify-center">
                    <Button onClick={handleNextPhase} className="px-6" variant="outline">
                      Go to {nextPhaseTitle}
                    </Button>
                  </div>
                )}
              </section>
            )}
          </div>
        </>
      ) : (
        <CourseMaterials learningPath={learningPath} />
      )}

      {/* Dialog for generating content */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Next Phase Content</DialogTitle>
            <DialogDescription>
              You haven't completed this phase yet. Do you want to proceed and generate content for the next phase?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={generateNextPhaseContent} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

