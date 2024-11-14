"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "student" | "instructor";

    const user = signUp(name, email, password, role);

    if (user) {
      if (user.role === 'instructor') {
        router.push('/instructor');
      } else {
        router.push('/profile');
      }
    } else {
      setError("Email already exists");
    }

    setIsLoading(false);
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <Label>Account Type</Label>
              <RadioGroup defaultValue="student" name="role" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instructor" id="instructor" />
                  <Label htmlFor="instructor">Instructor</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}