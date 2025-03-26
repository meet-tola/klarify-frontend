"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const stories = [
  {
    id: 1,
    name: "TREASURE AJEFU",
    role: "Frontend Engineer",
    company: "TechCorp",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "I was 17 years old when I joined the platform. They have the best instructors for live classes and recorded lessons. Since I completed my program, I have been able to get jobs as a software engineer. The platform gave me the roadmap and the learning experience that I wouldn't have gotten at any other place.",
    position: "left",
  },
  {
    id: 2,
    name: "SAMANTHA GLORIA",
    role: "Backend Engineer",
    company: "DataSystems",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "I think one of the best things that happened to me was learning from people from Nigeria, Kenya and other countries. You get a different perspective on learning and also enjoy a community that helps people grow in so many different ways. The platform equipped me with what I needed to get into the door. If I hadn't joined, I'd know nothing.",
    position: "right",
  },
  {
    id: 3,
    name: "MICHAEL CHEN",
    role: "Data Scientist",
    company: "AnalyticsPro",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "With a background in statistics, I taught myself Python and machine learning through the platform's courses. The structured curriculum and mentor support made all the difference. Now I build recommendation algorithms at a leading tech company and mentor others on their journey.",
    position: "left",
  },
]

export default function SuccessStories() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Success Stories</h2>
          <p className="text-lg text-slate-600">
            Real stories from people who transformed their careers through our platform
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${story.position === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-center`}
            >
              <div className="w-full md:w-1/5 flex justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-100 shadow-md">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5">
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100">
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-blue-600">{story.role}</h3>
                    <p className="font-bold text-sm text-slate-800">{story.name}</p>
                  </div>

                  <p className="text-slate-600 mb-4 text-sm md:text-base leading-relaxed">"{story.story}"</p>

                  <Link href={`/stories/${story.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs font-medium"
                    >
                      Read Full Story
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/stories">
            <Button variant="outline" size="sm">
              View All Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

