"use client";

import Link from "next/link";
import { getLevelColor } from "@/lib/get-level-color";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

interface ContinueLearningProps {
  skill: string;
  level: string;
  totalLessons: number;
  courseProgress: number;
  slug: string;
}

export default function ContinueLearningSection({
  skill,
  level,
  totalLessons,
  courseProgress,
  slug,
}: ContinueLearningProps) {
  const isEmpty = courseProgress === 0;

  return (
    <section>
      <h1 className="text-3xl font-bold roca-bold mb-2">
        {isEmpty ? "Start Learning" : "Continue Learning"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {isEmpty
          ? "Begin your learning journey with this path."
          : "Resume where you left off in your learning path."}
      </p>

      <div className="bg-white rounded-lg border px-6 py-4 md:col-span-2">
        <div className="h-full flex flex-col">
          <p className={`text-sm font-medium ${getLevelColor(level)} py-1`}>
            {level}
          </p>
          <h3 className="text-xl font-semibold mb-auto">{skill}</h3>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress:</span>
                <span className="text-gray-600">{courseProgress}%</span>
              </div>
              <Progress value={courseProgress} className="h-2 bg-gray-100" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {totalLessons} lessons
              </div>
              <Link href={`/my-learning/${slug}/content`}>
                <Button variant="outline" disabled={!skill}>
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
