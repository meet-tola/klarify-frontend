"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseHeader from "@/components/learning/course-header";
import CourseOutline from "@/components/learning/course-outline";
import CourseContent from "@/components/learning/course-content";
import LessonContent from "@/components/learning/lesson-content";
import MobileTabs from "@/components/learning/mobile-tabs";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-provider";
import { useParams, useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { checkSectionsStatus, getRoadmapContent } from "@/lib/api";
import LoadingScreen from "@/components/loading-screen";

export default function CoursePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState<"outline" | "lesson">("outline");
  const [activeTab, setActiveTab] = useState<"content" | "materials">(
    "content"
  );
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { slug } = useParams();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && slugify(user.user.pickedSkill) !== slug) {
      router.push("/my-learning");
    }
  }, [user, slug]);

  useEffect(() => {
    const fetchLearningPath = async () => {
      if (user) {
        try {
          if (user?.user?.pickedSkill) {
            const data = await getRoadmapContent(
              user.user._id,
              user.user.pickedSkill
            );

            if (data.learningPath.skill === user.user.pickedSkill) {
              setLearningPath(data.learningPath);
              setRoadmap(data.roadmap);

              // Start polling for section readiness
              const pollForSections = async () => {
                try {
                  const roadmapId = data.roadmap?._id;
                  const check = await checkSectionsStatus(
                    user.user._id,
                    roadmapId
                  );

                  if (check.sectionsGenerated) {
                    setLoading(false);
                  } else {
                    setTimeout(pollForSections, 5000); // Retry after 5 seconds
                  }
                } catch (error) {
                  console.error("Error polling for section readiness:", error);
                  setLoading(false); // fallback to not block user forever
                }
              };

              pollForSections();
            } else {
              console.error("Skill mismatch with learning path.");
              setLoading(false);
            }
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error);
          setLoading(false);
        }
      }
    };

    fetchLearningPath();
  }, [user]);

  useEffect(() => {
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
  }, []);

  // Calculate progress
  const totalLessons =
    roadmap?.phases?.flatMap((phase: any) => phase.lessons).length || 0;
  const completedCount = completedLessons.length;
  const completionPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const courseProgress = {
    completed: completedCount,
    total: totalLessons,
    percentage: completionPercentage,
  };

  if (!user || slugify(user.user.pickedSkill) !== slug) {
    return null;
  }

  if (loading) {
    return <LoadingScreen message="Loading.." />;
  }

  if (!learningPath || !roadmap) {
    return router.push("/my-learning");
  }

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !showSidebar ? "hidden" : "";
    }
  };

  // Handle starting a lesson
  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView("lesson");
  };

  // Handle going back to the course outline or dashboard
  const handleBackToOutline = () => {
    if (activeView === "lesson") {
      setActiveView("outline");
      setActiveLessonId(null);
    } else if (activeView === "outline") {
      setActiveView("outline");
      window.location.href = "/my-learning";
    }
  };

  const totalPhases = roadmap?.phases?.length || 0;

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFF]">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="container py-2 px-6 md:px-12 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-auto gap-2"
            onClick={handleBackToOutline}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">
              Back to{" "}
              {activeView === "outline" ? "Dashboard" : "Course Outline"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </header>

      {/* Course Header */}
      <CourseHeader
        title={learningPath.skill}
        phases={totalPhases}
        lessons={totalLessons}
        showMenuButton={false}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
      />

      {/* Backdrop for mobile sidebar */}
      {showSidebar && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="max-w-5xl mx-auto px-4 md:px-12">
            {activeView === "outline" ? (
              <CourseContent
                onStartLesson={handleStartLesson}
                learningPath={learningPath}
                roadmap={roadmap}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userId={user?.user?._id}
              />
            ) : (
              <LessonContent
                lessonId={activeLessonId || "1"}
                onBack={handleBackToOutline}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                learningPath={learningPath}
                roadmap={roadmap}
                onStartLesson={handleStartLesson}
              />
            )}
          </div>
        </main>

        {/* Course Outline Sidebar */}
        <div
          className={cn(
            "md:block md:w-80 lg:w-96 border-l overflow-y-auto bg-white",
            showSidebar
              ? "fixed md:relative inset-y-0 right-0 z-30 bg-background w-[90%] md:w-80 lg:w-96 h-full"
              : "hidden md:block pr-6 md:pr-12"
          )}
        >
          <CourseOutline
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            onSelectLesson={handleStartLesson}
            courseProgress={courseProgress}
            activeView={activeView}
            learningPath={learningPath}
            roadmap={roadmap}
          />
        </div>
      </div>

      {/* Mobile Tabs with Progress */}
      {activeView === "outline" && (
        <MobileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          courseProgress={courseProgress}
          className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-20 py-3 px-6 md:px-8"
        />
      )}
    </div>
  );
}
