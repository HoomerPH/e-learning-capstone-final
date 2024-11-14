import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | KnowPC",
  description: "Sign in to access your KnowPC account",
};

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="instructor" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Instructor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground text-center">
                  Demo Student Account:<br />
                  student@example.com / student@example123
                </p>
              </div>
              <AuthForm defaultRole="student" />
            </TabsContent>
            
            <TabsContent value="instructor">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground text-center">
                  Demo Instructor Account:<br />
                  instructor@example.com / password123
                </p>
              </div>
              <AuthForm defaultRole="instructor" />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}