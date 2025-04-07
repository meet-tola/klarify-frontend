"use client";

import { Clock, Send } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 gap-8">

      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 border shadow-sm">
          <Clock className="h-6 w-6 text-slate-700" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 roca-bold">
          Coming Soon
        </h1>

        <p className="text-lg text-slate-600">
          We're working on something exciting. This feature will be available
          soon.
        </p>
      </div>

      <footer className="text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Klarify. All rights reserved.</p>
        <Link
          href="/"
          className="mt-2 inline-block text-slate-700 hover:text-slate-900 hover:underline"
        >
          Return to Home
        </Link>
      </footer>
    </div>
  );
}
