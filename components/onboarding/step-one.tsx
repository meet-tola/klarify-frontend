"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export type Option = {
  id: string
  text: string
}

export type Question = {
  id: string
  text: string
  options: Option[]
}

const questions: Question[] = [
  {
    id: "skill-level",
    text: "What best describes your current skill level in digital careers?",
    options: [
      { id: "beginner", text: "I have no experience but want to start learning." },
      { id: "novice", text: "I know a little but need structured guidance." },
      { id: "intermediate", text: "I have some experience and want to improve." },
      { id: "experienced", text: "I am experienced but looking to switch careers." },
    ],
  },
  {
    id: "beginner-interests",
    text: "Which areas are you most interested in exploring?",
    options: [
      { id: "web-dev", text: "Web Development" },
      { id: "data-science", text: "Data Science" },
      { id: "design", text: "Design" },
      { id: "marketing", text: "Digital Marketing" },
    ],
  },
  {
    id: "novice-skills",
    text: "What skills do you already have some knowledge in?",
    options: [
      { id: "html-css", text: "HTML & CSS" },
      { id: "javascript", text: "JavaScript" },
      { id: "python", text: "Python" },
      { id: "design-tools", text: "Design Tools" },
    ],
  },
  {
    id: "intermediate-goals",
    text: "What are your improvement goals?",
    options: [
      { id: "advanced-tech", text: "Learn advanced technologies" },
      { id: "portfolio", text: "Build a professional portfolio" },
      { id: "certification", text: "Get certified" },
      { id: "freelance", text: "Start freelancing" },
    ],
  },
  {
    id: "experienced-switch",
    text: "Which career path are you interested in switching to?",
    options: [
      { id: "software-eng", text: "Software Engineering" },
      { id: "data-eng", text: "Data Engineering" },
      { id: "ux-design", text: "UX/UI Design" },
      { id: "product-mgmt", text: "Product Management" },
    ],
  },
]

const questionFlow: Record<string, string> = {
  beginner: "beginner-interests",
  novice: "novice-skills",
  intermediate: "intermediate-goals",
  experienced: "experienced-switch",
}

interface StepOneProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  onNextStep: () => void
}

export default function StepOne({ selectedOptions, onOptionSelect, onNextStep }: StepOneProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  // Determine which questions to show based on previous answers
  const getVisibleQuestionIds = () => {
    const visibleQuestions = ["skill-level"]

    // If the user has selected a skill level, add the corresponding follow-up question
    if (selectedOptions["skill-level"]) {
      const nextQuestionId = questionFlow[selectedOptions["skill-level"]]
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

  // Check if we're on the last question
  const isLastQuestion = activeQuestionIndex >= visibleQuestions.length - 1

  // Handle next question
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setActiveQuestionIndex(activeQuestionIndex + 1)
    } else {
      onNextStep()
    }
  }

  // Handle back button
  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1)
    }
  }

  if (!activeQuestion) return null

  return (
    <div className="space-y-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold r">Discover your interests.</h2>
        <p className="text-muted-foreground mt-1">
          Let's find out what you're naturally good at and what interests you!
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ originX: 0 }}
        >
          <Progress value={25} className="h-2 mt-4" />
        </motion.div>
      </motion.div>

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

      <motion.div
        className="flex justify-between mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
              Skip this step
            </Button>
          </motion.div>
        </div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={handleBack} disabled={activeQuestionIndex === 0}>
              Back
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleNextQuestion} disabled={!selectedOptions[activeQuestion.id]}>
              {isLastQuestion ? "Next Step" : "Next Question"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

