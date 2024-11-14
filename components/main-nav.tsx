"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MonitorSmartphone } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { usePathname } from "next/navigation";

export function MainNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Don't show nav on auth pages, instructor dashboard, and student dashboard
  if (pathname.startsWith('/auth') || 
      pathname.startsWith('/instructor') || 
      pathname.startsWith('/student')) {
    return null;
  }

  return (
    <header className="border-b border-border">
      <nav className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MonitorSmartphone className="h-6 w-6 text-secondary" />
          <span className="text-xl font-bold">KnowPC</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/courses">Courses</Link>
          </Button>
          {user ? (
            <>
              {user.user_metadata?.role === 'instructor' ? (
                <Button variant="secondary" asChild>
                  <Link href="/instructor">Dashboard</Link>
                </Button>
              ) : (
                <Button variant="secondary" asChild>
                  <Link href="/student">Dashboard</Link>
                </Button>
              )}
            </>
          ) : (
            <Button variant="secondary" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}