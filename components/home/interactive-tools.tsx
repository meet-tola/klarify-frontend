"use client"

import { motion } from "framer-motion"
import { ArrowRight, Briefcase, GitCompare, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const tools = [
  {
    id: "career-simulator",
    title: "Career Simulator",
    description: "Experience a day in the life of different digital roles",
    icon: <Briefcase className="h-5 w-5" />,
    href: "/tools/career-simulator",
    preview:
      "Immerse yourself in realistic scenarios that simulate daily tasks, challenges, and decisions faced by professionals in various tech roles.",
  },
  {
    id: "skill-comparison",
    title: "Skill Comparison",
    description: "Compare skills based on demand, salary, and difficulty",
    icon: <GitCompare className="h-5 w-5" />,
    href: "/tools/skill-comparison",
    preview:
      "Select multiple skills to compare their market demand, average salary ranges, learning difficulty, and growth potential in a side-by-side analysis.",
  },
  {
    id: "what-can-i-become",
    title: "What Can I Become?",
    description: "Career guide based on your skills and interests",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/tools/what-can-i-become",
    preview: "Guide on career paths based on your skills and interests to find your perfect fit in the tech industry",
  },
]

export default function InteractiveTools() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-blue-50">
      <div className="container px-4 lg:px-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight roca-bold">
            Explore Our Interactive Tools
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover powerful tools designed to help you navigate your career journey with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border bg-gradient-to-br from-card to-background hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">{tool.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold roca-bold">{tool.title}</h3>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mb-6 border border-border/50 flex-grow">
                    <p>{tool.preview}</p>
                  </div>

                  <Link href={tool.href} className="mt-auto block">
                    <Button className="group w-full" variant={"outline"}>
                      Try {tool.title}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

