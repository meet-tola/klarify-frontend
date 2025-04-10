import Link from "next/link";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MaterialsGuidesSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold roca-bold mb-6">Materials & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Roadmap Card */}
        <Card className="hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="pb-2">
            <div className="flex gap-2 items-center">
              <CardTitle className="text-lg">View your roadmap</CardTitle>
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Follow your personalized learning path with structured milestones
              and clear objectives.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/roadmap"
              className="flex items-center justify-between text-sm font-medium text-primary hover:underline"
            >
              <span>View roadmap</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>

        {/* View Projects Card */}
        <Card className="hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="pb-2">
            <div className="flex gap-2 items-center">
              <CardTitle className="text-lg">View Project</CardTitle>
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Apply your skills with hands-on projects designed to reinforce
              your learning and build your portfolio.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/my-learning/projects"
              className="flex items-center justify-between text-sm font-medium text-primary hover:underline"
            >
              <span>View all projects</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>

        {/* View Video/Article Card */}
        <Card className="hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="pb-2">
            <div className="flex gap-2 items-center">
              <CardTitle className="text-lg">View Videos/Articles</CardTitle>
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Apply your skills with hands-on projects designed to reinforce
              your learning and build your portfolio.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/my-learning/videos-articles"
              className="flex items-center justify-between text-sm font-medium text-primary hover:underline"
            >
              <span>View all projects</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
