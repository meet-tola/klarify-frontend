import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Clock, Trophy, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface LearningReminderDialogProps {
  title: string;
  description: string;
  progress: number;
  daysRemaining: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTimeLeft: string;
  skill?: string;
  onDismiss: () => void;
}

export default function LearningReminderDialog({
  title,
  description,
  progress,
  daysRemaining,
  totalLessons,
  completedLessons,
  estimatedTimeLeft,
  skill,
  onDismiss,
}: LearningReminderDialogProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg relative">
      {/* Close button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>{estimatedTimeLeft} left</span>
              </div>
              {skill && (
                <Badge variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              )}
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>
              {completedLessons} of {totalLessons} lessons completed
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between p-3 rounded-lg",
            daysRemaining <= 3 ? "bg-amber-100/50" : "bg-muted/50"
          )}
        >
          <div className="flex items-center">
            <Calendar
              className={cn(
                "w-5 h-5 mr-2",
                daysRemaining <= 3 ? "text-amber-600" : "text-amber-500"
              )}
            />
            <div>
              <p className="text-sm font-medium">
                {daysRemaining <= 3 ? "Urgent!" : "Time is running out!"}
              </p>
              <p className="text-xs text-muted-foreground">
                {daysRemaining <= 3
                  ? "Complete before deadline"
                  : "Complete your course soon"}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "font-bold text-lg",
              daysRemaining <= 3 ? "text-amber-600" : "text-amber-500"
            )}
          >
            {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
          </div>
        </div>

        {progress >= 50 && (
          <div className="flex items-center p-3 bg-primary/10 rounded-lg">
            <Trophy className="w-5 h-5 mr-2 text-primary" />
            <div className="text-sm">
              <p className="font-medium">You're making great progress!</p>
              <p className="text-xs text-muted-foreground">
                {progress >= 80
                  ? "Almost there! Keep pushing!"
                  : "Keep going to earn your certificate"}
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1">Continue Learning</Button>
        <Button variant="outline" className="flex-1" onClick={onDismiss}>
          {daysRemaining <= 3 ? "I'll hurry" : "Remind Me Later"}
        </Button>
      </CardFooter>
    </Card>
  );
}
