import { Card } from "@/components/ui/card";
import { BookOpen, Users, BarChart2 } from "lucide-react";

const stats = [
  {
    name: "Total Courses",
    value: "5",
    icon: BookOpen,
    change: "+2 this month",
  },
  {
    name: "Active Students",
    value: "1,234",
    icon: Users,
    change: "+15% vs last month",
  },
  {
    name: "Completion Rate",
    value: "85%",
    icon: BarChart2,
    change: "+5% vs last month",
  },
];

export default function InstructorDashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New student enrolled in Introduction to Computer Systems</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Popular Courses</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-secondary/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Introduction to Computer Systems</p>
                      <p className="text-xs text-muted-foreground">156 students</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">85% completion</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}