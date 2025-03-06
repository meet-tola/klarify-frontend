"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JourneyDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function JourneyDialog({ open, onClose }: JourneyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold roca-bold">How would you want to start your journey?</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 mt-4">
            <Button className="w-full">Start a Career Test</Button>
            <Button variant="outline" className="w-full">
              Search for a skill
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
