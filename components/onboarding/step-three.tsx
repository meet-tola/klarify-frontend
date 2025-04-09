"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/auth-provider";
import { getCareerQuestions, evaluateCareerAnswers } from "@/lib/api";
import { Loader2 } from "lucide-react";

export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

interface StepThreeProps {
  selectedOptions: Record<string, string>;
  onOptionSelect: (questionId: string, optionId: string) => void;
  onNextStep: () => void;
}

export default function StepThree({
  selectedOptions,
  onOptionSelect,
  onNextStep,
}: StepThreeProps) {
  const { user } = useAuthContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const progress = ((activeQuestionIndex + 1) / questions.length) * 100;

  // Fetch career questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (user?.user?._id) {
        try {
          const data = await getCareerQuestions(user.user._id);

          // Check if the response is an array and has at least one element
          if (Array.isArray(data) && data.length > 0 && data[0].questions) {
            // Transform the backend data to match the frontend's expected structure
            const transformedQuestions = data[0].questions.map(
              (question: any, index: number) => ({
                id: question._id, // Use the original question ID
                text: question.question,
                options: question.answers.map(
                  (answer: string, answerIndex: number) => ({
                    id: answer, // Use the actual answer text as the ID
                    text: answer,
                  })
                ),
              })
            );

            setQuestions(transformedQuestions);
          } else {
            console.error("No questions found in the response:", data);
          }
        } catch (error) {
          console.error("Failed to fetch career questions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [user]);

  const handleNextQuestion = async () => {
    setIsButtonLoading(true);

    if (isLastQuestion) {
      const answers = Object.entries(selectedOptions).map(
        ([questionId, answerId]) => {
          const question = questions.find((q) => q.id === questionId);
          const answerText =
            question?.options.find((opt) => opt.id === answerId)?.text || "";

          return {
            questionId,
            answer: answerText,
          };
        }
      );

      if (user?.user?._id) {
        try {
          await evaluateCareerAnswers(user.user._id, answers);
        } catch (error) {
          console.error("Failed to evaluate answers:", error);
        }
      }

      onNextStep();
    } else {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }

    setIsButtonLoading(false);
  };

  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Skeleton for the header */}
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
        <h2 className="text-2xl font-bold roca-bold">Career Assessment</h2>
        <p className="text-muted-foreground mt-1">
          Let's understand your preferred work environment and career goals.
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ originX: 0 }}
        >
          <Progress value={progress} className="h-2 mt-4" />
        </motion.div>
        {user?.user?.pickedSkill && (
          <motion.div
            className="mt-4 inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {user.user.pickedSkill}
          </motion.div>
        )}
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
                    onCheckedChange={() =>
                      onOptionSelect(activeQuestion.id, option.id)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${activeQuestion.id}-${option.id}`}
                    className="cursor-pointer flex-1"
                  >
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
              disabled={!selectedOptions[activeQuestion.id] || isButtonLoading}
            >
              {isButtonLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : isLastQuestion ? (
                "Next Step"
              ) : (
                "Next Question"
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
