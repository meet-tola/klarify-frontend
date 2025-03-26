"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function FeaturesSection() {
  const features = [
    {
      title: "Skill Discovery Tool",
      description: "Find the perfect digital skill for you – from coding to marketing and beyond.",
      icon: (
        <div className="h-24 lg:h-26 flex justify-center mb-4 w-full">
          <Image src="/assets/hands.svg" alt="Skill Discovery Illustration" width={200} height={200} />
        </div>
      ),
    },
    {
      title: "Personalized Career Roadmap",
      description: "Get a step-by-step plan tailored to your goals, skills, and interests.",
      icon: (
        <div className="h-24 lg:h-26 flex justify-center mb-4 w-full">
          <Image src="/assets/roadmap.svg" alt="Career Roadmap Illustration" width={200} height={200} />
        </div>
      ),
    },
    {
      title: "Free Resource Library",
      description: "Access curated courses, e-books, and tools to learn at your own pace.",
      icon: (
        <div className="h-24 lg:h-26 flex justify-center mb-4 w-full">
          <Image src="/assets/cards.svg" alt="Resource Library Illustration" width={200} height={200} />
        </div>
      ),
    },
    {
      title: "Achieve Success",
      description: "Track your progress and celebrate milestones on your career journey.",
      icon: (
        <div className="h-24 lg:h-26 flex justify-center mb-4 w-full">
          <Image src="/assets/rocket.svg" alt="Community Support Illustration" width={200} height={200} />
        </div>
      ),
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 roca-bold">
            Everything You Need to Launch Your Digital Career
          </h2>
          <p className="text-lg text-slate-600">
            Take our interactive quiz to discover your skills, interests, and learning style.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden p-1"
            >
              <div className="p-6 md:p-8 text-center h-full">
                {feature.icon}
                <h3 className="text-xl md:text-2xl font-bold mb-3 roca-bold text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 font-medium">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

