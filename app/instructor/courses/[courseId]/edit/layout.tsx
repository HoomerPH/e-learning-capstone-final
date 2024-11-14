import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Course | KnowPC Instructor",
  description: "Edit course details and content.",
};

export default function EditCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}