"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, Sparkles } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SkillDetailsCardProps {
  skillDetails: {
    category: string;
    description: string;
    keySkills: string[];
    jobRoles: string[];
  };
  showRoadmap: boolean;
  onChangeSkill: () => void;
  onGenerateRoadmap: () => void;
  hasExistingRoadmap: boolean;
}

export default function SkillDetailsCard({
  skillDetails,
  showRoadmap,
  onChangeSkill,
  onGenerateRoadmap,
  hasExistingRoadmap,
}: SkillDetailsCardProps) {
  return (
    <div className="w-full bg-white rounded-lg border p-6 my-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl roca-bold font-bold">
            {skillDetails.category}
          </h2>
          <Popover>
            <PopoverTrigger>
              <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="p-2 text-sm text-center shadow-none"
            >
              <p>Find below a personalized road guide to learn this skill.</p>
            </PopoverContent>
          </Popover>
        </div>

        <p className="text-gray-600">{skillDetails.description}</p>

        {/* Key Skills */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillDetails.keySkills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Job Roles */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Job Roles</h3>
          <div className="flex flex-wrap gap-2">
            {skillDetails.jobRoles.map((role, index) => (
              <Badge key={index} variant="outline">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        {/* Buttons - Conditional Rendering */}
        {!showRoadmap && (
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="outline" onClick={onChangeSkill}>
              Change Skill
            </Button>
            <Button onClick={onGenerateRoadmap}>
              <Sparkles className="h-4 w-4 mr-2" />
              {hasExistingRoadmap ? "Show Roadmap" : "Generate Roadmap"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
