import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data - In a real app, this would come from your backend
const studentData = {
  name: "John Doe",
  email: "john@example.com",
  enrolledCourses: [
    {
      id: "intro",
      title: "Introduction to Computer System Servicing",
      progress: 75,
      lastAccessed: "2024-01-15",
      assessmentScores: {
        pre: 80,
        post: 95
      }
    },
    {
      id: "install",
      title: "Install and Configure Computer Systems",
      progress: 30,
      lastAccessed: "2024-01-10",
      assessmentScores: {
        pre: 65,
        post: null
      }
    }
  ],
  completedCourses: [
    {
      id: "setup",
      title: "Set up Computer Systems",
      completedDate: "2023-12-20",
      assessmentScores: {
        pre: 70,
        post: 90
      }
    }
  ]
};

export default function ProfilePage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{studentData.name}</h1>
              <p className="text-muted-foreground">{studentData.email}</p>
            </div>
          </div>
        </Card>

        {/* Course Progress and Stats */}
        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            {studentData.enrolledCourses.map((course) => (
              <Card key={course.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        <span>Pre-assessment: {course.assessmentScores.pre}%</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>
                      Continue Learning
                    </Link>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {studentData.completedCourses.map((course) => (
              <Card key={course.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>Completed: {new Date(course.completedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/courses/${course.id}`}>
                      Review Course
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-1">Pre-Assessment Score</div>
                    <div className="text-2xl font-bold">{course.assessmentScores.pre}%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-1">Post-Assessment Score</div>
                    <div className="text-2xl font-bold">{course.assessmentScores.post}%</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}