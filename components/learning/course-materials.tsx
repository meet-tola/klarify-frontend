"use client";

import { ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseMaterialsProps {
  learningPath: {
    youtubeVideos: {
      title: string;
      url: string;
      thumbnail: string;
    }[];
    articles: {
      title: string;
      url: string;
      author: string;
    }[];
    projects: {
      name: string;
      description: string;
      features: string[];
    }[];
  };
}

export default function CourseMaterials({ learningPath }: CourseMaterialsProps) {
  return (
    <div className="py-6 space-y-10">
      {/* Videos Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPath.youtubeVideos.map((video, index) => (
            <a
              key={index}
              href={video.url}
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
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Articles</h2>
        <div className="space-y-4">
          {learningPath.articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
            >
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{article.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{article.author}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPath.projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <ul className="list-disc pl-6 text-sm text-muted-foreground">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}