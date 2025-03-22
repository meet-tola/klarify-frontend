"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/context/auth-provider"
import { useParams, useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import { slugify } from "@/lib/slugify"
import { getRoadmapContent } from "@/lib/api"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getLevelColor } from "@/lib/get-level-color"

export default function PathPage() {
  const { user, loading } = useAuthContext()
    const { slug } = useParams();
    const router = useRouter();
  const [roadmap, setRoadmap] = useState<any>(null)
  const [learningPath, setLearningPath] = useState<any>(null)
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "Improve learn on designing skills",
      description: "Need to improve on my new designing skills",
      deadline: "Tomorrow",
      completed: false,
    },
    {
      id: 2,
      title: "Participate in design workshops",
      description: "Looking for workshops to enhance my skills",
      deadline: "Next week",
      completed: false,
    },
    {
      id: 3,
      title: "Practice daily with design tools",
      description: "Need to dedicate time for tool proficiency",
      deadline: "Every evening",
      completed: false,
    },
  ])


  useEffect(() => {
    if (user && slugify(user.user.pickedSkill) !== slug) {
      router.push("/my-learning");
    }

    const fetchRoadmapContent = async () => {
      if (user?.user?.pickedSkill) {
        try {
          const data = await getRoadmapContent(user.user._id, user.user.pickedSkill)

          if (data.learningPath.skill === user.user.pickedSkill) {
            const learningPathData = data.learningPath
            const roadmapData = data.roadmap

            setLearningPath(learningPathData)
            setRoadmap(roadmapData)
          }
        } catch (error) {
          console.error("Failed to fetch learning path:", error)
        }
      }
    }

    fetchRoadmapContent()
  }, [user, loading, slug, router]);

  if (!user || slugify(user.user.pickedSkill) !== slug) {
    return null;
  }

  if (loading) {
    return <LoadingScreen message={"Loading..."} />
  }

  const toggleTodoCompletion = (id: number) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <div className="container py-10 max-w-7xl">
      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column (2/3 width) */}
        <div className="md:col-span-2 space-y-8">
          {/* Continue Learning Section */}
          <section>
            <h1 className="text-3xl font-bold roca-bold mb-2">Continue Learning</h1>
            <p className="text-muted-foreground mb-6">Resume where you left off in your learning path.</p>

            <div className="bg-white rounded-lg border px-6 py-4">
            <div className="h-full flex flex-col">
              <p
                className={`text-sm font-medium ${getLevelColor(
                  roadmap?.level
                )} py-1`}
              >
                {roadmap?.level}
              </p>
              <h3 className="text-xl font-semibold mb-auto">
                {user?.user.pickedSkill}
              </h3>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="text-gray-600">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-100" />
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/my-learning/${slugify(
                      user?.user.pickedSkill
                    )}/content`}
                  >
                    <Button variant="outline">Continue</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </section>

          {/* Materials/Guides Section */}
          <section>
            <h2 className="text-2xl font-bold roca-bold mb-6">Materials/Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* View Roadmap Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex gap-2 items-center">
                    <CardTitle className="text-lg">View your roadmap</CardTitle>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learning to code can be overwhelming, here are some tips to help you get started.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/roadmap" className="flex items-center justify-between text-sm font-medium text-primary">
                    <span>View roadmap</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              {/* View Projects Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">View Projects</CardTitle>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learning to code can be overwhelming, here are some tips to help you get started.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/projects" className="flex items-center text-sm font-medium text-primary">
                    View all projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
        </div>

        {/* Right column (1/3 width) - To Do List */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>To Do List</CardTitle>
                <Info className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center border rounded-md p-2 mb-6">
                <span className="text-muted-foreground text-sm">+ Add new task to do...</span>
              </div>

              <div className="space-y-4">
                {todoItems.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id={`todo-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={() => toggleTodoCompletion(item.id)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <label
                          htmlFor={`todo-${item.id}`}
                          className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item.title}
                        </label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center text-xs text-red-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.deadline}
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

