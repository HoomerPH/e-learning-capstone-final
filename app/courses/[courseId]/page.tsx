import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle2, Clock, FileText, Settings, Cpu, Network, Server } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseData, getAllCourseIds } from "@/lib/courses";
import { Metadata } from "next";

const icons = {
  BookOpen,
  Settings,
  Cpu,
  Network,
  Server
};

export async function generateStaticParams() {
  return getAllCourseIds().map((id) => ({
    courseId: id,
  }));
}

export async function generateMetadata({ params }: { params: { courseId: string } }): Promise<Metadata> {
  const course = getCourseData(params.courseId);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} | KnowPC`,
    description: course.description,
  };
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const courseData = getCourseData(params.courseId);
  
  if (!courseData) {
    notFound();
  }

  const CourseIcon = icons[courseData.icon as keyof typeof icons] || BookOpen;

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-lg bg-secondary/10 flex items-center justify-center">
            <CourseIcon className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{courseData.title}</h1>
            <p className="text-muted-foreground">{courseData.description}</p>
          </div>
        </div>

        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <span className="text-sm text-muted-foreground">0% Complete</span>
          </div>
          <Progress value={0} className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{courseData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{courseData.units.length} Units</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>{courseData.units.reduce((acc, unit) => acc + unit.lessons.length, 0)} Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span>2 Assessments</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Pre-Assessment Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Pre-Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Test your current knowledge before starting the course
                </p>
                <Button variant="secondary" asChild>
                  <Link href={`/courses/${params.courseId}/pre-assessment`}>
                    Start Pre-Assessment
                  </Link>
                </Button>
              </div>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          {/* Course Units */}
          {courseData.units.map((unit, index) => (
            <Card key={unit.id} className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Unit {index + 1}: {unit.title}</h3>
                <p className="text-muted-foreground mt-2">{unit.description}</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                {unit.lessons.map((lesson) => {
                  const LessonIcon = icons[lesson.icon as keyof typeof icons] || BookOpen;
                  return (
                    <div key={lesson.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <LessonIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>{lesson.title}</span>
                      </div>
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/courses/${params.courseId}/${unit.id}/${lesson.id}`}>
                          Start Lesson
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}

          {/* Post-Assessment Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Post-Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Complete the course assessment to test your knowledge
                </p>
                <Button variant="secondary" asChild>
                  <Link href={`/courses/${params.courseId}/post-assessment`}>
                    Take Post-Assessment
                  </Link>
                </Button>
              </div>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}