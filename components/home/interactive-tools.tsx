"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, GitCompare, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    title: "Skill Comparison Tool",
    description: "Compare skills based on demand, salary, and difficulty",
    icon: <GitCompare className="h-5 w-5" />,
    href: "/tools/skill-comparison",
    preview:
      "Select multiple skills to compare their market demand, average salary ranges, learning difficulty, and growth potential in a side-by-side analysis.",
  },
  {
    id: "what-can-i-become",
    title: "What Can I Become? Tool",
    description: "Discover careers based on your skills and interests",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/tools/what-can-i-become",
    preview:
      "Answer a series of questions about your skills, interests, and preferences to receive personalized career path recommendations.",
  },
]

export default function InteractiveTools() {
  const [activeTab, setActiveTab] = useState(tools[0].id)

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight roca-bold">Explore Our Interactive Tools</h2>
          <p className="text-muted-foreground text-lg">
            Discover powerful tools designed to help you navigate your career journey with confidence
          </p>
        </motion.div>

        <Tabs defaultValue={tools[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col justify-center items-center">
          <div className="relative mb-8">
            
            <TabsList className=" bg-background">
              {tools.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center gap-2 sm:text-base sm:px-4 data-[state=active]:bg-slate-50 whitespace-nowrap"
                >
                  <span className="inline-flex">{tool.icon}</span>
                  <span className="hidden lg:inline">{tool.title}</span>
                  <span className="xs:hidden">{tool.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border bg-gradient-to-br from-card to-background">
                  <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="bg-primary/10 p-3 sm:p-4 rounded-full text-primary self-start">{tool.icon}</div>
                      <div>
                        <h3 className="text-xl sm:text-2xl roca-bold font-semibold mb-1 sm:mb-2">{tool.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{tool.description}</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border border-border/50">
                      <p className="text-base sm:text-lg">{tool.preview}</p>
                    </div>

                    <Link href={tool.href} className="block w-full sm:w-auto sm:inline-block">
                      <Button className="group w-full sm:w-auto">
                        Try {tool.title}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

