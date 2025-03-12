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
import SearchDialog from "@/components/search-dialog"; // Import the SearchDialog component

interface JourneyDialogProps {
  open: boolean;
  onClose: () => void;
  userId?: string; // Add userId as an optional prop
}

export default function JourneyDialog({ open, onClose, userId }: JourneyDialogProps) {
  const router = useRouter();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false); // State for SearchDialog visibility

  return (
    <>
      {/* Main Journey Dialog */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold roca-bold text-xl md:text-2xl mb-2 md:mb-4 mt-2 text-center">
              Start your journey
            </DialogTitle>

            <DialogDescription className="flex flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  onClose();
                  router.push("/onboarding?step=one");
                }}
              >
                Start a Career Test
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  onClose();
                  setIsSearchDialogOpen(true);
                }}
              >
                Search for a skill
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)} // Close SearchDialog
        onSelect={(skill) => {
          setIsSearchDialogOpen(false); // Close SearchDialog after selection
          // Add logic to handle the selected skill (e.g., save it to the user's profile)
        }}
        userId={userId} // Pass userId to SearchDialog
      />
    </>
  );
}