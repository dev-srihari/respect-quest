import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

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
  return (
    <main className="grid-backdrop flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-3xl rounded-4xl px-8 py-14 text-center sm:px-14"
      >
        <motion.h1
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.18em", opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="display-title glow-text text-5xl font-black text-primary sm:text-7xl"
        >
          Respect
        </motion.h1>

        <p className="display-title mt-6 text-sm text-muted-foreground sm:text-base">
          Chapter 3 · Interactive Quiz
        </p>
        <p className="mt-3 text-lg text-foreground/90 italic sm:text-xl">
          &ldquo;Respecting Parents and Others&rdquo;
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link to="/quiz" className="w-full max-w-sm">
            <Button
              size="lg"
              className="display-title h-16 w-full text-lg shadow-[var(--glow-primary)]"
            >
              Start Quiz
            </Button>
          </Link>
          <Link to="/roster" className="w-full max-w-sm">
            <Button
              size="lg"
              variant="outline"
              className="display-title h-12 w-full border-primary/40 bg-transparent text-primary hover:bg-primary/10"
            >
              Student Settings
            </Button>
          </Link>
        </div>

        <div className="mt-12 space-y-2">
          <p className="display-title text-xs text-muted-foreground">Presented by</p>
          <p className="text-lg font-semibold tracking-wide">Sri Hari • Pooja • Aavani</p>
        </div>
      </motion.div>
    </main>
  );
}
