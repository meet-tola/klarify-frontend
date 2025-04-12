"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GitCompare,
  TrendingUp,
  DollarSign,
  Clock,
  Briefcase,
  BarChart2,
  BookOpen,
  Search,
  X,
  ChevronDown,
  Info,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  {
    id: "react",
    name: "React",
    category: "Web Development",
    difficulty: 3,
    difficultyDesc:
      "Moderate learning curve. Requires JavaScript knowledge, but has excellent documentation and community support.",
    popularity: 5,
    popularityDesc:
      "One of the most popular frontend libraries with widespread adoption across industries.",
    timeToLearn: "2-3 months",
    timeToLearnDesc:
      "With prior JavaScript knowledge, you can become productive in 2-3 months of dedicated learning.",
    salaryImpact: 4,
    salaryImpactDesc:
      "Significantly increases earning potential for frontend and full-stack roles.",
    jobOpportunities: 5,
    jobOpportunitiesDesc:
      "Very high demand across startups, enterprises, and agencies worldwide.",
    futureRelevance: 4,
    futureRelevanceDesc:
      "Strong ecosystem and backing from Meta ensures continued relevance in the coming years.",
    relatedCareers: [
      "Frontend Developer",
      "Full Stack Developer",
      "React Native Developer",
    ],
    description:
      "A JavaScript library for building user interfaces, particularly single-page applications. React allows developers to create reusable UI components and efficiently update the DOM when data changes.",
    learningResources: 5,
    learningResourcesDesc:
      "Extensive documentation, tutorials, courses, and community resources available.",
    communitySupport: 5,
    communitySupportDesc:
      "Large, active community with frequent updates, conferences, and forums for support.",
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    difficulty: 2,
    difficultyDesc:
      "Beginner-friendly with clean syntax and readable code. Great first programming language.",
    popularity: 5,
    popularityDesc:
      "Consistently ranked among the most popular programming languages globally.",
    timeToLearn: "1-2 months",
    timeToLearnDesc:
      "Basic proficiency can be achieved in 1-2 months, though mastery of specific domains takes longer.",
    salaryImpact: 4,
    salaryImpactDesc:
      "Strong salary potential, especially in data science, machine learning, and backend development.",
    jobOpportunities: 5,
    jobOpportunitiesDesc:
      "Extremely versatile with job opportunities across many industries and domains.",
    futureRelevance: 5,
    futureRelevanceDesc:
      "Continued growth expected, especially in AI, data science, and automation.",
    relatedCareers: [
      "Data Scientist",
      "Backend Developer",
      "Machine Learning Engineer",
    ],
    description:
      "A versatile programming language used for web development, data analysis, AI, and automation. Python emphasizes code readability with its notable use of significant whitespace.",
    learningResources: 5,
    learningResourcesDesc:
      "Abundant free and paid resources, including official documentation, books, courses, and tutorials.",
    communitySupport: 5,
    communitySupportDesc:
      "One of the largest and most supportive programming communities worldwide.",
  },
  {
    id: "ux-design",
    name: "UX Design",
    category: "Design",
    difficulty: 3,
    difficultyDesc:
      "Requires both creative and analytical thinking. Technical tools are easy to learn, but principles take practice.",
    popularity: 4,
    popularityDesc:
      "Growing field with increasing recognition of its importance in product development.",
    timeToLearn: "3-6 months",
    timeToLearnDesc:
      "Fundamentals can be learned in 3-6 months, but expertise develops with project experience.",
    salaryImpact: 4,
    salaryImpactDesc:
      "Companies increasingly value UX skills, leading to competitive salaries.",
    jobOpportunities: 4,
    jobOpportunitiesDesc:
      "Strong demand across tech companies, agencies, and product-focused organizations.",
    futureRelevance: 5,
    futureRelevanceDesc:
      "As digital products proliferate, UX design becomes increasingly critical.",
    relatedCareers: ["UX Designer", "UI Designer", "Product Designer"],
    description:
      "The process of designing user-friendly, aesthetically pleasing digital interfaces. UX design focuses on creating meaningful and relevant experiences for users.",
    learningResources: 4,
    learningResourcesDesc:
      "Good selection of books, courses, and bootcamps, though fewer free resources than technical skills.",
    communitySupport: 4,
    communitySupportDesc:
      "Active community with design systems, pattern libraries, and forums for feedback.",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Computing",
    difficulty: 4,
    difficultyDesc:
      "Complex ecosystem with many services. Requires understanding of cloud concepts and specific AWS implementations.",
    popularity: 5,
    popularityDesc:
      "Market leader in cloud services with the largest market share globally.",
    timeToLearn: "3-6 months",
    timeToLearnDesc:
      "Basic proficiency in core services takes 3-6 months, but the breadth of AWS requires ongoing learning.",
    salaryImpact: 5,
    salaryImpactDesc:
      "Significantly increases earning potential, especially with certifications.",
    jobOpportunities: 5,
    jobOpportunitiesDesc:
      "Very high demand as more companies migrate to cloud infrastructure.",
    futureRelevance: 5,
    futureRelevanceDesc:
      "Cloud computing continues to grow, with AWS maintaining a strong market position.",
    relatedCareers: [
      "Cloud Engineer",
      "DevOps Engineer",
      "Solutions Architect",
    ],
    description:
      "Amazon Web Services - a comprehensive cloud computing platform offering various services including computing power, storage, databases, and machine learning.",
    learningResources: 4,
    learningResourcesDesc:
      "Extensive official documentation, training paths, and third-party courses available.",
    communitySupport: 4,
    communitySupportDesc:
      "Large community with forums, user groups, and regular events like AWS re:Invent.",
  },
  {
    id: "sql",
    name: "SQL",
    category: "Database",
    difficulty: 2,
    difficultyDesc:
      "Relatively straightforward syntax with a clear purpose. Basic queries are easy to learn.",
    popularity: 4,
    popularityDesc:
      "Fundamental database skill used across many industries and applications.",
    timeToLearn: "1-2 months",
    timeToLearnDesc:
      "Basic querying can be learned in weeks, with more advanced concepts taking 1-2 months.",
    salaryImpact: 3,
    salaryImpactDesc:
      "Moderate impact alone, but essential complementary skill for many roles.",
    jobOpportunities: 4,
    jobOpportunitiesDesc:
      "Widely used across industries wherever data is stored in relational databases.",
    futureRelevance: 4,
    futureRelevanceDesc:
      "Despite NoSQL alternatives, SQL remains essential for structured data.",
    relatedCareers: [
      "Database Administrator",
      "Data Analyst",
      "Backend Developer",
    ],
    description:
      "A language designed for managing and querying relational databases. SQL allows you to access, manipulate and retrieve data stored in relational database management systems.",
    learningResources: 5,
    learningResourcesDesc:
      "Abundant resources from basic to advanced, including interactive practice platforms.",
    communitySupport: 4,
    communitySupportDesc:
      "Well-established community with solutions for most common problems readily available.",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    category: "AI/ML",
    difficulty: 5,
    difficultyDesc:
      "Requires strong foundation in mathematics, statistics, and programming. Complex concepts to master.",
    popularity: 5,
    popularityDesc:
      "One of the fastest-growing fields in technology with widespread interest.",
    timeToLearn: "6-12 months",
    timeToLearnDesc:
      "Fundamentals take 6-12 months with prior programming and math knowledge. Mastery takes years.",
    salaryImpact: 5,
    salaryImpactDesc:
      "Among the highest-paying technical specializations due to expertise required and business impact.",
    jobOpportunities: 4,
    jobOpportunitiesDesc:
      "Strong demand, though often requires advanced degrees or specialized experience.",
    futureRelevance: 5,
    futureRelevanceDesc:
      "Continued growth expected as AI applications expand across industries.",
    relatedCareers: [
      "Machine Learning Engineer",
      "AI Researcher",
      "Data Scientist",
    ],
    description:
      "The study of algorithms that improve automatically through experience and data. Machine learning is a subset of artificial intelligence focused on building systems that learn from data.",
    learningResources: 4,
    learningResourcesDesc:
      "Good selection of courses, books, and research papers, though quality varies widely.",
    communitySupport: 4,
    communitySupportDesc:
      "Active research community with conferences, forums, and open-source projects.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Web Development",
    difficulty: 3,
    difficultyDesc:
      "Relatively easy to start, but mastering concepts like asynchronous programming takes time.",
    popularity: 5,
    popularityDesc:
      "The most widely used programming language for web development.",
    timeToLearn: "2-4 months",
    timeToLearnDesc:
      "Basic proficiency in 2-4 months, though the ecosystem is vast and constantly evolving.",
    salaryImpact: 4,
    salaryImpactDesc:
      "Essential skill for web development with strong salary potential.",
    jobOpportunities: 5,
    jobOpportunitiesDesc:
      "Extremely high demand across all industries for web and increasingly server-side development.",
    futureRelevance: 5,
    futureRelevanceDesc:
      "Core web technology with continued evolution and expansion to new platforms.",
    relatedCareers: [
      "Frontend Developer",
      "Full Stack Developer",
      "JavaScript Developer",
    ],
    description:
      "A programming language that enables interactive web pages and is an essential part of web applications. JavaScript runs on the client-side and increasingly on servers with Node.js.",
    learningResources: 5,
    learningResourcesDesc:
      "Vast array of resources from beginner to advanced, including interactive platforms.",
    communitySupport: 5,
    communitySupportDesc:
      "Enormous community with frequent updates, frameworks, and support channels.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    difficulty: 3,
    difficultyDesc:
      "Moderate learning curve. Requires understanding of containerization concepts and command-line comfort.",
    popularity: 4,
    popularityDesc:
      "Standard technology for containerization with widespread adoption.",
    timeToLearn: "1-2 months",
    timeToLearnDesc:
      "Basic usage can be learned in weeks, with more advanced orchestration taking 1-2 months.",
    salaryImpact: 4,
    salaryImpactDesc:
      "Valuable skill that significantly increases marketability for DevOps and development roles.",
    jobOpportunities: 4,
    jobOpportunitiesDesc:
      "Strong demand as more organizations adopt containerization and microservices.",
    futureRelevance: 4,
    futureRelevanceDesc:
      "Containerization continues to grow, with Docker remaining a key technology.",
    relatedCareers: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer",
    ],
    description:
      "A platform for developing, shipping, and running applications in containers. Docker enables consistent environments across development, testing, and production.",
    learningResources: 4,
    learningResourcesDesc:
      "Good official documentation and third-party resources covering various use cases.",
    communitySupport: 4,
    communitySupportDesc:
      "Active community with solutions for common problems and integration scenarios.",
  },
];

