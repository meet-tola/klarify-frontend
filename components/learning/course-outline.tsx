"use client";

import { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Phase {
  _id: string;
  phaseTitle: string;
  lessons: Lesson[];
}

interface Lesson {
  _id: string;
  lessonTitle: string;
  completed: boolean;
  current: boolean;
}

interface CourseOutlineProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  onSelectLesson: (lessonId: string) => void;
  activeView: "outline" | "lesson";
  className?: string;
  learningPath: any;
  roadmap: {
    phases: Phase[];
  };
}

export default function CourseOutline({
  showSidebar,
  setShowSidebar,
  onSelectLesson,
  activeView,
  className,
  learningPath,
  roadmap,
}: CourseOutlineProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  // Calculate completion percentage
  const totalLessons = roadmap.phases.flatMap((phase) => phase.lessons).length;
  const completedLessons = roadmap.phases
    .flatMap((phase) => phase.lessons)
    .filter((lesson) => lesson.completed).length;
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="h-full bg-white">
      {/* Mobile Header */}
      <div className="p-3 flex items-center justify-between border-b md:hidden">
        <h2 className="font-semibold text-sm">Course Outline</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Course Progress */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              {completionPercentage}%
            </div>
            <span className="text-sm font-medium">Completed</span>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-8">
            {activeView === "outline" ? "Start Course" : "View Outline"}
          </Button>
        </div>

        {/* Phases and Lessons */}
        <div className="space-y-6">
          {roadmap.phases.map((phase) => (
            <div key={phase._id}>
              {/* Phase Header */}
              <button
                className="w-full flex items-center gap-3 mb-2"
                onClick={() => togglePhase(phase._id)}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    phase.lessons.every((lesson) => lesson.completed)
                      ? "bg-primary"
                      : "border-2 border-muted bg-background"
                  )}
                >
                  {phase.lessons.every((lesson) => lesson.completed) ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    phase.lessons.some((lesson) => lesson.current) && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )
                  )}
                </div>
                <span className="flex-1 text-[14px] font-medium text-left">
                  {phase.phaseTitle}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    expandedPhase === phase._id ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Lessons */}
              {expandedPhase === phase._id && (
                <div className="pl-11 space-y-4">
                  {phase.lessons.map((lesson) => (
                    <button
                      key={lesson._id}
                      className="w-full flex items-center gap-3 text-left"
                      onClick={() => onSelectLesson(lesson._id)}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                          lesson.completed ? "bg-primary" : "border-2 border-muted bg-background"
                        )}
                      >
                        {lesson.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          lesson.completed ? "font-medium" : "text-muted-foreground"
                        )}
                      >
                        {lesson.lessonTitle}
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
  );
}