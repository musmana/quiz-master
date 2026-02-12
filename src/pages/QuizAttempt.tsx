import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { sampleQuestions } from "../data/mock";
import { Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "../lib/utils";

export function QuizAttempt() {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = sampleQuestions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/result");
    }, 1500);
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionId,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div
            className={cn(
              "flex items-center font-mono px-3 py-1.5 rounded-md",
              timeLeft < 60
                ? "bg-red-50 text-red-600"
                : "bg-slate-100 text-slate-700"
            )}
          >
            <Clock className="h-4 w-4 mr-2" />
            {formatTime(timeLeft)}
          </div>

          <Button
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit Quiz
          </Button>
        </div>

        <div className="h-1 bg-slate-100 w-full">
          <div
            className="h-full bg-teal-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6">
              {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2",
                    answers[question.id] === option.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200"
                  )}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            disabled={currentQuestionIndex === 0}
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.max(0, prev - 1)
              )
            }
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            disabled={
              currentQuestionIndex === sampleQuestions.length - 1
            }
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(sampleQuestions.length - 1, prev + 1)
              )
            }
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