// Custom dropdown component for skill selection
function SkillDropdown({
  selectedSkill,
  onSelect,
  label,
  excludeSkill,
}: {
  selectedSkill: string;
  onSelect: (id: string) => void;
  label: string;
  excludeSkill?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSkillData = skills.find((skill) => skill.id === selectedSkill);

  const filteredSkills = skills
    .filter((skill) => skill.id !== excludeSkill)
    .filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center">
          {selectedSkillData && (
            <>
              <Badge className="mr-2 bg-slate-100 text-slate-800 hover:bg-slate-200">
                {selectedSkillData.category}
              </Badge>
              <span>{selectedSkillData.name}</span>
            </>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-slate-200"
          >
            <div className="p-2">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search skills..."
                  className="pl-8 py-1 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredSkills.length === 0 ? (
                  <div className="py-2 px-3 text-sm text-slate-500">
                    No skills found
                  </div>
                ) : (
                  filteredSkills.map((skill) => (
                    <button
                      key={skill.id}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded-md flex items-center justify-between"
                      onClick={() => handleSelect(skill.id)}
                    >
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-slate-100 text-slate-800">
                          {skill.category}
                        </Badge>
                        <span>{skill.name}</span>
                      </div>
                      {skill.id === selectedSkill && (
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Metric card component
function MetricCard({
  icon,
  title,
  value1,
  value2,
  description1,
  description2,
  isProgress = false,
  isOutOf5 = false,
  skill1Name,
  skill2Name,
}: {
  icon: React.ReactNode;
  title: string;
  value1: number | string;
  value2: number | string;
  description1: string;
  description2: string;
  isProgress?: boolean;
  isOutOf5?: boolean;
  skill1Name: string;
  skill2Name: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-slate-500 mb-1">
              {skill1Name}
            </h4>
            {isProgress ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">
                    {isOutOf5 ? `${value1}/5` : value1}
                  </span>
                  <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help" />
                </div>
                <Progress value={(value1 as number) * 20} className="h-2" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-medium">
                  {value1}
                </Badge>
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help" />
              </div>
            )}
            <p className="mt-2 text-xs text-slate-500 line-clamp-2">
              {description1}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-slate-500 mb-1">
              {skill2Name}
            </h4>
            {isProgress ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">
                    {isOutOf5 ? `${value2}/5` : value2}
                  </span>
                  <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help" />
                </div>
                <Progress value={(value2 as number) * 20} className="h-2" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-medium">
                  {value2}
                </Badge>
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help" />
              </div>
            )}
            <p className="mt-2 text-xs text-slate-500 line-clamp-2">
              {description2}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SkillComparisonPage() {
  const [skill1, setSkill1] = useState("react");
  const [skill2, setSkill2] = useState("python");
  const [activeTab, setActiveTab] = useState("comparison");

  const skillData1 = skills.find((skill) => skill.id === skill1);
  const skillData2 = skills.find((skill) => skill.id === skill2);

  if (!skillData1 || !skillData2) return null;

  return (
    <main className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight roca-bold">
            Skill Comparison Tool
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Compare skills based on demand, salary impact, and learning
              difficulty to make informed career decisions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              Select Skills to Compare
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <SkillDropdown
                selectedSkill={skill1}
                onSelect={setSkill1}
                label="First Skill"
                excludeSkill={skill2}
              />
              <SkillDropdown
                selectedSkill={skill2}
                onSelect={setSkill2}
                label="Second Skill"
                excludeSkill={skill1}
              />
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs
                defaultValue="comparison"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="skill1">{skillData1.name}</TabsTrigger>
                  <TabsTrigger value="skill2">{skillData2.name}</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="mt-6 space-y-6">
                  <MetricCard
                    icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                    title="Popularity"
                    value1={skillData1.popularity}
                    value2={skillData2.popularity}
                    description1={skillData1.popularityDesc}
                    description2={skillData2.popularityDesc}
                    isProgress={true}
                    isOutOf5={true}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />

                  <MetricCard
                    icon={<BarChart2 className="h-5 w-5 text-orange-500" />}
                    title="Difficulty"
                    value1={skillData1.difficulty}
                    value2={skillData2.difficulty}
                    description1={skillData1.difficultyDesc}
                    description2={skillData2.difficultyDesc}
                    isProgress={true}
                    isOutOf5={true}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />

                  <MetricCard
                    icon={<Clock className="h-5 w-5 text-purple-500" />}
                    title="Time to Learn"
                    value1={skillData1.timeToLearn}
                    value2={skillData2.timeToLearn}
                    description1={skillData1.timeToLearnDesc}
                    description2={skillData2.timeToLearnDesc}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />

                  <MetricCard
                    icon={<DollarSign className="h-5 w-5 text-green-500" />}
                    title="Salary Impact"
                    value1={skillData1.salaryImpact}
                    value2={skillData2.salaryImpact}
                    description1={skillData1.salaryImpactDesc}
                    description2={skillData2.salaryImpactDesc}
                    isProgress={true}
                    isOutOf5={true}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />

                  <MetricCard
                    icon={<Briefcase className="h-5 w-5 text-indigo-500" />}
                    title="Job Opportunities"
                    value1={skillData1.jobOpportunities}
                    value2={skillData2.jobOpportunities}
                    description1={skillData1.jobOpportunitiesDesc}
                    description2={skillData2.jobOpportunitiesDesc}
                    isProgress={true}
                    isOutOf5={true}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />

                  <MetricCard
                    icon={<BookOpen className="h-5 w-5 text-red-500" />}
                    title="Learning Resources"
                    value1={skillData1.learningResources}
                    value2={skillData2.learningResources}
                    description1={skillData1.learningResourcesDesc}
                    description2={skillData2.learningResourcesDesc}
                    isProgress={true}
                    isOutOf5={true}
                    skill1Name={skillData1.name}
                    skill2Name={skillData2.name}
                  />
                </TabsContent>

                <TabsContent value="skill1" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{skillData1.name}</CardTitle>
                      <CardDescription>{skillData1.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{skillData1.description}</p>

                      <div>
                        <h3 className="font-medium mb-2">Related Careers</h3>
                        <div className="flex flex-wrap gap-2">
                          {skillData1.relatedCareers.map((career, index) => (
                            <Badge key={index} variant="outline">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Link href={`/careers/${skillData1.id}`}>
                        <Button variant="outline" className="w-full mt-4">
                          Learn More About {skillData1.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skill2" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{skillData2.name}</CardTitle>
                      <CardDescription>{skillData2.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{skillData2.description}</p>

                      <div>
                        <h3 className="font-medium mb-2">Related Careers</h3>
                        <div className="flex flex-wrap gap-2">
                          {skillData2.relatedCareers.map((career, index) => (
                            <Badge key={index} variant="outline">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Link href={`/careers/${skillData2.id}`}>
                        <Button variant="outline" className="w-full mt-4">
                          Learn More About {skillData2.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block space-y-6">
              <MetricCard
                icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                title="Popularity"
                value1={skillData1.popularity}
                value2={skillData2.popularity}
                description1={skillData1.popularityDesc}
                description2={skillData2.popularityDesc}
                isProgress={true}
                isOutOf5={true}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />

              <MetricCard
                icon={<BarChart2 className="h-5 w-5 text-orange-500" />}
                title="Difficulty"
                value1={skillData1.difficulty}
                value2={skillData2.difficulty}
                description1={skillData1.difficultyDesc}
                description2={skillData2.difficultyDesc}
                isProgress={true}
                isOutOf5={true}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />

              <MetricCard
                icon={<Clock className="h-5 w-5 text-purple-500" />}
                title="Time to Learn"
                value1={skillData1.timeToLearn}
                value2={skillData2.timeToLearn}
                description1={skillData1.timeToLearnDesc}
                description2={skillData2.timeToLearnDesc}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />

              <MetricCard
                icon={<DollarSign className="h-5 w-5 text-green-500" />}
                title="Salary Impact"
                value1={skillData1.salaryImpact}
                value2={skillData2.salaryImpact}
                description1={skillData1.salaryImpactDesc}
                description2={skillData2.salaryImpactDesc}
                isProgress={true}
                isOutOf5={true}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />

              <MetricCard
                icon={<Briefcase className="h-5 w-5 text-indigo-500" />}
                title="Job Opportunities"
                value1={skillData1.jobOpportunities}
                value2={skillData2.jobOpportunities}
                description1={skillData1.jobOpportunitiesDesc}
                description2={skillData2.jobOpportunitiesDesc}
                isProgress={true}
                isOutOf5={true}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />

              <MetricCard
                icon={<BookOpen className="h-5 w-5 text-red-500" />}
                title="Learning Resources"
                value1={skillData1.learningResources}
                value2={skillData2.learningResources}
                description1={skillData1.learningResourcesDesc}
                description2={skillData2.learningResourcesDesc}
                isProgress={true}
                isOutOf5={true}
                skill1Name={skillData1.name}
                skill2Name={skillData2.name}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{skillData1.name}</CardTitle>
                  <CardDescription>{skillData1.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{skillData1.description}</p>

                  <div>
                    <h3 className="font-medium mb-2">Related Careers</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillData1.relatedCareers.map((career, index) => (
                        <Badge key={index} variant="outline">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/careers/${skillData1.id}`}>
                    <Button variant="outline" className="w-full mt-4">
                      Learn More About {skillData1.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{skillData2.name}</CardTitle>
                  <CardDescription>{skillData2.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{skillData2.description}</p>

                  <div>
                    <h3 className="font-medium mb-2">Related Careers</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillData2.relatedCareers.map((career, index) => (
                        <Badge key={index} variant="outline">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/careers/${skillData2.id}`}>
                    <Button variant="outline" className="w-full mt-4">
                      Learn More About {skillData2.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
