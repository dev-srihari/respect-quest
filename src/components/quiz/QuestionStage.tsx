import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OPTION_LABELS, type Question } from "@/data/questions";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
  index: number;
  total: number;
  studentName?: string;
  answer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuestionStage({
  question,
  index,
  total,
  studentName,
  answer,
  onAnswer,
  onNext,
  isLast,
}: Props) {
  const answered = answer !== null;
  const isCorrect = answer === question.correct;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="display-title text-xs text-primary/80">
          Question {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        {studentName && (
          <p className="text-sm text-muted-foreground">
            Answering: <span className="font-semibold text-foreground">{studentName}</span>
          </p>
        )}
      </div>

      <h2 className="text-2xl leading-snug font-semibold sm:text-4xl">{question.question}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const correctChoice = i === question.correct;
          const chosen = answer === i;
          return (
            <motion.button
              key={option}
              whileHover={answered ? undefined : { scale: 1.02 }}
              whileTap={answered ? undefined : { scale: 0.98 }}
              disabled={answered}
              onClick={() => onAnswer(i)}
              className={cn(
                "glass flex items-start gap-4 rounded-2xl px-5 py-4 text-left transition-colors",
                !answered && "hover:border-primary/60",
                answered && correctChoice && "border-success/70 bg-success/15",
                answered && chosen && !correctChoice && "border-destructive/70 bg-destructive/15",
                answered && !chosen && !correctChoice && "opacity-50",
              )}
            >
              <span className="display-title mt-0.5 text-sm text-primary">
                {OPTION_LABELS[i]}
              </span>
              <span className="text-base sm:text-lg">{option}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass space-y-2 rounded-2xl px-6 py-5"
          >
            <p
              className={cn(
                "display-title flex items-center gap-2 text-lg",
                isCorrect ? "text-success" : "text-destructive",
              )}
            >
              {isCorrect ? <Check className="size-5" /> : <X className="size-5" />}
              {isCorrect ? "Correct" : "Not quite"}
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">{question.explanation}</p>
            <Button
              onClick={onNext}
              size="lg"
              className="display-title mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLast ? "Finish" : "Next"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
