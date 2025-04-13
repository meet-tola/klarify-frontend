"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-provider";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Play } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { getRoadmapContent } from "@/lib/api";
import Link from "next/link";

export default function ResourcesPage() {
  const [learningPath, setLearningPath] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && slugify(user.user.pickedSkill) !== slug) {
      router.push("/my-learning");
    }
  }, [user, slug]);

  useEffect(() => {
    const fetchLearningPath = async () => {
      if (user) {
        try {
          if (user?.user?.pickedSkill) {
            const data = await getRoadmapContent(
              user.user._id,
              user.user.pickedSkill
            );

            // Check if data.learningPath.skill matches user.user.pickedSkill
            if (data.learningPath.skill === user.user.pickedSkill) {
              const learningPathData = data.learningPath;

              setLearningPath(learningPathData);
            } else {
              console.error(
                "Skill mismatch: Learning path skill does not match user's picked skill"
              );
            }
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLearningPath();
  }, [user]);

  return (
    <div className="space-y-6 px-4 md:px-20 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight roca-bold">
          Learning Resources
        </h1>
        <p className="text-muted-foreground">
          Access videos and articles to help with your learning journey.
        </p>
      </div>

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningPath?.youtubeVideos?.map((video: any) => (
              <VideoCard
                key={video.url}
                title={video.title}
                thumbnail={video.thumbnail}
                url={video.url}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningPath?.articles?.map((article: any) => (
              <ArticleCard
                key={article.url}
                title={article.title}
                description={`By ${article.author}`}
                url={article.url}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface VideoCardProps {
  title: string;
  thumbnail: string;
  url: string;
}

function VideoCard({ title, thumbnail, url }: VideoCardProps) {
  return (
    <Card className="group block overflow-hidden border transition-colors">
      <Link className="relative" href={url} target="_blank">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-12 w-12 text-white" />
        </div>
      </Link>
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <Link href={url} target="_blank">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Watch
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
}

function ArticleCard({ title, description, url }: ArticleCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground mb-2">
          {description}
        </p>
        <Link href={url} target="_blank">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Read Article
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
