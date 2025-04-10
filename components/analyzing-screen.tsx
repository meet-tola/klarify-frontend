"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { generateRoadmapContent } from "@/lib/api";
import { useAuthContext } from "@/context/auth-provider";
import { Loader2, Sparkles } from "lucide-react";

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
  "Digital transformation initiatives accelerated by 7 years due to COVID-19.",
];

const titles = [
  {
    title: "Analyzing your assessment",
    description:
      "We're processing your responses to provide personalized insights",
  },
  {
    title: "Generating content",
    description: "Creating tailored materials based on your profile",
  },
  {
    title: "Please wait a moment",
    description: "Your personalized results are almost ready",
  },
  {
    title: "Processing your data",
    description: "Applying advanced algorithms to your information",
  },
];

export default function AnalyzingScreen({
  onComplete,
  userId,
}: AnalyzingScreenProps) {
  const [factIndex, setFactIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const { user } = useAuthContext();
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    // Start generating the roadmap content
    const generateRoadmap = async () => {
      try {
        // Call the API
        await generateRoadmapContent(userId);
        if (onComplete) {
          setTimeout(onComplete, 2000);
        }
      } catch (error) {
        console.log("Failed to generate roadmap:", error);
        if (onComplete) {
          setTimeout(onComplete, 2000);
        }
      }
    };

    generateRoadmap();

    // Change facts every 8 seconds
    const factInterval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 8000);

    // Change title every 12 seconds
    const titleInterval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 12000);
  }, [onComplete, userId, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-10">
        {/* Loading animation above title */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </motion.div>
        </motion.div>

        {/* Title and description */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${titleIndex}`}
              className="text-2xl font-medium tracking-tight roca-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {titles[titleIndex].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${titleIndex}`}
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {titles[titleIndex].description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Facts section */}
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-border/30"
            >
              <p className="text-sm text-foreground/80">{facts[factIndex]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xs text-muted-foreground/70 tracking-wide uppercase font-light"
        >
          This will only take a moment
        </motion.div>
      </div>
    </div>
  );
}
