"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-provider";
import { useParams, useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { getRoadmapContent } from "@/lib/api";
import LoadingScreen from "@/components/loading-screen";
import ContinueLearningSection from "@/components/learning/continue-learning";
import MaterialsGuidesSection from "@/components/learning/materials-guides";
import LearningTipsDropdown from "@/components/learning/learning-tips-dropdown";

export default function PathPage() {
  const { user, loading } = useAuthContext();
  const { slug } = useParams();
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    if (user && slugify(user.user.pickedSkill) !== slug) {
      router.push("/my-learning");
    }

    const fetchRoadmapContent = async () => {
      if (user?.user?.pickedSkill) {
        try {
          const data = await getRoadmapContent(
            user.user._id,
            user.user.pickedSkill
          );

          if (data.learningPath.skill === user.user.pickedSkill) {
            const learningPathData = data.learningPath;
            const roadmapData = data.roadmap;

            setLearningPath(learningPathData);
            setRoadmap(roadmapData);
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error);
        }
      }
    };

    fetchRoadmapContent();
  }, [user, loading, slug, router]);

  useEffect(() => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    ) as string[];
    const totalLessons = 50;
    setCourseProgress(
      Math.round((completedLessons.length / totalLessons) * 100)
    );
  }, []);

  if (!user || slugify(user.user.pickedSkill) !== slug) {
    return null;
  }

  if (loading) {
    return <LoadingScreen message={"Loading..."} />;
  }

  const totalLessons =
    roadmap?.phases?.flatMap((phase: any) => phase.lessons).length || 0;

  return (
    <div className="w-full flex-1 px-4 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column (2/3 width) */}
        <div className="md:col-span-2 space-y-8">
          <ContinueLearningSection
            skill={user?.user.pickedSkill ?? ""}
            level={roadmap?.level}
            totalLessons={totalLessons}
            courseProgress={courseProgress}
            slug={slug as string}
          />
          <MaterialsGuidesSection skill={user?.user.pickedSkill ?? ""} />
        </div>

        {/* Right column (1/3 width) - Learning Tips */}
        <div>
          <LearningTipsDropdown learningPath={learningPath} />
        </div>
      </div>
    </div>
  );
}
