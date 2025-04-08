"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"

interface FindCareerPathProps {
  onTakeAssessment: () => void
  onSearchSkills: () => void
}

export default function FindCareerPath({ onTakeAssessment, onSearchSkills }: FindCareerPathProps) {
  return (
    <div className="bg-white rounded-lg border p-6 sm:p-8 text-center w-full">
      <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold roca-bold mb-4">Find Your Career Path</h2>
      <p className="text-gray-600 mb-8 mx-auto max-w-lg">
        To generate a personalized learning roadmap, you'll need to select a skill or take our career assessment test to
        discover what might be a good fit for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="flex items-center gap-2" onClick={onTakeAssessment}>
          Take Career Assessment
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={onSearchSkills}>
          <Search className="h-4 w-4" />
          Search Skills
        </Button>
      </div>
    </div>
  )
}
