"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SearchDialog from "@/components/search-dialog";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/auth-provider";
import { getSuggestedSkills, selectSkill } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

interface Career {
  id: string;
  title: string;
  description: string;
  skills: string[];
  roles: string[];
}

interface StepTwoProps {
  selectedOptions: Record<string, string>;
  onOptionSelect: (questionId: string, optionId: string) => void;
  onNextStep: () => void;
}

export default function StepTwo({
  selectedOptions,
  onOptionSelect,
  onNextStep,
}: StepTwoProps) {
  const { user } = useAuthContext();
  const [notInterestedCount, setNotInterestedCount] = useState(0);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<{
    primary: Career[];
    secondary: Career[];
  }>({ primary: [], secondary: [] });
  const [displayedSkills, setDisplayedSkills] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingCareers, setIsChangingCareers] = useState(false);
  const router = useRouter();

  // Fetch suggested skills when the component mounts
  useEffect(() => {
    const fetchSuggestedSkills = async () => {
      if (user?.user?._id) {
        try {
          const data = await getSuggestedSkills(user.user._id);

          if (data) {
            const allSkills = [
              ...(data.primary || []),
              ...(data.secondary || []),
            ];

            setSuggestedSkills({
              primary: data.primary || [],
              secondary: data.secondary || [],
            });

            setDisplayedSkills(allSkills.slice(0, 4));
          }
        } catch (error) {
          router.push("/roadmap");
          console.error("Failed to fetch suggested skills:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSuggestedSkills();
  }, [user]);

  // Handle "Not Interested" button click
  const handleNotInterested = () => {
    const newCount = notInterestedCount + 1;
    setNotInterestedCount(newCount);

    if (newCount >= 2) {
      // After 3 clicks (0, 1, 2)
      // Show all skills (both primary and secondary)
      setDisplayedSkills([
        ...suggestedSkills.primary,
        ...suggestedSkills.secondary,
      ]);
      setShowSearchDialog(true);
      setNotInterestedCount(0);
    } else {
      // Cycle through skills
      setIsChangingCareers(true);
      setTimeout(() => {
        const allSkills = [
          ...suggestedSkills.primary,
          ...suggestedSkills.secondary,
        ];
        const start = newCount * 4;
        setDisplayedSkills(allSkills.slice(start, start + 4));
        setIsChangingCareers(false);
      }, 300);
    }
  };

  const allSkills = [...suggestedSkills.primary, ...suggestedSkills.secondary];

  // Handle career selection from the search dialog
  const handleCareerSelect = async (career: string) => {
    onOptionSelect("selected-career", career);
    setShowSearchDialog(false);

    if (user?.user?._id) {
      try {
        await selectSkill(user.user._id, career);
        toast.success("Success", {
          description: `You have selected ${career}.`,
        });
      } catch (error) {
        toast.error("Error", {
          description: "Failed to select the skill. Please try again.",
        });
      }
    }
  };

  // Handle card selection (clicking on a career card)
  const handleCardSelect = async (careerId: string) => {
    setSelectedCareer(careerId);
    onOptionSelect("selected-career", careerId);

    if (user?.user?._id) {
      const selectedCareerData = allSkills.find(
        (career) => career.id === careerId
      );
      if (selectedCareerData) {
        try {
          await selectSkill(user.user._id, selectedCareerData.title);
        } catch (error) {
          toast.error("Error", {
            description: "Failed to select the skill. Please try again.",
          });
        }
      }
    }
  };

  // Handle "Choose This Path" button click
  const handleChoosePath = () => {
    if (selectedCareer) {
      onNextStep();
    }
  };

  // Skeleton Loader
  if (isLoading) {
    return (
      <div className="space-y-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Skeleton className="h-8 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="rounded-lg border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Skeleton className="h-6 w-[150px] mb-4" />
              <Skeleton className="h-4 w-[200px] mb-4" />

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((skillIndex) => (
                      <Skeleton key={skillIndex} className="h-6 w-[80px]" />
                    ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2].map((roleIndex) => (
                      <Skeleton key={roleIndex} className="h-6 w-[100px]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-between mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold roca-bold">
          Matching you to Careers
        </h2>
        <p className="text-muted-foreground mt-1">
          Based on your answers, we've identified digital careers that might be
          a great fit for you!
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: isChangingCareers ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedSkills.map((career) => (
          <motion.div
            key={career.id}
            className={`rounded-lg border p-6 cursor-pointer ${
              selectedCareer === career.id
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardSelect(career.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
            <p className="text-muted-foreground mb-4">{career.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Job Roles:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row justify-between mt-12 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            onClick={handleNotInterested}
            className="w-full"
          >
            Not Interested
          </Button>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              disabled={!selectedCareer}
              onClick={() => {
                const selected = allSkills.find(
                  (career) => career.id === selectedCareer
                );
                if (selected) {
                  router.push(`/careers/${slugify(selected.title)}`);
                }
              }}
              className="w-full"
            >
              Learn More
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              disabled={!selectedCareer}
              onClick={handleChoosePath}
              className="w-full"
            >
              Choose This Path
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <SearchDialog
        isOpen={showSearchDialog}
        onClose={() => setShowSearchDialog(false)}
        onSelect={handleCareerSelect}
      />
    </div>
  );
}
