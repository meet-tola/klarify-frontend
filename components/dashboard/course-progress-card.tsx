"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthContext } from "@/context/auth-provider";
import { getLevelColor } from "@/lib/get-level-color";
import { slugify } from "@/lib/slugify";
import { useEffect, useState } from "react";

export function CourseProgressCard({ roadmap }: { roadmap: any }) {
  const { user } = useAuthContext();
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    ) as string[];
    const totalLessons = 50;
    setCourseProgress(Math.round((completedLessons.length / totalLessons) * 100));
  }, []);

  return (
    <div className="bg-white rounded-lg border px-6 py-4 md:col-span-2">
      <div className="h-full flex flex-col">
        <p className={`text-sm font-medium ${getLevelColor(roadmap?.level)} py-1`}>
          {roadmap?.level}
        </p>
        <h3 className="text-xl font-semibold mb-auto">{user?.user.pickedSkill}</h3>
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress:</span>
              <span className="text-gray-600">{courseProgress}%</span>
            </div>
            <Progress value={courseProgress} className="h-2 bg-gray-100" />
          </div>
          <div className="flex justify-end">
            <Link
              href={
                user?.user.pickedSkill
                  ? `/my-learning/${slugify(user.user.pickedSkill)}/content`
                  : "#"
              }
            >
              <Button variant="outline" disabled={!user?.user.pickedSkill}>
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}