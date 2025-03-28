"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Database,
  Facebook,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Linkedin,
  Network,
  Palette,
  Share2,
  Twitter,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Career paths data
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
    skills: ["Programming Languages", "Data Structures", "Algorithms", "Version Control", "Testing"],
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
    specializations: ["Machine Learning", "Data Analysis", "Business Intelligence", "Data Engineering", "AI Research"],
    skills: ["Statistics", "Python/R", "Data Visualization", "SQL", "Machine Learning"],
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
    specializations: ["UX Research", "UI Design", "Interaction Design", "Product Design", "Information Architecture"],
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protecting systems, networks, and data from digital attacks",
    demand: "Very High Demand",
    salary: "$85K-$170K",
    color: "bg-green-50",
    icon: <Network className="h-5 w-5 text-green-600" />,
    overview:
      "Cybersecurity professionals protect organizations from threats by implementing security measures, monitoring for breaches, and responding to incidents. This field is critical as digital threats continue to evolve and increase in sophistication.",
    specializations: [
      "Security Analysis",
      "Penetration Testing",
      "Security Architecture",
      "Incident Response",
      "Compliance",
    ],
    skills: ["Network Security", "Threat Analysis", "Security Tools", "Risk Assessment", "Cryptography"],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Building and maintaining cloud infrastructure and services",
    demand: "High Demand",
    salary: "$80K-$160K",
    color: "bg-blue-50",
    icon: <Database className="h-5 w-5 text-blue-600" />,
    overview:
      "Cloud computing professionals design, implement, and manage cloud-based systems and services. They help organizations leverage the scalability, flexibility, and cost-efficiency of cloud platforms.",
    specializations: ["Cloud Architecture", "DevOps", "Cloud Security", "Cloud Migration", "Serverless Computing"],
    skills: ["AWS/Azure/GCP", "Infrastructure as Code", "Containerization", "Microservices", "Automation"],
  },
]

// Success factors data
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
]

// Self-assessment questions
const assessmentQuestions = {
  skills: [
    "What technical skills do you already have or enjoy learning?",
    "Are you more analytical or creative in your approach to problems?",
    "Do you excel at communication and explaining complex ideas?",
    "What have others consistently praised you for?",
  ],
  preferences: [
    "Do you prefer working independently or collaboratively?",
    "Are you energized by fast-paced environments or methodical work?",
    "Do you enjoy building new things or improving existing systems?",
    "How important is work-life balance vs. career advancement?",
  ],
}

// Related resources
const relatedResources = [
  {
    title: "How to Build a Tech Portfolio",
    readTime: "5 min read",
  },
  {
    title: "Transitioning to a Tech Career",
    readTime: "7 min read",
  },
  {
    title: "2023 Tech Salary Guide",
    readTime: "6 min read",
  },
]

