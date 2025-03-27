"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Briefcase,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import roleData from "@/data/career-simulation-roles.json";
import { Checkbox } from "@/components/ui/checkbox";
import { slugify } from "@/lib/slugify";

export default function CareerSimulationPage() {
  const params = useParams();
  const roleSlug = params.skill as string;
  const role = Object.values(roleData).find(
    (r) => slugify(r.title) === roleSlug
  );
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  if (!role) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
            <p className="text-slate-600 mb-8">
              Sorry, we couldn't find the role you're looking for.
            </p>
            <Link href="/tools/career-simulator">
              <Button>Back to Career Simulator</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentScenario = role.scenarios[currentScenarioIndex];
  const progress =
    (Object.keys(selectedOptions).length / role.scenarios.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (!selectedOptions[currentScenario.id]) {
      setSelectedOptions({
        ...selectedOptions,
        [currentScenario.id]: optionId,
      });
    }
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    setShowFeedback(false);
    if (currentScenarioIndex < role.scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setSimulationComplete(true);
    }
  };

  const getCorrectAnswersCount = () => {
    return role.scenarios.reduce((count, scenario) => {
      const selectedOption = selectedOptions[scenario.id];
      const correctOption = scenario.options.find((option) => option.isCorrect);
      return selectedOption === correctOption?.id ? count + 1 : count;
    }, 0);
  };

  const getSelectedOption = () => {
    const optionId = selectedOptions[currentScenario.id];
    return currentScenario.options.find((option) => option.id === optionId);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
        <div className="mb-8">
          <Link href="/tools/career-simulator">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Career Simulator
            </Button>
          </Link>
        </div>

        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold roca-bold mb-2">
              {role.title} Simulation
            </h1>
            <p className="text-muted-foreground">
              Experience a day in the life of a {role.title}
            </p>
          </div>
        </motion.div>

        {!simulationComplete ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>
                  Scenario {currentScenarioIndex + 1} of {role.scenarios.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.id}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold">
                    {currentScenario.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {currentScenario.description}
                  </p>

                  {!showFeedback ? (
                    <div className="space-y-3">
                      {currentScenario.options.map((option, optionIndex) => (
                        <motion.div
                          key={`${currentScenario.id}-${option.id}`}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedOptions[currentScenario.id] === option.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-muted-foreground"
                          }`}
                          onClick={() => handleOptionSelect(option.id)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: optionIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={`${currentScenario.id}-${option.id}`}
                              checked={
                                selectedOptions[currentScenario.id] ===
                                option.id
                              }
                              onCheckedChange={() =>
                                handleOptionSelect(option.id)
                              }
                              className="mt-1"
                            />
                            <label
                              htmlFor={`${currentScenario.id}-${option.id}`}
                              className="cursor-pointer flex-1"
                            >
                              {option.text}
                            </label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-4 rounded-lg mb-6 ${
                          getSelectedOption()?.isCorrect
                            ? "bg-green-50 border border-green-200"
                            : "bg-amber-50 border border-amber-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getSelectedOption()?.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                          )}
                          <div>
                            <p
                              className={`font-medium ${
                                getSelectedOption()?.isCorrect
                                  ? "text-green-700"
                                  : "text-amber-700"
                              } mb-1`}
                            >
                              {getSelectedOption()?.isCorrect
                                ? "Good choice!"
                                : "Not quite right"}
                            </p>
                            <p className="text-slate-600">
                              {getSelectedOption()?.feedback}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleNextScenario} className="w-full">
                        {currentScenarioIndex < role.scenarios.length - 1
                          ? "Next Scenario"
                          : "Complete Simulation"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Simulation Complete!</h2>
              <p className="text-slate-600">
                You've completed the {role.title} simulation. Here's how you
                did:
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Correct Decisions:</span>
                <Badge className="text-base px-3 py-1">
                  {getCorrectAnswersCount()} / {role.scenarios.length}
                </Badge>
              </div>

              <Progress
                value={(getCorrectAnswersCount() / role.scenarios.length) * 100}
                className="h-2 mb-4"
              />

              <p className="text-slate-600 text-sm">
                {getCorrectAnswersCount() === role.scenarios.length
                  ? "Perfect score! You have a strong understanding of what this role entails."
                  : getCorrectAnswersCount() >=
                    Math.floor(role.scenarios.length * 0.7)
                  ? "Great job! You have a good grasp of this role's responsibilities."
                  : "You're on the right track. With more learning, you'll better understand this role."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Key Skills Required</h3>
                <ul className="space-y-2">
                  {role.skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Daily Tasks</h3>
                <ul className="space-y-2">
                  {role.dailyTasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3">Common Challenges</h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {role.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tools/career-simulator" className="flex-1">
                <Button variant="outline" className="w-full">
                  Try Another Role
                </Button>
              </Link>
              <Link href={`/careers/${role.title}`} className="flex-1">
                <Button className="w-full">
                  Learn More About This Career
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
