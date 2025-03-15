"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookText, FolderKanban, Info, Layers } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/auth-provider";

export default function DashboardPage() {
  const { user } = useAuthContext();

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
          Welcome back, Oluwatosin{" "}
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
          You're mastering UI/UX Design! Keep going!
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
          <div className="bg-white rounded-lg border p-6">
            <div className="relative w-32 h-32 mx-auto">
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
                  stroke="#7C3AED"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 * (1 - 0.8)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#7C3AED]">80%</span>
              </div>
            </div>
            <div className="mt-4 text-center space-y-1">
              <p className="text-gray-600">Daily Learning: 6/30 Learning</p>
              <p className="text-gray-600">Your longest streak: 14 Days</p>
              <Button variant="link" className="text-[#7C3AED] p-0 h-auto">
                See Details
              </Button>
            </div>
          </div>

          {/* Right Card - Course Progress */}
          <div className="bg-white rounded-lg border p-6 md:col-span-2">
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-auto">
                Creating Engaging Learning Journeys UI/UX Best Practices
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
                  <Button variant="outline">Continue</Button>
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
          {/* Left Column */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Understanding UI/UX Design Principles
                  </h3>
                  <p className="text-gray-600">Youtube Video</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Exploring Color Theory in Design
                  </h3>
                  <p className="text-gray-600">Online Course</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Prototyping with Figma
                  </h3>
                  <p className="text-gray-600">Webinar</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Tips for Beginners */}
          <div className="p-6 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Tip for Beginners</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful tips for getting started</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-600 mb-6">
              Learning to code can be overwhelming, here are some tips to help
              you get started:
            </p>
            <div className="space-y-4">
              <Link
                href="/tips/tutorial"
                className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900"
              >
                <span>Avoid Tutorial Hell</span>
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
              </Link>
              <Link
                href="/tips/habits"
                className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900"
              >
                <span>Consistent study habits</span>
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
              </Link>
              <Link
                href="/tips/goals"
                className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900"
              >
                <span>Set a clear goal</span>
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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
