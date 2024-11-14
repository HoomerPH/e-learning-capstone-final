import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | KnowPC",
  description: "Browse our comprehensive computer systems servicing courses.",
};

export default function CoursesLayout({
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