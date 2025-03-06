"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, BriefcaseBusiness, Zap, Award, Users, Star } from "lucide-react"

export default function Home() {
  const [email, setEmail] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BriefcaseBusiness className="h-6 w-6 text-primary" />
            <span>AI Career Builder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Log in
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <Badge variant="outline" className="px-4 py-1 border-primary/20 bg-primary/5 text-primary">
                AI-Powered Career Advancement
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Build Your Dream Career With <span className="text-primary">AI Assistance</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Leverage cutting-edge AI to optimize your resume, prepare for interviews, and discover personalized
                career opportunities tailored to your skills and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Career Journey</h2>
              <p className="text-muted-foreground">
                Our AI-powered platform provides all the tools you need to advance your career with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "AI Resume Optimization",
                  description:
                    "Our AI analyzes your resume against job descriptions to highlight relevant skills and experience.",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Interview Preparation",
                  description: "Practice with our AI interviewer that simulates real interviews and provides feedback.",
                },
                {
                  icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
                  title: "Personalized Job Matching",
                  description: "Discover opportunities that align with your skills, experience, and career goals.",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Skill Gap Analysis",
                  description:
                    "Identify skills you need to develop to reach your career goals and get personalized learning paths.",
                },
                {
                  icon: <Star className="h-10 w-10 text-primary" />,
                  title: "Salary Insights",
                  description:
                    "Get data-driven salary recommendations based on your experience, location, and industry.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "Career Path Planning",
                  description:
                    "Map out your long-term career trajectory with AI-generated recommendations and milestones.",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Career Builder Works</h2>
              <p className="text-muted-foreground">
                Our simple three-step process helps you transform your career prospects with AI assistance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description:
                    "Upload your resume or build one from scratch. Our AI analyzes your experience and skills.",
                },
                {
                  step: "02",
                  title: "Get AI Recommendations",
                  description: "Receive personalized career insights, job matches, and skill development suggestions.",
                },
                {
                  step: "03",
                  title: "Apply & Advance",
                  description: "Apply to jobs with your optimized resume and ace interviews with AI preparation.",
                },
              ].map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground">
                Hear from professionals who transformed their careers with our AI-powered platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Software Engineer",
                  company: "Tech Innovations Inc.",
                  image: "/placeholder.svg?height=80&width=80",
                  quote:
                    "The AI resume optimization helped me highlight the right skills for tech roles. I landed 3 interviews in my first week and got my dream job!",
                },
                {
                  name: "Michael Chen",
                  role: "Marketing Director",
                  company: "Global Brands",
                  image: "/placeholder.svg?height=80&width=80",
                  quote:
                    "The interview preparation was game-changing. The AI simulated exactly the types of questions I faced in my actual interviews.",
                },
                {
                  name: "Priya Patel",
                  role: "Data Scientist",
                  company: "Analytics Co.",
                  image: "/placeholder.svg?height=80&width=80",
                  quote:
                    "The skill gap analysis helped me identify exactly what I needed to learn to transition into data science. Worth every penny!",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="rounded-full overflow-hidden w-12 h-12">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground">Choose the plan that fits your career advancement needs.</p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Starter",
                      price: "$9",
                      description: "Perfect for job seekers looking for basic career assistance.",
                      features: [
                        "AI Resume Review",
                        "5 Job Matches per Month",
                        "Basic Interview Preparation",
                        "Email Support",
                      ],
                    },
                    {
                      name: "Professional",
                      price: "$19",
                      description: "Ideal for professionals actively advancing their careers.",
                      features: [
                        "AI Resume Optimization",
                        "Unlimited Job Matches",
                        "Advanced Interview Preparation",
                        "Skill Gap Analysis",
                        "Priority Support",
                      ],
                      popular: true,
                    },
                    {
                      name: "Executive",
                      price: "$39",
                      description: "For senior professionals and executives seeking career growth.",
                      features: [
                        "Everything in Professional",
                        "Executive Resume Writing",
                        "Leadership Assessment",
                        "1-on-1 Career Coaching Session",
                        "Salary Negotiation Guidance",
                      ],
                    },
                  ].map((plan, index) => (
                    <Card
                      key={index}
                      className={`border ${plan.popular ? "border-primary shadow-md" : "shadow-sm"} relative`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="annual">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Starter",
                      price: "$7",
                      description: "Perfect for job seekers looking for basic career assistance.",
                      features: [
                        "AI Resume Review",
                        "5 Job Matches per Month",
                        "Basic Interview Preparation",
                        "Email Support",
                      ],
                    },
                    {
                      name: "Professional",
                      price: "$15",
                      description: "Ideal for professionals actively advancing their careers.",
                      features: [
                        "AI Resume Optimization",
                        "Unlimited Job Matches",
                        "Advanced Interview Preparation",
                        "Skill Gap Analysis",
                        "Priority Support",
                      ],
                      popular: true,
                    },
                    {
                      name: "Executive",
                      price: "$31",
                      description: "For senior professionals and executives seeking career growth.",
                      features: [
                        "Everything in Professional",
                        "Executive Resume Writing",
                        "Leadership Assessment",
                        "1-on-1 Career Coaching Session",
                        "Salary Negotiation Guidance",
                      ],
                    },
                  ].map((plan, index) => (
                    <Card
                      key={index}
                      className={`border ${plan.popular ? "border-primary shadow-md" : "shadow-sm"} relative`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our AI Career Builder platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How does the AI resume optimization work?",
                    answer:
                      "Our AI analyzes your resume against job descriptions to identify relevant skills and experience. It then suggests improvements to highlight your qualifications and increase your chances of getting interviews.",
                  },
                  {
                    question: "Can I cancel my subscription at any time?",
                    answer:
                      "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period.",
                  },
                  {
                    question: "How accurate is the AI interview preparation?",
                    answer:
                      "Our AI interview preparation is trained on thousands of real interview questions across various industries. It simulates realistic interview scenarios and provides feedback on your responses to help you improve.",
                  },
                  {
                    question: "Is my data secure and private?",
                    answer:
                      "Yes, we take data security and privacy seriously. Your personal information and resume data are encrypted and never shared with third parties without your explicit consent.",
                  },
                  {
                    question: "Do you offer refunds?",
                    answer:
                      "We offer a 14-day money-back guarantee if you're not satisfied with our service. Simply contact our support team within 14 days of your purchase.",
                  },
                  {
                    question: "Can I use AI Career Builder if I'm changing industries?",
                    answer:
                      "Our AI is especially helpful for career changers. It identifies transferable skills and helps you position your experience effectively for roles in new industries.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Career?</h2>
              <p className="text-xl opacity-90 max-w-2xl">
                Join thousands of professionals who are advancing their careers with AI assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle className="h-4 w-4" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <BriefcaseBusiness className="h-6 w-6 text-primary" />
                <span>AI Career Builder</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering professionals to advance their careers with AI assistance.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a key={social} href={`#${social}`} className="text-muted-foreground hover:text-primary">
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="capitalize text-xs">{social.charAt(0)}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"],
              },
              {
                title: "Resources",
                links: ["Blog", "Career Tips", "Resume Templates", "Interview Guide"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AI Career Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

