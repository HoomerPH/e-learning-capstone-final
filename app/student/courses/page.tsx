import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Trophy } from "lucide-react";
import Link from "next/link";

export default function StudentCourses() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>

        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="browse">Browse</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            {[
              {
                title: "Introduction to Computer System Servicing",
                progress: 75,
                lastAccessed: "2 hours ago",
                totalLessons: 12,
                completedLessons: 9
              },
              {
                title: "Install and Configure Computer Systems",
                progress: 30,
                lastAccessed: "1 day ago",
                totalLessons: 8,
                completedLessons: 2
              }
            ].map((course, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-6">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>Last accessed {course.lastAccessed}</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button asChild>
                      <Link href={`/courses/course-${index + 1}`}>Continue Course</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card key="completed-1" className="p-6">
              <div className="flex items-start gap-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Set up Computer Systems</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>Completed on March 15, 2024</span>
                    <span>15/15 lessons</span>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/courses/setup">Review Course</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/courses/setup/certificate">View Certificate</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid gap-6">
              {[
                {
                  title: "Maintain Computer Systems and Networks",
                  description: "Learn essential maintenance procedures for computer systems and networks.",
                  duration: "4 weeks",
                  lessons: 10
                },
                {
                  title: "Set up Computer Servers",
                  description: "Master server installation and configuration techniques.",
                  duration: "4 weeks",
                  lessons: 12
                }
              ].map((course, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/courses/course-${index + 1}`}>Enroll Now</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}