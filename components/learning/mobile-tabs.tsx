"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface CourseProgress {
  completed: number
  total: number
  percentage: number
}

interface MobileTabsProps {
  activeTab: "content" | "materials"
  setActiveTab: (tab: "content" | "materials") => void
  courseProgress: CourseProgress
  className?: string
}

export default function MobileTabs({ activeTab, setActiveTab, courseProgress, className }: MobileTabsProps) {
  return (
    <div className={className}>
      {/* Course Progress Bar */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Course Progress</span>
          <span>{courseProgress.percentage}% Complete</span>
        </div>
        <Progress value={courseProgress.percentage} className="h-1.5" />
      </div>

      {/* Tabs */}
      <div className="p-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "content" | "materials")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

