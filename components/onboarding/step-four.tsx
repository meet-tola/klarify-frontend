"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import AnalyzingScreen from "@/components/analyzing-screen"

interface Phase {
  id: number
  title: string
  weeks: {
    number: number
    title: string
  }[]
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Foundations (Week 1-4) – Understanding Design Basics",
    weeks: [
      { number: 1, title: "Introduction to UX/UI" },
      { number: 2, title: "Design Thinking & User Research" },
      { number: 3, title: "Wireframing & Prototyping" },
      { number: 4, title: "UI Design Basics" },
    ],
  },
  {
    id: 2,
    title: "Intermediate (Week 5-8) – Hands-on Design & Industry Tools",
    weeks: [
      { number: 5, title: "Advanced UI Design Principles" },
      { number: 6, title: "Design Systems & Components" },
      { number: 7, title: "Interactive Prototyping" },
      { number: 8, title: "User Testing & Iteration" },
    ],
  },
  {
    id: 3,
    title: "Advanced & Real-World Application (Week 9-12)",
    weeks: [
      { number: 9, title: "Portfolio Development" },
      { number: 10, title: "Case Studies" },
      { number: 11, title: "Industry Best Practices" },
      { number: 12, title: "Final Project & Presentation" },
    ],
  },
]

interface StepFourProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  onNextStep: () => void
}

export default function StepFour({ selectedOptions, onOptionSelect, onNextStep }: StepFourProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [expandedPhase, setExpandedPhase] = useState<number>(1)

  useEffect(() => {
    // Simulate analysis completion after 5 seconds
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
      // Set the completion in the selected options
      onOptionSelect("analysis-complete", "true")
    }, 5000)

    return () => clearTimeout(timer)
  }, [onOptionSelect])

  if (isAnalyzing) {
    return <AnalyzingScreen onComplete={() => setIsAnalyzing(false)} />
  }

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? 0 : phaseId)
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          UI/UX Design Roadmap
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Great choice! Let's fine-tune your learning experience based on your goals and experience level.
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
                className={`transform transition-transform ${expandedPhase === phase.id ? "rotate-180" : ""}`}
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
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Go to dashboard
        </Button>
        <Button onClick={onNextStep}>Start learning</Button>
      </motion.div>
    </div>
  )
}

