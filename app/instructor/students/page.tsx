import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical } from "lucide-react";

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    courses: 3,
    progress: 75,
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    courses: 2,
    progress: 90,
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    courses: 4,
    progress: 60,
    lastActive: "3 hours ago"
  }
];

export default function InstructorStudents() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Students</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 w-[300px]"
              />
            </div>
            <Button>Export Data</Button>
          </div>
        </div>

        <Card>
          <div className="p-6">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground mb-4">
              <div className="col-span-2">Student</div>
              <div>Courses</div>
              <div>Progress</div>
              <div>Last Active</div>
              <div></div>
            </div>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
                  <div>{student.courses} courses</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-secondary/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary" 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{student.progress}%</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">{student.lastActive}</div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}