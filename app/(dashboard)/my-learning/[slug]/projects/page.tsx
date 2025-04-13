"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/auth-provider";
import { slugify } from "@/lib/slugify";
import { useParams, useRouter } from "next/navigation";
import { getRoadmapContent } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface Project {
  name: string;
  description: string;
  features: string[];
}

export default function Page() {
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

            if (data.learningPath.skill === user.user.pickedSkill) {
              setLearningPath(data.learningPath);
            } else {
              console.error("Skill mismatch");
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
          Projects
        </h1>
        <p className="text-muted-foreground">
          View your learning projects and their details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {learningPath?.projects?.map((project: Project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            features={project.features}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  name: string;
  description: string;
  features: string[];
}

function ProjectCard({ name, description, features }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Features:</h3>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-sm">•</span>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
