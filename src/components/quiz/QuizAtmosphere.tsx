import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 97}%`,
  top: `${(index * 53) % 91}%`,
  delay: (index % 7) * 0.45,
  duration: 4.5 + (index % 5),
}));

export function QuizAtmosphere() {
  return (
    <div className="quiz-atmosphere" aria-hidden>
      <div className="quiz-grid" />
      <div className="light-beam light-beam-left" />
      <div className="light-beam light-beam-right" />
      <div className="scan-sweep" />
      {PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          className="quiz-particle"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.12, 0.7, 0.12], y: [0, -14, 0] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export function AiGuide({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="ai-guide"
      role="status"
      aria-live="polite"
    >
      <span className="ai-orb">
        <Sparkles className="size-4" aria-hidden />
      </span>
      <span>{message}</span>
    </motion.div>
  );
}

export function ConfettiBurst() {
  return (
    <div className="confetti-burst" aria-hidden>
      {Array.from({ length: 12 }, (_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            x: Math.cos((index / 12) * Math.PI * 2) * (65 + (index % 3) * 15),
            y: Math.sin((index / 12) * Math.PI * 2) * (45 + (index % 4) * 10),
            rotate: 180 + index * 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}