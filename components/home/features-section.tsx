"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      title: "Skill Discovery Tool",
      description: "Find the perfect digital skill for you – from coding to marketing and beyond.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <Image src="/assets/hands.svg" alt="Info Illustration" width={200} height={200} />
        </div>
      ),
      bgColor: "bg-rose-50",
    },
    {
      title: "Personalized Career Roadmap",
      description: "Get a step-by-step plan tailored to your goals, skills, and interests.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <Image src="/assets/roadmap.svg" alt="Info Illustration" width={200} height={200} />
        </div>
      ),
      bgColor: "bg-blue-50",
    },
    {
      title: "Free Resource Library",
      description: "Access curated courses, e-books, and tools to learn at your own pace.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <Image src="/assets/cards.svg" alt="Info Illustration" width={200} height={200} />
        </div>
      ),
      bgColor: "bg-indigo-50",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 roca-bold">
            Everything You Need to Launch Your Digital Career
          </h2>
          <p className="text-lg text-slate-600">
            Take our interactive quiz to discover your skills, interests, and learning style.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className={`h-full overflow-hidden border-none ${feature.bgColor}`}>
                <CardContent className="p-8 text-center">
                  {feature.icon}
                  <h3 className="text-2xl font-bold mb-3 roca-bold">{feature.title}</h3>
                  <p className="text-slate-600 font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

