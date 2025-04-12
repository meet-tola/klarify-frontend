"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/context/auth-provider";
import { slugify } from "@/lib/slugify";

interface Lesson {
  id: number;
  title: string;
  summary: string;
}

interface Phase {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface RoadmapPhasesProps {
  phases: Phase[];
  // onStartLearning: () => void;
}

export default function RoadmapPhases({
  phases,
}: // onStartLearning,
RoadmapPhasesProps) {
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const { user } = useAuthContext();

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? 0 : phaseId);
  };

  return (
    <motion.div
      className="space-y-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 roca-bold">
        Your Personalized Roadmap
      </h2>
      <motion.div
        className="space-y-4 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="border rounded-lg overflow-hidden w-full"
          >
            <motion.button
              className={`w-full p-4 text-left flex justify-between items-center ${
                expandedPhase === phase.id ? "bg-primary/5" : "hover:bg-accent"
              }`}
              onClick={() => togglePhase(phase.id)}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            >
              <h3 className="font-semibold">{phase.title}</h3>
              <ChevronDown
                className={`transform transition-transform ${
                  expandedPhase === phase.id ? "rotate-180" : ""
                }`}
              />
            </motion.button>
            <AnimatePresence>
              {expandedPhase === phase.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t"
                >
                  <div className="relative pl-8 py-2">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                    {phase.lessons.map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        className="relative py-3 pl-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {lesson.summary}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Buttons Below Roadmap */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/my-learning")}
        >
          Go to dashboard
        </Button>

        <Button onClick={() => (window.location.href = `/my-learning/${slugify(user?.user?.pickedSkill)}`)}>
          Start learning
        </Button>
      </div>
    </motion.div>
  );
}
