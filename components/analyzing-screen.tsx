"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { generateRoadmapContent } from "@/lib/api";
import { useAuthContext } from "@/context/auth-provider";
import { Sparkles } from "lucide-react";

interface AnalyzingScreenProps {
  onComplete?: () => void;
  userId: string;
}

const facts = [
  "People who align their careers with their strengths are 6x more likely to feel engaged at work!",
  "73% of professionals who match their interests to their career report higher job satisfaction.",
  "Career alignment with personal values leads to 40% higher workplace productivity.",
  "Employees in well-matched careers are 3x more likely to stay with their companies long-term.",
  "Digital skills can increase earning potential by up to 40% in today's job market.",
  "Tech professionals report 22% higher job satisfaction compared to other industries.",
  "85% of jobs that will exist in 2030 haven't been invented yet, making adaptable skills crucial.",
  "Professionals who regularly upskill are 37% more likely to receive promotions.",
  "Remote work opportunities are 3x higher for those with strong digital competencies.",
  "The demand for AI and machine learning skills has grown by 71% in the last five years.",
  "Full-stack developers have 27% more career mobility across industries.",
  "Data literacy is now required in 82% of mid to senior-level positions.",
  "Cloud computing expertise can increase salary potential by up to 25%.",
  "Cybersecurity professionals are among the most in-demand, with a 0% unemployment rate.",
];

const generationSteps = [
  "Analyzing your assessment responses...",
  "Identifying your key strengths and interests...",
  "Mapping skill gaps to industry demands...",
  "Curating personalized learning resources...",
  "Generating your custom career roadmap...",
  "Finalizing your personalized learning journey...",
];

export default function AnalyzingScreen({
  onComplete,
  userId,
}: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const { user } = useAuthContext();
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;
    if (user?.user?.learningPath && user?.user?.learningPath?.length > 0) {
      setIsGenerating(false);
      setProgress(100);
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
      return;
    }

    // Initial progress animation to 30%
    const initialProgressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 30) {
          clearInterval(initialProgressTimer);
          return 30;
        }
        return prev + 1;
      });
    }, 40);

    // Cycle through the generation steps
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % generationSteps.length);
    }, 3000);

    // Start generating the roadmap content
    const generateRoadmap = async () => {
      try {
        // Progress to 60% while waiting for API
        const midProgressTimer = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 60) {
              clearInterval(midProgressTimer);
              return 60;
            }
            return prev + 0.5;
          });
        }, 100);

        // Call the API
        await generateRoadmapContent(userId);

        clearInterval(midProgressTimer);

        // Complete progress after API returns
        const finalProgressTimer = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(finalProgressTimer);
              setIsGenerating(false);
              if (onComplete) {
                setTimeout(onComplete, 1500);
              }
              return 100;
            }
            return prev + 2;
          });
        }, 30);
      } catch (error) {
        console.log("Failed to generate roadmap:", error);
        setIsGenerating(false);
        setProgress(100);
      }
    };

    generateRoadmap();

    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 4000);

    return () => {
      clearInterval(initialProgressTimer);
      clearInterval(stepTimer);
      clearInterval(factTimer);
    };
  }, [onComplete, userId, user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-2xl text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {isGenerating ? (
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold roca-bold"
              >
                {generationSteps[currentStep]}
              </motion.h1>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold roca-bold">
                Your Digital Journey Awaits!
              </h1>
            </motion.div>
          )}

          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {isGenerating
              ? "We're crafting a personalized roadmap based on your unique profile, industry trends, and in-demand skills."
              : "Your custom career roadmap is ready! Discover the perfect learning path tailored to your goals and strengths."}
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="relative">
            <Progress value={progress} className="h-2.5 rounded-full" />
            {progress < 100 && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary/20 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress + 15, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-20 flex items-center justify-center"
            >
              <p className="text-sm md:text-base text-primary rounded-full bg-primary/10 px-6 py-3 shadow-sm">
                {facts[currentFact]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
