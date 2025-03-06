"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { Question } from "@/app/onboarding/page"
import { motion, AnimatePresence } from "framer-motion"

// Define the questions for step 4
const questions: Question[] = [
  {
    id: "learning-style",
    text: "How do you prefer to learn new skills?",
    options: [
      { id: "video", text: "Video tutorials" },
      { id: "interactive", text: "Interactive exercises" },
      { id: "reading", text: "Reading documentation and articles" },
      { id: "mentor", text: "Mentorship and coaching" },
    ],
  },
  {
    id: "video-length",
    text: "What video length do you prefer?",
    options: [
      { id: "short", text: "Short (< 10 minutes)" },
      { id: "medium", text: "Medium (10-30 minutes)" },
      { id: "long", text: "Long (30+ minutes)" },
      { id: "mixed", text: "Mixed lengths" },
    ],
  },
  {
    id: "interactive-type",
    text: "What type of interactive learning do you prefer?",
    options: [
      { id: "coding-challenges", text: "Coding challenges" },
      { id: "quizzes", text: "Quizzes and assessments" },
      { id: "projects", text: "Guided projects" },
      { id: "simulations", text: "Simulations" },
    ],
  },
  {
    id: "reading-format",
    text: "What reading format do you prefer?",
    options: [
      { id: "tutorials", text: "Step-by-step tutorials" },
      { id: "case-studies", text: "Case studies" },
      { id: "documentation", text: "Technical documentation" },
      { id: "blog-posts", text: "Blog posts" },
    ],
  },
  {
    id: "mentor-frequency",
    text: "How often would you like to connect with a mentor?",
    options: [
      { id: "weekly", text: "Weekly" },
      { id: "biweekly", text: "Bi-weekly" },
      { id: "monthly", text: "Monthly" },
      { id: "as-needed", text: "As needed" },
    ],
  },
]

// Define the question flow based on previous answers
const questionFlow: Record<string, string> = {
  video: "video-length",
  interactive: "interactive-type",
  reading: "reading-format",
  mentor: "mentor-frequency",
}

interface StepFourProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepFour({ selectedOptions, onOptionSelect, activeQuestionIndex }: StepFourProps) {
  // Determine which questions to show based on previous answers
  const getVisibleQuestionIds = () => {
    const visibleQuestions = ["learning-style"]

    // If the user has selected a learning style, add the corresponding follow-up question
    if (selectedOptions["learning-style"]) {
      const nextQuestionId = questionFlow[selectedOptions["learning-style"]]
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
  StepFour.questions = visibleQuestions

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

