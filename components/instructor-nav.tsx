"use client";

import { NavLink } from "@/components/nav-link";
import { BookOpen, BarChart, Settings, Users, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export function InstructorNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/sign-in');
  };

  return (
    <aside className="w-64 border-r bg-muted/30 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Instructor</span>
        </div>
        <nav className="space-y-2">
          <NavLink href="/instructor">
            <BookOpen className="h-4 w-4 mr-2" />
            Dashboard
          </NavLink>
          <NavLink href="/instructor/courses">
            <BookOpen className="h-4 w-4 mr-2" />
            Courses
          </NavLink>
          <NavLink href="/instructor/analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </NavLink>
          <NavLink href="/instructor/students">
            <Users className="h-4 w-4 mr-2" />
            Students
          </NavLink>
          <NavLink href="/instructor/settings">
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