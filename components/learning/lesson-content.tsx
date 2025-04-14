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

        console.log("roadmap", roadmap.phases);

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
  const [activeTab, setActiveTab] = useState<"exercises" | "videos" | "articles">("exercises");

  const hasExercises = resources.exercises.length > 0;
  const hasVideos = resources.youtubeVideos.length > 0;
  const hasArticles = resources.articles.length > 0;

  // If no resources at all, don't render the section
  if (!hasExercises && !hasVideos && !hasArticles) {
    return (
      <div className="mt-8 text-center py-6 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">No additional resources for this lesson</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
      
      {/* Tab Navigation */}
      <div className="flex border-b">
        {hasExercises && (
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "exercises"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("exercises")}
          >
            Exercises
          </button>
        )}
        {hasVideos && (
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "videos"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        )}
        {hasArticles && (
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "articles"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("articles")}
          >
            Articles
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "exercises" && (
          <div className="space-y-6">
            {hasExercises ? (
              resources.exercises.map((exercise, index) => (
                <div key={index} className="p-6 border rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{exercise.title}</h3>
                      <p className="text-muted-foreground mb-4">{exercise.description}</p>
                      {exercise.tasks && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-muted-foreground">Your Task</h4>
                          <p className="text-foreground">{exercise.tasks}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-1">No exercises yet</h4>
                <p className="text-muted-foreground">Check back later for practice exercises</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid gap-4 md:grid-cols-2">
            {hasVideos ? (
              resources.youtubeVideos.map((video, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                        <div className="bg-red-600 text-white p-3 rounded-full">
                          <Play className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold line-clamp-2 mb-2">{video.title}</h3>
                      <div className="flex items-center text-sm text-red-600 font-medium">
                        <ExternalLink className="h-4 w-4 mr-1.5" />
                        Watch on YouTube
                      </div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-12 col-span-full">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-1">No videos yet</h4>
                <p className="text-muted-foreground">We'll add relevant video tutorials soon</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="grid gap-4">
            {hasArticles ? (
              resources.articles.map((article, index) => (
                <div key={index} className="border rounded-lg p-5 hover:bg-muted/10 transition-colors">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">By {article.author}</p>
                        <div className="flex items-center text-blue-600 font-medium text-sm">
                          <ExternalLink className="h-4 w-4 mr-1.5" />
                          Read article
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-1">No articles yet</h4>
                <p className="text-muted-foreground">We'll add helpful reading materials soon</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
