import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
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
          <Link href="/login" target="_blank">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Log in
            </Button>
          </Link>
          <Link href="/signup" target="_blank">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}