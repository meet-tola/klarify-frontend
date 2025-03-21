"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-800 text-white py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 roca-bold">Ready to Discover Your Digital Path?</h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Join thousands of professionals who found their perfect career match with our skill assessment tool.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="rounded-full bg-white text-slate-800 hover:bg-slate-100 px-8 py-6 text-lg">
            Start Free Assessment
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}

