"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CareerCardProps {
  title: string
  description: string
  skills: string[]
  roles: string[]
  isSelected?: boolean
  onNotInterested?: () => void
  onLearnMore?: () => void
  onChoosePath?: () => void
}

export default function CareerCard({
  title,
  description,
  skills,
  roles,
  isSelected = false,
  onNotInterested,
  onLearnMore,
  onChoosePath,
}: CareerCardProps) {
  return (
    <motion.div
      className={`rounded-lg border p-6 ${
        isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Key Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Job Roles:</h4>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {onNotInterested && (
            <Button variant="outline" onClick={onNotInterested}>
              Not Interested
            </Button>
          )}
          {onLearnMore && (
            <Button variant="outline" onClick={onLearnMore}>
              Learn More
            </Button>
          )}
          {onChoosePath && <Button onClick={onChoosePath}>Choose This Path</Button>}
        </div>
      </div>
    </motion.div>
  )
}

