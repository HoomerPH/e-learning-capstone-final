import { InstructorNav } from "@/components/instructor-nav";
import { AuthGuard } from "@/components/auth-guard";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="instructor">
      <div className="flex min-h-screen">
        <InstructorNav />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </AuthGuard>
  );
}