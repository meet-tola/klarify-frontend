"use client"

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
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-slate-900 text-center roca-bold">
          Your Path to a Digital Career in Three Simple Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              </div>

              <p className="text-slate-600 mb-6 flex-grow">{step.description}</p>

              <Link href={"/"} className="mt-auto">
                <AnimatedButton>{step.buttonText}</AnimatedButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

