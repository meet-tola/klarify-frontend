"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "@/lib/utils";

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

export default function LessonContent({ lessonId, onBack, activeTab, learningPath, roadmap }: LessonContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
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
      const scrolled = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100));
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
  }, []);

  // Handle marking a lesson as read
  const handleMarkAsRead = () => {
    if (!currentLesson) return;

    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[];
    if (!completedLessons.includes(currentLesson._id)) {
      completedLessons.push(currentLesson._id);
      localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    }

    setIsLessonCompleted(true);
  };

  // Calculate overall progress
  const calculateProgress = () => {
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[];
    const totalLessons = roadmap.phases.flatMap((phase: any) => phase.lessons).length;
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
          <h1 className="text-3xl font-bold mb-4">{currentLesson?.lessonTitle}</h1>

          {/* Lesson Sections */}
          {currentLesson?.sections.map((section, index) => (
            <div key={index}>{renderSection(section)}</div>
          ))}

          {/* Lesson Summary */}
          <div className="mt-10 p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-bold mb-4">{currentLesson?.lessonSummary.heading}</h3>
            <p className="text-muted-foreground">{currentLesson?.lessonSummary.description}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" className="gap-2" onClick={handlePreviousLesson}>
              <ArrowLeft className="h-4 w-4" /> Previous Lesson
            </Button>
            <Button className="gap-2" onClick={handleNextLesson}>
              Next Lesson <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-6 space-y-10">
          {/* Videos Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPath.youtubeVideos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg overflow-hidden border hover:border-primary transition-colors"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Articles Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="space-y-4">
              {learningPath.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{article.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPath.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-8 md:right-[20rem] lg:right-[24rem] bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-30 md:z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium">
              Lesson {currentLesson?.lessonNumber} of {currentLesson?.totalLessons}
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