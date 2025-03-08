"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";
import OnboardingLayout, { type Step } from "@/components/onboarding-layout";
import StepOne from "@/components/onboarding/step-one";
import StepTwo from "@/components/onboarding/step-two";
import StepThree from "@/components/onboarding/step-three";
import StepFour from "@/components/onboarding/step-four";
import { useAuthContext } from "@/context/auth-provider";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // State for tracking current step, selected options, and progress
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [progress, setProgress] = useState(25);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingStep, setIsChangingStep] = useState(false);

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
      description:
        "Customize your journey by choosing your learning style, pace, and preferred tools.",
      slug: "four",
    },
  ];

  // Initialize step from URL on component mount
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const stepIndex = steps.findIndex((step) => step.slug === stepParam);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
        setProgress((stepIndex + 1) * 25);
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams, steps]);

  // Handle option selection
  const handleOptionSelect = (questionId: string, optionId: string) => {
    // Update selected options
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  // Handle next step button click
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsChangingStep(true);

      // Update URL with next step
      const nextStep = steps[currentStep + 1].slug;
      setTimeout(() => {
        router.push(`/onboarding?step=${nextStep}`);
        setCurrentStep(currentStep + 1);
        setProgress((currentStep + 2) * 25); // Update progress (25% per step)
        setIsChangingStep(false);
      }, 800);
    } else {
      // Handle completion of all steps
      setIsChangingStep(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    }
  };

  if (isLoading || isChangingStep) {
    return (
      <LoadingScreen
        message={
          isChangingStep ? "Loading next step..." : "Loading onboarding..."
        }
      />
    );
  }

  // Render the current step component
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            onNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <StepTwo
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            onNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <StepThree
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            onNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <StepFour
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            activeQuestionIndex={0} // Provide the appropriate value for activeQuestionIndex
          />
        );
      default:
        return (
          <StepOne
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            onNextStep={handleNextStep}
          />
        );
    }
  };

  return (
    <OnboardingLayout steps={steps} currentStep={currentStep}>
      {renderStep()}
    </OnboardingLayout>
  );
}
