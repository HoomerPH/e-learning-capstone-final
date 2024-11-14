"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";

interface Unit {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
}

export default function EditCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    units: [] as Unit[]
  });

  useEffect(() => {
    async function loadCourse() {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          units (
            *,
            lessons (*)
          )
        `)
        .eq('id', params.courseId)
        .single();

      if (error) {
        console.error('Error loading course:', error);
        return;
      }

      if (data) {
        setCourse({
          title: data.title,
          description: data.description,
          duration: data.duration,
          units: data.units || []
        });
      }
    }

    loadCourse();
  }, [params.courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update course details
      const { error: courseError } = await supabase
        .from('courses')
        .update({
          title: course.title,
          description: course.description,
          duration: course.duration
        })
        .eq('id', params.courseId);

      if (courseError) throw courseError;

      // Update units and lessons
      for (const unit of course.units) {
        const { error: unitError } = await supabase
          .from('units')
          .upsert({
            id: unit.id,
            course_id: params.courseId,
            title: unit.title,
            description: unit.description,
            order: unit.order
          });

        if (unitError) throw unitError;

        for (const lesson of unit.lessons) {
          const { error: lessonError } = await supabase
            .from('lessons')
            .upsert({
              id: lesson.id,
              unit_id: unit.id,
              title: lesson.title,
              content: lesson.content,
              order: lesson.order
            });

          if (lessonError) throw lessonError;
        }
      }

      router.push('/instructor/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUnit = () => {
    setCourse({
      ...course,
      units: [
        ...course.units,
        {
          id: `new-${Date.now()}`,
          title: "",
          description: "",
          order: course.units.length,
          lessons: []
        }
      ]
    });
  };

  const addLesson = (unitIndex: number) => {
    const newUnits = [...course.units];
    newUnits[unitIndex].lessons.push({
      id: `new-${Date.now()}`,
      title: "",
      content: "",
      order: newUnits[unitIndex].lessons.length
    });
    setCourse({ ...course, units: newUnits });
  };

  const updateUnit = (index: number, field: keyof Unit, value: string) => {
    const newUnits = [...course.units];
    newUnits[index] = { ...newUnits[index], [field]: value };
    setCourse({ ...course, units: newUnits });
  };

  const updateLesson = (unitIndex: number, lessonIndex: number, field: keyof Lesson, value: string) => {
    const newUnits = [...course.units];
    newUnits[unitIndex].lessons[lessonIndex] = {
      ...newUnits[unitIndex].lessons[lessonIndex],
      [field]: value
    };
    setCourse({ ...course, units: newUnits });
  };

  const removeUnit = async (unitId: string, index: number) => {
    if (!unitId.startsWith('new-')) {
      await supabase.from('units').delete().eq('id', unitId);
    }
    const newUnits = [...course.units];
    newUnits.splice(index, 1);
    setCourse({ ...course, units: newUnits });
  };

  const removeLesson = async (lessonId: string, unitIndex: number, lessonIndex: number) => {
    if (!lessonId.startsWith('new-')) {
      await supabase.from('lessons').delete().eq('id', lessonId);
    }
    const newUnits = [...course.units];
    newUnits[unitIndex].lessons.splice(lessonIndex, 1);
    setCourse({ ...course, units: newUnits });
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/instructor/courses"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={course.duration}
                  onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                  required
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            {course.units.map((unit, unitIndex) => (
              <Card key={unit.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Unit {unitIndex + 1}</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUnit(unit.id, unitIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Unit Title</Label>
                    <Input
                      value={unit.title}
                      onChange={(e) => updateUnit(unitIndex, 'title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>Unit Description</Label>
                    <Textarea
                      value={unit.description}
                      onChange={(e) => updateUnit(unitIndex, 'description', e.target.value)}
                      required
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Lessons</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(unitIndex)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lesson
                      </Button>
                    </div>

                    {unit.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="space-y-4 pl-4 border-l-2">
                        <div className="flex items-center justify-between">
                          <Label>Lesson {lessonIndex + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLesson(lesson.id, unitIndex, lessonIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <Input
                          placeholder="Lesson title"
                          value={lesson.title}
                          onChange={(e) => updateLesson(unitIndex, lessonIndex, 'title', e.target.value)}
                          required
                        />

                        <Textarea
                          placeholder="Lesson content"
                          value={lesson.content}
                          onChange={(e) => updateLesson(unitIndex, lessonIndex, 'content', e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addUnit}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}