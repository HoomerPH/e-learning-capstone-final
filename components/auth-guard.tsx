"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import { routes } from "@/lib/routes";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "instructor" | "student";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(routes.auth.signIn);
        return;
      }

      const userRole = user.user_metadata?.role;

      if (requiredRole && userRole !== requiredRole) {
        if (userRole === 'instructor') {
          router.push(routes.instructor.dashboard);
        } else if (userRole === 'student') {
          router.push(routes.student.dashboard);
        } else {
          router.push(routes.public.home);
        }
        return;
      }
    }
  }, [user, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}