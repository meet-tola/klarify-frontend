"use client";

import { useState, useEffect } from "react";
import { Target, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthContext } from "@/context/auth-provider";
import { getUserGoals } from "@/lib/api";
import StreakTracker from "@/components/learning/streak-tracker";
import { Skeleton } from "@/components/ui/skeleton";

export function GoalsProgressCard() {
  const { user } = useAuthContext();
  const [goalProgress, setGoalProgress] = useState(0);
  const [goalsCount, setGoalsCount] = useState(0);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const fetchGoalProgress = async () => {
      if (!user?.user?._id) return;

      try {
        setIsLoadingGoals(true);
        const goals = await getUserGoals(user.user._id);
        setGoalsCount(goals.length);

        if (goals.length > 0) {
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

    const streakData = JSON.parse(localStorage.getItem("streak") || "{}");
    setLongestStreak(streakData.longestStreak || 0);
  }, [user]);

  if (isLoadingGoals) {
    return (
      <div className="bg-white rounded-lg border flex flex-col p-6 items-start">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="relative w-24 h-24 mx-auto">
            <Skeleton className="w-full h-full rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
          <div className="mt-2 text-center space-y-1 pr-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
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
          <PopoverContent side="top" className="p-2 text-sm text-center">
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
  );
}
