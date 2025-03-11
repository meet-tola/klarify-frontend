import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface CTASectionProps {
  email: string;
  setEmail: (email: string) => void;
}

export default function CTASection({ email, setEmail }: CTASectionProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl">
            Join thousands of professionals who are advancing their careers
            with AI assistance.
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
  );
}