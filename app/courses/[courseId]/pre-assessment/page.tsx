import { getAllCourseIds, getCourseData } from "@/lib/courses";
import { PreAssessmentClient } from "@/components/pre-assessment-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllCourseIds().map((id) => ({
    courseId: id,
  }));
}

export default function PreAssessment({ params }: { params: { courseId: string } }) {
  const courseData = getCourseData(params.courseId);
  if (!courseData) notFound();

  return <PreAssessmentClient courseId={params.courseId} courseTitle={courseData.title} />;
}