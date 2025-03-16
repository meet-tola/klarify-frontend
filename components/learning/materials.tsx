"use client"

import { useState } from "react"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Material {
  title: string
  platform?: string
  duration?: string
  link: string
  thumbnail?: string
  source?: string
  readTime?: string
  type?: string
  description?: string
}

interface MaterialsProps {
  videos: Material[]
  articles: Material[]
  resources: Material[]
  isOpen: boolean
  onClose: () => void
}

export function Materials({ videos, articles, resources, isOpen, onClose }: MaterialsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lesson Materials</DialogTitle>
        </DialogHeader>

        {/* Videos Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <a
                key={index}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border hover:border-primary transition-colors"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.platform}</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Articles</h2>
          <div className="space-y-4">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{article.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-lg border hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{resource.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center text-sm text-primary">
                  <span>Download</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}