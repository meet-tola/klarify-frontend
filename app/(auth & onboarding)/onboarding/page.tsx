"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";
import OnboardingLayout, { type Step } from "@/components/onboarding/onboarding-layout";
import StepOne from "@/components/onboarding/step-one";
import StepTwo from "@/components/onboarding/step-two";
import StepThree from "@/components/onboarding/step-three";
import StepFour from "@/components/onboarding/step-four";
import { useAuthContext } from "@/context/auth-provider";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingStep, setIsChangingStep] = useState(false);

  // Memoize the steps array to avoid redefining it on every render
  const steps: Step[] = useMemo(
    () => [
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
    ],
    []
  );

  // Initialize step from URL on component mount
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const stepIndex = steps.findIndex((step) => step.slug === stepParam);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
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
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle next step button click
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsChangingStep(true);

      // Update URL with next step
      const nextStep = steps[currentStep + 1].slug;
      setTimeout(() => {
        router.push(`/onboarding?step=${nextStep}`);
        setCurrentStep((prev) => prev + 1);
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

  // Check user progress and redirect accordingly
  useEffect(() => {
    if (user) {
      // If no pickedSkill and skillsAssessment and careerAssessment is empty, open dialog
      if (
        !user.user?.pickedSkill &&
        (!user.user?.skillsAssessment || user.user.skillsAssessment.length === 0) &&
        (!user.user?.careerAssessment || user.user.careerAssessment.length === 0)
      ) {
        router.push("/onboarding?step=one");
        return;
      }

      if (
        !user.user?.pickedSkill &&
        (!user.user?.skillsAssessment || user.user.skillsAssessment.length === 0) &&
        (!user.user?.selectedSkills || user.user.selectedSkills.length === 0)
      ) {
        router.push("/onboarding?step=one");
        return;
      }

      // If the user has both pickedSkill and selectedSkills, go to step two
      if (!user.user?.pickedSkill && user.user?.skillsAssessment?.length > 0) {
        router.push("/onboarding?step=two");
        return;
      }

      // If the user has pickedSkill but no selectedSkills, go to roadmap
      if (
        user.user?.pickedSkill &&
        (!user.user?.selectedSkills || user.user.selectedSkills.length === 0)
      ) {
        router.push("/roadmap");
        return;
      }

      // If the user has picked a skill but hasn't completed the career assessment, redirect to step three
      if (
        user.user?.pickedSkill &&
        user.user?.selectedSkills?.length > 0 &&
        (!user.user?.careerAssessment ||
          user.user.careerAssessment.length === 0)
      ) {
        router.push("/onboarding?step=three");
        return;
      }

      // If the user has completed the career assessment but hasn't set up a learning path, redirect to step four
      if (
        user.user?.pickedSkill &&
        user.user?.selectedSkills?.length > 0 &&
        user.user?.careerAssessment?.length > 0 &&
        (!user.user?.learningPath || user.user.learningPath.length === 0)
      ) {
        router.push("/onboarding?step=four");
        return;
      }
    }
  }, [user, router]);

  if (isLoading || isChangingStep) {
    return (
      <LoadingScreen
        message={
          isChangingStep ? "Loading next step..." : "Loading onboarding..."
        }
      />
    );
  }

  if (!user) {
    return null; 
  }

  const userId = user.user?._id;

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
            onNextStep={handleNextStep}
            userId={userId}
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