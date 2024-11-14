import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Server, Cpu, Network, Settings } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Introduction to Computer System Servicing",
    description: "Learn the fundamentals of computer systems and basic servicing concepts.",
    icon: BookOpen,
    href: "/courses/intro",
    units: 5,
    duration: "4 weeks"
  },
  {
    id: 2,
    title: "Install and Configure Computer Systems",
    description: "Master the installation and configuration of computer hardware and software.",
    icon: Settings,
    href: "/courses/install",
    units: 4,
    duration: "3 weeks"
  },
  {
    id: 3,
    title: "Set up Computer Systems",
    description: "Learn to set up complete computer systems from scratch.",
    icon: Cpu,
    href: "/courses/setup",
    units: 6,
    duration: "5 weeks"
  },
  {
    id: 4,
    title: "Maintain Computer Systems and Networks",
    description: "Understand system maintenance and network management.",
    icon: Network,
    href: "/courses/maintain",
    units: 5,
    duration: "4 weeks"
  },
  {
    id: 5,
    title: "Set up Computer Servers",
    description: "Advanced course on server installation and configuration.",
    icon: Server,
    href: "/courses/servers",
    units: 4,
    duration: "4 weeks"
  }
];

export default function CoursesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
        <p className="text-muted-foreground">
          Choose from our comprehensive selection of computer systems servicing courses. 
          Each course includes pre and post-assessments to track your progress.
        </p>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 flex flex-col md:flex-row gap-6 items-start bg-gradient-to-r from-muted to-card hover:shadow-lg transition-all duration-300">
            <div className="h-16 w-16 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <course.icon className="h-8 w-8 text-secondary" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-muted px-3 py-1 rounded-full text-sm">
                  {course.units} Units
                </div>
                <div className="bg-muted px-3 py-1 rounded-full text-sm">
                  {course.duration}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="secondary"
                  className="w-full md:w-auto"
                  asChild
                >
                  <Link href={`${course.href}/pre-assessment`}>
                    Take Pre-Assessment
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
                  asChild
                >
                  <Link href={course.href}>
                    View Course Details
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}