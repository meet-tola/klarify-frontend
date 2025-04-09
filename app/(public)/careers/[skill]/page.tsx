import { Clock, Linkedin, Twitter, Instagram } from "lucide-react";
import CommunityBanner from "@/components/community-banner";

export default function ComingSoonPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-slate-50/50">
        <main className="flex-1 flex items-center justify-center">
          <section className="container flex flex-col items-center text-center max-w-3xl py-16 px-4">
            <div className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm mb-6">
              <Clock className="mr-1 h-4 w-4" />
              <span>Coming Soon</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mb-6 roca-bold">
              Discover Your Career Path
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mb-12">
              We're currently building this section to help you navigate your career journey
              with confidence. Detailed career insights, personalized learning
              paths, and expert guidance coming soon.
            </p>

            <div className="grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-3 w-full">
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold">Personalized Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Custom learning paths tailored to your career goals and
                  current skill level.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold">Expert Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed career information from industry professionals and
                  market data.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold">Career Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Tools to track your progress and visualize your career growth
                  over time.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <CommunityBanner />
    </>
  );
}
