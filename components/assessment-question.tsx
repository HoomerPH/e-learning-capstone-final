"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";

interface AssessmentQuestionProps {
  question: any;
  value: string | { [key: string]: string };
  onChange: (value: string | { [key: string]: string }) => void;
  showFeedback?: boolean;
}

export function AssessmentQuestion({
  question,
  value,
  onChange,
  showFeedback = false,
}: AssessmentQuestionProps) {
  const [showHint, setShowHint] = useState(false);

  switch (question.type) {
    case 'multiple-choice':
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{question.question}</h2>
          <RadioGroup
            value={value as string}
            onValueChange={onChange}
            className="space-y-3"
          >
            {question.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>
                  {option}
                </Label>
                {showFeedback && value === option && (
                  <span className="ml-2">
                    {option === question.correctAnswer ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case 'identification':
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{question.question}</h2>
          <div className="space-y-2">
            <Input
              type="text"
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type your answer here"
            />
            {question.hint && (
              <div className="text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {showHint && (
                  <p className="mt-1 text-muted-foreground">{question.hint}</p>
                )}
              </div>
            )}
            {showFeedback && value && (
              <div className="flex items-center gap-2 mt-2">
                {value.toString().toLowerCase() === question.correctAnswer.toLowerCase() ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-500">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-500" />
                    <span className="text-red-500">
                      Incorrect. The correct answer is: {question.correctAnswer}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case 'labeling':
      const labelValues = value as { [key: string]: string };
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{question.question}</h2>
          <Card className="p-4">
            <div className="relative">
              <img
                src={question.image}
                alt="Component to label"
                className="w-full rounded-lg"
              />
              {question.labels.map((label) => (
                <div
                  key={label.id}
                  className="absolute"
                  style={{
                    left: `${label.x}%`,
                    top: `${label.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-secondary rounded-full mb-2" />
                    <Input
                      className="w-32 text-center"
                      value={labelValues[label.id] || ''}
                      onChange={(e) =>
                        onChange({
                          ...labelValues,
                          [label.id]: e.target.value,
                        })
                      }
                      placeholder="Enter label"
                    />
                    {showFeedback && labelValues[label.id] && (
                      <div className="mt-1">
                        {question.correctAnswers.find((a) => a.id === label.id)?.label.toLowerCase() ===
                        labelValues[label.id].toLowerCase() ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {showFeedback && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Correct Labels:</h3>
              <ul className="list-disc list-inside space-y-1">
                {question.correctAnswers.map((answer) => (
                  <li key={answer.id}>{answer.label}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}