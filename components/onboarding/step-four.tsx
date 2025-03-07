"use client"

import { useState, useEffect } from "react"
import AnalyzingScreen from "@/components/analyzing-screen"

interface StepFourProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepFour({ selectedOptions, onOptionSelect }: StepFourProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)

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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your Career Path is Ready!</h2>
        <p className="text-muted-foreground">
          We've analyzed your responses and created a personalized learning journey for you. Click "Finish" to view your
          dashboard and begin your career transformation!
        </p>
      </div>
    </div>
  )
}

