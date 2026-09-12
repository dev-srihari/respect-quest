import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiGuide, QuizAtmosphere } from "@/components/quiz/QuizAtmosphere";
import { QUESTIONS } from "@/data/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RESPECT — Chapter 3 Interactive Quiz" },
      {
        name: "description",
        content:
          "A live classroom quiz on Chapter 3: Respecting Parents and Others. Ten questions, random student selection, instant feedback.",
      },
      { property: "og:title", content: "RESPECT — Chapter 3 Interactive Quiz" },
      {
        property: "og:description",
        content:
          "A live classroom quiz on Chapter 3: Respecting Parents and Others. Ten questions, random student selection, instant feedback.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const loadingSteps = [
    "Preparing quiz...",
    "Loading questions...",
    "Preparing student selection...",
    "Quiz ready.",
    "Quiz ready.",
  ];
  const loadingProgress = [0, 20, 47, 82, 100];

  useEffect(() => {
    const timers = loadingProgress.map((_, index) =>
      window.setTimeout(() => setStep(index), index * 440),
    );
    timers.push(window.setTimeout(() => setLoading(false), 2520));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <main className="quiz-shell flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
      <QuizAtmosphere />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" exit={{ opacity: 0, scale: 1.08 }} className="intro-screen text-center">
            <div className="scanner-ring mx-auto w-44 sm:w-52">
              <span className="display-title text-3xl font-bold text-primary">{loadingProgress[step]}%</span>
            </div>
            <p className="quiz-label mt-8 text-xs text-primary/70">Preparing your quiz</p>
            <motion.p key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="quiz-label mt-3 text-sm text-muted-foreground">
              {loadingSteps[step]}
            </motion.p>
          </motion.div>
        ) : (
          <motion.section key="home" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65 }} className="relative z-10 w-full max-w-5xl text-center">
            <div className="mb-7 flex items-center justify-center"><AiGuide message="Your classroom quiz is ready." /></div>
            <p className="quiz-label text-xs text-primary/80">Chapter 3</p>
            <motion.h1 initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 110, damping: 16 }} className="glow-text mt-3 text-6xl font-bold text-primary sm:text-8xl lg:text-9xl">RESPECT</motion.h1>
            <p className="quiz-label mt-3 text-lg text-foreground sm:text-2xl">Interactive Quiz</p>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">Respecting Parents and Others</p>

            <div className="mx-auto mt-9 h-px max-w-xl bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <p className="quiz-label mt-6 text-[11px] text-muted-foreground">Presented by</p>
            <p className="mt-2 font-semibold text-foreground">Sri Hari <span className="text-primary">•</span> Pooja <span className="text-accent">•</span> Aavani</p>

            <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
              <Button asChild size="lg" className="group h-16 text-base sm:text-lg">
                <Link to="/quiz">START QUIZ <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 text-sm">
                <Link to="/roster"><Users /> STUDENT ROSTER</Link>
              </Button>
            </div>
            <p className="quiz-label mt-7 text-[10px] text-muted-foreground sm:text-xs">{QUESTIONS.length} QUESTIONS <span className="text-primary">•</span> RANDOM STUDENTS <span className="text-accent">•</span> LIVE CLASSROOM QUIZ</p>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
