"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "../animated-button";

const stories = [
  {
    id: 1,
    quote:
      "From self-taught cloud skills to working at Microsoft. Adaora is a tech influencer and co-founder of She Code Africa, empowering women in tech.",
    advice: "Start small, stay consistent, and never stop learning.",
    name: "Adaora Nwodo",
    title: "Cloud Engineer at Microsoft",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    quote:
      "From self-taught cloud skills to working at Microsoft. Adaora is a tech influencer and co-founder of She Code Africa, empowering women in tech.",
    advice: "Start small, stay consistent, and never stop learning.",
    name: "Adaora Nwodo",
    title: "Cloud Engineer at Microsoft",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    quote:
      "From self-taught design skills to leading UX at a major tech company. Sarah transformed her career through continuous learning and networking.",
    advice: "Start small, stay consistent, and never stop learning.",
    name: "Sarah Johnson",
    title: "Senior UX Designer",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    quote:
      "From marketing assistant to data analyst in just 8 months. Michael discovered his passion for data through Klarity's assessment tools.",
    advice:
      "Don't be afraid to pivot your career when you find what truly excites you.",
    name: "Michael Chen",
    title: "Data Analyst at TechCorp",
    image: "/placeholder.svg",
  },
];

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic sliding
  useEffect(() => {
    if (isCarouselHovered) {
      // Clear the interval when hovering
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    // Set up the interval for automatic sliding
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000);

    // Clean up the interval on component unmount
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isCarouselHovered, stories.length]);

  // Go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate visible stories (current and next two)
  const visibleStories = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % stories.length;
    visibleStories.push(stories[index]);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 roca-bold"
            >
              Real Stories, Real Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-slate-600"
            >
              Take our interactive quiz to discover your skills, interests, and
              learning style.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link href="#">
              <AnimatedButton>See more Stories</AnimatedButton>
            </Link>
          </motion.div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          <div className="flex gap-6 overflow-visible">
            <AnimatePresence initial={false}>
              {visibleStories.map((story, index) => (
                <motion.div
                  key={`${story.id}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: index === 0 ? 1 : 0.95,
                    zIndex: 10 - index,
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-lg border-4 border-slate-200 p-6 min-w-[300px] md:min-w-[400px] flex-1"
                >
                  <p className="text-slate-700 mb-4">{story.quote}</p>
                  <p className="text-slate-800 font-medium italic mb-6">
                    "{story.advice}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {story.name}
                      </h4>
                      <p className="text-sm text-slate-600">{story.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-slate-800 w-6" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
