"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BookText,
  FolderKanban,
  Info,
  Layers,
  Target,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";
import { slugify } from "@/lib/slugify";
import { getInAppReminders, getRoadmapContent, getUserGoals } from "@/lib/api";
import { getLevelColor } from "@/lib/get-level-color";
import StreakTracker from "@/components/learning/streak-tracker";
import FeaturesBanner from "@/components/features-banner";

// Tip Dropdown Component
function TipDropdown({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <div
        className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="py-3 px-2 text-sm text-gray-600 bg-gray-50 rounded-md mb-2">
          {content}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [tipStates, setTipStates] = useState<boolean[]>([]);
  const [goalProgress, setGoalProgress] = useState(0);
  const [courseProgress, setCourseProgress] = useState(0);
  const [learntToday, setLearntToday] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [goalsCount, setGoalsCount] = useState(0);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderData, setReminderData] = useState<any>(null);

  useEffect(() => {
    const fetchRoadmapContent = async () => {
      if (user?.user?.pickedSkill) {
        try {
          const data = await getRoadmapContent(
            user.user._id,
            user.user.pickedSkill
          );

          if (data.learningPath.skill === user.user.pickedSkill) {
            const learningPathData = data.learningPath;
            const roadmapData = data.roadmap;

            setLearningPath(learningPathData);
            setRoadmap(roadmapData);
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error);
        }
      }
    };

    fetchRoadmapContent();
  }, [user]);

  // Fetch goal progress
  useEffect(() => {
    const fetchGoalProgress = async () => {
      if (!user?.user?._id) return;

      try {
        setIsLoadingGoals(true);
        const goals = await getUserGoals(user.user._id);
        setGoalsCount(goals.length);

        if (goals.length > 0) {
          // Calculate average progress across all goals
          const totalProgress = goals.reduce((sum: any, goal: any) => {
            return sum + (goal.progress.current / goal.progress.target) * 100;
          }, 0);
          const averageProgress = Math.round(totalProgress / goals.length);
          setGoalProgress(averageProgress);
        }
      } catch (error) {
        console.error("Failed to fetch goal progress:", error);
      } finally {
        setIsLoadingGoals(false);
      }
    };

    fetchGoalProgress();
  }, [user]);

  useEffect(() => {
    if (learningPath?.tips) {
      setTipStates(Array(learningPath.tips.length).fill(false));
    }
  }, [learningPath]);

  useEffect(() => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    ) as string[];
    const totalLessons = 50; 
    setCourseProgress(
      Math.round((completedLessons.length / totalLessons) * 100)
    );

    // Fetch "Learnt Today"
    const today = new Date().toISOString().split("T")[0];
    const learntTodayData = JSON.parse(
      localStorage.getItem("learntToday") || "{}"
    );
    setLearntToday(learntTodayData[today] || 0);

    // Fetch longest streak
    const streakData = JSON.parse(localStorage.getItem("streak") || "{}");
    setLongestStreak(streakData.longestStreak || 0);
  }, []);

  useEffect(() => {
    const checkForReminders = async () => {
      if (!user?.user?._id) return;

      try {
        // Check if we should show a reminder today
        const today = new Date().toISOString().split("T")[0];
        const lastReminderShown = localStorage.getItem("lastReminderShown");

        // Only show once per day
        if (lastReminderShown !== today) {
          const reminders = await getInAppReminders(user.user._id);

          if (reminders.length > 0) {
            // Get the first reminder (most urgent)
            const reminder = reminders[0];

            // Get course progress from localStorage
            const completedLessons = JSON.parse(
              localStorage.getItem("completedLessons") || "[]"
            ) as string[];
            const totalLessons = 50; 
            const progress = Math.round(
              (completedLessons.length / totalLessons) * 100
            );

            // Prepare reminder data
            setReminderData({
              title: reminder.title,
              description: reminder.message,
              progress: progress,
              daysRemaining: reminder.daysRemaining,
              totalLessons: totalLessons,
              completedLessons: completedLessons.length,
              estimatedTimeLeft: `${Math.ceil(
                (totalLessons - completedLessons.length) * 0.5
              )} hours`, 
              skill: reminder.skill || "your skill",
            });

            setShowReminder(true);
            localStorage.setItem("lastReminderShown", today);
          }
        }
      } catch (error) {
        console.error("Failed to check for reminders:", error);
      }
    };

    checkForReminders();
  }, [user]);

  const toggleTip = useCallback((index: number) => {
    setTipStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }, []);

  if (loading) {
    return <LoadingScreen message={"Loading..."} />;
  }

  return (
    <div className="container mx-auto py-8 space-y-8 md:px-8 bg-background">
      {/* Welcome Section */}
      <div>
        <motion.h1
          className="text-3xl font-bold roca-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, {user?.user.name}
          <span role="img" aria-label="waving">
            👋
          </span>
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You're mastering {user?.user.learningPath[0].skill}! Keep going!
        </motion.p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href={
            user?.user.pickedSkill
              ? `/my-learning/${slugify(user.user.pickedSkill)}/content`
              : "#"
          }
          className="block p-6 border rounded-lg hover:border-primary bg-white hover:bg-muted"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookText />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Continue Learning</h3>
              <p className="text-sm text-muted-foreground">
                Resume your current tutorial or course
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>

        <Link
          href={
            user?.user.pickedSkill
              ? `/my-learning/${slugify(user.user.pickedSkill)}/projects`
              : "#"
          }
          className="block p-6 border rounded-lg hover:border-primary bg-white hover:bg-muted"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">View Projects</h3>
              <p className="text-sm text-muted-foreground">
                View your projects and milestones
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>

        <Link
          href={
            user?.user.pickedSkill
              ? `/my-learning/${slugify(user.user.pickedSkill)}`
              : "#"
          }
          className="block p-6 border rounded-lg hover:border-primary bg-white hover:bg-muted"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Explore Resources</h3>
              <p className="text-sm text-muted-foreground">
                Discover curated tutorials, articles and videos
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      </div>

      {/* Continue Learning Section */}
      <section>
        <h2 className="text-2xl font-bold roca-bold mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card - Goals Progress Circle */}
          <div className="bg-white rounded-lg border flex flex-col p-6 items-start">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Goals
              </h3>
              <Popover>
                <PopoverTrigger>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="p-2 text-sm text-center">
                  <p>Track your learning goals progress</p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="relative w-24 h-24 mx-auto">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#F4F4F5"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#42347B"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 * (1 - goalProgress / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {isLoadingGoals ? "..." : `${goalProgress}%`}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center space-y-1 pr-4">
                <p className="font-medium text-primary">
                  {goalsCount} Active {goalsCount === 1 ? "Goal" : "Goals"}
                </p>
                <p className="text-gray-600">
                  Longest streak:{" "}
                  <span className="font-medium text-primary">
                    {longestStreak} Days
                  </span>
                </p>
                <StreakTracker />
              </div>
            </div>
          </div>

          {/* Right Card - Course Progress */}
          <div className="bg-white rounded-lg border px-6 py-4 md:col-span-2">
            <div className="h-full flex flex-col">
              <p
                className={`text-sm font-medium ${getLevelColor(
                  roadmap?.level
                )} py-1`}
              >
                {roadmap?.level}
              </p>
              <h3 className="text-xl font-semibold mb-auto">
                {user?.user.pickedSkill}
              </h3>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="text-gray-600">{courseProgress}%</span>
                  </div>
                  <Progress
                    value={courseProgress}
                    className="h-2 bg-gray-100"
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    href={
                      user?.user.pickedSkill
                        ? `/my-learning/${slugify(
                            user.user.pickedSkill
                          )}/content`
                        : "#"
                    }
                  >
                    <Button
                      variant="outline"
                      disabled={!user?.user.pickedSkill}
                    >
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section>
        <h2 className="text-2xl font-bold roca-bold mb-6">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - One YouTube Video and One Article */}
          <div className="space-y-6">
            {/* Display One YouTube Video */}
            {learningPath?.youtubeVideos?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {learningPath.youtubeVideos[0].title}
                    </h3>
                    <p className="text-gray-600">YouTube Video</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(learningPath.youtubeVideos[0].url, "_blank")
                    }
                  >
                    View
                  </Button>
                </div>
              </div>
            )}

            {/* Display One Article */}
            {learningPath?.articles?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {learningPath.articles[0].title}
                    </h3>
                    <p className="text-gray-600">
                      Article by {learningPath.articles[0].author}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(learningPath.articles[0].url, "_blank")
                    }
                  >
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Tips for Beginners */}
          <div className="p-6 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">
                Tips for {learningPath?.level || "Beginners"}
              </h3>
              <Popover>
                <PopoverTrigger>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="p-2 text-sm text-center">
                  <p>Helpful tips for getting started</p>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-gray-600 mb-6">
              Here are some tips tailored for your current level:
            </p>
            <div className="space-y-4">
              {learningPath?.tips?.map((tip: any, index: any) => (
                <TipDropdown
                  key={index}
                  title={tip.title.replace(/^Tips:\s*/, "")}
                  content={tip.content}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
