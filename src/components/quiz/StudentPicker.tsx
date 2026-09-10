import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectionState, Student } from "@/lib/quiz-storage";
import { pickStudent, shuffleNames } from "@/lib/random-selection";
import { playTone } from "@/lib/sound";

interface Props {
  students: Student[];
  selection: SelectionState;
  soundOn: boolean;
  selected: Student | null;
  onSelected: (student: Student, selection: SelectionState) => void;
  onContinue: () => void;
  registerRandomize: (fn: (() => void) | null) => void;
}

export function StudentPicker({
  students,
  selection,
  soundOn,
  selected,
  onSelected,
  onContinue,
  registerRandomize,
}: Props) {
  const [rolling, setRolling] = useState(false);
  const [ticker, setTicker] = useState<string>("");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const hasGender = (g: "girl" | "boy") => students.some((s) => s.gender === g);
  const upcoming = hasGender(selection.nextGender)
    ? selection.nextGender
    : selection.nextGender === "girl"
      ? "boy"
      : "girl";

  const randomize = useCallback(() => {
    if (students.length === 0 || rolling) return;
    const retrySelection = selected
      ? {
          ...selection,
          selectedGirls:
            selected.gender === "girl"
              ? selection.selectedGirls.filter((id) => id !== selected.id)
              : selection.selectedGirls,
          selectedBoys:
            selected.gender === "boy"
              ? selection.selectedBoys.filter((id) => id !== selected.id)
              : selection.selectedBoys,
          nextGender: selected.gender,
        }
      : selection;
    const result = pickStudent(students, retrySelection);
    if (!result) return;

    setRolling(true);
    const names = shuffleNames(students, 14, result.student.gender);
    clearTimers();
    names.forEach((name, i) => {
      timers.current.push(
        window.setTimeout(
          () => {
            setTicker(name);
            playTone("tick", soundOn);
          },
          60 + i * (60 + i * 8),
        ),
      );
    });
    const total = names.reduce((acc, _n, i) => acc + (60 + i * 8), 60);
    timers.current.push(
      window.setTimeout(() => {
        setRolling(false);
        setTicker("");
        playTone("select", soundOn);
        onSelected(result.student, result.selection);
      }, total + 120),
    );
  }, [students, selection, rolling, selected, soundOn, onSelected]);

  useEffect(() => {
    registerRandomize(randomize);
    return () => registerRandomize(null);
  }, [randomize, registerRandomize]);

  useEffect(() => clearTimers, []);

  const girls = students.filter((s) => s.gender === "girl");
  const boys = students.filter((s) => s.gender === "boy");

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="display-title text-sm text-primary/80 sm:text-base"
      >
        Who&apos;s next?
      </motion.p>

      {students.length > 0 && !selected && (
        <span className="display-title rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs text-primary">
          Up next: {upcoming === "girl" ? "Girl" : "Boy"}
        </span>
      )}

      <div className="glass flex min-h-40 w-full max-w-2xl items-center justify-center rounded-3xl px-6 py-10">
        <AnimatePresence mode="wait">
          {rolling ? (
            <motion.span
              key={ticker + Math.random()}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.12 }}
              className="text-3xl font-semibold text-muted-foreground sm:text-5xl"
            >
              {ticker || "…"}
            </motion.span>
          ) : selected ? (
            <motion.div
              key={`sel-${selected.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <Target className="mx-auto size-8 text-accent" aria-hidden />
              <p className="display-title text-xs text-muted-foreground">
                {selected.gender === "girl" ? "Girl" : "Boy"} selected
              </p>
              <p className="glow-text text-4xl font-bold text-primary sm:text-6xl">
                {selected.name}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-muted-foreground"
            >
              {students.length === 0
                ? "Add students before starting the quiz."
                : "Press Randomize to choose a student"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          variant="outline"
          disabled={students.length === 0 || rolling}
          onClick={randomize}
          className="display-title border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
        >
          {selected ? "Choose another" : "Randomize"}
        </Button>
        <Button
          size="lg"
          disabled={!selected || rolling}
          onClick={onContinue}
          className="display-title bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Show question
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Girls called {selection.selectedGirls.length} / {girls.length} · Boys called{" "}
        {selection.selectedBoys.length} / {boys.length}
      </p>
    </div>
  );
}
