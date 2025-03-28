"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Briefcase, TrendingUp, DollarSign, Clock, ArrowRight, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Career data
const allCareers = [
  {
    id: 1,
    title: "Frontend Developer",
    category: "Web Development",
    demandLevel: "High",
    salaryRange: "$70,000 - $120,000",
    minSalary: 70000,
    maxSalary: 120000,
    timeToLearn: "6-12 months",
    learningMonths: 12,
    experienceLevel: "Beginner-Friendly",
    description:
      "Build user interfaces and interactive web applications using HTML, CSS, JavaScript, and modern frameworks.",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "UI/UX"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Data Science",
    demandLevel: "Very High",
    salaryRange: "$90,000 - $150,000",
    minSalary: 90000,
    maxSalary: 150000,
    timeToLearn: "1-2 years",
    learningMonths: 24,
    experienceLevel: "Intermediate",
    description:
      "Analyze and interpret complex data to help organizations make better decisions using statistical methods and machine learning.",
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    category: "UX Design",
    demandLevel: "High",
    salaryRange: "$65,000 - $110,000",
    minSalary: 65000,
    maxSalary: 110000,
    timeToLearn: "6-12 months",
    learningMonths: 12,
    experienceLevel: "Beginner-Friendly",
    description:
      "Create user-centered designs for digital products that are both functional and aesthetically pleasing.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Figma/Sketch"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    category: "DevOps",
    demandLevel: "Very High",
    salaryRange: "$85,000 - $140,000",
    minSalary: 85000,
    maxSalary: 140000,
    timeToLearn: "1-2 years",
    learningMonths: 24,
    experienceLevel: "Advanced",
    description:
      "Bridge the gap between development and operations by automating infrastructure, deployments, and monitoring.",
    skills: ["Linux", "Cloud Platforms", "CI/CD", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "Cybersecurity Analyst",
    category: "Cybersecurity",
    demandLevel: "Very High",
    salaryRange: "$80,000 - $130,000",
    minSalary: 80000,
    maxSalary: 130000,
    timeToLearn: "1-2 years",
    learningMonths: 24,
    experienceLevel: "Intermediate",
    description:
      "Protect organizations from digital threats by monitoring, detecting, investigating, and responding to security incidents.",
    skills: ["Network Security", "Threat Analysis", "Security Tools", "Risk Assessment", "Incident Response"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    category: "AI/ML",
    demandLevel: "Very High",
    salaryRange: "$100,000 - $160,000",
    minSalary: 100000,
    maxSalary: 160000,
    timeToLearn: "1-3 years",
    learningMonths: 36,
    experienceLevel: "Advanced",
    description:
      "Design and implement machine learning models and systems that can learn from and make predictions on data.",
    skills: ["Python", "Deep Learning", "TensorFlow/PyTorch", "Math", "Computer Science"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    title: "Backend Developer",
    category: "Web Development",
    demandLevel: "High",
    salaryRange: "$75,000 - $130,000",
    minSalary: 75000,
    maxSalary: 130000,
    timeToLearn: "8-14 months",
    learningMonths: 14,
    experienceLevel: "Intermediate",
    description:
      "Build and maintain the server-side of web applications, focusing on databases, APIs, and application logic.",
    skills: ["Node.js/Python/Java", "Databases", "API Design", "Server Management", "Authentication"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    title: "Mobile Developer",
    category: "Mobile Development",
    demandLevel: "High",
    salaryRange: "$70,000 - $125,000",
    minSalary: 70000,
    maxSalary: 125000,
    timeToLearn: "8-12 months",
    learningMonths: 12,
    experienceLevel: "Intermediate",
    description:
      "Create applications for mobile devices, including iOS and Android platforms using native or cross-platform frameworks.",
    skills: ["Swift/Kotlin", "React Native", "Flutter", "Mobile UI/UX", "App Store Deployment"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    title: "Cloud Architect",
    category: "Cloud Computing",
    demandLevel: "Very High",
    salaryRange: "$110,000 - $170,000",
    minSalary: 110000,
    maxSalary: 170000,
    timeToLearn: "2-4 years",
    learningMonths: 48,
    experienceLevel: "Advanced",
    description:
      "Design and oversee the implementation of cloud computing strategies for organizations, ensuring scalability and security.",
    skills: ["AWS/Azure/GCP", "Infrastructure as Code", "Networking", "Security", "Cost Optimization"],
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Get unique categories
const allCategories = Array.from(new Set(allCareers.map((career) => career.category)))
const allExperienceLevels = ["Beginner-Friendly", "Intermediate", "Advanced"]
const allDemandLevels = ["High", "Very High"]

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [careers, setCareers] = useState(allCareers)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDemandLevels, setSelectedDemandLevels] = useState<string[]>([])
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([60000, 180000])
  const [learningTimeRange, setLearningTimeRange] = useState<[number, number]>([0, 48])

  // Apply filters
  useEffect(() => {
    let filteredResults = allCareers

    // Search term filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase()
      filteredResults = filteredResults.filter(
        (career) =>
          career.title.toLowerCase().includes(lowercasedSearch) ||
          career.category.toLowerCase().includes(lowercasedSearch) ||
          career.skills.some((skill) => skill.toLowerCase().includes(lowercasedSearch)),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filteredResults = filteredResults.filter((career) => selectedCategories.includes(career.category))
    }

    // Demand level filter
    if (selectedDemandLevels.length > 0) {
      filteredResults = filteredResults.filter((career) => selectedDemandLevels.includes(career.demandLevel))
    }

    // Experience level filter
    if (selectedExperienceLevels.length > 0) {
      filteredResults = filteredResults.filter((career) => selectedExperienceLevels.includes(career.experienceLevel))
    }

    // Salary range filter
    filteredResults = filteredResults.filter(
      (career) => career.maxSalary >= salaryRange[0] && career.minSalary <= salaryRange[1],
    )

    // Learning time filter
    filteredResults = filteredResults.filter(
      (career) => career.learningMonths >= learningTimeRange[0] && career.learningMonths <= learningTimeRange[1],
    )

    setCareers(filteredResults)
  }, [searchTerm, selectedCategories, selectedDemandLevels, selectedExperienceLevels, salaryRange, learningTimeRange])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle demand level selection
  const toggleDemandLevel = (level: string) => {
    setSelectedDemandLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  // Toggle experience level selection
  const toggleExperienceLevel = (level: string) => {
    setSelectedExperienceLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedDemandLevels([])
    setSelectedExperienceLevels([])
    setSalaryRange([60000, 180000])
    setLearningTimeRange([0, 48])
    setSearchTerm("")
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 roca-bold">Explore Tech Careers</h1>
            <p className="text-lg text-slate-600">
              Discover in-demand tech careers, required skills, and growth opportunities
            </p>
          </div>

          {/* Search and Filter Toggle (Mobile) */}
          <div className="lg:hidden mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search careers..."
                className="pl-10 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
            {(showFilters || (isClient && window.innerWidth >= 1024)) && (
                <motion.aside
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:w-72 lg:flex-shrink-0"
                >
                  <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto"
                      >
                        Reset All
                      </Button>
                    </div>

                    {/* Search (Desktop) */}
                    <div className="hidden lg:block mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Search careers..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                      <div className="space-y-2">
                        {allCategories.map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`category-${category}`} className="ml-2 text-sm text-slate-700">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Demand Level Filter */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Demand Level</label>
                      <div className="space-y-2">
                        {allDemandLevels.map((level) => (
                          <div key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`demand-${level}`}
                              checked={selectedDemandLevels.includes(level)}
                              onChange={() => toggleDemandLevel(level)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`demand-${level}`} className="ml-2 text-sm text-slate-700">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
                      <div className="space-y-2">
                        {allExperienceLevels.map((level) => (
                          <div key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`experience-${level}`}
                              checked={selectedExperienceLevels.includes(level)}
                              onChange={() => toggleExperienceLevel(level)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`experience-${level}`} className="ml-2 text-sm text-slate-700">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Salary Range Filter */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700">Salary Range</label>
                        <span className="text-sm text-slate-500">
                          ${(salaryRange[0] / 1000).toFixed(0)}k - ${(salaryRange[1] / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <Slider
                        defaultValue={[60000, 180000]}
                        min={60000}
                        max={180000}
                        step={5000}
                        value={salaryRange}
                        onValueChange={(value) => setSalaryRange(value as [number, number])}
                        className="my-4"
                      />
                    </div>

                    {/* Learning Time Filter */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700">Learning Time</label>
                        <span className="text-sm text-slate-500">
                          {learningTimeRange[0]} - {learningTimeRange[1]} months
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 48]}
                        min={0}
                        max={48}
                        step={1}
                        value={learningTimeRange}
                        onValueChange={(value) => setLearningTimeRange(value as [number, number])}
                        className="my-4"
                      />
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Career Cards */}
            <div className="flex-1">
              {careers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {careers.map((career, index) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          
                          <div>
                            <h3 className="font-bold text-lg">{career.title}</h3>
                            <Badge variant="outline">{career.category}</Badge>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-6 line-clamp-2">{career.description}</p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-slate-500" />
                            <span className="text-sm">Demand: </span>
                            <Badge variant={career.demandLevel === "Very High" ? "default" : "secondary"}>
                              {career.demandLevel}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-slate-500" />
                            <span className="text-sm">Salary Range: </span>
                            <span className="text-sm font-medium">{career.salaryRange}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-sm">Time to Learn: </span>
                            <span className="text-sm font-medium">{career.timeToLearn}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {career.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge variant="outline">+{career.skills.length - 3} more</Badge>
                          )}
                        </div>

                        <Link href={`/careers/${career.id}`}>
                          <Button variant={"outline"} className="w-full">
                            View Career Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <h3 className="text-xl font-bold mb-2">No careers found</h3>
                  <p className="text-slate-600 mb-6">Try adjusting your filters to see more results</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

