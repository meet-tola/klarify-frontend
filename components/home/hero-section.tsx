"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-provider";

export default function Hero() {
  const { user } = useAuthContext();

  return (
    <section className="relative bg-gradient-to-b from-blue-50/50 to-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 roca-bold">
              Discover Your Path to Tech Success
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Assess your skills, explore career paths, and get personalized
              roadmaps to achieve your tech career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={user?.user ? "/roadmap" : "/signup"}>
                <Button className="bg-primary hover:bg-primary/90">
                  Start Skill Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers" className="w-full">
                <Button variant="outline">Explore Careers</Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                {
                  name: "Front-End Development",
                  level: 4.8,
                  category: "Most Popular",
                  description: "Master React, HTML, CSS, and modern frameworks",
                },
                {
                  name: "Data Science",
                  level: 4.6,
                  category: "High Growth",
                  description: "Learn Python, statistics, and machine learning",
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white rounded-xl shadow-md p-5 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="mb-1" variant={"outline"}>
                      {skill.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.1 + star * 0.05,
                          }}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              star <= Math.floor(skill.level)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        </motion.div>
                      ))}
                      <span className="text-sm ml-1 text-slate-600">
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-1 roca-bold">
                    {skill.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{skill.description}</p>
                  <div className="w-20 h-20 absolute -bottom-6 -right-6 rounded-full bg-blue-50/80 z-0"></div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-12 -left-6 bg-white p-2 md:p-4 px-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Skills Matched</p>
                  <p className="text-sm text-slate-500">5 career paths found</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-white p-2 md:p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">High Demand</p>
                  <p className="text-sm text-slate-500">
                    Top 3 trending skills
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
