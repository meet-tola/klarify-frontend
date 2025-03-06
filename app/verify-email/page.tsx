"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, RefreshCcw } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"
import Navbar from "@/components/onboarding-navbar"
import { useAuthStore } from "@/lib/auth"
import { verificationSchema } from "@/validation/auth.validation"

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/"
    }
  }, [isLoggedIn])

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newVerificationCode = [...verificationCode]
    // Take only the last character if multiple are pasted
    newVerificationCode[index] = value.slice(-1)
    setVerificationCode(newVerificationCode)

    // If value is entered and not the last input, move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key down events
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and current input is empty, move to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // If left arrow is pressed, move to previous input
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // If right arrow is pressed, move to next input
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // If pasted data is not a number, return
    if (!/^\d+$/.test(pastedData)) return

    // Fill the inputs with the pasted data
    const newVerificationCode = [...verificationCode]
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newVerificationCode[i] = pastedData[i]
    }
    setVerificationCode(newVerificationCode)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newVerificationCode.findIndex((val) => !val)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  // Handle verification
  const handleVerify = () => {
    const code = verificationCode.join("")

    try {
      // Validate the verification code
      verificationSchema.parse({ code })

      setIsVerifying(true)
      setError("")

      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false)
        setIsVerified(true)

        // Redirect to onboarding after successful verification
        setTimeout(() => {
          setIsRedirecting(true)
        }, 1500)
      }, 1500)
    } catch (error: any) {
      if (error.errors?.[0]?.message) {
        setError(error.errors[0].message)
      } else {
        setError("Please enter a valid 6-digit code")
      }
    }
  }

  // Handle resend code
  const handleResend = () => {
    // Simulate resending code
    setVerificationCode(Array(6).fill(""))
    inputRefs.current[0]?.focus()

    // Show toast or notification here
  }

  if (isRedirecting) {
    return (
      <LoadingScreen
        message="Preparing your onboarding..."
        onComplete={() => (window.location.href = "/onboarding?step=one")}
      />
    )
  }

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  // Input animation
  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Success animation
  const successVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center">
            <motion.h1
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Verify Your Email
            </motion.h1>
            <motion.p
              className="mt-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We've sent a 6-digit verification code to {user?.email || "your email"}. Enter the code below to confirm
              your email address.
            </motion.p>
          </div>

          {!isVerified ? (
            <div className="space-y-6">
              <motion.div className="flex justify-center gap-2 sm:gap-4" variants={containerVariants}>
                {verificationCode.map((digit, index) => (
                  <motion.div key={index} variants={inputVariants}>
                    <input
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-16 sm:w-14 sm:h-20 text-center text-2xl font-bold border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      autoFocus={index === 0}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {error && (
                <motion.p
                  className="text-destructive text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button onClick={handleVerify} disabled={isVerifying} className="w-full relative">
                  {isVerifying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RefreshCcw className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    <button onClick={handleResend} className="text-primary hover:underline">
                      Resend
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-8"
              initial="hidden"
              animate="visible"
              variants={successVariants}
            >
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center">Email Verified!</h2>
              <p className="text-muted-foreground text-center mt-2">
                Your email has been successfully verified. Redirecting to onboarding...
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

