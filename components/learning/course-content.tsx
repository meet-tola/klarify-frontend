"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseContentProps {
  onStartLesson: (lessonId: string) => void
}

export default function CourseContent({ onStartLesson }: CourseContentProps) {
  return (
    <div className="py-8 space-y-8 px-6 md:px-8 bg-white mt-6 rounded-lg">
      <div>
        <h1 className="text-2xl font-bold mb-2">Intermediate UI Design with Figma</h1>
        <p className="text-muted-foreground">Intermediate</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-6">Module 1: Advanced Figma Fundamentals & Workflow Optimization</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Setting Up Your Figma Workspace for Efficiency</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to optimize your Figma workspace for maximum productivity
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-1")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Mastering Components: Advanced Techniques and Variations</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dive deep into component creation and management</p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-2")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Styles and Libraries: Building Scalable Design Systems</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and manage design systems that scale with your projects
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-3")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Auto Layout Deep Dive: Responsive Design Principles</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Master auto layout for creating responsive designs
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-4")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  5
                </div>
                <div>
                  <h3 className="font-semibold">Constraints and Resizing: Creating Adaptive Interfaces</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to use constraints for adaptive designs
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-5")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  6
                </div>
                <div>
                  <h3 className="font-semibold">Version Control and Collaboration Best Practices</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Effective collaboration and version control in Figma
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("1-6")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Module 2: Prototyping Interactive Experiences</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Advanced Prototyping Techniques</h3>
                  <p className="text-sm text-muted-foreground mt-1">Create complex interactive prototypes in Figma</p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("2-1")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Creating Micro-interactions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Design delightful micro-interactions for your interfaces
                  </p>
                </div>
              </div>
              <Button className="flex justify-between flex-shrink-0 gap-1" variant={"ghost"} onClick={() => onStartLesson("2-2")}>
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

