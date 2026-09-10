import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StudentPicker } from "@/components/quiz/StudentPicker";
import { QuestionStage } from "@/components/quiz/QuestionStage";
import { RosterManager } from "@/components/quiz/RosterManager";
import { QUESTIONS } from "@/data/questions";
import { useRoster } from "@/hooks/use-roster";
import { playTone } from "@/lib/sound";
import type { SelectionState, Student } from "@/lib/quiz-storage";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Live Quiz — RESPECT Chapter 3" },
      {
        name: "description",
        content:
          "Ten questions on respecting parents, teachers and elders, with random student selection for a live classroom seminar.",
      },
      { property: "og:title", content: "Live Quiz — RESPECT Chapter 3" },
      {
        property: "og:description",
        content: "Ten questions on respecting parents, teachers and elders for a live class.",
      },
    ],
  }),
  component: QuizPage,
});

type Phase = "picking" | "question" | "complete";

function QuizPage() {
  const navigate = useNavigate();
  const roster = useRoster();
  const [phase, setPhase] = useState<Phase>("picking");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [girlScore, setGirlScore] = useState(0);
  const [boyScore, setBoyScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [current, setCurrent] = useState<Student | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const randomizeRef = useRef<(() => void) | null>(null);

  const question = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;

  const registerRandomize = useCallback((fn: (() => void) | null) => {
    randomizeRef.current = fn;
  }, []);

  const handleSelected = useCallback(
    (student: Student, selection: SelectionState) => {
      setCurrent(student);
      roster.updateSelection(selection);
    },
    [roster],
  );

  const handleAnswer = useCallback(
    (choice: number) => {
      if (answer !== null) return;
      setAnswer(choice);
      setAnswered((n) => n + 1);
      const correct = choice === question.correct;
      if (correct) {
        setScore((s) => s + 1);
        if (current?.gender === "girl") setGirlScore((s) => s + 1);
        if (current?.gender === "boy") setBoyScore((s) => s + 1);
      }
      playTone(correct ? "correct" : "wrong", roster.soundOn);
    },
    [answer, question, roster.soundOn],
  );

  const handleNext = useCallback(() => {
    if (answer === null) return;
    if (isLast) {
      playTone("finish", roster.soundOn);
      setPhase("complete");
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setCurrent(null);
    setPhase("picking");
  }, [answer, isLast, roster.soundOn]);

  const restart = useCallback(() => {
    setPhase("picking");
    setIndex(0);
    setScore(0);
    setGirlScore(0);
    setBoyScore(0);
    setAnswered(0);
    setAnswer(null);
    setCurrent(null);
    roster.resetSelected();
    playTone("start", roster.soundOn);
  }, [roster]);

  // Fresh session on entering the quiz
  useEffect(() => {
    if (roster.ready) roster.resetSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roster.ready]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return;
      const key = e.key.toLowerCase();
      if (key === "escape") {
        setPanelOpen((o) => !o);
        return;
      }
      if (panelOpen) return;
      if (key === "r" && phase === "picking") randomizeRef.current?.();
      if (key === "n") {
        if (phase === "question" && answer !== null) handleNext();
        else if (phase === "picking" && current) setPhase("question");
      }
      if (["1", "2", "3", "4"].includes(key) && phase === "question") {
        handleAnswer(Number(key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answer, current, panelOpen, handleAnswer, handleNext]);

  return (
    <main className="grid-backdrop flex min-h-screen flex-col px-5 py-6">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        <Link to="/" className="display-title text-sm text-primary/80">
          Respect · Ch 3
        </Link>
        <div className="flex items-center gap-4">
          <span className="display-title text-xs text-muted-foreground sm:text-sm">
            {String(Math.min(answered + (phase === "complete" ? 0 : 0), QUESTIONS.length)
              .toString()
              .padStart(2, "0"))}{" "}
            / {QUESTIONS.length}
          </span>
          <span className="display-title text-xs text-primary sm:text-sm">Score: {score}</span>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Presenter controls"
            onClick={() => setPanelOpen(true)}
          >
            <Settings2 className="size-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        <AnimatePresence mode="wait">
          {!roster.ready ? (
            <motion.p key="loading" className="text-muted-foreground">
              Loading…
            </motion.p>
          ) : roster.students.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl px-10 py-12 text-center"
            >
              <p className="display-title text-2xl">No students</p>
              <p className="mt-3 text-muted-foreground">Add students before starting the quiz.</p>
              <Link to="/roster">
                <Button className="display-title mt-6">+ Add student</Button>
              </Link>
            </motion.div>
          ) : phase === "picking" ? (
            <motion.div key="pick" exit={{ opacity: 0, scale: 0.97 }} className="w-full">
              <StudentPicker
                students={roster.students}
                selection={roster.selection}
                soundOn={roster.soundOn}
                selected={current}
                onSelected={handleSelected}
                onContinue={() => setPhase("question")}
                registerRandomize={registerRandomize}
              />
            </motion.div>
          ) : phase === "question" ? (
            <QuestionStage
              key={`q-${question.id}`}
              question={question}
              index={index}
              total={QUESTIONS.length}
              studentName={current?.name}
              answer={answer}
              onAnswer={handleAnswer}
              onNext={handleNext}
              isLast={isLast}
            />
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass w-full max-w-2xl rounded-4xl px-8 py-14 text-center"
            >
              <p className="display-title text-sm text-primary/80">Quiz complete</p>
              <p className="display-title mt-6 text-xs text-muted-foreground">Your score</p>
              <p className="glow-text text-6xl font-black text-primary sm:text-8xl">
                {score} / {QUESTIONS.length}
              </p>
              <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-3 text-left">
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="display-title text-xs text-muted-foreground">Girls</p>
                  <p className="mt-1 text-2xl font-bold text-primary">{girlScore}</p>
                </div>
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="display-title text-xs text-muted-foreground">Boys</p>
                  <p className="mt-1 text-2xl font-bold text-primary">{boyScore}</p>
                </div>
              </div>
              <p className="mt-8 text-lg italic sm:text-xl">
                &ldquo;Respect isn&apos;t just something we say.
                <br />
                It&apos;s something we show.&rdquo;
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="display-title" onClick={restart}>
                  Play again
                </Button>
                <Link to="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="display-title border-primary/40 bg-transparent"
                  >
                    Home
                  </Button>
                </Link>
              </div>
              <p className="mt-10 text-sm font-semibold tracking-wide text-muted-foreground">
                Sri Hari • Pooja • Avani
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mx-auto w-full max-w-5xl text-center text-[11px] text-muted-foreground">
        Keys: 1-4 answer · N next · R randomize · ESC presenter controls
      </footer>

      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="display-title text-primary">Presenter controls</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 px-4 pb-10">
            <div className="glass grid grid-cols-3 gap-3 rounded-2xl p-4 text-center">
              <div>
                <p className="display-title text-[10px] text-muted-foreground">Question</p>
                <p className="text-lg font-semibold">
                  {index + 1} / {QUESTIONS.length}
                </p>
              </div>
              <div>
                <p className="display-title text-[10px] text-muted-foreground">Score</p>
                <p className="text-lg font-semibold">
                  {score} / {answered}
                </p>
              </div>
              <div>
                <p className="display-title text-[10px] text-muted-foreground">Selected</p>
                <p className="text-lg font-semibold">
                  {roster.selection.selectedGirls.length + roster.selection.selectedBoys.length} /{" "}
                  {roster.students.length}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={roster.resetSelected}>
                Reset selected students
              </Button>
              <Button variant="outline" onClick={restart}>
                Restart quiz
              </Button>
              <Button variant="outline" onClick={roster.toggleSound}>
                Sound {roster.soundOn ? "on" : "off"}
              </Button>
              <Button variant="ghost" onClick={() => navigate({ to: "/" })}>
                Home
              </Button>
            </div>

            <RosterManager
              compact
              students={roster.students}
              onAdd={roster.addStudent}
              onRename={roster.renameStudent}
              onGenderChange={roster.setGender}
              onRemove={roster.removeStudent}
              onRestoreDefaults={roster.restoreDefaults}
            />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
