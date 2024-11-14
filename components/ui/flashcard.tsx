"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  cards: {
    id: string;
    front: {
      type: "text" | "image" | "video";
      content: string;
    };
    back: {
      type: "text" | "image" | "video";
      content: string;
    };
  }[];
}

export function Flashcard({ cards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const renderContent = (type: string, content: string) => {
    switch (type) {
      case "image":
        return (
          <img
            src={content}
            alt="Flashcard content"
            className="w-full h-64 object-contain"
          />
        );
      case "video":
        return (
          <video
            src={content}
            controls
            className="w-full h-64 object-contain"
          />
        );
      default:
        return <p className="text-lg">{content}</p>;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative perspective-1000">
        <Card
          className={cn(
            "p-8 cursor-pointer transition-transform duration-500 transform-style-3d min-h-[400px] flex items-center justify-center",
            isFlipped && "rotate-y-180"
          )}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={cn(
            "absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center",
            !isFlipped ? "visible" : "invisible"
          )}>
            {renderContent(currentCard.front.type, currentCard.front.content)}
          </div>
          <div className={cn(
            "absolute inset-0 backface-hidden p-8 rotate-y-180 flex flex-col items-center justify-center",
            isFlipped ? "visible" : "invisible"
          )}>
            {renderContent(currentCard.back.type, currentCard.back.content)}
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {cards.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}