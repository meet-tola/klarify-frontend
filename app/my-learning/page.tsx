"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookText, FolderKanban, Info, Layers } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";
import { slugify } from "@/lib/slugify";
import { getRoadmapContent } from "@/lib/api";
import { getLevelColor } from "@/lib/get-level-color";

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<any>(null);

  const router = useRouter();

  const userId = user?.user._id;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
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
  }, [user]);

  if (loading) {
    return <LoadingScreen message={"Loading..."} />;
  }



  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <motion.h1
          className="text-3xl font-bold roca-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, {user?.user.name}
          <span role="img" aria-label="waving">
            👋
          </span>
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You're mastering {user?.user.learningPath[0].skill}! Keep going!
        </motion.p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/learning"
          className="block p-6 border rounded-lg hover:border-primary"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookText />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Continue Learning</h3>
              <p className="text-sm text-muted-foreground">
                Resume your current milestone or task
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>

        <Link
          href="/projects"
          className="block p-6 border rounded-lg hover:border-primary"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">View Projects</h3>
              <p className="text-sm text-muted-foreground">
                View your projects and milestones
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>

        <Link
          href="/resources"
          className="block p-6 border rounded-lg hover:border-primary"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Explore Resources</h3>
              <p className="text-sm text-muted-foreground">
                Discover curated tutorials and ebooks
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      </div>

      {/* Features Discussion Banner */}
      {/* <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
              New
            </span>
            <span className="font-medium">Features Discussion</span>
          </div>
          <p className="text-sm text-muted-foreground flex-1">
            The learning content and a new feature in "Feature Discussion" can
            be explain the material problem chat.
          </p>
          <Link
            href="/details"
            className="text-sm text-primary hover:underline"
          >
            Go to details →
          </Link>
        </div>
      </div> */}

      {/* Continue Learning Section */}
      <section>
        <h2 className="text-2xl font-bold roca-bold mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card - Progress Circle */}
          <div className="bg-white rounded-lg border p-6 flex items-center justify-center gap-6">
            <div className="relative w-24 h-24 mx-auto">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#F4F4F5"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#42347B"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 * (1 - 0.8)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">80%</span>
              </div>
            </div>
            <div className="mt-4 text-center space-y-1">
              <p className="text-gray-600">Daily Learning: 6/30 Learning</p>
              <p className="text-gray-600">Your longest streak: 14 Days</p>
              <Button variant="link" className="text-primary p-0 h-auto">
                See Details
              </Button>
            </div>
          </div>

          {/* Right Card - Course Progress */}
          <div className="bg-white rounded-lg border px-6 py-4 md:col-span-2">
            <div className="h-full flex flex-col">
              <p
                className={`text-sm font-medium ${getLevelColor(
                  roadmap?.level
                )} py-1`}
              >
                {roadmap?.level}
              </p>
              <h3 className="text-xl font-semibold mb-auto">
                {user?.user.pickedSkill}
              </h3>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="text-gray-600">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-100" />
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/my-learning/${slugify(
                      user?.user.pickedSkill
                    )}/content`}
                  >
                    <Button variant="outline">Continue</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section>
        <h2 className="text-2xl font-bold roca-bold mb-6">Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - One YouTube Video and One Article */}
          <div className="space-y-6">
            {/* Display One YouTube Video */}
            {learningPath?.youtubeVideos?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {learningPath.youtubeVideos[0].title}
                    </h3>
                    <p className="text-gray-600">YouTube Video</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(learningPath.youtubeVideos[0].url, "_blank")
                    }
                  >
                    View
                  </Button>
                </div>
              </div>
            )}

            {/* Display One Article */}
            {learningPath?.articles?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {learningPath.articles[0].title}
                    </h3>
                    <p className="text-gray-600">
                      Article by {learningPath.articles[0].author}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(learningPath.articles[0].url, "_blank")
                    }
                  >
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Tips for Beginners */}
          <div className="p-6 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">
                Tips for {learningPath?.level || "Beginners"}
              </h3>
              <Popover>
                <PopoverTrigger>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent>
                  <p>Helpful tips for getting started</p>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-gray-600 mb-6">
              Here are some tips tailored for your current level:
            </p>
            <div className="space-y-4">
              {learningPath?.tips?.map((tip: any, index: any) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                      <span>{tip.title}</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{tip.title}</DialogTitle>
                      <DialogDescription>{tip.content}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
