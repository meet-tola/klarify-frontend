"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAuthContext } from "@/context/auth-provider";
import { getSkillQuestions, saveSkillsAssessment } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export type Option = string;

export type Question = {
  id: string;
  questionText: string;
  options: Option[];
  skillMapping: {
    [key: string]: string[];
  };
};

interface StepOneProps {
  selectedOptions: Record<string, string>;
  onOptionSelect: (questionId: string, optionId: string) => void;
  onNextStep: () => void;
}

export default function StepOne({
  selectedOptions,
  onOptionSelect,
  onNextStep,
}: StepOneProps) {
  const { user } = useAuthContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((activeQuestionIndex + 1) / questions.length) * 100;

  // Fetch skill questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      if (user?.user?._id) {
        const data = await getSkillQuestions(user.user._id);

        if (data) {
          // Transform the data to match the Question type
          const transformedData = data.map((question: any) => ({
            id: question._id, // Map _id to id
            questionText: question.questionText,
            options: question.options,
            skillMapping: question.skillMapping,
          }));
          setQuestions(transformedData);
        }
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, [user]);

  const handleNextQuestion = async () => {
    if (!selectedOptions[activeQuestion.id]) return;

    setIsSubmitting(true);
    try {
      if (isLastQuestion) {
        const answers = Object.entries(selectedOptions).map(
          ([questionId, answer]) => {
            if (!questionId) {
              throw new Error(`Missing questionId for answer: ${answer}`);
            }
            return {
              questionId,
              answer,
            };
          }
        );

        if (user?.user?._id) {
          await saveSkillsAssessment(user.user._id, answers);
        }

        onNextStep();
      } else {
        setActiveQuestionIndex((prev) => prev + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-2 w-full mt-4" />
        </div>

        {/* Skeleton for the question */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-[250px]" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>

        {/* Skeleton for the buttons */}
        <div className="flex justify-between mt-12">
          <Skeleton className="h-10 w-24" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div>No questions found.</div>;
  }

  const activeQuestion = questions[activeQuestionIndex];
  const isLastQuestion = activeQuestionIndex >= questions.length - 1;

  return (
    <div className="space-y-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold roca-bold">
          Discover your interests.
        </h2>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuestion.id}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">
            {activeQuestion.questionText}
          </h3>
          <div className="space-y-3">
            {activeQuestion.options.map((option, optionIndex) => (
              <motion.div
                key={`${activeQuestion.id}-${optionIndex}`}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedOptions[activeQuestion.id] === option
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground"
                }`}
                onClick={() => onOptionSelect(activeQuestion.id, option)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: optionIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Checkbox
                    id={`${activeQuestion.id}-${optionIndex}`}
                    checked={selectedOptions[activeQuestion.id] === option}
                    onCheckedChange={() =>
                      onOptionSelect(activeQuestion.id, option)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${activeQuestion.id}-${optionIndex}`}
                    className="cursor-pointer flex-1"
                  >
                    {option}
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
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/roadmap")}
            >
              cancel
            </Button>
          </motion.div>
        </div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={activeQuestionIndex === 0}
            >
              Back
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedOptions[activeQuestion.id] || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>{isLastQuestion ? "Next Step" : "Next Question"}</>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
