"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Info, Search, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/context/auth-provider";
import { selectedSearchSkill, getRoadmap, clearUserSkills } from "@/lib/api";
import JourneyDialog from "@/components/journey-dialog";
import AnalyzingScreen from "@/components/analyzing-screen";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchDialog from "@/components/search-dialog";
import LoadingScreen from "@/components/loading-screen";
import OnboardingNavbar from "@/components/onboarding/onboarding-navbar";

interface Phase {
  id: number;
  title: string;
  lessons: {
    id: number;
    number: number;
    title: string;
    summary: string;
  }[];
}

export default function RoadmapPage() {
  const { user, loading } = useAuthContext();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillDetails, setSkillDetails] = useState<{
    category: string;
    description: string;
    keySkills: string[];
    jobRoles: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const router = useRouter();

  const userId = user?.user._id;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user?.user?.pickedSkill) {
      setIsLoading(true);
      selectedSearchSkill(userId as string, user.user.pickedSkill)
        .then((response) => {
          if (response.data) {
            setSelectedSkill(response.data.category);
            setSkillDetails(response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch skill details:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, userId]);

  const handleGetRoadmap = async () => {
    try {
      const roadmap = await getRoadmap(userId as string);
      if (roadmap && roadmap.phases) {
        const transformedPhases = roadmap.phases.map(
          (phase: any, index: number) => ({
            id: index + 1,
            title: phase.phaseTitle,
            lessons: phase.lessons.map((lesson: any, lessonIndex: number) => ({
              id: lessonIndex + 1,
              title: lesson.lessonTitle,
              summary: lesson.lessonSummary.description,
              // sections: lesson.sections,
              // resources: lesson.resources,
            })),
          })
        );
        setPhases(transformedPhases);
      } else {
        setPhases([]);
      }
      setShowRoadmap(true);
    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
    }
  };

  const handleGenerateRoadmap = () => {
    setIsAnalyzing(true);
  };

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? 0 : phaseId);
  };

  if (isLoading) {
    return <LoadingScreen message={"Loading..."} />;
  }

  if (isAnalyzing) {
    return (
      <AnalyzingScreen
        onComplete={() => {
          setIsAnalyzing(false);
          handleGetRoadmap(); // Fetch and show roadmap after analysis
        }}
        userId={userId as string}
      />
    );
  }

  const handleSelectSkill = async () => {
    try {
      await clearUserSkills(userId as string);
    } catch (error) {
      console.error("Failed to clear user skills:", error);
    }
  };

  return (
    <>
      <OnboardingNavbar />
      <div className="container py-8 space-y-8 px-6">
        {/* Top Content - Centered */}
        <div className="text-center">
          <h1 className="text-3xl font-bold roca-bold mb-2">
            Your Learning Roadmap
          </h1>
          <p className="text-muted-foreground">
            {selectedSkill
              ? `Personalized learning path for your ${selectedSkill} journey`
              : "Discover your personalized learning path"}
          </p>
        </div>

        {selectedSkill && skillDetails ? (
          // User has selected a skill
          <>
            {/* Skill Details Card - Centered */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg border p-8 my-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl roca-bold font-bold">
                    {skillDetails.category}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your selected career path</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-gray-600">{skillDetails.description}</p>

                {/* Key Skills */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillDetails.keySkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Job Roles */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Job Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillDetails.jobRoles.map((role, index) => (
                      <Badge key={index} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Buttons - Conditional Rendering */}
                {!showRoadmap && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Change Skill
                    </Button>
                    <Button
                      onClick={
                        user?.user.learningPath &&
                        user?.user.learningPath.length > 0
                          ? handleGetRoadmap // Show Roadmap
                          : handleGenerateRoadmap // Generate Roadmap
                      }
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {user?.user.learningPath &&
                      user?.user.learningPath.length > 0
                        ? "Show Roadmap"
                        : "Generate Roadmap"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Roadmap */}
            {showRoadmap && (
              <motion.div
                className="space-y-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Your Personalized Roadmap
                </h2>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {phases.map((phase) => (
                    <div
                      key={phase.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <motion.button
                        className={`w-full p-4 text-left flex justify-between items-center ${
                          expandedPhase === phase.id
                            ? "bg-primary/5"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => togglePhase(phase.id)}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <h3 className="font-semibold">{phase.title}</h3>
                        <ChevronDown
                          className={`transform transition-transform ${
                            expandedPhase === phase.id ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>
                      <AnimatePresence>
                        {expandedPhase === phase.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t"
                          >
                            <div className="relative pl-8 py-2">
                              <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                              {phase.lessons.map((lesson, index) => (
                                <motion.div
                                  key={lesson.id}
                                  className="relative py-3 pl-6"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                  </div>
                                  <p className="font-medium">
                                    {lesson.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.summary}
                                  </p>
                                  {/* Render sections or resources if needed */}
                                  {/* <div className="mt-2">
                        {lesson.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <p>{section.content}</p>
                          </div>
                        ))}
                      </div> */}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>

                {/* New Buttons Below Roadmap */}
                <div className="flex justify-end gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/my-learning")}
                  >
                    Go to dashboard
                  </Button>
                  <Button
                    onClick={() =>
                      (window.location.href = "/my-learning/learningpath")
                    }
                  >
                    Start learning
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          // User has not selected a skill
          <>
            {/* Find Your Career Path Section */}
            <div className="bg-white rounded-lg border p-8 text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold roca-bold mb-4">
                Find Your Career Path
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                To generate a personalized learning roadmap, you'll need to
                select a skill or take our career assessment test to discover
                what might be a good fit for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="flex items-center gap-2"
                  onClick={() => {
                    router.push("/onboarding?step=one");
                  }}
                >
                  Take Career Assessment
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setIsSearchDialogOpen(true);
                  }}
                >
                  <Search className="h-4 w-4" />
                  Search Skills
                </Button>
              </div>
            </div>

            {/* Why Take the Assessment and Popular Career Paths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Why Take the Assessment?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600">
                      Discover careers that match your interests and strengths
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600">
                      Get personalized learning recommendations
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600">
                      Save time by focusing on relevant skills
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Popular Career Paths
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/roadmap?skill=ui-ux"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                  >
                    <span>UI/UX Design</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/roadmap?skill=web-dev"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                  >
                    <span>Web Development</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/roadmap?skill=data-science"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                  >
                    <span>Data Science</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/roadmap?skill=digital-marketing"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                  >
                    <span>Digital Marketing</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Journey Dialog */}
        <JourneyDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          userId={userId}
          title="Select a new skill"
          description="Changing your skill will remove your previous selection and generate a new roadmap."
          onStartCareerTest={handleSelectSkill}
          onSelectSkill={handleSelectSkill}
        />

        {/* Search Dialog */}
        <SearchDialog
          isOpen={isSearchDialogOpen}
          onClose={() => setIsSearchDialogOpen(false)}
          onSelect={(skill) => {
            setIsSearchDialogOpen(false);
          }}
          userId={userId}
        />
      </div>
    </>
  );
}
