"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import successStoriesData from "@/data/success-stories-data.json";


export default function SuccessStoriesPreview() {
  const previewStories = successStoriesData.stories.slice(0, 4);

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
          <h2 className="text-3xl md:text-4xl font-bold roca-bold text-primary mb-4">
            Inspirational Stories
          </h2>
          <p className="text-lg text-slate-600">
            Discover how Nigeria's brightest tech minds are transforming
            industries 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {previewStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {story.name}
                    </h3>
                    <div className="flex flex-col text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        {story.role}
                      </span>
                      <span className="text-gray-700">{story.company}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  "{story.story}"
                </p>

                <Link href={`/stories/${story.id}`} className="inline-block">
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
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/inspiration/stories">
            <Button variant={"outline"} className="px-8 py-4">
              View All Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
