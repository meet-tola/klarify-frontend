"use client"
import { Checkbox } from "@/components/ui/checkbox"
import type { Question } from "@/types/app.type"
import { motion, AnimatePresence } from "framer-motion"

// Define the questions for step 1
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

// Define the question flow based on previous answers
const questionFlow: Record<string, string> = {
  beginner: "beginner-interests",
  novice: "novice-skills",
  intermediate: "intermediate-goals",
  experienced: "experienced-switch",
}

interface StepOneProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepOne({ selectedOptions, onOptionSelect, activeQuestionIndex }: StepOneProps) {
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

  // Make the component's questions accessible to the parent
  // @ts-ignore - This is a workaround to expose the questions array
  StepOne.questions = visibleQuestions

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

