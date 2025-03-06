"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { Question } from "@/app/onboarding/page"
import { motion, AnimatePresence } from "framer-motion"

// Define the questions for step 3
const questions: Question[] = [
  {
    id: "work-environment",
    text: "What type of work environment do you prefer?",
    options: [
      { id: "remote", text: "Fully remote" },
      { id: "hybrid", text: "Hybrid (mix of remote and office)" },
      { id: "office", text: "In-office" },
      { id: "freelance", text: "Freelance/Independent" },
    ],
  },
  {
    id: "remote-challenges",
    text: "What challenges do you anticipate with remote work?",
    options: [
      { id: "communication", text: "Communication barriers" },
      { id: "work-life", text: "Work-life balance" },
      { id: "collaboration", text: "Team collaboration" },
      { id: "time-management", text: "Time management" },
    ],
  },
  {
    id: "hybrid-frequency",
    text: "How often would you prefer to be in the office?",
    options: [
      { id: "once-week", text: "Once a week" },
      { id: "twice-week", text: "Twice a week" },
      { id: "three-times", text: "Three times a week" },
      { id: "flexible", text: "Flexible schedule" },
    ],
  },
  {
    id: "office-size",
    text: "What size company would you prefer to work for?",
    options: [
      { id: "startup", text: "Startup (< 50 employees)" },
      { id: "small", text: "Small (50-200 employees)" },
      { id: "medium", text: "Medium (200-1000 employees)" },
      { id: "large", text: "Large (1000+ employees)" },
    ],
  },
  {
    id: "freelance-goals",
    text: "What are your primary goals as a freelancer?",
    options: [
      { id: "flexibility", text: "Work flexibility" },
      { id: "diverse-projects", text: "Diverse projects" },
      { id: "higher-income", text: "Higher income potential" },
      { id: "independence", text: "Independence" },
    ],
  },
]

// Define the question flow based on previous answers
const questionFlow: Record<string, string> = {
  remote: "remote-challenges",
  hybrid: "hybrid-frequency",
  office: "office-size",
  freelance: "freelance-goals",
}

interface StepThreeProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepThree({ selectedOptions, onOptionSelect, activeQuestionIndex }: StepThreeProps) {
  // Determine which questions to show based on previous answers
  const getVisibleQuestionIds = () => {
    const visibleQuestions = ["work-environment"]

    // If the user has selected a work environment, add the corresponding follow-up question
    if (selectedOptions["work-environment"]) {
      const nextQuestionId = questionFlow[selectedOptions["work-environment"]]
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
  StepThree.questions = visibleQuestions

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

