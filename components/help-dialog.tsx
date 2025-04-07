"use client"

import { X, HelpCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuthContext } from "@/context/auth-provider"

interface HelpDialogProps {
  buttonSize?: "icon" | "default" | "md" | "sm" | null
  className?: string
}

export function HelpDialog({ buttonSize = "default", className = "" }: HelpDialogProps) {
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={buttonSize}
          className={`rounded-full flex items-center justify-center ${className}`}
        >
          <HelpCircle className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Get Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">How Our Platform Works</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {user ? "Continue your learning journey" : "Your journey to skill mastery in three simple steps"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {user ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium">You're Signed Up</h3>
                  <p className="text-sm text-muted-foreground">
                    You can now take a skill assessment or search directly for skills you want to develop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Assess Your Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a career assessment if you want personalized recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Start Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Your roadmap is ready! Access curated content and begin your learning journey.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Sign Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Create your account to get started on your learning journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Choose Your Path</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a skill assessment to evaluate your current level or search directly for skills you want to
                    develop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Get Your Personalized Roadmap</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll generate a customized learning path with curated content to help you reach your career goals.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setOpen(false)}>
            {user ? "Continue Learning" : "Get Started"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}