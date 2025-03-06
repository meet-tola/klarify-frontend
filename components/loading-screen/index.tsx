"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  message?: string
  duration?: number
  onComplete?: () => void
  showProgressBar?: boolean
}

export default function LoadingScreen({
  message = "Loading...",
  duration = 2000,
  onComplete,
  showProgressBar = true,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          if (onComplete) {
            setTimeout(onComplete, 300) // Small delay after reaching 100%
          }
          return 100
        }
        return prev + 2
      })
    }, duration / 50) // Divide duration into 50 steps

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 relative mb-4 mx-auto">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
              <path
                d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center">{message}</h2>
        </motion.div>

        {showProgressBar && (
          <div className="w-full max-w-xs">
            <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground text-center">{Math.round(progress)}%</div>
          </div>
        )}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="mt-8"
        >
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
        </motion.div>
      </div>
    </div>
  )
}

