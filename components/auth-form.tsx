"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface AuthFormProps {
  defaultRole?: 'student' | 'instructor';
}

export function AuthForm({ defaultRole = 'student' }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting sign in for:', email); // Debug log
      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      if (!data?.user) throw new Error('No user returned');

      const userRole = data.user.user_metadata?.role;
      console.log('Sign in successful, user role:', userRole);

      // Verify role matches the selected tab
      if (userRole !== defaultRole) {
        throw new Error(`Invalid account type. Please use the ${userRole} login option.`);
      }

      // Get the redirect URL from the query params or use default
      const from = searchParams.get('from');
      const redirectUrl = from || 
        (userRole === 'instructor' ? routes.instructor.dashboard : routes.student.dashboard);
      
      console.log('Will redirect to:', redirectUrl);
      toast.success("Successfully signed in!");

      // Force a page reload to ensure cookies are properly set
      if (typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link href={routes.auth.signUp} className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}