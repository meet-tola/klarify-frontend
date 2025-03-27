"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "@/lib/utils";
import CourseMaterials from "./course-materials";
import { useAuthContext } from "@/context/auth-provider";
import { getUserGoals, updateGoalProgress } from "@/lib/api";

interface LessonContentProps {
  lessonId: string;
  onBack: () => void;
  setActiveTab: (tab: "content" | "materials") => void;
  activeTab: "content" | "materials";
  learningPath: {
    youtubeVideos: {
      title: string;
      url: string;
      thumbnail: string;
    }[];
    articles: {
      title: string;
      url: string;
      author: string;
    }[];
    projects: {
      name: string;
      description: string;
      features: string[];
    }[];
  };
  roadmap: {
    phases: {
      phaseTitle: string;
      lessons: {
        _id: string;
        lessonTitle: string;
        lessonNumber: number;
        totalLessons: number;
        lessonSummary: {
          heading: string;
          description: string;
        };
        sections: {
          type: string;
          content: string;
          metadata: {
            bold?: boolean;
            bullets?: string[];
            imageLink?: string;
            alignment?: string;
            language?: string;
          };
        }[];
      }[];
    }[];
  };
}

export default function LessonContent({
  lessonId,
  onBack,
  activeTab,
  learningPath,
  roadmap,
}: LessonContentProps) {
  const { user } = useAuthContext();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [lastProgressUpdate, setLastProgressUpdate] = useState<Date | null>(
    null
  );
  const [relatedGoals, setRelatedGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the current lesson based on lessonId
  const currentLesson = roadmap.phases
    .flatMap((phase) => phase.lessons)
    .find((lesson) => lesson._id === lessonId);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollHeight = contentRef.current.scrollHeight;
      const scrollTop = contentRef.current.scrollTop;
      const clientHeight = contentRef.current.clientHeight;

      // Calculate scroll percentage
      const scrolled = Math.min(
        100,
        Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
      );
      setScrollProgress(isNaN(scrolled) ? 0 : scrolled);

      // Mark as completed when scrolled to 90%
      if (scrolled >= 90) {
        setIsLessonCompleted(true);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);

      return () => {
        contentElement.removeEventListener("scroll", handleScroll);
      };
    }

    const today = new Date().toISOString().split("T")[0];
    const lastUpdate = localStorage.getItem("lastProgressUpdate");
    if (lastUpdate && lastUpdate === today) {
      setIsLessonCompleted(true);
    }
  }, []);

  useEffect(() => {
    const fetchRelatedGoals = async () => {
      if (!user?.user?._id || !currentLesson) return;

      try {
        setIsLoadingGoals(true);
        const allGoals = await getUserGoals(user.user._id);

        // Find goals that match the current skill (you'll need to determine the current skill)
        const currentSkill = user?.user?.pickedSkill;
        const matchingGoals = allGoals.filter(
          (goal: {
            skill: string | null | undefined;
            progress: { completed: any };
          }) => goal.skill === currentSkill && !goal.progress.completed
        );
        console.log("Checking for matching goals", matchingGoals);
        setRelatedGoals(matchingGoals);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      } finally {
        setIsLoadingGoals(false);
      }
    };

    fetchRelatedGoals();
  }, [currentLesson, user]);

  // Handle marking a lesson as read with frequency checks
  const handleMarkAsRead = async () => {
    if (!currentLesson || !user?.user?._id) return;

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastUpdate = localStorage.getItem("lastProgressUpdate");

    // Check if user already made progress today
    if (lastUpdate === todayString) {
      setIsLessonCompleted(true);
      return;
    }

    try {
      // Update each related goal based on its frequency
      for (const goal of relatedGoals) {
        if (goal.progress.completed) continue;

        const lastUpdated = new Date(goal.progress.lastUpdated);
        const canUpdate = checkFrequency(goal.repeat, lastUpdated, today);

        if (canUpdate) {
          await updateGoalProgress(goal._id, 1);
        }
      }

      // Mark lesson as completed
      const completedLessons = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      ) as string[];
      if (!completedLessons.includes(currentLesson._id)) {
        completedLessons.push(currentLesson._id);
        localStorage.setItem(
          "completedLessons",
          JSON.stringify(completedLessons)
        );
      }

      // Update last progress date
      localStorage.setItem("lastProgressUpdate", todayString);
      setIsLessonCompleted(true);
    } catch (error) {
      console.error("Failed to update goal progress:", error);
    }
  };

  // Check if progress can be updated based on frequency
  const checkFrequency = (
    frequency: string,
    lastUpdated: Date,
    today: Date
  ): boolean => {
    const lastUpdatedDate = new Date(lastUpdated);
    const todayDate = new Date(today);

    // Reset time components for date comparison
    lastUpdatedDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    const timeDiff = todayDate.getTime() - lastUpdatedDate.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    switch (frequency) {
      case "daily":
        return dayDiff >= 1; // At least 1 day since last update
      case "weekly":
        return dayDiff >= 7; // At least 7 days since last update
      case "weekend":
        const dayOfWeek = today.getDay();
        return (dayOfWeek === 0 || dayOfWeek === 6) && dayDiff >= 1; // Weekend day and at least 1 day since last update
      case "none":
        return false; // No automatic progress updates
      default:
        return dayDiff >= 1; // Default to daily
    }
  };

  // Calculate overall progress
  const calculateProgress = () => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    ) as string[];
    const totalLessons = roadmap.phases.flatMap(
      (phase: any) => phase.lessons
    ).length;
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const handlePreviousLesson = () => {
    // Logic to navigate to previous lesson
    console.log("Navigate to previous lesson");
  };

  const handleNextLesson = () => {
    // Logic to navigate to next lesson
    console.log("Navigate to next lesson");
  };

  // Render lesson sections based on type and metadata
  const renderSection = (section: any) => {
    switch (section.type) {
      case "heading":
        return (
          <h2
            className={cn(
              "text-2xl font-bold mt-6 mb-4",
              section.metadata.bold ? "font-bold" : "font-semibold"
            )}
          >
            {section.content}
          </h2>
        );
      case "description":
        return (
          <p
            className={cn(
              "text-muted-foreground mb-4",
              section.metadata.bold ? "font-bold" : ""
            )}
          >
            {section.content}
          </p>
        );
      case "bullets":
        return (
          <ul className="list-disc pl-6 mb-4">
            {section.metadata.bullets?.map((bullet: any, index: any) => (
              <li key={index} className="text-muted-foreground">
                {bullet}
              </li>
            ))}
          </ul>
        );
      case "code":
        return (
          <div className="my-4">
            <SyntaxHighlighter
              language={section.metadata.language || "text"}
              style={atomOneDark}
              customStyle={{ borderRadius: "8px", padding: "16px" }}
            >
              {section.content}
            </SyntaxHighlighter>
          </div>
        );
      case "image":
        return (
          <div className="my-4 flex justify-center">
            <img
              src={section.metadata.imageLink}
              alt="Lesson Image"
              className={cn(
                "rounded-lg",
                section.metadata.alignment === "center" ? "mx-auto" : ""
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={contentRef} className="h-full overflow-y-auto pb-20">
      {activeTab === "content" ? (
        <div className="py-6 max-w-3xl mx-auto">
          {/* Lesson Title */}
          <h1 className="text-3xl font-bold mb-4">
            {currentLesson?.lessonTitle}
          </h1>

          {/* Lesson Sections */}
          {currentLesson?.sections.map((section, index) => (
            <div key={index}>{renderSection(section)}</div>
          ))}

          {/* Lesson Summary */}
          <div className="mt-10 p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-bold mb-4">
              {currentLesson?.lessonSummary.heading}
            </h3>
            <p className="text-muted-foreground">
              {currentLesson?.lessonSummary.description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handlePreviousLesson}
            >
              <ArrowLeft className="h-4 w-4" /> Previous Lesson
            </Button>
            <Button className="gap-2" onClick={handleNextLesson}>
              Next Lesson <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <CourseMaterials learningPath={learningPath} />
      )}

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-8 md:right-[20rem] lg:right-[24rem] bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-30 md:z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium">
              Lesson {currentLesson?.lessonNumber} of{" "}
              {currentLesson?.totalLessons}
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
  );
}
