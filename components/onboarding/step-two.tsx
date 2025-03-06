"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { Question } from "@/app/onboarding/page"
import { motion, AnimatePresence } from "framer-motion"

// Define the questions for step 2
const questions: Question[] = [
  {
    id: "industry-preference",
    text: "Which industry would you prefer to work in?",
    options: [
      { id: "tech", text: "Technology" },
      { id: "healthcare", text: "Healthcare" },
      { id: "finance", text: "Finance" },
      { id: "creative", text: "Creative Industries" },
    ],
  },
  {
    id: "tech-sector",
    text: "Which technology sector interests you most?",
    options: [
      { id: "ai-ml", text: "AI & Machine Learning" },
      { id: "cloud", text: "Cloud Computing" },
      { id: "cybersecurity", text: "Cybersecurity" },
      { id: "blockchain", text: "Blockchain" },
    ],
  },
  {
    id: "healthcare-tech",
    text: "Which healthcare technology area interests you?",
    options: [
      { id: "health-informatics", text: "Health Informatics" },
      { id: "telemedicine", text: "Telemedicine" },
      { id: "medical-devices", text: "Medical Devices" },
      { id: "biotech", text: "Biotechnology" },
    ],
  },
  {
    id: "finance-tech",
    text: "Which financial technology interests you?",
    options: [
      { id: "fintech", text: "Fintech" },
      { id: "blockchain-finance", text: "Blockchain & Cryptocurrency" },
      { id: "algorithmic-trading", text: "Algorithmic Trading" },
      { id: "financial-analysis", text: "Financial Analysis" },
    ],
  },
  {
    id: "creative-tech",
    text: "Which creative technology field interests you?",
    options: [
      { id: "digital-media", text: "Digital Media" },
      { id: "game-dev", text: "Game Development" },
      { id: "animation", text: "3D Animation" },
      { id: "ar-vr", text: "AR/VR" },
    ],
  },
]

// Define the question flow based on previous answers
const questionFlow: Record<string, string> = {
  tech: "tech-sector",
  healthcare: "healthcare-tech",
  finance: "finance-tech",
  creative: "creative-tech",
}

interface StepTwoProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepTwo({ selectedOptions, onOptionSelect, activeQuestionIndex }: StepTwoProps) {
  // Determine which questions to show based on previous answers
  const getVisibleQuestionIds = () => {
    const visibleQuestions = ["industry-preference"]

    // If the user has selected an industry, add the corresponding follow-up question
    if (selectedOptions["industry-preference"]) {
      const nextQuestionId = questionFlow[selectedOptions["industry-preference"]]
      if (nextQuestionId) {
        visibleQuestions.push(nextQuestionId)
      }
    }

    return visibleQuestions
  }

  const visibleQuestionIds = getVisibleQuestionIds()

  // Get the visible questions
  const visibleQuestions = questions.filter((q) => visibleQuestionIds.includes(q.id))

  // Only show the active question
  const activeQuestion = visibleQuestions[activeQuestionIndex] || visibleQuestions[0]

  // Make the component's questions accessible to the parent
  // @ts-ignore - This is a workaround to expose the questions array
  StepTwo.questions = visibleQuestions

  if (!activeQuestion) return null

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuestion.id}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">{activeQuestion.text}</h3>
          <div className="space-y-3">
            {activeQuestion.options.map((option, optionIndex) => (
              <motion.div
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedOptions[activeQuestion.id] === option.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground"
                }`}
                onClick={() => onOptionSelect(activeQuestion.id, option.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: optionIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Checkbox
                    id={`${activeQuestion.id}-${option.id}`}
                    checked={selectedOptions[activeQuestion.id] === option.id}
                    onCheckedChange={() => onOptionSelect(activeQuestion.id, option.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`${activeQuestion.id}-${option.id}`} className="cursor-pointer flex-1">
                    {option.text}
                  </label>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

