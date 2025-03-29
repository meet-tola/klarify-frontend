"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchDialog from "@/components/search-dialog";

interface JourneyDialogProps {
  open: boolean;
  onClose: () => void;
  userId?: string;
  title?: string;
  description?: string; 
  onStartCareerTest?: () => void; 
  onSelectSkill?: () => void; 
}

export default function JourneyDialog({
  open,
  onClose,
  userId,
  title = "Start your journey",
  description = "Take the first step in shaping your career path. You can start with a skill assesment test or explore skills that interest you.",
  onStartCareerTest,
  onSelectSkill,
}: JourneyDialogProps) {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Main Journey Dialog */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold roca-bold text-xl md:text-2xl mt-2 text-center">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600 mb-4">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => {
                onClose();
                onStartCareerTest?.(); 
                router.push("/onboarding?step=one");
              }}
            >
              Start a skill assesment Test
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onClose();
                onSelectSkill?.(); 
                setIsSearchDialogOpen(true);
              }}
            >
              Search for a skill
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
        onSelect={(skill) => {
          setIsSearchDialogOpen(false);
        }}
        userId={userId}
      />
    </>
  );
}
