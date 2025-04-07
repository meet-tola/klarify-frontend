"use client"

import { Lightbulb } from "lucide-react"
import { TipDropdown } from "../dashboard/tip-dropdown"

export default function LearningTipsDropdown({
  learningPath,
}: {
  learningPath: any
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <Lightbulb className="h-4 w-4 text-amber-500" />
        <h3 className="text-base font-medium">Learning Tips</h3>
      </div>
      <div className="p-4">
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
      </div>
    </div>
  )
}

