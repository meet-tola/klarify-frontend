"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import SearchDialog from "@/components/search-dialog"

const careers = [
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Data analysts collect and interpret data to help businesses make decisions. This field requires analytical thinking and problem-solving!",
    skills: ["Excel", "Python", "Data Visualization"],
    roles: ["Data Analyst", "Business Intelligence Analyst"],
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Design",
    description:
      "UX/UI designers create user-friendly digital experiences for apps and websites. You'll learn tools like Figma & Adobe XD and work on creative projects!",
    skills: ["Wireframing", "Visual Design", "User Research"],
    roles: ["UX Designer", "UI Designer", "Product Designer"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Digital marketers develop and implement online marketing strategies to promote products and services. This role requires creativity and strategic thinking!",
    skills: ["Social Media Management", "Content Marketing"],
    roles: ["Digital Marketer", "SEO Specialist"],
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Web developers build and maintain websites, ensuring functionality, performance, and responsiveness across devices and browsers.",
    skills: ["HTML/CSS", "JavaScript", "React"],
    roles: ["Frontend Developer", "Full Stack Developer", "Web Designer"],
  },
]

interface StepTwoProps {
  selectedOptions: Record<string, string>
  onOptionSelect: (questionId: string, optionId: string) => void
  activeQuestionIndex: number
}

export default function StepTwo({ selectedOptions, onOptionSelect }: StepTwoProps) {
  const [notInterestedCount, setNotInterestedCount] = useState(0)
  const [showSearchDialog, setShowSearchDialog] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)

  useEffect(() => {
    if (notInterestedCount >= 3) {
      setShowSearchDialog(true)
      setNotInterestedCount(0)
    }
  }, [notInterestedCount])

  const handleNotInterested = () => {
    setNotInterestedCount((prev) => prev + 1)
  }

  const handleCareerSelect = (career: string) => {
    onOptionSelect("selected-career", career)
    setShowSearchDialog(false)
  }

  const handleCardSelect = (careerId: string) => {
    setSelectedCareer(careerId)
    onOptionSelect("selected-career", careerId)
  }

  const handleChoosePath = () => {
    if (selectedCareer) {
      // Navigate to next step
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Matching you to Careers</h2>
        <p className="text-muted-foreground">
          Based on your answers, we've identified digital careers that might be a great fit for you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((career) => (
          <motion.div
            key={career.id}
            className={`rounded-lg border p-6 cursor-pointer ${
              selectedCareer === career.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardSelect(career.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
            <p className="text-muted-foreground mb-4">{career.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Job Roles:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-between mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
              onClick={handleNotInterested}
            >
              Not Interested
            </button>
          </motion.div>
        </div>
        <div className="flex gap-3">
          <motion.div
            whileHover={selectedCareer ? { scale: 1.05 } : {}}
            whileTap={selectedCareer ? { scale: 0.95 } : {}}
          >
            <button
              className={`px-4 py-2 rounded-md border ${
                selectedCareer
                  ? "border-gray-300 hover:bg-gray-50"
                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedCareer}
            >
              Learn More
            </button>
          </motion.div>
          <motion.div
            whileHover={selectedCareer ? { scale: 1.05 } : {}}
            whileTap={selectedCareer ? { scale: 0.95 } : {}}
          >
            <button
              className={`px-4 py-2 rounded-md ${
                selectedCareer
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
              }`}
              disabled={!selectedCareer}
              onClick={handleChoosePath}
            >
              Choose This Path
            </button>
          </motion.div>
        </div>
      </motion.div>

      <SearchDialog
        isOpen={showSearchDialog}
        onClose={() => setShowSearchDialog(false)}
        onSelect={handleCareerSelect}
      />
    </div>
  )
}

