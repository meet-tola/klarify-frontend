"use client"

import { useEffect } from "react"
import DigitalCareerPath from "./digital-career-path"

export default function ScrollTrigger() {
  // This component creates the scrollable space to trigger our animations
  // while keeping the main component fixed

  useEffect(() => {
    // Set the body height to allow scrolling
    document.body.style.height = "300vh"

    return () => {
      document.body.style.height = ""
    }
  }, [])

  return <DigitalCareerPath />
}

