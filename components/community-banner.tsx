"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users } from "lucide-react"
import { useAuthContext } from "@/context/auth-provider"

export default function CommunityBanner() {
  const { user } = useAuthContext()

  return (
    <section className="w-full bg-gradient-to-r from-slate-50 to-slate-100 py-12 md:py-16 border-y" id="community">
      <div className="w-full px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl roca-bold">Join Our Growing Community</h2>

          <p className="max-w-[700px] text-slate-700">
            Connect with like-minded professionals, share insights, and accelerate your career growth through our
            supportive network of industry experts and peers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
            <Link href="https://chat.whatsapp.com/EI3hdPCTkxD9WIazjdZqgr" target="_blank" rel="noopener noreferrer">
              <Button>
                Join Our Community
              </Button>
            </Link>
          </div>

          {!user && (
            <p className="text-sm text-slate-500">
              Already a member?{" "}
              <Link href="/login" className="text-slate-900 font-medium underline underline-offset-4">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}