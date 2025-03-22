// components/SearchSkills.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Skill {
  title: string;
  description: string;
}

interface SearchSkillsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredSkills: Skill[];
  setSkillToLearn: (skill: string) => void;
  setActiveView: (view: "courses" | "search" | "learn") => void;
}

export default function SearchSkills({
  searchQuery,
  setSearchQuery,
  filteredSkills,
  setSkillToLearn,
  setActiveView,
}: SearchSkillsProps) {
  return (
    <div className="bg-white rounded-lg p-6 md:p-8 border space-y-6">
        <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 roca-bold">Search for any skill</h2>
        <p className="text-gray-600">Enter any skill below to get started with new learning.</p>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for a skill..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => {
              setSkillToLearn(skill.title);
              setActiveView("learn");
            }}
          >
            <h3 className="font-semibold text-lg">{skill.title}</h3>
            <p className="text-gray-600 text-sm">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}