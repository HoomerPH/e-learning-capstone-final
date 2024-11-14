"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AssessmentQuestion } from "./assessment-question";
import { getPreAssessmentQuestions } from "@/lib/assessments";

interface PreAssessmentClientProps {
  courseId: string;
  courseTitle: string;
}

export function PreAssessmentClient({ courseId, courseTitle }: PreAssessmentClientProps) {
  const questions = getPreAssessmentQuestions(courseId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | { [key: string]: string })[]>(
    questions.map(() => questions[0].type === 'labeling' ? {} : '')
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (value: string | { [key: string]: string }) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setShowFeedback(true);
      setTimeout(() => setIsComplete(true), 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
    }
  };

  const isAnswerComplete = () => {
    const currentAnswer = answers[currentQuestion];
    if (!currentAnswer) return false;

    const currentQuestionData = questions[currentQuestion];
    if (currentQuestionData.type === 'labeling') {
      const labelAnswer = currentAnswer as { [key: string]: string };
      return currentQuestionData.labels.every(
        (label) => labelAnswer[label.id]?.trim()
      );
    }

    return (currentAnswer as string).trim() !== '';
  };

  if (isComplete) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pre-Assessment Complete!</h1>
            <p className="text-muted-foreground">
              You're ready to start learning {courseTitle}
            </p>
          </div>
          <Button asChild>
            <Link href={`/courses/${courseId}`}>
              Start Course
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <Link
          href={`/courses/${courseId}`}
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
      </div>

      <Card className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Pre-Assessment</h1>
          <p className="text-muted-foreground">
            {courseTitle}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-8">
          <AssessmentQuestion
            question={questions[currentQuestion]}
            value={answers[currentQuestion]}
            onChange={handleAnswer}
            showFeedback={showFeedback}
          />

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswerComplete()}
            >
              {currentQuestion === questions.length - 1 ? (
                "Complete Assessment"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}