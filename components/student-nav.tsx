"use client";

import { NavLink } from "@/components/nav-link";
import { BookOpen, GraduationCap, BarChart2, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { useAuth } from "./auth-provider";

export function StudentNav() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/sign-in');
  };

  return (
    <aside className="w-64 border-r bg-muted/30 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="h-6 w-6 text-primary" />
          <div>
            <span className="font-bold text-lg">Student</span>
            <p className="text-sm text-muted-foreground">{user?.user_metadata?.name}</p>
          </div>
        </div>
        <nav className="space-y-2">
          <NavLink href="/student">
            <BarChart2 className="h-4 w-4 mr-2" />
            Dashboard
          </NavLink>
          <NavLink href="/student/courses">
            <BookOpen className="h-4 w-4 mr-2" />
            My Courses
          </NavLink>
          <NavLink href="/student/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </NavLink>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-100/10 rounded-md"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}