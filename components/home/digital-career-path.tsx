"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import AnimatedButton from "../animated-button"

const steps = [
  {
    title: "Assess Your Strengths",
    description: "Take our interactive quiz to discover your skills, interests, and learning style.",
    buttonText: "Take the First Step",
  },
  {
    title: "Explore Career Paths",
    description: "Browse through curated digital career options that match your unique profile and aspirations.",
    buttonText: "Discover Opportunities",
  },
  {
    title: "Start Your Journey",
    description: "Access personalized learning resources and connect with mentors in your chosen field.",
    buttonText: "Begin Learning",
  },
]

export default function DigitalCareerPath() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Track scroll position within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"], // Changed from ["start end", "end start"] to make scrolling more responsive
  })

  // Map scroll progress to step index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Calculate which step should be active based on scroll position
      const stepIndex = Math.min(steps.length - 1, Math.floor(latest * steps.length))
      setActiveStep(stepIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Transform values for progress indicator
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-white"
      // Make the section height shorter for faster scrolling
      style={{ height: "200vh" }}
    >
      {/* Sticky container that stays fixed while scrolling through the section */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              {/* Static heading */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 roca-bold">
                Your Path to a Digital Career in
                <br className="hidden md:block" />
                three Simple Steps
              </h2>

              <div className="relative pl-8 md:pl-10">
                {/* The indicator line container */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-slate-100">
                  {/* The steps markers on the indicator line */}
                  {steps.map((_, index) => (
                    <div
                      key={`step-marker-${index}`}
                      className={`absolute left-0 w-[3px] h-[30px] ${
                        index <= activeStep ? "bg-slate-900" : "bg-slate-200"
                      } transition-colors duration-500`}
                      style={{
                        top: `${(index * 100) / steps.length}%`,
                      }}
                    />
                  ))}

                  {/* Active progress on the indicator line */}
                  <motion.div className="absolute left-0 w-[3px] bg-slate-900" style={{ height: progressHeight }} />
                </div>

                {/* Content that changes based on active step */}
                <div className="relative min-h-[200px]">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0,
                        y: activeStep === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute left-0 top-0 w-full ${
                        activeStep === index ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-slate-600 mb-6 max-w-md">{step.description}</p>
                      <Link href={"/"}>
                        <AnimatedButton>{step.buttonText}</AnimatedButton>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side content area */}
            <div className="bg-slate-100 rounded-xl h-[300px] md:h-auto flex items-center justify-center">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 text-center"
              >
                <p className="text-slate-500">Interactive content for step {activeStep + 1}</p>
                <p className="text-sm text-slate-400 mt-4">Scroll to navigate through steps</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}