"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Target } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useAuthContext } from "@/context/auth-provider";
import { createGoal } from "@/lib/api";
import { Combobox } from "../ui/combobox";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  reminder: "daily" | "weekly" | "weekend" | "none";
  skill: string;
}

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalCreated: () => void; // Changed to callback without parameters
}

export function CreateGoalDialog({
  open,
  onOpenChange,
  onGoalCreated,
}: CreateGoalDialogProps) {
  const { user } = useAuthContext();
  const [goal, setGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    progress: 0,
    skill: "",
    reminder: "daily",
  });
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique skills from user's learning path
  const userSkills = Array.from(
    new Set(
      user?.user?.learningPath?.flatMap((path: any) => path.skill).filter(Boolean) || []
    )
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!goal.title || !startDate || !endDate || !goal.skill) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await createGoal(user?.user._id || "", {
        title: goal.title,
        description: goal.description || "",
        skill: goal.skill,
        startDate: startDate,
        endDate: endDate,
        repeat: goal.reminder || "none",
        reminders: {
          email: true,
          inApp: true,
        },
        target: 100, // Default target for progress
      });

      // Reset form
      setGoal({
        title: "",
        description: "",
        progress: 0,
        skill: "",
        reminder: "daily",
      });
      setStartDate(new Date());
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 30)));
      
      // Notify parent to refresh goals
      onGoalCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target size={20} className="text-primary" />
            Create New Goal
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Learn JavaScript"
                value={goal.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Master JavaScript fundamentals and build a project"
                value={goal.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill">Skill *</Label>
              <Combobox
                options={userSkills.map(skill => ({ value: skill, label: skill }))}
                value={goal.skill || ""}
                onChange={(value) => handleSelectChange("skill", value)}
                placeholder="Select a skill"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder">Reminder Frequency</Label>
              <Select
                value={goal.reminder}
                onValueChange={(value) => handleSelectChange("reminder", value)}
              >
                <SelectTrigger id="reminder">
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
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}