import Link from "next/link";
import Logo from "../logo";

export default function Page() {
  return (
    <footer className="border-t pt-8 mt-16 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Community created roadmaps, best practices, projects, articles,
            resources and journeys to help you choose your path and grow in your
            career.
          </p>
          <p className="text-sm text-muted-foreground">
            ©2024 Klarify. All rights reserved
          </p>
        </div>
        <div className="flex gap-8">
          <div className="space-y-2">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
