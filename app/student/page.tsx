"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">Overall progress</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Time</p>
                <h3 className="text-2xl font-bold">12.5 hrs</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Courses</p>
                <h3 className="text-2xl font-bold">1</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Keep it up!</p>
          </Card>
        </div>

        {/* Current Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Current Courses</h2>
            <Button variant="outline" asChild>
              <Link href="/student/courses">View All</Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              {
                title: "Introduction to Computer System Servicing",
                progress: 75,
                lastAccessed: "2 hours ago",
                nextLesson: "Understanding CPU Architecture"
              },
              {
                title: "Install and Configure Computer Systems",
                progress: 30,
                lastAccessed: "1 day ago",
                nextLesson: "BIOS Configuration"
              }
            ].map((course, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Last accessed {course.lastAccessed}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/courses/course-${index + 1}`}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium">Next Lesson</p>
                  <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              "Completed lesson: Introduction to Computer Components",
              "Achieved 85% in Pre-Assessment",
              "Started new course: Install and Configure Computer Systems"
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}