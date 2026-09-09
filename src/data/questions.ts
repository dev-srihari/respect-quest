export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  /** index 0-3 of the correct option */
  correct: number;
  explanation: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What makes the love that parents give their children special?",
    options: [
      "It is given only when children do well",
      "It is unconditional and expects nothing in return",
      "It is given in exchange for obedience",
      "It lasts only while children are small",
    ],
    correct: 1,
    explanation:
      "Parents love their children unconditionally — they give care, time and sacrifice without expecting anything back.",
  },
  {
    id: 2,
    question: "Why do parents sometimes correct or discipline their children?",
    options: [
      "Because they enjoy being strict",
      "Because they want to control everything",
      "Because they care and want their children to grow the right way",
      "Because other parents expect it",
    ],
    correct: 2,
    explanation:
      "Discipline comes from love. Correction is how parents guide children away from harm and towards good habits.",
  },
  {
    id: 3,
    question: "In the gardener analogy, parents are compared to a gardener because they:",
    options: [
      "Decide exactly what shape every plant must take forever",
      "Water, protect and nurture a young plant so it can grow strong",
      "Keep the plant indoors so nothing can touch it",
      "Sell the plant once it has grown",
    ],
    correct: 1,
    explanation:
      "Like a gardener nurturing a sapling, parents feed, protect and patiently support a child until they can stand on their own.",
  },
  {
    id: 4,
    question: "How did Rama respond when King Dasharatha's promise sent him to the forest?",
    options: [
      "He argued against the decision",
      "He accepted it willingly out of respect for his father's word",
      "He asked the ministers to overturn it",
      "He left the kingdom in anger",
    ],
    correct: 1,
    explanation:
      "Rama obeyed his father without complaint, showing that honouring a parent's word can matter more than personal comfort.",
  },
  {
    id: 5,
    question: "Which of these best shows respect for parents in daily life?",
    options: [
      "Listening to them patiently and helping with work at home",
      "Obeying only when you want something",
      "Ignoring their advice because times have changed",
      "Speaking politely only in front of guests",
    ],
    correct: 0,
    explanation:
      "Respect is shown through everyday actions — listening, helping and speaking kindly, not just on special occasions.",
  },
  {
    id: 6,
    question: "Why are teachers said to take the place of parents?",
    options: [
      "They give students pocket money",
      "They guide, correct and shape students just as parents do",
      "They live with the students",
      "They are related to the students",
    ],
    correct: 1,
    explanation:
      "Teachers guide, correct and care for students' growth, so they deserve the same respect we give our parents.",
  },
  {
    id: 7,
    question: "What did Anne Sullivan do for Helen Keller?",
    options: [
      "She cured her blindness and deafness",
      "She taught her patiently to communicate and learn",
      "She wrote all of Helen's books for her",
      "She sent her to a special hospital",
    ],
    correct: 1,
    explanation:
      "With great patience, Anne Sullivan taught Helen Keller to communicate — proof of how a devoted teacher can transform a life.",
  },
  {
    id: 8,
    question: "Which is a traditional Indian way of showing respect to elders?",
    options: [
      "Waving from a distance",
      "Touching their feet and seeking their blessings",
      "Calling them by their first name",
      "Shaking hands firmly",
    ],
    correct: 1,
    explanation:
      "Touching the feet of elders and seeking their blessings is a long-standing way of expressing humility and respect.",
  },
  {
    id: 9,
    question:
      "In the story of the contest, how did Ganesha win by going around his parents?",
    options: [
      "He travelled around the world faster than Kartikeya",
      "He circled his parents, saying they were his whole world",
      "He refused to take part in the contest",
      "He asked his parents to declare him the winner",
    ],
    correct: 1,
    explanation:
      "Ganesha circled Shiva and Parvati, showing that for him his parents were the entire world — devotion valued above speed.",
  },
  {
    id: 10,
    question: "What is the best way to show gratitude to parents as they grow older?",
    options: [
      "Send them expensive gifts occasionally",
      "Care for them with time, attention and kindness",
      "Leave their care entirely to others",
      "Remember them only on festivals",
    ],
    correct: 1,
    explanation:
      "Gratitude is repaid with presence and care — spending time with parents and looking after them as they once looked after us.",
  },
];

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;
