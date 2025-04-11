"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Briefcase, GraduationCap, Plus, X, ChevronRight } from "lucide-react"

export default function ProfilePage() {
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "Python", "SQL", "Project Management"])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight roca-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and career details</p>
      </div>

      <Tabs defaultValue="personal-info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="career">Skills & Career</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info" className="space-y-6">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardHeader className="bg-muted/40 pb-4">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <div className="flex flex-col items-center justify-start gap-4">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload photo
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="I'm a software developer looking to transition into product management."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardHeader className="bg-muted/40 pb-4">
              <CardTitle>Skills</CardTitle>
              <CardDescription>Showcase your professional skills and expertise</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1.5">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    className="max-w-xs"
                  />
                  <Button onClick={addSkill} size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add skill</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-sm">
            <CardHeader className="bg-muted/40 pb-4">
              <CardTitle>Education & Experience</CardTitle>
              <CardDescription>Your educational background and work experience</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Education</h3>

                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                          <p className="text-sm text-muted-foreground">University of Technology, 2015-2019</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Work Experience</h3>

                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Senior Software Developer</h4>
                          <p className="text-sm text-muted-foreground">TechCorp Inc., 2019-Present</p>
                          <p className="mt-1 text-sm">
                            Leading development of web applications and mentoring junior developers.
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Career Goals</h3>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="target-role">Target Role</Label>
                        <Input id="target-role" defaultValue="Product Manager" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input id="timeline" defaultValue="2-3 years" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="career-notes">Notes</Label>
                      <Textarea
                        id="career-notes"
                        defaultValue="I want to transition from development to product management while leveraging my technical background."
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
