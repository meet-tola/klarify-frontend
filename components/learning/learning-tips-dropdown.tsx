"use client"

import { Lightbulb } from "lucide-react"
import { TipDropdown } from "../dashboard/tip-dropdown"
import { Skeleton } from "@/components/ui/skeleton"

export default function LearningTipsDropdown({
  learningPath,
  isLoading,
}: {
  learningPath: any
  isLoading?: boolean
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <Lightbulb className="h-4 w-4 text-amber-500" />
        <h3 className="text-base font-medium">Learning Tips</h3>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {learningPath?.tips?.map((tip: any, index: number) => (
              <TipDropdown
                key={index}
                title={tip.title.replace(/^Tips:\s*/, "")}
                content={tip.content}
                defaultOpen={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}