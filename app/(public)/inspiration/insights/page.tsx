"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Clock,
  Facebook,
  Linkedin,
  Share2,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Career trends data
const careerTrends = [
  {
    id: "ai-ml",
    title: "AI and Machine Learning",
    icon: <TrendingUp className="h-5 w-5" />,
    description:
      "Artificial Intelligence and Machine Learning continue to transform industries from healthcare to finance.",
    opportunities: [
      "Machine Learning Engineers (Avg. Salary: $120,000+)",
      "AI Ethics Specialists",
      "Conversational AI Designers",
      "Computer Vision Engineers",
    ],
    growth: "71% growth expected in the next five years",
  },
  {
    id: "remote-work",
    title: "Remote Work and Digital Collaboration",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    description:
      "The shift to remote and hybrid work models has created a surge in demand for digital collaboration tools and professionals.",
    opportunities: [
      "Remote Work Experience Designers",
      "Digital Collaboration Specialists",
      "Virtual Team Managers",
      "Workplace Analytics Experts",
    ],
    growth: "82% of companies plan to allow remote work post-pandemic",
  },
  {
    id: "data-science",
    title: "Data Science and Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Data has become the lifeblood of modern business decision-making across all sectors.",
    opportunities: [
      "Data Scientists (Avg. Salary: $113,000+)",
      "Business Intelligence Analysts",
      "Data Engineers",
      "Analytics Managers",
    ],
    growth: "650% increase in data science job listings since 2012",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "With increasing digital threats, cybersecurity professionals are in higher demand than ever before.",
    opportunities: [
      "Security Architects (Avg. Salary: $150,000+)",
      "Ethical Hackers",
      "Security Operations Analysts",
      "Cloud Security Specialists",
    ],
    growth: "350% more cybersecurity positions open than candidates available",
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Blockchain technology is expanding beyond cryptocurrency into supply chain, healthcare, and more.",
    opportunities: [
      "Blockchain Developers (Avg. Salary: $140,000+)",
      "Smart Contract Engineers",
      "Blockchain Solution Architects",
      "Tokenomics Specialists",
    ],
    growth: "200% year-over-year growth in blockchain job postings",
  },
]

export default function DigitalIndustriesTrendsPage() {
  const [selectedTrend, setSelectedTrend] = useState(careerTrends[0])

  return (
    <div className="container py-6 lg:py-10 pl-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Header Section */}
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg mb-8">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Digital industry trends"
              width={1600}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 flex flex-col justify-end p-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge className="bg-primary hover:bg-primary">Industry Insights</Badge>
                  <Badge variant="outline">Career Growth</Badge>
                </div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  Trends and Opportunities in Digital Industries
                </h1>
              </div>
            </div>
          </div>

          {/* Author and Meta Info */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Taylor Chen</p>
                <p className="text-xs text-muted-foreground">Digital Transformation Specialist</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>2.4k readers</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            <p className="text-xl leading-relaxed">
              The digital landscape is evolving at an unprecedented pace, creating exciting new career paths and
              opportunities. Understanding these trends is crucial for professionals looking to stay relevant and
              advance in their careers.
            </p>
            <p>
              In this article, we'll explore the most significant trends shaping digital industries today and the
              high-demand skills that can position you for success in tomorrow's job market.
            </p>
          </div>

          {/* Key Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">73%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">of companies are accelerating their digital transformation initiatives</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">149M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">new digital jobs expected globally by 2025</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">4.2x</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">higher salary potential for professionals with AI/ML skills</p>
              </CardContent>
            </Card>
          </div>

          {/* Selected Trend Content */}
          <section className="space-y-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              {selectedTrend.icon}
              <h2 className="text-2xl font-bold">{selectedTrend.title}</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>{selectedTrend.description}</p>
              <h3>Key Opportunities:</h3>
              <ul>
                {selectedTrend.opportunities.map((opportunity, index) => (
                  <li key={index}>{opportunity}</li>
                ))}
              </ul>
              <p>
                <strong>Growth Outlook:</strong> {selectedTrend.growth}, making this one of the most promising career
                paths in tech.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-12 mb-10">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Ready to future-proof your career?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Explore our curated learning paths designed to help you master the skills most in demand in digital
                  industries.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Explore Learning Paths <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Related Courses */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Related Courses</h2>
              <Link href="/courses" className="text-sm text-primary flex items-center">
                View all courses <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{selectedTrend.title} Fundamentals</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>8 modules • 24 hours</span>
                  </div>
                  <p className="text-sm line-clamp-2">
                    Learn the core concepts of {selectedTrend.title.toLowerCase()} and build practical skills for your
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
                  <CardTitle className="text-lg">Advanced {selectedTrend.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>6 modules • 18 hours</span>
                  </div>
                  <p className="text-sm line-clamp-2">
                    Take your {selectedTrend.title.toLowerCase()} skills to the next level with advanced techniques and
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

          {/* Newsletter Signup */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Stay ahead of industry trends</CardTitle>
                <CardDescription>
                  Subscribe to our newsletter for weekly insights on digital career opportunities and skill development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit" className="sm:w-auto">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-6 space-y-6">
            {/* Trending Careers Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Trending Career Paths</CardTitle>
                <CardDescription>Click to explore different digital career trends</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {careerTrends.map((trend) => (
                    <div
                      key={trend.id}
                      onClick={() => setSelectedTrend(trend)}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-muted ${selectedTrend.id === trend.id ? "bg-muted border-l-4 border-primary" : ""}`}
                    >
                      <div
                        className={`p-2 rounded-full ${selectedTrend.id === trend.id ? "bg-primary/10 text-primary" : "bg-muted-foreground/10"}`}
                      >
                        {trend.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{trend.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{trend.growth}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Share This Article</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="flex justify-between">
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

            {/* Popular Articles */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Popular Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="#" className="flex items-start gap-2 group">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      Top 10 Tech Skills for 2024
                    </h3>
                    <p className="text-xs text-muted-foreground">5 min read</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-start gap-2 group">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      How to Transition to a Tech Career
                    </h3>
                    <p className="text-xs text-muted-foreground">7 min read</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-start gap-2 group">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      Salary Guide: Digital Roles in 2023
                    </h3>
                    <p className="text-xs text-muted-foreground">6 min read</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Trend Navigation (visible only on mobile) */}
      <div className="lg:hidden mt-8 mb-4">
        <h2 className="text-xl font-bold mb-3">Explore Other Career Trends</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex gap-2">
            {careerTrends.map((trend) => (
              <Button
                key={trend.id}
                variant={selectedTrend.id === trend.id ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setSelectedTrend(trend)}
              >
                {trend.icon}
                <span>{trend.title}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Share Buttons (visible only on mobile) */}
      <div className="lg:hidden mt-8 mb-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Share This Article</CardTitle>
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
        <p className="text-sm text-muted-foreground">Last updated: March 2023 • 5 min read</p>
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

