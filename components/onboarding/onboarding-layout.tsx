"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import OnboardingNavbar from "./onboarding-navbar";

export type Step = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

interface OnboardingLayoutProps {
  steps: Step[];
  currentStep: number;
  children: React.ReactNode;
}

export default function OnboardingLayout({
  steps,
  currentStep,
  children,
}: OnboardingLayoutProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
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
              {steps[currentStep].id < 10
                ? `0${steps[currentStep].id}`
                : steps[currentStep].id}
            </div>
            <div>
              <h3 className="font-semibold">{steps[currentStep].title}</h3>
            </div>
          </div>
          <motion.div
            animate={{ rotate: showSteps ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
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
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="flex items-start pl-2 py-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        index === currentStep ? "text-primary" : ""
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
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
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