export default function WhatCanIBecomePage() {
  const [selectedCareer, setSelectedCareer] = useState(careerPaths[0])

  return (
    <div className="container py-6 lg:py-10 px-4 md:pl-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Header Section */}
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg mb-8">
            <Image
              src="/assets/what.jpg"
              alt="Career exploration"
              width={1600}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-background/20 flex flex-col justify-end p-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge variant={"secondary"}>Career Guidance</Badge>
                  <Badge variant={"secondary"}>Self-Discovery</Badge>
                </div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">What Can I Become in Tech?</h1>
                <p className="text-white/80 max-w-2xl">
                  Discover career paths based on your skills and interests to find your perfect fit in the tech industry
                </p>
              </div>
            </div>
          </div>

          {/* Author and Meta Info */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>10 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>3.2k readers</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Updated March 2025</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            <p className="text-xl leading-relaxed">
              The tech industry offers countless career opportunities, each with its own unique requirements,
              challenges, and rewards. Finding the right path starts with understanding your own strengths, interests,
              and goals.
            </p>
            <p>
              Whether you're just starting your career journey or considering a transition into tech, this guide will
              help you explore various paths and identify opportunities that align with your unique profile.
            </p>
          </div>

          {/* Key Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">149M+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">new digital jobs expected globally by 2025</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">73%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">of companies struggle to find qualified tech talent</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">4.2x</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">higher salary potential for professionals with in-demand tech skills</p>
              </CardContent>
            </Card>
          </div>

          {/* Self-Assessment Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Self-Assessment</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  Before diving into specific career paths, take time to reflect on what matters to you professionally.
                  These questions can help guide your self-assessment process.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Skills & Strengths</h3>
                    <ul className="space-y-3">
                      {assessmentQuestions.skills.map((question, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Work Preferences</h3>
                    <ul className="space-y-3">
                      {assessmentQuestions.preferences.map((question, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <Button size={"sm"} className="mt-4">
                    Take the Career Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Selected Career Content */}
          <section className="space-y-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              {selectedCareer.icon}
              <h2 className="text-2xl font-bold">{selectedCareer.title}</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className={`p-4 rounded-lg mb-6 ${selectedCareer.color}`}>
                  <div className="flex flex-wrap gap-3 mb-2">
                    <Badge className="bg-blue-500">{selectedCareer.demand}</Badge>
                    <Badge variant="outline">{selectedCareer.salary}</Badge>
                  </div>
                  <p className="text-slate-700">{selectedCareer.description}</p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p>{selectedCareer.overview}</p>

                  <h3>Key Specializations:</h3>
                  <div className="flex flex-wrap gap-2 mb-4 not-prose">
                    {selectedCareer.specializations.map((spec, i) => (
                      <Badge key={i} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <h3>Core Skills:</h3>
                  <div className="flex flex-wrap gap-2 mb-4 not-prose">
                    {selectedCareer.skills.map((skill, i) => (
                      <Badge key={i} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="not-prose">
                    <Button className="mt-4">
                      Explore {selectedCareer.title} Careers
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Success Factors Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Key Factors for Career Success</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Beyond technical skills, these factors can significantly impact your career trajectory in the tech
              industry.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {successFactors.map((factor) => (
                <Card key={factor.id}>
                  <CardHeader className={`pb-3 ${factor.color}`}>
                    <div className="flex items-center gap-2">
                      {factor.icon}
                      <CardTitle className="text-lg">{factor.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-12 mb-10">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Ready to find your ideal tech career?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Take our comprehensive assessment to discover career paths that match your skills, interests, and work
                  preferences.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Start Career Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Related Courses */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Related Learning Paths</h2>
              <Link href="/courses" className="text-sm text-primary flex items-center">
                View all courses <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Introduction to {selectedCareer.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>6 modules • 18 hours</span>
                  </div>
                  <p className="text-sm line-clamp-2">
                    Learn the fundamentals of {selectedCareer.title.toLowerCase()} and build a foundation for your
                    career.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Advanced {selectedCareer.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>8 modules • 24 hours</span>
                  </div>
                  <p className="text-sm line-clamp-2">
                    Take your {selectedCareer.title.toLowerCase()} skills to the next level with advanced techniques and
                    real-world projects.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-6 space-y-6">
            {/* Career Paths Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Explore Career Paths</CardTitle>
                <CardDescription>Click to explore different tech career options</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {careerPaths.map((career) => (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareer(career)}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-muted ${selectedCareer.id === career.id ? "bg-muted border-l-4 border-primary" : ""}`}
                    >
                      <div
                        className={`p-2 rounded-full ${selectedCareer.id === career.id ? "bg-primary/10 text-primary" : "bg-muted-foreground/10"}`}
                      >
                        {career.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{career.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {career.demand} • {career.salary}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Share This Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="flex gap-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                          <span className="sr-only">Share on Twitter</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on Twitter</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                          <span className="sr-only">Share on LinkedIn</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on LinkedIn</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Facebook className="h-4 w-4 text-[#1877F2]" />
                          <span className="sr-only">Share on Facebook</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on Facebook</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Copy Link</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy Link</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Related Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedResources.map((resource, index) => (
                  <Link href="#" key={index} className="flex items-start gap-2 group">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Resource thumbnail"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground">{resource.readTime}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Career Updates</CardTitle>
                <CardDescription>Get the latest career insights and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Career Navigation (visible only on mobile) */}
      <div className="lg:hidden mt-8 mb-4">
        <h2 className="text-xl font-bold mb-3">Explore Other Career Paths</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex gap-2">
            {careerPaths.map((career) => (
              <Button
                key={career.id}
                variant={selectedCareer.id === career.id ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setSelectedCareer(career)}
              >
                {career.icon}
                <span>{career.title}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Share Buttons (visible only on mobile) */}
      <div className="lg:hidden mt-8 mb-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Share This Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4 text-[#1877F2]" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Copy Link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Separator className="my-8" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">Last updated: March 2023 • 10 min read</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Bookmark
          </Button>
          <Button variant="ghost" size="sm">
            Print
          </Button>
        </div>
      </div>
    </div>
  )
}

