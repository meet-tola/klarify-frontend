"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TipDropdown } from "./tip-dropdown"

export function QuickGuidesSection({ learningPath }: { learningPath: any }) {
  const isLoading = !learningPath

  return (
    <section>
      <h2 className="text-2xl font-bold roca-bold mb-6">Quick Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {isLoading ? (
            // YouTube video skeleton
            <div className="p-6 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-2 w-full max-w-[70%]">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          ) : (
            learningPath?.youtubeVideos?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{learningPath.youtubeVideos[0].title}</h3>
                    <p className="text-gray-600">YouTube Video</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(learningPath.youtubeVideos[0].url, "_blank")}
                  >
                    View
                  </Button>
                </div>
              </div>
            )
          )}

          {isLoading ? (
            // Article skeleton
            <div className="p-6 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-2 w-full max-w-[70%]">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          ) : (
            learningPath?.articles?.[0] && (
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{learningPath.articles[0].title}</h3>
                    <p className="text-gray-600">Article by {learningPath.articles[0].author}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(learningPath.articles[0].url, "_blank")}
                  >
                    View
                  </Button>
                </div>
              </div>
            )
          )}
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">
              Tips for {isLoading ? "Beginners" : learningPath?.level || "Beginners"}
            </h3>
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent side="top" className="p-2 text-sm text-center">
                <p>Helpful tips for getting started</p>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-gray-600 mb-6">Here are some tips tailored for your current level:</p>

          {isLoading ? (
            // Tips skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {learningPath?.tips?.map((tip: any, index: number) => (
                <TipDropdown
                  key={index}
                  title={tip.title.replace(/^Tips:\s*/, "")}
                  content={tip.content}
                  defaultOpen={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
