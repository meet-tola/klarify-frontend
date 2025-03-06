"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LogOut, ChevronDown } from "lucide-react"
import StepOne from "@/components/onboarding/step-one"
import StepTwo from "@/components/onboarding/step-two"
import StepThree from "@/components/onboarding/step-three"
import StepFour from "@/components/onboarding/step-four"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import OnboardingNavbar from "@/components/onboarding-navbar"

// Define the types for our steps
export type Step = {
  id: number
  title: string
  description: string
  slug: string
}

// Define the types for our questions and options
export type Option = {
  id: string
  text: string
}

export type Question = {
  id: string
  text: string
  options: Option[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for tracking current step, selected options, and progress
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [progress, setProgress] = useState(25)
  const [showSteps, setShowSteps] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [isChangingStep, setIsChangingStep] = useState(false)

  // Define the 4 steps of the onboarding process
  const steps: Step[] = [
    {
      id: 1,
      title: "Skill Assessment",
      description:
        "Answer a series of questions to help us understand your passions, skills, and goals. This step is designed to personalize your journey.",
      slug: "one",
    },
    {
      id: 2,
      title: "Skill Finder",
      description:
        "Explore in-demand skills and match them with your interests. Find out what's trending and what aligns with your career goals.",
      slug: "two",
    },
    {
      id: 3,
      title: "Career Assessment",
      description:
        "See how your chosen skills connect to real-world roles. Discover potential job opportunities, industries, and career growth paths.",
      slug: "three",
    },
    {
      id: 4,
      title: "Learning Flow Setup",
      description: "Customize your journey by choosing your learning style, pace, and preferred tools.",
      slug: "four",
    },
  ]

  // Initialize step from URL on component mount
  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam) {
      const stepIndex = steps.findIndex((step) => step.slug === stepParam)
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex)
        setProgress((stepIndex + 1) * 25)
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchParams, steps])

  // Handle option selection
  const handleOptionSelect = (questionId: string, optionId: string) => {
    // Update selected options
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    })
  }

  // Handle next question button click
  const handleNextQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1)
  }

  // Handle next step button click
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsChangingStep(true)

      // Update URL with next step
      const nextStep = steps[currentStep + 1].slug
      setTimeout(() => {
        router.push(`/onboarding?step=${nextStep}`)
        setCurrentStep(currentStep + 1)
        setProgress((currentStep + 2) * 25) // Update progress (25% per step)
        setActiveQuestionIndex(0) // Reset active question for the new step
        setIsChangingStep(false)
      }, 800)
    } else {
      // Handle completion of all steps
      setIsChangingStep(true)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 800)
    }
  }

  // Handle back button click
  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      // Go back to previous question in the same step
      setActiveQuestionIndex(activeQuestionIndex - 1)
    } else if (currentStep > 0) {
      // Go back to previous step
      setIsChangingStep(true)

      // Update URL with previous step
      const prevStep = steps[currentStep - 1].slug
      setTimeout(() => {
        router.push(`/onboarding?step=${prevStep}`)
        setCurrentStep(currentStep - 1)
        setProgress(currentStep * 25) // Update progress
        setActiveQuestionIndex(0) // Reset to first question of previous step
        setIsChangingStep(false)
      }, 800)
    }
  }

  // Render the current step component
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={activeQuestionIndex}
          />
        )
      case 1:
        return (
          <StepTwo
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={activeQuestionIndex}
          />
        )
      case 2:
        return (
          <StepThree
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={activeQuestionIndex}
          />
        )
      case 3:
        return (
          <StepFour
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={activeQuestionIndex}
          />
        )
      default:
        return (
          <StepOne
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={activeQuestionIndex}
          />
        )
    }
  }

  // Get the current step component to check if all questions are answered
  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 0:
        return StepOne
      case 1:
        return StepTwo
      case 2:
        return StepThree
      case 3:
        return StepFour
      default:
        return StepOne
    }
  }

  // Get the total number of questions for the current step
  const getCurrentStepQuestions = () => {
    const StepComponent = getCurrentStepComponent()
    // Access the questions array from the component's module
    // @ts-ignore - This is a workaround to access the questions array
    return StepComponent.questions || []
  }

  // Check if we're on the last question of the current step
  const isLastQuestion = () => {
    const questions = getCurrentStepQuestions()
    const visibleQuestions = getVisibleQuestions(questions)
    return activeQuestionIndex >= visibleQuestions.length - 1
  }

  // Get visible questions based on the current step and selected options
  const getVisibleQuestions = (questions: Question[]) => {
    // This is a simplified version - each step component has its own logic
    // for determining which questions are visible based on previous answers
    return questions
  }

  if (isLoading || isChangingStep) {
    return (
      <LoadingScreen
        message={isChangingStep ? "Loading next step..." : "Loading onboarding..."}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingNavbar />

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Mobile Steps Dropdown */}
        <div className="lg:hidden bg-slate-50 p-4">
          <motion.div
            className="flex justify-between items-center cursor-pointer p-2"
            onClick={() => setShowSteps(!showSteps)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                {steps[currentStep].id < 10 ? `0${steps[currentStep].id}` : steps[currentStep].id}
              </div>
              <div>
                <h3 className="font-semibold">{steps[currentStep].title}</h3>
              </div>
            </div>
            <motion.div animate={{ rotate: showSteps ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showSteps && (
              <motion.div
                className="mt-2 space-y-4 pl-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {steps.map(
                  (step, index) =>
                    index !== currentStep && (
                      <motion.div
                        key={step.id}
                        className="flex items-start pl-2 py-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-muted text-muted-foreground">
                          {step.id < 10 ? `0${step.id}` : step.id}
                        </div>
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </motion.div>
                    ),
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-slate-50 p-6 lg:w-1/3 xl:w-1/4">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mr-4 flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-primary text-primary-foreground"
                        : index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      className="w-0.5 bg-muted mt-2"
                      initial={{ height: 0 }}
                      animate={{ height: 64 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold">Discover your interests.</h2>
              <p className="text-muted-foreground mt-1">
                Let's find out what you're naturally good at and what interests you!
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ originX: 0 }}
              >
                <Progress value={progress} className="h-2 mt-4" />
              </motion.div>
            </motion.div>

            {/* Current step content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${activeQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
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
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0 && activeQuestionIndex === 0}
                  >
                    Back
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {isLastQuestion() ? (
                    <Button onClick={handleNextStep}>
                      {currentStep === steps.length - 1 ? "Finish" : "Next Step"}
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

