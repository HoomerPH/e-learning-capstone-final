import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllCourseIds, getCourseData } from "@/lib/courses";

export async function generateStaticParams() {
  const paths: { courseId: string; unitId: string; lessonId: string }[] = [];
  
  getAllCourseIds().forEach((courseId) => {
    const course = getCourseData(courseId);
    if (!course) return;

    course.units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        paths.push({
          courseId,
          unitId: unit.id,
          lessonId: lesson.id,
        });
      });
    });
  });

  return paths;
}

interface LessonPageProps {
  params: {
    courseId: string;
    unitId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const course = getCourseData(params.courseId);
  if (!course) notFound();

  const unit = course.units.find((u) => u.id === params.unitId);
  if (!unit) notFound();

  const lesson = unit.lessons.find((l) => l.id === params.lessonId);
  if (!lesson) notFound();

  // Find current lesson index and calculate next/previous lessons
  const currentUnitIndex = course.units.findIndex((u) => u.id === params.unitId);
  const currentLessonIndex = unit.lessons.findIndex((l) => l.id === params.lessonId);

  let nextLesson: { unitId: string; lessonId: string } | null = null;
  let previousLesson: { unitId: string; lessonId: string } | null = null;

  // Calculate previous lesson
  if (currentLessonIndex > 0) {
    previousLesson = {
      unitId: unit.id,
      lessonId: unit.lessons[currentLessonIndex - 1].id,
    };
  } else if (currentUnitIndex > 0) {
    const prevUnit = course.units[currentUnitIndex - 1];
    previousLesson = {
      unitId: prevUnit.id,
      lessonId: prevUnit.lessons[prevUnit.lessons.length - 1].id,
    };
  }

  // Calculate next lesson
  if (currentLessonIndex < unit.lessons.length - 1) {
    nextLesson = {
      unitId: unit.id,
      lessonId: unit.lessons[currentLessonIndex + 1].id,
    };
  } else if (currentUnitIndex < course.units.length - 1) {
    const nextUnit = course.units[currentUnitIndex + 1];
    nextLesson = {
      unitId: nextUnit.id,
      lessonId: nextUnit.lessons[0].id,
    };
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/courses/${params.courseId}`}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Unit {currentUnitIndex + 1}: {unit.title}
            </h4>
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
              {lesson.content}
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-8 border-t">
            {previousLesson ? (
              <Button
                variant="outline"
                asChild
              >
                <Link
                  href={`/courses/${params.courseId}/${previousLesson.unitId}/${previousLesson.lessonId}`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            {nextLesson ? (
              <Button
                asChild
              >
                <Link
                  href={`/courses/${params.courseId}/${nextLesson.unitId}/${nextLesson.lessonId}`}
                >
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
              >
                <Link href={`/courses/${params.courseId}/post-assessment`}>
                  Take Post-Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}