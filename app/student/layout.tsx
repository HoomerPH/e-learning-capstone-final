import { StudentNav } from "@/components/student-nav";
import { AuthGuard } from "@/components/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard | KnowPC",
  description: "Track your learning progress and manage your courses",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="student">
      <div className="flex min-h-screen">
        <StudentNav />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </AuthGuard>
  );
}