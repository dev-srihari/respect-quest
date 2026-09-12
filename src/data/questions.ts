export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  /** Correct option index after the options have been shuffled for the quiz. */
  correct: number;
  /** Teacher note: the canonical correct answer before options are shuffled. */
  correctAnswer: string;
  explanation: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Who was there for us before our friends and school?",
    options: ["Neighbours", "Parents", "Teachers", "Classmates"],
    correct: 1,
    correctAnswer: "Parents",
    explanation: "Parents care for us from the very beginning, before we meet our friends or start school.",
  },
  {
    id: 2,
    question: "Parents sometimes say 'No' because...",
    options: ["They dislike us", "They want to punish us", "They may be protecting or guiding us", "They are always angry"],
    correct: 2,
    correctAnswer: "They may be protecting or guiding us",
    explanation: "A parent's refusal can be an act of care that protects us or guides us toward a better choice.",
  },
  {
    id: 3,
    question: "What does the gardener's example teach us?",
    options: ["Plants grow without care", "Pruning helps growth", "Cutting means hatred", "Plants don't need attention"],
    correct: 1,
    correctAnswer: "Pruning helps growth",
    explanation: "Like pruning helps a plant grow well, thoughtful correction can help children develop good habits.",
  },
  {
    id: 4,
    question: "How many years did Rama spend in exile?",
    options: ["7", "10", "14", "20"],
    correct: 2,
    correctAnswer: "14",
    explanation: "Rama spent fourteen years in exile, accepting the difficult decision with respect for his father's promise.",
  },
  {
    id: 5,
    question: "Teachers are described as taking the place of whom in school?",
    options: ["Friends", "Parents", "Neighbours", "Coaches"],
    correct: 1,
    correctAnswer: "Parents",
    explanation: "Teachers guide, correct and care for our growth in school, much like parents do at home.",
  },
  {
    id: 6,
    question: "Who helped Helen Keller learn and communicate?",
    options: ["Mother", "Anne Sullivan", "Mark Zuckerberg", "Rama"],
    correct: 1,
    correctAnswer: "Anne Sullivan",
    explanation: "Anne Sullivan patiently taught Helen Keller to communicate and learn.",
  },
  {
    id: 7,
    question: "Which is a traditional way of showing respect in India?",
    options: ["Ignoring elders", "Namaste", "Walking away", "Arguing"],
    correct: 1,
    correctAnswer: "Namaste",
    explanation: "Namaste is a familiar and respectful greeting that shows humility and regard for others.",
  },
  {
    id: 8,
    question: "Why did Ganesha win the competition?",
    options: ["He ran faster", "He flew higher", "He circled his parents", "He cheated"],
    correct: 2,
    correctAnswer: "He circled his parents",
    explanation: "Ganesha said his parents were his whole world, so circling them was like circling the world.",
  },
  {
    id: 9,
    question: "According to the chapter, caring for parents in old age is...",
    options: ["A punishment", "A burden", "A way of expressing gratitude", "Optional"],
    correct: 2,
    correctAnswer: "A way of expressing gratitude",
    explanation: "Caring for parents as they grow older is one way to repay the care and love they gave us.",
  },
  {
    id: 10,
    question: "Which of these is one of the four action words?",
    options: ["Ignore", "Appreciate", "Complain", "Demand"],
    correct: 1,
    correctAnswer: "Appreciate",
    explanation: "Appreciating others means noticing and valuing their care, effort and kindness.",
  },
  {
    id: 11,
    question: "Listening to elders shows...",
    options: ["Fear", "Respect", "Weakness", "Laziness"],
    correct: 1,
    correctAnswer: "Respect",
    explanation: "Listening patiently shows that we value the experience and thoughts of elders.",
  },
  {
    id: 12,
    question: "Parents' love is described as...",
    options: ["Conditional", "Temporary", "Unconditional", "Rare"],
    correct: 2,
    correctAnswer: "Unconditional",
    explanation: "Parents' love is given freely and is not dependent on children being perfect or successful.",
  },
  {
    id: 13,
    question: "What does a teacher do besides teaching subjects?",
    options: ["Only gives homework", "Inspires and guides students", "Only gives marks", "Only conducts exams"],
    correct: 1,
    correctAnswer: "Inspires and guides students",
    explanation: "A teacher supports students' character and growth by inspiring, guiding and encouraging them.",
  },
  {
    id: 14,
    question: "Helping at home is an example of...",
    options: ["Respect through action", "Avoiding work", "Competition", "Punishment"],
    correct: 0,
    correctAnswer: "Respect through action",
    explanation: "Helping with everyday responsibilities shows respect through something we do, not just something we say.",
  },
  {
    id: 15,
    question: "What is the main message of Chapter 3?",
    options: ["Success is everything", "Respect should be shown through actions toward parents, teachers and elders.", "Friends are more important than family.", "Rules are more important than kindness."],
    correct: 1,
    correctAnswer: "Respect should be shown through actions toward parents, teachers and elders.",
    explanation: "Respect becomes meaningful when we show it through kind, grateful and responsible actions.",
  },
];

export function shuffleQuestions(questions: Question[]): Question[] {
  return questions.map((question) => {
    const entries = question.options.map((text, index) => ({
      text,
      isCorrect: index === question.correct,
    }));

    for (let index = entries.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [entries[index], entries[swapIndex]] = [entries[swapIndex], entries[index]];
    }

    return {
      ...question,
      options: entries.map(({ text }) => text) as Question["options"],
      correct: entries.findIndex(({ isCorrect }) => isCorrect),
    };
  });
}

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;
