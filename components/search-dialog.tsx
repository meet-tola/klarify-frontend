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
  {
    name: "Tech & Programming",
    color: "bg-blue-100",
    skills: [
      "Web Development",
      "Backend Development",
      "Full-Stack Development",
      "Mobile App Development",
      "Game Development",
      "Database Management",
      "Blockchain & Smart Contracts(Web3)",
    ],
  },
  {
    name: "Design & Creative",
    color: "bg-purple-100",
    skills: [
      "UI/UX Design",
      "Graphic Design",
      "Motion Graphics & Animation",
      "3D Modeling & Rendering",
      "Game Art & Concept Design",
      "Branding & Visual Identity",
      "Digital Illustration & Digital Art",
    ],
  },
  {
    name: "Marketing & Business",
    color: "bg-green-100",
    skills: [
      "Digital Marketing",
      "Social Media Management",
      "Influencer Marketing",
      "Copywriting",
      "Affiliate Marketing",
      "Product Management",
      "E-commerce",
    ],
  },
  {
    name: "Content",
    color: "bg-red-100",
    skills: [
      "Content Writing",
      "Technical Writing",
      "Scriptwriting",
      "Copywriting",
      "Social Media Content Creation",
      "UX Writing",
      "Content Strategy",
    ],
  },
  {
    name: "AI & Data Science",
    color: "bg-orange-100",
    skills: [
      "Data Analysis",
      "Machine Learning",
      "Deep Learning",
      "Generative AI & LLMs",
    ],
  },
];

export default function SearchDialog({
  isOpen,
  onClose,
  onSelect,
  userId,
}: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { category: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const router = useRouter();

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

  // Handle suggestion click
  const handleSuggestionClick = async (skills: string[]) => {
    setIsLoading(true);
    setSearchQuery(""); // Clear input

    const allResults: { category: string; description: string }[] = [];

    for (const skill of skills) {
      try {
        const result = await searchSkills(skill);
        allResults.push(...result);
      } catch (error) {
        console.error(`Error fetching skill "${skill}":`, error);
      }
    }

    // Deduplicate by combining category + description
    const uniqueResults = Array.from(
      new Map(
        allResults.map((item) => [`${item.category}-${item.description}`, item])
      ).values()
    );

    setSearchResults(uniqueResults);
    setIsLoading(false);
  };

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
  };

  // Clear search and go back to suggestions
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="z-50 w-full h-[90vh] sm:h-auto max-h-[90vh] sm:max-h-[85vh] max-w-lg bg-background shadow-lg border rounded-lg flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Search for Skill</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search input */}
            <div className="relative p-4 border-b">
              <Search className="absolute left-7 top-7 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Content area - scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Suggestions */}
              <div>
                <h3 className="text-sm font-medium mb-2">Suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion.name}
                      variant="secondary"
                      className={`cursor-pointer ${suggestion.color}`}
                      onClick={() => handleSuggestionClick(suggestion.skills)}
                    >
                      {suggestion.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              <div className="space-y-3 mt-6">
                {(searchResults.length > 0 || searchQuery) && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">
                        {searchQuery
                          ? `Search results for "${searchQuery}"`
                          : "Search Results"}
                      </h3>
                    </div>
                    {searchResults.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {searchResults.length} results
                      </span>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <motion.div
                        key={`${result.category}-${result.description}`}
                        className={`p-4 rounded-lg hover:bg-accent cursor-pointer border ${
                          selectedSkill === result.category
                            ? "bg-accent border-primary/20"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedSkill(result.category)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <h4 className="font-medium">{result.category}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {result.description}
                        </p>
                      </motion.div>
                    ))
                  ) : searchQuery ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try a different search term or browse suggestions
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedSkill || isNextLoading}
              >
                {isNextLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Next
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
