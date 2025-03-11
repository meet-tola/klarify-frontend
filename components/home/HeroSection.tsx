// components/home/HeroSection.jsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  email: string;
  setEmail: (email: string) => void;
}

export default function HeroSection({ email, setEmail }: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <Badge
            variant="outline"
            className="px-4 py-1 border-primary/20 bg-primary/5 text-primary"
          >
            AI-Powered Career Advancement
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Build Your Dream Career With{" "}
            <span className="text-primary">AI Assistance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Leverage cutting-edge AI to optimize your resume, prepare for
            interviews, and discover personalized career opportunities
            tailored to your skills and goals.
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
  );
}