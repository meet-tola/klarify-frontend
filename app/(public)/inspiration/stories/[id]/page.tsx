import { Clock, Linkedin, Twitter, Instagram } from "lucide-react";
import CommunityBanner from "@/components/community-banner";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <main className="flex-1 flex items-center justify-center">
        <section className="container flex flex-col items-center text-center max-w-3xl py-16 px-6">
          <div className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm mb-6">
            <Clock className="mr-1 h-4 w-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mb-6 roca-bold">
            Real Stories, Real Inspiration
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl mb-12">
            We’re working on a new space filled with inspiring stories from tech professionals—
            the ups, the pivots, the breakthroughs. It’s all about showing the human side of tech.
          </p>

          <div className="grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-2 w-full">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold">Tech Journeys</h3>
              <p className="text-sm text-muted-foreground">
                Discover how developers, designers, and engineers broke into tech and carved their paths.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold">Lessons Learned</h3>
              <p className="text-sm text-muted-foreground">
                Honest insights from people who’ve been there—mistakes, milestones, and everything in between.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
