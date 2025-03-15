"use client"

import { useState } from "react"
import { X, CheckCircle, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Module {
  id: number
  title: string
  lessons: Lesson[]
  completed: boolean
  current: boolean
}

interface Lesson {
  id: string
  number: number
  title: string
  completed: boolean
  current: boolean
}

const modules: Module[] = [
  {
    id: 1,
    title: "Advanced Figma Fundamentals & Workflow Optimization",
    completed: false,
    current: true,
    lessons: [
      {
        id: "1-1",
        number: 1,
        title: "Setting Up Your Figma Workspace for Efficiency",
        completed: true,
        current: false,
      },
      {
        id: "1-2",
        number: 2,
        title: "Mastering Components: Advanced Techniques and Variations",
        completed: false,
        current: true,
      },
      {
        id: "1-3",
        number: 3,
        title: "Styles and Libraries: Building Scalable Design Systems",
        completed: false,
        current: false,
      },
      {
        id: "1-4",
        number: 4,
        title: "Auto Layout Deep Dive: Responsive Design Principles",
        completed: false,
        current: false,
      },
      {
        id: "1-5",
        number: 5,
        title: "Constraints and Resizing: Creating Adaptive Interfaces",
        completed: false,
        current: false,
      },
      {
        id: "1-6",
        number: 6,
        title: "Version Control and Collaboration Best Practices",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: 2,
    title: "Prototyping Interactive Experiences",
    completed: false,
    current: false,
    lessons: [
      { id: "2-1", number: 1, title: "Advanced Prototyping Techniques", completed: false, current: false },
      { id: "2-2", number: 2, title: "Creating Micro-interactions", completed: false, current: false },
      { id: "2-3", number: 3, title: "User Testing with Prototypes", completed: false, current: false },
    ],
  },
  {
    id: 3,
    title: "Working with Data and Plugins",
    completed: false,
    current: false,
    lessons: [
      { id: "3-1", number: 1, title: "Data Visualization in Figma", completed: false, current: false },
      { id: "3-2", number: 2, title: "Essential Plugins for UI Design", completed: false, current: false },
      { id: "3-3", number: 3, title: "Creating Custom Plugins", completed: false, current: false },
    ],
  },
  {
    id: 4,
    title: "Advanced Typography and Accessibility",
    completed: false,
    current: false,
    lessons: [
      { id: "4-1", number: 1, title: "Typography Systems in Figma", completed: false, current: false },
      { id: "4-2", number: 2, title: "Accessibility Best Practices", completed: false, current: false },
    ],
  },
  {
    id: 5,
    title: "UI Design Patterns and Best Practices",
    completed: false,
    current: false,
    lessons: [
      { id: "5-1", number: 1, title: "Common UI Patterns", completed: false, current: false },
      { id: "5-2", number: 2, title: "Mobile Design Patterns", completed: false, current: false },
    ],
  },
  {
    id: 6,
    title: "Advanced Component Properties and Variants",
    completed: false,
    current: false,
    lessons: [
      { id: "6-1", number: 1, title: "Component Properties Deep Dive", completed: false, current: false },
      { id: "6-2", number: 2, title: "Creating Complex Variant Systems", completed: false, current: false },
    ],
  },
  {
    id: 7,
    title: "Case Study: Designing a Complex Application",
    completed: false,
    current: false,
    lessons: [
      { id: "7-1", number: 1, title: "Planning the Application", completed: false, current: false },
      { id: "7-2", number: 2, title: "Building the Design System", completed: false, current: false },
      { id: "7-3", number: 3, title: "Final Project Presentation", completed: false, current: false },
    ],
  },
]

interface CourseOutlineProps {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  onSelectLesson: (lessonId: string) => void
  activeView: "outline" | "lesson"
  className?: string
}

export default function CourseOutline({
  showSidebar,
  setShowSidebar,
  onSelectLesson,
  activeView,
  className,
}: CourseOutlineProps) {
  const [expandedModule, setExpandedModule] = useState<number>(1)

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? 0 : moduleId)
  }

  return (
    <div className="h-full bg-white">
      <div className="p-3 flex items-center justify-between border-b md:hidden">
        <h2 className="font-semibold text-sm">Course Outline</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">0%</div>
            <span className="text-sm font-medium">Completed</span>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-8">
            {activeView === "outline" ? "Start Course" : "View Outline"}
          </Button>
        </div>

        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module.id}>
              <button className="w-full flex items-center gap-3 mb-2" onClick={() => toggleModule(module.id)}>
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    module.completed ? "bg-primary" : "border-2 border-muted bg-background",
                  )}
                >
                  {module.completed ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    module.current && <div className="w-3 h-3 rounded-full bg-primary"></div>
                  )}
                </div>
                <span className="flex-1 text-[14px] font-medium text-left">
                  Phase {module.id}: {module.title.split("&")[0]}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    expandedModule === module.id ? "rotate-180" : "",
                  )}
                />
              </button>

              {expandedModule === module.id && (
                <div className="pl-11 space-y-4">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className="w-full flex items-center gap-3 text-left"
                      onClick={() => onSelectLesson(lesson.id)}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                          lesson.completed ? "bg-primary" : "border-2 border-muted bg-background",
                        )}
                      >
                        {lesson.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className={cn("text-sm", lesson.completed ? "font-medium" : "text-muted-foreground")}>
                        Wk {lesson.number}: {lesson.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

