"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface User {
  id: string;
  email: string;
  user_metadata?: {
    role?: 'instructor' | 'student';
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('AuthProvider - Initializing auth');
        const user = await getCurrentUser();
        console.log('AuthProvider - Current user:', user);
        
        setUser(user);

        // If we have a user but we're on an auth page, redirect to dashboard
        if (user && window.location.pathname.startsWith('/auth')) {
          const dashboardRoute = user.user_metadata?.role === 'instructor' 
            ? routes.instructor.dashboard 
            : routes.student.dashboard;
          console.log('AuthProvider - Redirecting to dashboard:', dashboardRoute);
          router.push(dashboardRoute);
        }
      } catch (error) {
        console.error('AuthProvider - Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}