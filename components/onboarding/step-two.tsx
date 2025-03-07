"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SearchDialog from "@/components/search-dialog";
import { Button } from "../ui/button";

// Define multiple sets of careers to rotate through when "Not Interested" is clicked
const careerSets = [
  // First set of careers
  [
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
  ],
  // Second set of careers
  [
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description:
        "Cybersecurity professionals protect systems and data from digital attacks. This growing field offers diverse roles and excellent job security!",
      skills: ["Network Security", "Ethical Hacking", "Security Analysis"],
      roles: ["Security Analyst", "Penetration Tester", "Security Engineer"],
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      description:
        "Cloud specialists help organizations migrate to and manage cloud infrastructure. Learn to work with AWS, Azure, or Google Cloud platforms!",
      skills: ["AWS/Azure", "DevOps", "Infrastructure as Code"],
      roles: ["Cloud Architect", "DevOps Engineer", "Cloud Administrator"],
    },
    {
      id: "product-management",
      title: "Product Management",
      description:
        "Product managers guide the development of products from conception to launch. This role combines business strategy with technical understanding!",
      skills: ["User Stories", "Roadmapping", "Agile Methodologies"],
      roles: ["Product Manager", "Product Owner", "Technical Product Manager"],
    },
    {
      id: "data-science",
      title: "Data Science",
      description:
        "Data scientists extract insights from complex data using statistics, programming, and machine learning techniques.",
      skills: ["Python", "Machine Learning", "Statistical Analysis"],
      roles: ["Data Scientist", "ML Engineer", "AI Researcher"],
    },
  ],
  // Third set of careers
  [
    {
      id: "blockchain",
      title: "Blockchain Development",
      description:
        "Blockchain developers create decentralized applications and smart contracts. This cutting-edge field is revolutionizing finance and beyond!",
      skills: ["Solidity", "Smart Contracts", "Web3"],
      roles: [
        "Blockchain Developer",
        "Smart Contract Engineer",
        "DApp Developer",
      ],
    },
    {
      id: "game-development",
      title: "Game Development",
      description:
        "Game developers create interactive experiences for various platforms. Combine creativity with technical skills in this exciting field!",
      skills: ["Unity/Unreal", "3D Modeling", "Game Design"],
      roles: ["Game Developer", "Game Designer", "Unity Developer"],
    },
    {
      id: "technical-writing",
      title: "Technical Writing",
      description:
        "Technical writers create clear documentation for complex products and services. Perfect for those who enjoy explaining technical concepts!",
      skills: ["Documentation", "API Reference", "Content Strategy"],
      roles: [
        "Technical Writer",
        "Documentation Specialist",
        "Content Developer",
      ],
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      description:
        "Mobile developers create apps for iOS and Android devices. Learn to build applications that millions of people can use daily!",
      skills: ["React Native", "Swift", "Kotlin"],
      roles: ["Mobile Developer", "iOS Developer", "Android Developer"],
    },
  ],
];

interface StepTwoProps {
  selectedOptions: Record<string, string>;
  onOptionSelect: (questionId: string, optionId: string) => void;
  onNextStep: () => void;
}

export default function StepTwo({
  selectedOptions,
  onOptionSelect,
  onNextStep,
}: StepTwoProps) {
  const [notInterestedCount, setNotInterestedCount] = useState(0);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [currentCareerSetIndex, setCurrentCareerSetIndex] = useState(0);
  const [careers, setCareers] = useState(careerSets[0]);
  const [isChangingCareers, setIsChangingCareers] = useState(false);

  useEffect(() => {
    if (notInterestedCount >= 3) {
      setShowSearchDialog(true);
      setNotInterestedCount(0);
    }
  }, [notInterestedCount]);

  const handleNotInterested = () => {
    setNotInterestedCount((prev) => prev + 1);

    // Show next set of careers
    setIsChangingCareers(true);
    setTimeout(() => {
      const nextIndex = (currentCareerSetIndex + 1) % careerSets.length;
      setCurrentCareerSetIndex(nextIndex);
      setCareers(careerSets[nextIndex]);
      setSelectedCareer(null); // Reset selection when changing careers
      setIsChangingCareers(false);
    }, 300);
  };

  const handleCareerSelect = (career: string) => {
    onOptionSelect("selected-career", career);
    setShowSearchDialog(false);
  };

  const handleCardSelect = (careerId: string) => {
    setSelectedCareer(careerId);
    onOptionSelect("selected-career", careerId);
  };

  const handleChoosePath = () => {
    if (selectedCareer) {
      onNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold r">Matching you to Careers</h2>
        <p className="text-muted-foreground mt-1">
          Based on your answers, we've identified digital careers that might be
          a great fit for you!
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: isChangingCareers ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {careers.map((career) => (
          <motion.div
            key={career.id}
            className={`rounded-lg border p-6 cursor-pointer ${
              selectedCareer === career.id
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground"
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
      </motion.div>

      <motion.div
        className="flex justify-between mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={handleNotInterested}>
              Not Interested
            </Button>
          </motion.div>
        </div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" disabled={!selectedCareer}>
              Learn More
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button disabled={!selectedCareer} onClick={handleChoosePath}>
              Choose This Path
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <SearchDialog
        isOpen={showSearchDialog}
        onClose={() => setShowSearchDialog(false)}
        onSelect={handleCareerSelect}
      />
    </div>
  );
}
