// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowLeft } from "lucide-react";

interface HeaderProps {
  activeView: "courses" | "search" | "learn";
  setActiveView: (view: "courses" | "search" | "learn") => void;
  goBackToExplorer: () => void;
}

export default function SkillsHeader({ activeView, setActiveView, goBackToExplorer }: HeaderProps) {
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
      {activeView === "courses" ? (
        <>
          <h1 className="text-3xl font-bold roca-bold">Skill Explorer</h1>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setActiveView("search")}>
              <Search className="mr-2 h-4 w-4" />
              Search Skill
            </Button>
            <Button onClick={() => setActiveView("learn")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Learn with AI
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={goBackToExplorer} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">
              {activeView === "search" ? "Search for a Skill" : "Learn with AI"}
            </h1>
          </div>
        </>
      )}
    </div>
  );
}