"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseContentProps {
  onStartLesson: (lessonId: string) => void;
  learningPath: any;
  roadmap: {
    skill: string;
    level: string;
    phases: {
      phaseTitle: string;
      lessons: {
        _id: string;
        lessonTitle: string;
        lessonSummary: {
          heading: string;
          description: string;
        };
      }[];
    }[];
  };
}

export default function CourseContent({ onStartLesson, roadmap }: CourseContentProps) {
  return (
    <div className="py-8 space-y-8 px-6 md:px-8 bg-white mt-6 rounded-lg">
      {/* Course Title and Level */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{roadmap.skill}</h1>
        <p className="text-muted-foreground">{roadmap.level}</p>
      </div>

      {/* Phases and Lessons */}
      <div className="space-y-10">
        {roadmap.phases.map((phase, phaseIndex) => (
          <section key={phaseIndex}>
            <h2 className="text-2xl font-bold mb-6">{phase.phaseTitle}</h2>

            <div className="space-y-4">
              {phase.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lesson._id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium mt-1">
                      {lessonIndex + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.lessonTitle}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lesson.lessonSummary.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="flex justify-between flex-shrink-0 gap-1"
                    variant={"ghost"}
                    onClick={() => onStartLesson(lesson._id)}
                  >
                    Start <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}