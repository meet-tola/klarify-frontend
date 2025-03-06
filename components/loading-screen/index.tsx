"use client"

import { motion } from "framer-motion"

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({
  message = "Loading...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-background/60 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
