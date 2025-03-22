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
import { Bell, Calendar, Clock, Plus, Target } from 'lucide-react';
import { useRouter } from "next/navigation";

// Define the Goal type
interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  reminder: string;
  category: string;
}

export default function StreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakHistory, setStreakHistory] = useState<boolean[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const router = useRouter();

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      const { currentStreak, longestStreak, streakHistory } = JSON.parse(savedStreak);
      setCurrentStreak(currentStreak);
      setLongestStreak(longestStreak);
      setStreakHistory(streakHistory);
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Update streak when the user visits the page
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const lastVisit = localStorage.getItem("lastVisit");

    if (lastVisit !== today) {
      // If the user is visiting for the first time today
      const newStreakHistory = [...streakHistory];
      const isConsecutive = lastVisit && new Date(today).getTime() - new Date(lastVisit).getTime() === 86400000; // 86400000 ms = 1 day

      if (isConsecutive) {
        // Increment streak if consecutive
        setCurrentStreak((prev) => prev + 1);
        newStreakHistory.push(true); // Mark today as completed
      } else {
        // Reset streak if not consecutive
        setCurrentStreak(1);
        newStreakHistory.push(true); // Mark today as completed
      }

      // Update longest streak if current streak is higher
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }

      setStreakHistory(newStreakHistory);

      // Save updated streak data to localStorage
      localStorage.setItem(
        "streak",
        JSON.stringify({
          currentStreak: isConsecutive ? currentStreak + 1 : 1,
          longestStreak: Math.max(longestStreak, isConsecutive ? currentStreak + 1 : 1),
          streakHistory: newStreakHistory,
        })
      );

      // Update last visit date
      localStorage.setItem("lastVisit", today);
    }
  }, [streakHistory, currentStreak, longestStreak]);

  // Calculate days remaining for a goal
  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle redirect to create goal page
  const handleCreateGoal = () => {
    console.log("Navigate to goal creation page");
    Example: router.push('/create-goal');
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
          <DialogTitle className="text-xl font-bold">Your Learning Journey</DialogTitle>
        </DialogHeader>
        
        {/* Goals Container */}
        <div className="bg-white p-4 rounded-lg mb-4 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target size={18} className="text-primary" />
              My Goals
            </h3>
            {goals.length > 0 && (
              <Button size="sm" variant="outline" onClick={handleCreateGoal}>
                <Plus size={16} className="mr-1" /> New Goal
              </Button>
            )}
          </div>

          {goals.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">You haven't set any learning goals yet.</p>
              <Button onClick={handleCreateGoal}>
                <Plus size={16} className="mr-2" /> Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map((goal) => (
                <Card key={goal.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-gray-500">{goal.description}</p>
                      </div>
                      <Badge variant={goal.progress === 100 ? "default" : "secondary"} className="ml-2">
                        {goal.category}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-xs mt-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar size={14} />
                        <span>{new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={14} />
                        <span>{calculateDaysRemaining(goal.endDate)} days left</span>
                      </div>
                      {goal.reminder && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Bell size={14} />
                          <span>{goal.reminder}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Streak Container (unchanged) */}
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
                const dayNumber = chunkIndex * chunkSize + index + 1; // Calculate the day number
                return (
                  <div key={dayNumber} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        completed ? "bg-yellow-200" : "bg-gray-200"
                      }`}
                    >
                      <span className="text-xl">{completed ? "⚡" : ""}</span>
                    </div>
                    <span className="text-xs mt-1 text-gray-700">{dayNumber}</span>
                  </div>
                );
              })}
              {/* Fill remaining empty slots in the last chunk */}
              {chunk.length < chunkSize &&
                Array.from({ length: chunkSize - chunk.length }).map((_, emptyIndex) => {
                  const dayNumber = chunkIndex * chunkSize + chunk.length + emptyIndex + 1;
                  return (
                    <div key={`empty-${dayNumber}`} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"></div>
                      <span className="text-xs mt-1 text-gray-700">{dayNumber}</span>
                    </div>
                  );
                })}
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
