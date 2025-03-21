"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const categories = [
    { id: "creative", name: "Creative Design" },
    { id: "tech", name: "Tech & Coding" },
    { id: "marketing", name: "Marketing & Business" },
    { id: "data", name: "Data & Analytics" },
  ]

  return (
    <section className="relative overflow-hidden bg-hero-bg py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-lg">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-[46px] font-bold text-primary leading-tight roca-bold"
            >
              Find Your Perfect Digital Skill in Minutes!
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg text-slate-600">
              Take our quick skill test and discover which digital career path aligns with your strengths and interests.
              Start your journey today!
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Button size={"lg"}>Find a skill</Button>
            </motion.div>
          </motion.div>

          {/* Interest Categories */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 roca-bold">What's Your Interest?</h2>
            <p className="text-slate-600 mb-8">
              Take our quick skill test and discover which digital career path aligns with your strengths and interests.
            </p>
            <div className="space-y-3">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeCategory === category.id ? "bg-slate-800 text-white" : "bg-slate-50 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

