import { Card } from "@/components/ui/card";
import { BarChart2, TrendingUp, Users } from "lucide-react";

export default function InstructorAnalytics() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">1,234</h3>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15% vs last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Course Completion</p>
                <h3 className="text-2xl font-bold">85%</h3>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5% vs last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <h3 className="text-2xl font-bold">892</h3>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              +10% vs last month
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Student Engagement</h2>
            <div className="space-y-4">
              {["Daily Active Users", "Course Completion Rate", "Average Session Duration"].map((metric) => (
                <div key={metric} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric}</span>
                  <div className="w-32 h-2 bg-secondary/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary" 
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Popular Courses</h2>
            <div className="space-y-4">
              {[
                "Introduction to Computer Systems",
                "Install and Configure Computer Systems",
                "Set up Computer Systems"
              ].map((course) => (
                <div key={course} className="flex items-center justify-between">
                  <span className="text-sm">{course}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 500)} students
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}