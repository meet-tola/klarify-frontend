"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseHeaderProps {
  title: string
  phases: number
  lessons: number
  activeTab: "content" | "materials"
  setActiveTab: (tab: "content" | "materials") => void
  toggleSidebar: () => void
  showMenuButton?: boolean
}

export default function CourseHeader({
  title,
  phases,
  lessons,
  activeTab,
  setActiveTab,
  toggleSidebar,
  showMenuButton = false,
}: CourseHeaderProps) {
  return (
    <div className="border-b sticky top-0 bg-background z-10 px-6 md:px-12">
      <div className="container p-3 flex justify-between w-full items-center">
        <div className="flex flex-col items-start justify-center mb-1">
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="text-xs text-muted-foreground">
            {phases} phases • {lessons} lessons
          </div>
        </div>          

          {/* Tabs - Centered on both mobile and desktop */}
          <div className="mx-auto md:mx-0 hidden md:block">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "content" | "materials")}>
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
      </div>
    </div>
  )
}

