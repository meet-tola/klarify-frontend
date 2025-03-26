"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle,
  Briefcase,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Code,
  Database,
  Palette,
  ArrowRight,
  Lightbulb,
  Network,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const careerPaths = [
  {
    id: "software-development",
    title: "Software Development",
    description: "Building applications and systems through code",
    demand: "High Demand",
    salary: "$70K-$150K",
    color: "bg-blue-50",
    icon: <Code className="h-5 w-5 text-blue-600" />,
    overview:
      "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components.",
    specializations: [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "Mobile Development",
      "Game Development",
    ],
    skills: [
      "Programming Languages",
      "Data Structures",
      "Algorithms",
      "Version Control",
      "Testing",
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Extracting knowledge and insights from data",
    demand: "Very High Demand",
    salary: "$90K-$160K",
    color: "bg-purple-50",
    icon: <Database className="h-5 w-5 text-purple-600" />,
    overview:
      "Data science combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data. Data scientists analyze and interpret complex data to help organizations make better decisions.",
    specializations: [
      "Machine Learning",
      "Data Analysis",
      "Business Intelligence",
      "Data Engineering",
      "AI Research",
    ],
    skills: [
      "Statistics",
      "Python/R",
      "Data Visualization",
      "SQL",
      "Machine Learning",
    ],
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Design",
    description: "Creating user-centered digital experiences",
    demand: "High Demand",
    salary: "$65K-$120K",
    color: "bg-rose-50",
    icon: <Palette className="h-5 w-5 text-rose-600" />,
    overview:
      "UX/UI designers focus on creating meaningful and relevant experiences for users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.",
    specializations: [
      "UX Research",
      "UI Design",
      "Interaction Design",
      "Product Design",
      "Information Architecture",
    ],
    skills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Usability Testing",
    ],
  },
];

const successFactors = [
  {
    id: "learning",
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, making continuous learning essential. Successful tech professionals dedicate time to staying current with industry trends, learning new tools, and expanding their skill sets.",
    icon: <GraduationCap className="h-5 w-5 text-emerald-600" />,
    color: "bg-emerald-50",
  },
  {
    id: "portfolio",
    title: "Building a Portfolio",
    description:
      "In tech, showing is often more valuable than telling. A strong portfolio of projects demonstrates your skills and problem-solving abilities to potential employers.",
    icon: <Briefcase className="h-5 w-5 text-amber-600" />,
    color: "bg-amber-50",
  },
  {
    id: "networking",
    title: "Networking",
    description:
      "Building professional relationships can open doors to opportunities that might not be advertised publicly. Many tech roles are filled through referrals and personal connections.",
    icon: <Network className="h-5 w-5 text-blue-600" />,
    color: "bg-blue-50",
  },
  {
    id: "specialization",
    title: "Specialization vs. Generalization",
    description:
      "Consider whether you want to be a specialist with deep expertise in a specific area or a generalist with broader knowledge across multiple domains.",
    icon: <Lightbulb className="h-5 w-5 text-indigo-600" />,
    color: "bg-indigo-50",
  },
];

export default function WhatCanIBecomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight roca-bold">
              What Can I Become?
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover career paths based on your skills and interests to find
              your perfect fit in the tech industry
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="assessment">Self-Assessment</TabsTrigger>
                  <TabsTrigger value="careers">Career Paths</TabsTrigger>
                  <TabsTrigger value="success">Success Factors</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Finding Your Path in Tech
                    </CardTitle>
                    <CardDescription>
                      The tech industry offers countless career opportunities,
                      each with its own unique requirements, challenges, and
                      rewards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-slate-600">
                      Finding the right path starts with understanding your own
                      strengths, interests, and goals. Our career exploration
                      tools can help you navigate the vast landscape of tech
                      careers and identify opportunities that align with your
                      unique profile.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-800">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          Start with Self-Assessment
                        </h3>
                        <p className="text-slate-700 mb-4">
                          Before exploring specific careers, take time to
                          reflect on what drives you.
                        </p>
                        <Link
                          href="#assessment"
                          onClick={() => setActiveTab("assessment")}
                        >
                          <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 font-medium"
                          >
                            Learn more about self-assessment
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border border-purple-100">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-800">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          Explore Multiple Paths
                        </h3>
                        <p className="text-slate-700 mb-4">
                          Don't limit yourself to the most obvious career
                          choices. The tech industry is diverse and constantly
                          evolving.
                        </p>
                        <Link
                          href="#careers"
                          onClick={() => setActiveTab("careers")}
                        >
                          <Button
                            variant="link"
                            className="p-0 h-auto text-purple-600 font-medium"
                          >
                            Explore career paths
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button>
                        Take the Career Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Self-Assessment</CardTitle>
                    <CardDescription>
                      Understanding your strengths, interests, and work
                      preferences is the first step toward finding the right
                      career
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-slate-600">
                      Before diving into specific career paths, take time to
                      reflect on what matters to you professionally. These
                      questions can help guide your self-assessment process.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">
                          Skills & Strengths
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              What technical skills do you already have or enjoy
                              learning?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Are you more analytical or creative in your
                              approach to problems?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Do you excel at communication and explaining
                              complex ideas?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              What have others consistently praised you for?
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">
                          Work Preferences
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Do you prefer working independently or
                              collaboratively?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Are you energized by fast-paced environments or
                              methodical work?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Do you enjoy building new things or improving
                              existing systems?
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              How important is work-life balance vs. career
                              advancement?
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button>
                        Take the Career Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="careers" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Popular Career Paths in Tech
                    </CardTitle>
                    <CardDescription>
                      Explore these in-demand tech careers and find the path
                      that aligns with your interests and goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {careerPaths.map((career, index) => (
                      <motion.div
                        key={career.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                      >
                        <div className="md:flex">
                          <div
                            className={`md:w-1/3 ${career.color} p-6 flex flex-col justify-center`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {career.icon}
                              <h3 className="font-bold text-xl">
                                {career.title}
                              </h3>
                            </div>
                            <p className="text-slate-700 mb-4">
                              {career.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-blue-500">
                                {career.demand}
                              </Badge>
                              <Badge variant="outline">{career.salary}</Badge>
                            </div>
                          </div>

                          <div className="md:w-2/3 p-6">
                            <p className="text-slate-600 mb-4">
                              {career.overview}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2 text-slate-800">
                                  Key Specializations:
                                </h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {career.specializations.map((spec, i) => (
                                    <Badge key={i} variant="secondary">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2 text-slate-800">
                                  Core Skills:
                                </h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {career.skills.map((skill, i) => (
                                    <Badge key={i} variant="outline">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <Link href={`/careers/${career.id}`}>
                              <Button variant="outline" className="mt-2">
                                Explore {career.title} Careers
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <div className="flex justify-center mt-6">
                      <Button>
                        View All Career Paths
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="success" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Key Factors for Career Success
                    </CardTitle>
                    <CardDescription>
                      Beyond technical skills, these factors can significantly
                      impact your career trajectory
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {successFactors.map((factor, index) => (
                        <motion.div
                          key={factor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                        >
                          <div
                            className={`${factor.color} p-4 flex items-center gap-3`}
                          >
                            <div className="p-2 bg-white rounded-full">
                              {factor.icon}
                            </div>
                            <h3 className="font-bold text-lg">
                              {factor.title}
                            </h3>
                          </div>
                          <div className="p-5">
                            <p className="text-slate-600">
                              {factor.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-center mt-8">
                      <Button>
                        Take the Career Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
