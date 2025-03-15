"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { searchSkills, selectSkillFromSearch } from "@/lib/api"; 

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (skill: string) => void;
  userId?: string;
}

const suggestions = [
  { category: "Tech & Programming", color: "bg-blue-100" },
  { category: "Design & UX", color: "bg-purple-100" },
  { category: "Marketing & SEO", color: "bg-green-100" },
  { category: "AI & Data Science", color: "bg-orange-100" },
];

export default function SearchDialog({ isOpen, onClose, onSelect, userId }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ category: string; description: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null); 
  const [isNextLoading, setIsNextLoading] = useState(false); 
  const router = useRouter();

  // useEffect(() => {
  //   if (isOpen) {
  //     router.push("/roadmap?search"); // Update URL to /roadmap?search
  //   }
  // }, [isOpen, router]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      searchSkills(searchQuery)
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchQuery, isOpen]);

  // Handle "Next" button click
  const handleNext = async () => {
    if (!selectedSkill || !userId) {
      return;
    }

    setIsNextLoading(true);

    try {      
      await selectSkillFromSearch(userId, selectedSkill);

      router.push("/roadmap");
    } catch (error) {
      console.error("Error selecting skill:", error);
    } finally {
      setIsNextLoading(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    onClose(); 
    router.push("/roadmap"); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="z-50 w-full max-w-lg bg-background p-6 shadow-lg border rounded-lg"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Search for Skill</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion.category}
                      variant="secondary"
                      className={`cursor-pointer ${suggestion.color}`}
                      onClick={() => setSearchQuery(suggestion.category)}
                    >
                      {suggestion.category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Search Results</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-6">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <motion.div
                        key={result.category}
                        className={`p-3 rounded-lg hover:bg-accent cursor-pointer ${
                          selectedSkill === result.category ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedSkill(result.category)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h4 className="font-medium">{result.category}</h4>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground">No results found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedSkill || isNextLoading} 
              >
                {isNextLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}