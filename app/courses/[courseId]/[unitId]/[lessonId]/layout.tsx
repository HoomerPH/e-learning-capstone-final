import { Metadata } from "next";
import { getCourseData } from "@/lib/courses";

export async function generateMetadata({ 
  params 
}: { 
  params: { courseId: string; unitId: string; lessonId: string } 
}): Promise<Metadata> {
  const course = getCourseData(params.courseId);
  if (!course) return { title: 'Lesson Not Found' };

  const unit = course.units.find(u => u.id === params.unitId);
  if (!unit) return { title: 'Lesson Not Found' };

  const lesson = unit.lessons.find(l => l.id === params.lessonId);
  if (!lesson) return { title: 'Lesson Not Found' };

  return {
    title: `${lesson.title} | ${course.title} | KnowPC`,
    description: `Learn about ${lesson.title} in the ${course.title} course on KnowPC.`,
  };
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  );
}