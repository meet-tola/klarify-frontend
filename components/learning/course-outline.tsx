"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Phase {
  _id: string;
  phaseTitle: string;
  lessons: Lesson[];
}

interface CourseProgress {
  completed: number;
  total: number;
  percentage: number;
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
  setActiveView: (view: "outline" | "lesson") => void;
  className?: string;
  courseProgress: CourseProgress;
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
  setActiveView,
  className,
  courseProgress,
  roadmap,
}: CourseOutlineProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    // Find the first phase with an incomplete lesson and expand it
    if (roadmap?.phases?.length && expandedPhase === null) {
      for (const phase of roadmap.phases) {
        if (
          phase.lessons.some((lesson) => !completedLessons.includes(lesson._id))
        ) {
          setExpandedPhase(phase._id);
          break;
        }
      }
    }

    try {
      const stored = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      );
      if (Array.isArray(stored)) {
        setCompletedLessons(stored.filter((id) => typeof id === "string"));
      }
    } catch (err) {
      console.error("Error reading completedLessons from localStorage:", err);
    }
  }, [roadmap?.phases, expandedPhase]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const findNextIncompleteLesson = () => {
    for (const phase of roadmap?.phases || []) {
      for (const lesson of phase.lessons || []) {
        if (lesson?._id && !completedLessons.includes(lesson._id)) {
          return lesson._id;
        }
      }
    }
    return null;
  };

  const handleButtonClick = () => {
    if (activeView === "outline") {
      const nextLessonId = findNextIncompleteLesson();
      if (nextLessonId) {
        onSelectLesson(nextLessonId);
      }
    } else if (activeView === "lesson") {
      setActiveView("outline");
      setShowSidebar(false); // Close sidebar when navigating to lesson
    }
  };
  const allPhases = Array.isArray(roadmap?.phases) ? roadmap.phases : [];

  return (
    <div
      className={cn(
        "md:block md:w-80 lg:w-96 border-l overflow-y-auto bg-white",
        showSidebar
          ? "fixed md:relative inset-y-0 right-0 z-30 bg-background w-[90%] md:w-80 lg:w-96 h-full mobile-sidebar-open"
          : "hidden md:block pr-6 md:pr-12 mobile-sidebar-closed"
      )}
    >
      {" "}
      {/* Mobile Header */}
      <div className="p-4 flex items-center justify-between border-b md:hidden">
        <h2 className="font-semibold">Course Outline</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      {/* Progress Header */}
      <div className="p-5 border-b">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Your Progress</h3>
            <div className="text-sm font-medium">
              {courseProgress.percentage}%
            </div>
          </div>

          <Progress value={courseProgress.percentage} className="h-2" />

          <Button
            className="w-full mt-2"
            size="sm"
            variant={"outline"}
            onClick={handleButtonClick}
          >
            {activeView === "outline" ? "Continue Learning" : "View Outline"}
          </Button>
        </div>
      </div>
      {/* Course Phases */}
      <div className="flex-1 overflow-y-auto">
        {allPhases.length === 0 ? (
          <div className="p-5">
            <p className="text-muted-foreground text-sm">
              No roadmap data available.
            </p>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {allPhases.map((phase) => {
              const lessons = phase.lessons || [];
              const phaseCompletedCount = lessons.filter(
                (lesson) => lesson?._id && completedLessons.includes(lesson._id)
              ).length;
              const phasePercentage =
                lessons.length > 0
                  ? Math.round((phaseCompletedCount / lessons.length) * 100)
                  : 0;
              const isPhaseComplete = phasePercentage === 100;

              return (
                <div
                  key={phase._id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Phase Header */}
                  <button
                    className="w-full flex items-center p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                    onClick={() => togglePhase(phase._id)}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3",
                        isPhaseComplete
                          ? "bg-primary"
                          : "border-2 border-muted bg-white"
                      )}
                    >
                      {isPhaseComplete && (
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">
                        {phase.phaseTitle}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {phaseCompletedCount} of {lessons.length} lessons
                        completed
                      </div>
                    </div>

                    <ChevronRight
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-200",
                        expandedPhase === phase._id ? "rotate-90" : ""
                      )}
                    />
                  </button>

                  {/* Lessons */}
                  {expandedPhase === phase._id && (
                    <div className="border-t divide-y">
                      {lessons.map((lesson) => {
                        const isCompleted =
                          lesson._id && completedLessons.includes(lesson._id);
                        return (
                          <button
                            key={lesson._id}
                            className="w-full flex items-center p-3 hover:bg-slate-50 transition-colors text-left"
                            onClick={() => onSelectLesson(lesson._id)}
                          >
                            <div
                              className={cn(
                                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3",
                                isCompleted
                                  ? "bg-primary"
                                  : "border-2 border-muted bg-white"
                              )}
                            >
                              {isCompleted && (
                                <Check className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "text-sm",
                                isCompleted
                                  ? "font-medium"
                                  : "text-muted-foreground"
                              )}
                            >
                              {lesson.lessonTitle}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
