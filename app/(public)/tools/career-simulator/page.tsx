"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Briefcase, Search, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slugify } from "@/lib/slugify";

const roles = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Build user interfaces and interactive web applications",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Analyze data and build predictive models",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description: "Create user-centered designs for digital products",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Automate infrastructure and deployment processes",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: 5,
    title: "Product Manager",
    description: "Define product vision and lead development teams",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 6,
    title: "Cybersecurity Analyst",
    description: "Protect systems from digital threats and vulnerabilities",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: 7,
    title: "Cloud Architect",
    description: "Design and implement cloud computing solutions",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    id: 8,
    title: "Mobile Developer",
    description: "Build applications for iOS and Android devices",
    icon: <Briefcase className="h-4 w-4" />,
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

export default function CareerSimulatorPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight roca-bold">
              Career Simulator
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Experience a day in the life of different digital roles. This
              interactive tool simulates realistic scenarios that professionals
              face in various tech careers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 roca-bold">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Choose a Role",
                  description:
                    "Select from a variety of tech roles you're interested in exploring.",
                },
                {
                  step: 2,
                  title: "Complete Scenarios",
                  description:
                    "Work through realistic tasks and challenges that professionals face daily.",
                },
                {
                  step: 3,
                  title: "Get Insights",
                  description:
                    "Receive feedback and insights about your aptitude and interest in the role.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-0 bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full">
                    <span className="font-bold text-blue-600">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Find a Role to Simulate</h2>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for a role (e.g., 'Developer', 'Designer', 'Data')..."
                className="pl-12 py-6 text-base rounded-xl border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredRoles.map((role) => (
                <motion.div key={role.id} variants={item}>
                  <Link href={`/tools/career-simulator/${slugify(role.title)}`}>
                    <div className="group border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className={`${role.color} p-2 rounded-full`}>
                          {role.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium group-hover:text-blue-600 transition-colors">
                            {role.title}
                          </div>
                          <div className="text-sm text-slate-500">
                            {role.description}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Daily responsibilities and tasks of the role",
                  "Required skills and knowledge",
                  "Common challenges and how to overcome them",
                  "If the role aligns with your interests and strengths",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
