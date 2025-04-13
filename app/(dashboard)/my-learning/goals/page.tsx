"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, Lightbulb, Plus, Target, MoreVertical, Trash2, Edit } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";
import { getUserGoals, deleteGoal, updateGoal } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateGoalDialog } from "@/components/learning/create-goal-dialog";
import { Combobox } from "@/components/ui/combobox";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: {
    current: number;
    target: number;
    completed: boolean;
  };
  startDate: string;
  endDate: string;
  repeat: "daily" | "weekly" | "weekend" | "none";
  skill: string;
}

export default function GoalsPage() {
  const { user } = useAuthContext();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Goal>>({
    title: "",
    description: "",
    skill: "",
    repeat: "none",
  });

  const userId = user?.user._id;

  // Fetch goals from API
  const fetchGoals = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const userGoals = await getUserGoals(userId);
      setGoals(userGoals);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [userId]);

  // Calculate days remaining for a goal
  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  // Handle adding a new goal (callback for dialog)
  const handleGoalCreated = () => {
    fetchGoals();
  };

  // Handle edit goal click
  const handleEditClick = (goal: Goal) => {
    setCurrentGoal(goal);
    setEditFormData({
      title: goal.title,
      description: goal.description,
      skill: goal.skill,
      repeat: goal.repeat,
    });
    setIsEditDialogOpen(true);
  };

  // Handle edit form change
  const handleEditChange = (name: string, value: string) => {
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle edit form submit
  const handleEditSubmit = async () => {
    if (!currentGoal?.id || !editFormData.title) return;

    try {
      await updateGoal(currentGoal.id, {
        title: editFormData.title,
        description: editFormData.description || "",
        skill: editFormData.skill || "",
        repeat: editFormData.repeat || "none",
      });
      setIsEditDialogOpen(false);
      fetchGoals();
    } catch (error) {
      console.error("Failed to update goal:", error);
    }
  };

  // Handle goal deletion
  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  // Get unique skills from user's learning path
  const userSkills = Array.from(
    new Set(
      user?.user?.learningPath?.flatMap((path: any) => path.skill).filter(Boolean) || []
    )
  );

  if (isLoading) {
    return (
      <div className="container max-w-3xl max-h-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Target className="text-primary" />
            My Goals
          </h1>
          <Button disabled>
            <Plus className="mr-2" /> Create Goal
          </Button>
        </div>
        <div className="text-center py-12">
          <p>Loading your goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold roca-bold flex items-center gap-2">
          My Learning Goals
        </h1>
        <Button size={"sm"} onClick={() => setIsCreateDialogOpen(true)}>
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
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} className="mr-2" /> Create Your First Goal
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {goals.map((goal, index) => (
              <Card key={goal.id || index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-lg">{goal.title}</h4>
                      <p className="text-sm text-gray-500">{goal.description}</p>
                    </div>
                    <div className="flex items-center gap-2">

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleEditClick(goal)}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete your goal and all its progress.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => handleDeleteGoal(goal.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Skill:
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {goal.skill}
                        </span>
                      </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>
                        {calculateProgress(goal.progress.current, goal.progress.target)}%
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(goal.progress.current, goal.progress.target)}
                      className="h-2"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs mt-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar size={14} />
                      <span>
                        {new Date(goal.startDate).toLocaleDateString()} -{" "}
                        {new Date(goal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={14} />
                      <span>
                        {calculateDaysRemaining(goal.endDate)} days left
                      </span>
                    </div>
                    {goal.repeat !== "none" && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Bell size={14} />
                        <span>
                          {goal.repeat === "daily" && "Daily"}
                          {goal.repeat === "weekly" && "Weekly"}
                          {goal.repeat === "weekend" && "Weekends"}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target size={20} className="text-primary" />
              Edit Goal
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Goal Title *</Label>
              <Input
                id="edit-title"
                name="title"
                placeholder="Learn JavaScript"
                value={editFormData.title}
                onChange={(e) => handleEditChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                placeholder="Master JavaScript fundamentals and build a project"
                value={editFormData.description}
                onChange={(e) => handleEditChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-skill">Skill *</Label>
              <Combobox
                options={userSkills.map(skill => ({ value: skill, label: skill }))}
                value={editFormData.skill || ""}
                onChange={(value) => handleEditChange("skill", value)}
                placeholder="Select a skill"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-reminder">Reminder Frequency</Label>
              <Select
                value={editFormData.repeat}
                onValueChange={(value) => handleEditChange("repeat", value)}
              >
                <SelectTrigger id="edit-reminder">
                  <SelectValue placeholder="Select reminder frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="weekend">Weekends</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      {/* Create Goal Dialog - Assuming you have this component already */}
      <CreateGoalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onGoalCreated={handleGoalCreated}
      />
    </div>
  );
}