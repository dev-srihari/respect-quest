# RESPECT Futuristic Quiz Show Redesign

## Goal
Transform the existing quiz into a premium cyan-and-purple educational quiz show without changing its quiz rules, student data, or offline behavior.

## Experience
- Add a brief educational loading sequence: “Preparing quiz,” “Loading questions,” “Preparing student selection,” and “Quiz ready.”
- Make the home screen unmistakably a quiz with the exact title, chapter, subtitle, presenters, “START QUIZ →,” “STUDENT ROSTER,” and quiz summary requested.
- Make student selection a friendly TV quiz-show moment: “WHO’S ANSWERING?”, a circular name carousel, dramatic slowdown, selected-name glow, “YOUR QUESTION IS READY,” and “CONTINUE →.”
- Make each question and its four answer choices the visual priority, with question number, answering student, score, and progress always clear.
- Show educational answer feedback: “CORRECT!” or “NOT QUITE,” the correct answer when needed, a short explanation, and restrained celebratory motion.
- Finish with “QUIZ COMPLETE!”, final score, encouragement, the respect quote, “PLAY AGAIN,” and “BACK TO HOME.”
- Keep a small AI learning orb using only friendly messages such as “Preparing your question,” “Choosing a student,” and “Nice work.”
- Carry the same friendly futuristic quiz language into student settings and presenter controls.

## Technical details
- Preserve React, TypeScript, TanStack routes, Tailwind v4, Motion, localStorage, sounds, keyboard controls, scoring, and alternating girl/boy no-repeat selection.
- Use semantic cyan, purple, success, danger, glass, glow, and subtle interface tokens in the global stylesheet.
- Use lightweight CSS and Motion effects only; respect reduced-motion settings and keep all effects offline-capable after initial loading.
- Update route metadata and load Space Grotesk plus DM Sans from the document head.
- Verify the full flow at desktop and mobile sizes, including selection, answering, completion, and roster editing.
- Remove military, weapons, combat, targeting, tactical, launch, and mission terminology throughout the visible interface.
