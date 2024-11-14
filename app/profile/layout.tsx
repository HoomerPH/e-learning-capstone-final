import { Metadata } from "next";
import { AuthGuard } from "@/components/auth-guard";

export const metadata: Metadata = {
  title: "Profile | KnowPC",
  description: "View your learning progress and course achievements.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </AuthGuard>
  );
}