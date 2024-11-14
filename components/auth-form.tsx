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
      const { data, error } = await signIn(email, password);
      
      if (!data?.user) throw new Error('No user returned');

      const userRole = data.user.user_metadata?.role;

      // Verify role matches the selected tab
      if (userRole !== defaultRole) {
        throw new Error(`Invalid account type. Please use the ${userRole} login option.`);
      }

      toast.success("Successfully signed in!");
      
      // Get the redirect URL from the query params or use default
      const from = searchParams.get('from');
      const redirectUrl = from || 
        (userRole === 'instructor' ? routes.instructor.dashboard : routes.student.dashboard);
      
      router.push(redirectUrl);
      router.refresh();
    } catch (error: any) {
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      <div className="text-sm text-center space-y-2">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link href={routes.auth.signUp} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-muted-foreground">
          <Link href={routes.auth.forgotPassword} className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </form>
  );
}