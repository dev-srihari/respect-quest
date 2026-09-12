# RESPECT AI Command Center Redesign

## Goal
Transform the existing quiz into a cinematic cyan-and-purple classroom command center without changing its quiz rules, student data, or offline behavior.

## Experience
- Add a one-time opening boot sequence with staged initialization percentages and a cinematic RESPECT reveal.
- Recompose the home screen as a HUD dashboard with a prominent start control, AI host orb, roster status, animated grid, particles, scanner rings, and subtle light beams.
- Turn random selection into the main spectacle: circular scanner, rapidly cycling names, dramatic slowdown, gender indicator, selected-name glow, and AI status messages.
- Restyle questions as a projection-friendly glass command panel with permanent question, score, student, and remaining-student status.
- Add clear correct/wrong animations, short explanations, restrained confetti, and an animated mission-complete finale.
- Carry the same visual language into student settings and presenter controls.

## Technical details
- Preserve React, TypeScript, TanStack routes, Tailwind v4, Motion, localStorage, sounds, keyboard controls, scoring, and alternating girl/boy no-repeat selection.
- Use semantic cyan, purple, success, danger, glass, glow, and HUD tokens in the global stylesheet.
- Use lightweight CSS and Motion effects only; respect reduced-motion settings and keep all effects offline-capable after initial loading.
- Update route metadata and load Space Grotesk plus DM Sans from the document head.
- Verify the full flow at desktop and mobile sizes, including selection, answering, completion, and roster editing.
