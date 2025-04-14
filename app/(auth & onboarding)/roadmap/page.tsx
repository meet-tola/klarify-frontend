"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "sonner";
import {
  selectedSearchSkill,
  getRoadmap,
  clearUserSkills,
  generateRoadmapSectionContent,
  checkSectionsStatus,
} from "@/lib/api";
import { slugify } from "@/lib/slugify";

// Components
import RoadmapHeader from "@/components/roadmap/roadmap-header";
import SkillDetailsCard from "@/components/roadmap/skill-details-card";
import RoadmapPhases from "@/components/roadmap/roadmap-phases";
import FindCareerPath from "@/components/roadmap/find-career-path";
import CareerInfoGrid from "@/components/roadmap/career-info-grid";
import JourneyDialog from "@/components/journey-dialog";
import SearchDialog from "@/components/search-dialog";
import AnalyzingScreen from "@/components/analyzing-screen";
import LoadingScreen from "@/components/loading-screen";

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
  const [phases, setPhases] = useState([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isFetchingContent, setIsFetchingContent] = useState(false);

  const router = useRouter();
  const userId = user?.user._id;

  useEffect(() => {
    let isMounted = true;

    if (!loading && !user) {
      router.push("/login");
    }

    if (user?.user?.pickedSkill && isMounted) {
      setIsLoading(true);
      selectedSearchSkill(userId as string, user.user.pickedSkill)
        .then((response) => {
          if (response.data && isMounted) {
            setSelectedSkill(response.data.category);
            setSkillDetails(response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch skill details:", error);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, userId, loading, router, user?.user?.pickedSkill]);

  const handleGetRoadmap = async () => {
    try {
      if (!user?.user?.pickedSkill) {
        throw new Error("Picked skill is not defined");
      }

      const roadmap = await getRoadmap(userId as string, user.user.pickedSkill);
      if (roadmap && roadmap.roadmap.phases) {
        const transformedPhases = roadmap.roadmap.phases.map(
          (phase: any, index: number) => ({
            id: index + 1,
            title: phase.phaseTitle,
            lessons: phase.lessons.map((lesson: any, lessonIndex: number) => ({
              id: lessonIndex + 1,
              title: lesson.lessonTitle,
              summary: lesson.lessonSummary.description,
            })),
          })
        );
        setPhases(transformedPhases);
      } else {
        setPhases([]);
      }
      setShowRoadmap(true);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch roadmap");
    }
  };

  const handleGenerateRoadmap = () => {
    setIsAnalyzing(true);
  };

  // const handleStartLearning = async () => {
  //   if (!user?.user.learningPath?.[0]?.roadmap) return;

  //   setIsFetchingContent(true);
  //   if (!user.user.pickedSkill) {
  //     throw new Error("Picked skill is not defined");
  //   }

  //   const pollForSections = async () => {
  //     try {
  //       const roadmap = await getRoadmap(
  //         userId as string,
  //         user.user.pickedSkill ?? ""
  //       );
  //       const roadmapId = roadmap?.roadmap?._id;
  //       const check = await checkSectionsStatus(userId as string, roadmapId);

  //       if (check.sectionsGenerated) {
  //         router.push(`/my-learning/${slugify(user.user.pickedSkill)}/content`);
  //       } else {
  //         setTimeout(pollForSections, 5000);
  //       }
  //     } catch (error: any) {
  //       toast.error(error || "Error checking lesson readiness");
  //       setIsFetchingContent(false);
  //     }
  //   };

  //   pollForSections();
  // };

  const handleSelectSkill = async () => {
    try {
      await clearUserSkills(userId as string);
    } catch (error: any) {
      toast.error(error?.message || "Failed to clear user skills");
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen
        message={"Loading..."}
      />
    );
  }

  if (isAnalyzing) {
    return (
      <AnalyzingScreen
        onComplete={() => {
          setIsAnalyzing(false);
          handleGetRoadmap();
        }}
        userId={userId as string}
      />
    );
  }

  return (
    <div className="w-full flex justify-center flex-col py-8 space-y-8 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto">
        <RoadmapHeader selectedSkill={selectedSkill} />

        {selectedSkill && skillDetails ? (
          <>
            <SkillDetailsCard
              skillDetails={skillDetails}
              showRoadmap={showRoadmap}
              onChangeSkill={() => setIsDialogOpen(true)}
              onGenerateRoadmap={
                user?.user.learningPath && user?.user.learningPath.length > 0
                  ? handleGetRoadmap
                  : handleGenerateRoadmap
              }
              hasExistingRoadmap={
                !!(
                  user?.user.learningPath && user?.user.learningPath.length > 0
                )
              }
            />

            {showRoadmap && (
              <RoadmapPhases
                phases={phases}
                // onStartLearning={handleStartLearning}
                onCloseRoadmap={() => setShowRoadmap(false)}
              />
            )}
          </>
        ) : (
          <>
            <FindCareerPath
              onTakeAssessment={() => router.push("/onboarding?step=one")}
              onSearchSkills={() => setIsSearchDialogOpen(true)}
            />
            <CareerInfoGrid />
          </>
        )}

        <JourneyDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          userId={userId}
          title="Select a new skill"
          description="Changing your skill will remove your previous selection and generate a new roadmap."
          onStartCareerTest={handleSelectSkill}
          onSelectSkill={handleSelectSkill}
        />

        <SearchDialog
          isOpen={isSearchDialogOpen}
          onClose={() => setIsSearchDialogOpen(false)}
          onSelect={(skill) => {
            setIsSearchDialogOpen(false);
          }}
          userId={userId}
        />
      </div>
    </div>
  );
}
