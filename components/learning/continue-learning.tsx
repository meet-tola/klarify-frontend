"use client"

import Link from "next/link"
import { getLevelColor } from "@/lib/get-level-color"

interface ContinueLearningProps {
  skill: string
  level: string
  totalLessons: number
  courseProgress: number
  slug: string
}

export default function ContinueLearningSection({
  skill,
  level,
  totalLessons,
  courseProgress,
  slug,
}: ContinueLearningProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold roca-bold mb-2">Continue Learning</h1>
      <p className="text-muted-foreground mb-6">Resume where you left off in your learning path.</p>

      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-5 relative group">
        <Link
          href={`/my-learning/${slug}/content`}
          className="block absolute inset-0 z-10"
          aria-label={`View ${skill} content`}
        >
          <span className="sr-only">Go to content</span>
        </Link>
        <div className={`text-sm font-medium ${getLevelColor(level)} py-1`}>{level}</div>
        <h3 className="text-xl font-semibold mt-1 mb-3">{skill}</h3>
        <div className="flex items-center justify-between relative z-20 pointer-events-none">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
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

          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{courseProgress}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}

