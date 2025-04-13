"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CourseMaterials from "./course-materials";
import { useAuthContext } from "@/context/auth-provider";
import { getUserGoals, updateGoalProgress } from "@/lib/api";

interface Resources {
  exercises: {
    title: string;
    description: string;
    tasks: string[];
  }[];
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
}

interface LessonContentProps {
  lessonId: string;
  onBack: () => void;
  setActiveTab: (tab: "content" | "materials") => void;
  activeTab: "content" | "materials";
  onStartLesson: (lessonId: string) => void;
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
          sectionTitle: string;
          sectionType: string;
          content: {
            heading: {
              text: string;
              metadata?: string[];
            };
            description: {
              text: string;
              metadata?: string[];
            }[];
            examples?: {
              type: string;
              content: string;
              metadata?: string[];
            }[];
          }[];
          keyPoints: {
            metadata?: string[];
            items: string[];
          };
        }[];
        resources: Resources; // Use the Resources interface here
      }[];
    }[];
  };
  // Remove the separate resources definition here
}
export default function LessonContent({
  lessonId,
  onBack,
  onStartLesson,
  activeTab,
  learningPath,
  roadmap,
}: LessonContentProps) {
  const { user } = useAuthContext();
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [relatedGoals, setRelatedGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the current lesson based on lessonId
  const currentPhase = roadmap.phases.find((phase) =>
    phase.lessons.some((lesson) => lesson._id === lessonId)
  );

  const currentLesson = currentPhase?.lessons.find(
    (lesson) => lesson._id === lessonId
  );
  const lessonNumber = currentPhase
    ? currentPhase.lessons.findIndex((lesson) => lesson._id === lessonId) + 1
    : 0;
  const totalLessonsInPhase = currentPhase?.lessons.length || 0;

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
    if (!currentLesson) return;

    const allLessons = roadmap.phases.flatMap((phase) => phase.lessons);
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson._id === currentLesson._id
    );

    if (currentIndex > 0) {
      const previousLesson = allLessons[currentIndex - 1];
      onStartLesson(previousLesson._id);
    }
  };

  const handleNextLesson = () => {
    if (!currentLesson) return;

    const allLessons = roadmap.phases.flatMap((phase) => phase.lessons);
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson._id === currentLesson._id
    );

    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      onStartLesson(nextLesson._id);
    }
  };

  // Render lesson sections based on type and metadata
  const renderContentItem = (contentItem: any) => {
    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{contentItem.heading.text}</h3>

        {contentItem.description.map((desc: any, idx: number) => (
          <p key={idx} className="text-muted-foreground mb-2">
            {desc.text}
          </p>
        ))}

        {contentItem.examples?.map((example: any, idx: number) => {
          if (example.type === "code") {
            return (
              <div key={idx} className="my-4">
                <SyntaxHighlighter
                  language={
                    example.metadata
                      ?.find((m: string) => m.startsWith("language:"))
                      ?.split(":")[1] || "text"
                  }
                  style={atomOneDark}
                  customStyle={{ borderRadius: "8px", padding: "16px" }}
                >
                  {example.content}
                </SyntaxHighlighter>
              </div>
            );
          } else if (example.type === "image") {
            return (
              <div key={idx} className="my-4 flex justify-center">
                <img
                  src={example.content}
                  alt="Example"
                  className="rounded-lg max-w-full"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderSection = (section: any) => {
    return (
      <div key={section.sectionTitle} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{section.sectionTitle}</h2>

        {section.content.map((contentItem: any, idx: number) => (
          <div key={idx}>{renderContentItem(contentItem)}</div>
        ))}

        {section.keyPoints.items.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold mb-2">Key Points:</h4>
            <ul className="list-disc pl-6">
              {section.keyPoints.items.map((point: string, idx: number) => (
                <li key={idx} className="text-muted-foreground mb-1">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
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

          {/* Resources Section */}
          <ResourcesSection
            resources={
              currentLesson?.resources || {
                exercises: [],
                youtubeVideos: [],
                articles: [],
              }
            }
          />

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
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-8 md:right-[20rem] lg:right-[24rem] bg-background/80 border-t">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium">
              Lesson {lessonNumber} of {totalLessonsInPhase}
            </div>
            <Button
              variant={isLessonCompleted ? "outline" : "default"}
              onClick={handleMarkAsRead}
              disabled={isLessonCompleted}
              className="h-7 text-sm"
            >
              {isLessonCompleted ? "Completed" : "Mark as Read"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesSection({ resources }: { resources: Resources }) {
  const [activeTab, setActiveTab] = useState<
    "exercises" | "videos" | "articles"
  >("exercises");

  return (
    <div className="mt-8">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "exercises"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("exercises")}
        >
          Exercises
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "videos"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "articles"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "exercises" && (
          <div className="space-y-6">
            {resources.exercises.map((exercise, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">{exercise.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {exercise.description}
                </p>
                <h4 className="font-medium mb-2">Tasks:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {exercise.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-muted-foreground">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid gap-4 md:grid-cols-2">
            {resources.youtubeVideos.map((video, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2">{video.title}</h3>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Watch on YouTube
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="space-y-4">
            {resources.articles.map((article, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-muted/50"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="font-bold mb-1">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    By {article.author}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-primary">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read article
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
