import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnalyzingScreen from "@/components/analyzing-screen";
import { getRoadmap } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/auth-provider";

interface Phase {
  id: number;
  title: string;
  weeks: {
    number: number;
    title: string;
  }[];
}

interface StepFourProps {
  selectedOptions: Record<string, string>;
  onOptionSelect: (questionId: string, optionId: string) => void;
  onNextStep: () => void;
  userId: string;
}

export default function StepFour({
  selectedOptions,
  onOptionSelect,
  onNextStep,
  userId,
}: StepFourProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapSkill, setRoadmapSkill] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      onOptionSelect("analysis-complete", "true");
    }, 90000);

    // Fetch roadmap data
    const fetchRoadmapData = async () => {
      try {
        const roadmap = await getRoadmap(userId);
        setRoadmapSkill(roadmap.skill);
        if (roadmap && roadmap.phases) {
          const transformedPhases = roadmap.phases.map(
            (phase: any, index: number) => ({
              id: index + 1,
              title: phase.title,
              weeks: phase.weeks.map((week: any, weekIndex: number) => ({
                number: weekIndex + 1,
                title: week.topic,
              })),
            })
          );
          setPhases(transformedPhases);
        } else {
          setPhases([]);
        }
      } catch (error) {
        console.error("Failed to fetch roadmap:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapData();

    return () => clearTimeout(timer);
  }, [userId, onOptionSelect]);

  if (isAnalyzing) {
    return (
      <AnalyzingScreen
        onComplete={() => setIsAnalyzing(false)}
        userId={userId}
      />
    );
  }

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? 0 : phaseId);
  };

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center">
          <Skeleton className="h-8 w-[200px] mx-auto mb-4" />
          <Skeleton className="h-4 w-[300px] mx-auto" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((phase) => (
            <div key={phase} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No roadmap available
  if (phases.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">No roadmap available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold roca-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {roadmapSkill} Roadmap
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Great choice! We've fine-tune your learning experience based on your
          goals and experience level.
        </motion.p>
      </div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {phases.map((phase) => (
          <div key={phase.id} className="border rounded-lg overflow-hidden">
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
                    {phase.weeks.map((week, index) => (
                      <motion.div
                        key={week.number}
                        className="relative py-3 pl-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <p className="font-medium">
                          Week {week.number}: {week.title}
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

      <motion.div
        className="flex justify-end gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/my-learning")}
        >
          Go to dashboard
        </Button>
        <Button onClick={() => (window.location.href = "/my-learning/learningpath")}>
          Start learning
        </Button>
      </motion.div>
    </div>
  );
}
