"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  level: string;
  lessons: number;
  progress: number;
}

interface YourCoursesProps {
  previousCourses: Course[];
  isLoading: boolean; // Add a loading state
}

export default function YourCourses({ previousCourses, isLoading }: YourCoursesProps) {
  return (
    <div className="space-y-4 pb-8"> {/* Add bottom spacing with pb-8 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">Your Courses</h2>
        <div className="relative w-full md:w-auto bg-white">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search your courses..." className="pl-10 w-full md:w-[300px]" />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Courses State */}
      {!isLoading && previousCourses.length === 0 && (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">No courses yet. Start learning to see your progress here!</p>
        </div>
      )}

      {/* Courses List */}
      {!isLoading && previousCourses.length > 0 && (
        <div className="space-y-4">
          {previousCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg p-6 shadow-sm border relative group">
              <Link
                href={`/courses/${course.id}`}
                className="block absolute inset-0 z-10"
                aria-label={`View ${course.title} course`}
              >
                <span className="sr-only">Go to course</span>
              </Link>

              <div className="text-sm text-blue-500">{course.level}</div>
              <h3 className="text-xl font-semibold mt-1 mb-2">{course.title}</h3>

              <div className="flex items-center justify-between relative z-20 pointer-events-none">
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {course.lessons} lessons
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="text-sm">{course.progress}%</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-30 pointer-events-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Learning</DropdownMenuItem>
                    <DropdownMenuItem>Change to Current Learning</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}