"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface AnalyzingScreenProps {
  onComplete?: () => void
}

const facts = [
  "People who align their careers with their strengths are 6x more likely to feel engaged at work!",
  "73% of professionals who match their interests to their career report higher job satisfaction.",
  "Career alignment with personal values leads to 40% higher workplace productivity.",
  "Employees in well-matched careers are 3x more likely to stay with their companies long-term.",
]

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          if (onComplete) {
            setTimeout(onComplete, 500)
          }
          return 100
        }
        return prev + 1
      })
    }, 50)

    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(factTimer)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-4">Analyzing Your Assessment Results...</h1>
          <p className="text-lg text-muted-foreground">
            Every great journey starts with self-discovery. We're uncovering your strengths and interests to craft the
            perfect roadmap.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-16 flex items-center justify-center"
            >
              <p className="text-sm text-primary rounded-full bg-primary/10 px-4 py-2">{facts[currentFact]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

