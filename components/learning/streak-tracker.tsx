"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, Plus, Target, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserGoals } from "@/lib/api";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-provider";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: {
    current: number;
    target: number;
    completed: boolean;
  };
  startDate: string;
  endDate: string;
  repeat: "daily" | "weekly" | "weekend" | "none";
  skill: string;
}

export default function StreakTracker() {
  const { user } = useAuthContext();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakHistory, setStreakHistory] = useState<boolean[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const userId = user?.user._id;

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      const { currentStreak, longestStreak, streakHistory } =
        JSON.parse(savedStreak);
      setCurrentStreak(currentStreak);
      setLongestStreak(longestStreak);
      setStreakHistory(streakHistory);
    }
  }, []);

  // Load goals from API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        if (!userId) {
          throw new Error("User ID is undefined");
        }
        const userGoals = await getUserGoals(userId);
        setGoals(userGoals.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Update streak when the user visits the page
  const isYesterday = (last: string, today: string) => {
    const lastDate = new Date(last);
    const todayDate = new Date(today);
    const diff = todayDate.getTime() - lastDate.getTime();
    return diff === 86400000; 
  };
  
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastVisit = localStorage.getItem("lastVisit");
  
    if (lastVisit !== today) {
      const saved = localStorage.getItem("streak");
      let newStreak = 1;
      let newLongest = 1;
      let newHistory = [true];
  
      if (saved) {
        const { currentStreak, longestStreak, streakHistory } =
          JSON.parse(saved);
  
        if (isYesterday(lastVisit || "", today)) {
          newStreak = currentStreak + 1;
          newLongest = Math.max(longestStreak, newStreak);
          newHistory = [...streakHistory, true];
        } else {
          newStreak = 1;
          newHistory = [...streakHistory, false, true];
        }
      }
  
      setCurrentStreak(newStreak);
      setLongestStreak(newLongest);
      setStreakHistory(newHistory);
  
      localStorage.setItem(
        "streak",
        JSON.stringify({
          currentStreak: newStreak,
          longestStreak: newLongest,
          streakHistory: newHistory,
        })
      );
  
      localStorage.setItem("lastVisit", today);
    }
  }, []);

  // Calculate days remaining for a goal
  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  // Handle redirect to create goal page
  const handleCreateGoal = () => {
    router.push("/my-learning/goals");
  };

  // Split streakHistory into chunks of 7 for each container
  const chunkSize = 7;
  const streakChunks = [];
  for (let i = 0; i < streakHistory.length; i += chunkSize) {
    streakChunks.push(streakHistory.slice(i, i + chunkSize));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary p-0 h-auto">
          See Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Your Learning Journey
          </DialogTitle>
        </DialogHeader>

        {/* Goals Section */}
        <div className="space-y-1">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Target size={14} />
              Goals
            </h3>
            {goals.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCreateGoal}
                className="h-7 px-2"
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>Loading goals...</p>
            </div>
          ) : goals.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-3 text-sm">
                No learning goals yet
              </p>
              <Button onClick={handleCreateGoal} size="sm" variant="outline">
                <Plus size={14} className="mr-1" /> Create Goal
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {goals.map((goal, index) => (
                  <Card
                    key={goal.id || index}
                    className="overflow-hidden border-0 shadow-sm"
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{goal.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {goal.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {goal.skill}
                        </Badge>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>
                            {goal.progress.current}/{goal.progress.target}
                          </span>
                          <span>
                            {calculateProgress(
                              goal.progress.current,
                              goal.progress.target
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={calculateProgress(
                            goal.progress.current,
                            goal.progress.target
                          )}
                          className="h-1"
                        />
                      </div>

                      <div className="flex text-xs mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1 mr-3">
                          <Clock size={12} />
                          <span>
                            {calculateDaysRemaining(goal.endDate)}d left
                          </span>
                        </div>
                        {goal.repeat !== "none" && (
                          <div className="flex items-center gap-1">
                            <Bell size={12} />
                            <span>{goal.repeat}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/my-learning/goals"
                  className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Streak Container */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold">{currentStreak}</p>
            </div>
            <div>
              <p className="text-gray-500">Longest Streak</p>
              <p className="text-2xl font-bold">{longestStreak}</p>
            </div>
          </div>

          {/* Render streak chunks */}
          {streakChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="grid grid-cols-7 gap-4 mb-4">
              {chunk.map((completed, index) => {
                const dayNumber = chunkIndex * chunkSize + index + 1;
                return (
                  <div key={dayNumber} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        completed ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{completed ? "⚡" : ""}</span>
                    </div>
                    <span className="text-xs mt-1 text-gray-700">
                      {dayNumber}
                    </span>
                  </div>
                );
              })}
              {chunk.length < chunkSize &&
                Array.from({ length: chunkSize - chunk.length }).map(
                  (_, emptyIndex) => {
                    const dayNumber =
                      chunkIndex * chunkSize + chunk.length + emptyIndex + 1;
                    return (
                      <div
                        key={`empty-${dayNumber}`}
                        className="flex flex-col items-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"></div>
                        <span className="text-xs mt-1 text-gray-700">
                          {dayNumber}
                        </span>
                      </div>
                    );
                  }
                )}
            </div>
          ))}

          <p className="text-center text-sm text-gray-500 mt-4">
            Visit every day to keep your streak going!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
