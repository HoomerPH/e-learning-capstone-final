interface Lesson {
  id: string;
  title: string;
  content: string;
  icon: any;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  units: Unit[];
  icon: any;
}

const courses: Course[] = [
  {
    id: "intro",
    title: "Introduction to Computer System Servicing",
    description: "Learn the fundamentals of computer systems and their components.",
    duration: "4 weeks",
    units: [
      {
        id: "unit-1",
        title: "Computer Hardware Basics",
        description: "Learn about the fundamental components of a computer system.",
        lessons: [
          {
            id: "lesson-1",
            title: "Understanding Computer Components",
            content: "Content for understanding computer components...",
            icon: "BookOpen"
          },
          {
            id: "lesson-2",
            title: "CPU and Memory",
            content: "Content about CPU and memory...",
            icon: "Cpu"
          }
        ]
      },
      {
        id: "unit-2",
        title: "Basic Maintenance",
        description: "Learn basic computer maintenance procedures.",
        lessons: [
          {
            id: "lesson-1",
            title: "Cleaning and Maintenance",
            content: "Content about cleaning and maintenance...",
            icon: "Settings"
          }
        ]
      }
    ],
    icon: "BookOpen"
  },
  {
    id: "install",
    title: "Install and Configure Computer Systems",
    description: "Master the installation and configuration of computer systems.",
    duration: "3 weeks",
    units: [],
    icon: "Settings"
  },
  {
    id: "setup",
    title: "Set up Computer Systems",
    description: "Learn to set up complete computer systems from scratch.",
    duration: "5 weeks",
    units: [],
    icon: "Cpu"
  },
  {
    id: "maintain",
    title: "Maintain Computer Systems and Networks",
    description: "Understand maintenance procedures for computers and networks.",
    duration: "4 weeks",
    units: [],
    icon: "Network"
  },
  {
    id: "servers",
    title: "Set up Computer Servers",
    description: "Learn server installation and configuration.",
    duration: "4 weeks",
    units: [],
    icon: "Server"
  }
];

export function getAllCourseIds(): string[] {
  return courses.map(course => course.id);
}

export function getCourseData(courseId: string): Course | undefined {
  return courses.find(course => course.id === courseId);
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getInstructorCourses(): Array<{
  id: string;
  title: string;
  students: number;
  lessons: number;
  completion: number;
}> {
  return [
    {
      id: "intro",
      title: "Introduction to Computer System Servicing",
      students: 156,
      lessons: 12,
      completion: 85,
    },
    {
      id: "install",
      title: "Install and Configure Computer Systems",
      students: 98,
      lessons: 8,
      completion: 72,
    },
    {
      id: "setup",
      title: "Set up Computer Systems",
      students: 134,
      lessons: 15,
      completion: 90,
    },
  ];
}