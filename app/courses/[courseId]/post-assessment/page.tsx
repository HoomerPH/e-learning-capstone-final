import { getAllCourseIds, getCourseData } from "@/lib/courses";
import { PostAssessmentClient } from "@/components/post-assessment-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllCourseIds().map((id) => ({
    courseId: id,
  }));
}

export default function PostAssessment({ params }: { params: { courseId: string } }) {
  const courseData = getCourseData(params.courseId);
  if (!courseData) notFound();

  return <PostAssessmentClient courseId={params.courseId} courseTitle={courseData.title} />;
}