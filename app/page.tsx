import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Server, Cpu, Network, Settings, ArrowRight, MonitorSmartphone } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Introduction to Computer System Servicing",
    description: "Learn the fundamentals of computer systems and basic servicing concepts.",
    icon: BookOpen,
    href: "/courses/intro"
  },
  {
    id: 2,
    title: "Install and Configure Computer Systems",
    description: "Master the installation and configuration of computer hardware and software.",
    icon: Settings,
    href: "/courses/install"
  },
  {
    id: 3,
    title: "Set up Computer Systems",
    description: "Learn to set up complete computer systems from scratch.",
    icon: Cpu,
    href: "/courses/setup"
  },
  {
    id: 4,
    title: "Maintain Computer Systems and Networks",
    description: "Understand system maintenance and network management.",
    icon: Network,
    href: "/courses/maintain"
  },
  {
    id: 5,
    title: "Set up Computer Servers",
    description: "Advanced course on server installation and configuration.",
    icon: Server,
    href: "/courses/servers"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <MonitorSmartphone className="h-12 w-12 text-secondary mr-2" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                KnowPC
              </h1>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-4">
              Your Path to Computer Systems Mastery
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Master computer systems servicing through structured, self-paced learning. 
              From basics to advanced server management, we've got you covered.
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                asChild
              >
                <Link href="/courses">
                  Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Learning Pathway</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-muted hover:border-secondary/50 bg-gradient-to-b from-muted to-card"
              >
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <course.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-secondary/50 hover:bg-secondary hover:text-secondary-foreground" 
                  asChild
                >
                  <Link href={course.href}>Start Course</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose KnowPC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gradient-to-b from-card to-muted border border-muted hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Learn at Your Pace</h3>
              <p className="text-muted-foreground">
                Progress through structured content with flexible, self-paced learning
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-b from-card to-muted border border-muted hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Hands-on Practice</h3>
              <p className="text-muted-foreground">
                Master skills through interactive lessons and practical assessments
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-b from-card to-muted border border-muted hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your advancement with detailed progress tracking
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}