"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Clock, Lightbulb, Plus, Target } from "lucide-react"
import { CreateGoalDialog } from "@/components/learning/create-goal-dialog"

// Define the Goal type
interface Goal {
  id: string
  title: string
  description: string
  progress: number
  startDate: string
  endDate: string
  reminder: string
  category: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem("goals")
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  // Calculate days remaining for a goal
  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Handle adding a new goal
  const handleAddGoal = (newGoal: Goal) => {
    const updatedGoals = [...goals, newGoal]
    setGoals(updatedGoals)
    localStorage.setItem("goals", JSON.stringify(updatedGoals))
    setIsDialogOpen(false)
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target className="text-primary" />
          My Learning Goals
        </h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus size={16} className="mr-2" /> Create Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <Target size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No Goals Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Set learning goals to track your progress and maintain your motivation.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus size={16} className="mr-2" /> Create Your First Goal
          </Button>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {goals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.description}</p>
                  </div>
                  <Badge variant={goal.progress === 100 ? "default" : "secondary"} className="ml-2">
                    {goal.category}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-4 text-xs mt-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar size={14} />
                    <span>
                      {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock size={14} />
                    <span>{calculateDaysRemaining(goal.endDate)} days left</span>
                  </div>
                  {goal.reminder && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Bell size={14} />
                      <span>{goal.reminder}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
        <h3 className="flex items-center gap-2 font-medium text-amber-800 mb-2">
          <Lightbulb size={18} className="text-amber-600" />
          Tips for Effective Goal Setting
        </h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• Be specific about what you want to achieve</li>
          <li>• Set measurable goals so you can track progress</li>
          <li>• Make your goals achievable but challenging</li>
          <li>• Set realistic timeframes to maintain motivation</li>
          <li>• Break large goals into smaller milestones</li>
        </ul>
      </div>

      {/* Create Goal Dialog */}
      <CreateGoalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onGoalCreated={handleAddGoal} />
    </div>
  )
}

