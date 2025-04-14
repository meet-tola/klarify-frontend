"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-provider";
import LoadingScreen from "@/components/loading-screen";
import { getRoadmapContent } from "@/lib/api";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { ActionCards } from "@/components/dashboard/action-card";
import { GoalsProgressCard } from "@/components/dashboard/goal-progress-card";
import { CourseProgressCard } from "@/components/dashboard/course-progress-card";
import { QuickGuidesSection } from "@/components/dashboard/quick-guide";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRoadmapContent = async () => {
      if (!user?.user?.learningPath || user?.user.learningPath.length === 0) {
        router.push("/roadmap");
      }
      if (user?.user?.pickedSkill) {
        try {
          const data = await getRoadmapContent(
            user.user._id,
            user.user.pickedSkill
          );

          if (data.learningPath.skill === user.user.pickedSkill) {
            setLearningPath(data.learningPath);
            setRoadmap(data.roadmap);
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error);
        }
      }
    };

    fetchRoadmapContent();
  }, [user]);

  if (loading) {
    return <LoadingScreen message={"Loading..."} />;
  }

  return (
    <div className="container mx-auto py-8 space-y-8 px-4 md:px-8 bg-background">
      <WelcomeSection />
      <ActionCards />

      <section>
        <h2 className="text-2xl font-bold roca-bold mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GoalsProgressCard />
          <CourseProgressCard roadmap={roadmap} />
        </div>
      </section>

      <QuickGuidesSection learningPath={learningPath} />
    </div>
  );
}
