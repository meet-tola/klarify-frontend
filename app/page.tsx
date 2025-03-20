"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveTools from "@/components/home/interactive-tools";
import SuccessStories from "@/components/home/success-stories";
import DigitalCareerPath from "@/components/home/digital-career-path";
import Logo from "@/components/logo";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Handle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const categories = [
    { id: "creative", name: "Creative Design" },
    { id: "tech", name: "Tech & Coding" },
    { id: "marketing", name: "Marketing & Business" },
    { id: "data", name: "Data & Analytics" },
  ];

  const features = [
    {
      title: "Skill Discovery Tool",
      description:
        "Find the perfect digital skill for you – from coding to marketing and beyond.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M30 60C30 60 35 65 50 65C65 65 70 60 70 60"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 40H80"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="30"
              y="20"
              width="40"
              height="50"
              rx="2"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M40 75C40 75 40 85 50 85C60 85 60 75 60 75"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
      bgColor: "bg-rose-50",
    },
    {
      title: "Personalized Career Roadmap",
      description:
        "Get a step-by-step plan tailored to your goals, skills, and interests.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M30 20L70 20"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M30 40L70 40"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M30 60L70 60"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M30 80L70 80"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="20"
              r="5"
              fill="white"
              stroke="#333"
              strokeWidth="2"
            />
            <circle
              cx="40"
              cy="40"
              r="5"
              fill="white"
              stroke="#333"
              strokeWidth="2"
            />
            <circle
              cx="60"
              cy="60"
              r="5"
              fill="white"
              stroke="#333"
              strokeWidth="2"
            />
            <circle
              cx="45"
              cy="80"
              r="5"
              fill="white"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        </div>
      ),
      bgColor: "bg-blue-50",
    },
    {
      title: "Free Resource Library",
      description:
        "Access curated courses, e-books, and tools to learn at your own pace.",
      icon: (
        <div className="w-24 h-24 mx-auto mb-4">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="25"
              y="20"
              width="15"
              height="60"
              rx="2"
              stroke="#333"
              strokeWidth="2"
            />
            <rect
              x="42"
              y="20"
              width="15"
              height="60"
              rx="2"
              stroke="#333"
              strokeWidth="2"
            />
            <rect
              x="59"
              y="20"
              width="15"
              height="60"
              rx="2"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M20 85H80"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
      bgColor: "bg-indigo-50",
    },
  ];

  const mainNavItems = [
    { title: "Inspiration", href: "/inspiration" },
    { title: "Resources", href: "/resources" },
    { title: "Career Exploration", href: "/career" },
    { title: "Community Forum", href: "/community" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
              <Button className="rounded-full bg-slate-800 hover:bg-slate-700">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-1 border-t">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-2">
                <Button variant="outline" className="w-full rounded-full">
                  Login
                </Button>
                <Button className="w-full rounded-full bg-slate-800 hover:bg-slate-700">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-bg py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-lg"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-[46px] font-bold text-primary leading-tight roca-bold"
              >
                Find Your Perfect Digital Skill in Minutes!
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg text-slate-600"
              >
                Take our quick skill test and discover which digital career path
                aligns with your strengths and interests. Start your journey
                today!
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8">
                <Button size={"lg"}>
                  Find a skill
                </Button>
              </motion.div>
            </motion.div>

            {/* Interest Categories */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 roca-bold">
                What's Your Interest?
              </h2>
              <p className="text-slate-600 mb-8">
                Take our quick skill test and discover which digital career path
                aligns with your strengths and interests.
              </p>
              <div className="space-y-3">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-slate-800 text-white"
                        : "bg-slate-50 hover:bg-slate-100"
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

      {/* Features Section */}
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
              Take our interactive quiz to discover your skills, interests, and
              learning style.
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
                <Card
                  className={`h-full overflow-hidden border-none ${feature.bgColor}`}
                >
                  <CardContent className="p-8 text-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Path Steps Section */}
      <DigitalCareerPath />

      {/* Interactive Tools Section */}
      <InteractiveTools />

      {/* Success Stories Section */}
      <SuccessStories />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-slate-800 text-white py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Digital Path?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who found their perfect career match
            with our skill assessment tool.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-full bg-white text-slate-800 hover:bg-slate-100 px-8 py-6 text-lg">
              Start Free Assessment
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p>© {new Date().getFullYear()} Klarity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
