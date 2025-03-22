// components/LearnWithAI.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles } from "lucide-react";

interface LearnWithAIProps {
  skillToLearn: string;
  setSkillToLearn: (skill: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  handleGenerateCourse: () => void;
  isGenerating: boolean;
}

export default function LearnWithAI({
  skillToLearn,
  setSkillToLearn,
  selectedLevel,
  setSelectedLevel,
  handleGenerateCourse,
  isGenerating,
}: LearnWithAIProps) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 md:p-8 border">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 roca-bold">Learn anything with AI</h2>
        <p className="text-gray-600">Enter a topic below to generate a personalized course for it</p>
      </div>

      <div className="space-y-6 mx-auto">
        <div className="space-y-2">
          <Label htmlFor="course-topic">Course Topic</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="course-topic"
              placeholder="e.g., Algebra, JavaScript, Photography"
              className="pl-10"
              value={skillToLearn}
              onChange={(e) => setSkillToLearn(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <div className="flex flex-wrap gap-3">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                className={`px-4 py-3 rounded-md border ${
                  selectedLevel.toLowerCase() === level.toLowerCase()
                    ? "bg-slate-800 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedLevel(level.toLowerCase())}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="more-options"
              checked={showMoreOptions}
              onCheckedChange={() => setShowMoreOptions(!showMoreOptions)}
            />
            <label
              htmlFor="more-options"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center flex-wrap"
            >
              Tell us more to tailor the course (optional)
              <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">recommended</span>
            </label>
          </div>

          {showMoreOptions && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="background" className="text-sm">
                  Tell us about yourself
                </Label>
                <Textarea id="background" placeholder="Your background, current knowledge, etc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm">
                  What is your goal with this course?
                </Label>
                <Textarea id="goal" placeholder="What do you hope to achieve?" />
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full py-6 text-lg"
          onClick={handleGenerateCourse}
          disabled={!skillToLearn || isGenerating}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Course
        </Button>
      </div>
    </div>
  );
}