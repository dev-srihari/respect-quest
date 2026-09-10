# Respect Quest

CREATE A COMPLETE INTERACTIVE QUIZ WEBSITE FOR OUR CLASS 9 MORAL SCIENCE SEMINAR.

PROJECT TITLE:
RESPECT — Chapter 3 Interactive Quiz

CHAPTER:
Chapter 3 — Respecting Parents and Others

PRESENTERS:
Sri Hari • Pooja • Aavani

This website will be opened from our PowerPoint presentation during a live classroom seminar. It should feel like a polished, futuristic classroom game — NOT like a normal boring quiz website.

IMPORTANT:
Build the entire website from scratch.
Do NOT use Supabase, Firebase, a backend, authentication, or any external database.

The student list must be stored locally as JSON data using browser localStorage.

1. TECHNOLOGY

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui where useful

Framer Motion or equivalent for animations

localStorage for student data and quiz session data

The website must be responsive and work well on:

Classroom laptop

Desktop

Phone

Projector/screen

2. VISUAL STYLE

Create a DARK futuristic presentation/game interface.

Do NOT use a white background.

Style:

Deep dark background

Futuristic UI

Subtle glowing effects

Glass-like panels

Large typography

Smooth transitions

Clean spacing

Minimal but impressive

No excessive decoration

No childish cartoon design

It should feel like:
"AI classroom control panel + futuristic quiz show"

Use animations when:

Starting the quiz

Selecting a random student

Moving between questions

Showing the answer

Completing the quiz

Keep animations fast enough for a live classroom.

3. HOME SCREEN

Create a strong opening screen:

RESPECT

CHAPTER 3
INTERACTIVE QUIZ

"Respecting Parents and Others"

Presented by:

Sri Hari • Pooja • Aavani

Large button:

[ START QUIZ ]

Also provide:

[ STUDENT SETTINGS ]

The main START QUIZ button should immediately enter the classroom quiz experience.

4. STUDENT DATA — LOCAL JSON ONLY

Do NOT use a backend.

Create a TypeScript data structure representing JSON data:

{
"students": [
{ "id": 1, "name": "Student 1" },
{ "id": 2, "name": "Student 2" },
{ "id": 3, "name": "Student 3" },
{ "id": 4, "name": "Student 4" },
{ "id": 5, "name": "Student 5" },
{ "id": 6, "name": "Student 6" },
{ "id": 7, "name": "Student 7" },
{ "id": 8, "name": "Student 8" },
{ "id": 9, "name": "Student 9" },
{ "id": 10, "name": "Student 10" }
]
}

Save this data to localStorage.

Use a key such as:

respect_quiz_students

When the website opens:

Load the saved student list.

If no saved list exists, create the default list.

If saved data is invalid, safely fall back to defaults.

The student names must remain saved after refreshing or reopening the website in the same browser.

5. STUDENT MANAGEMENT

Create a SETTINGS page/panel called:

STUDENT ROSTER

Show all students.

Example:

STUDENT ROSTER

01 Student 1 EDIT DELETE
02 Student 2 EDIT DELETE
03 Student 3 EDIT DELETE

[ + ADD STUDENT ]

Allow the presenter to:

Add students

Edit names

Delete students

Restore default students

Reset the random-selection history

Do NOT require a login.

Do NOT send student names anywhere.

Everything stays in localStorage.

6. RANDOM STUDENT SELECTOR

This is one of the MOST IMPORTANT features.

Before each question, show:

WHO'S UP?

Then a large futuristic random-selection animation.

Example animation:

Student 4
Student 9
Student 2
Student 7
Student 1
Student 8
...

Then stop on one student.

Display:

🎯
STUDENT SELECTED

"Student 7"

The selected student should remain clearly visible.

There must be a:

[ RANDOMIZE ]

button.

7. NO REPEATS

During one quiz session, do NOT select the same student twice until every student has been selected.

Maintain temporary data like:

{
"selectedStudentIds": [2, 7, 4]
}

Save it locally as:

respect_quiz_selected

When a new quiz begins:

selectedStudentIds = []

When all students have been selected, automatically reset the selection pool and continue.

Important:

Selecting a student must NEVER delete them from the permanent student roster.

8. QUIZ QUESTIONS

Create 10 multiple-choice questions based ONLY on the Class 9 Moral Science Chapter 3:

"Respecting Parents and Others"

The questions should cover:

Parents' unconditional love

Love and discipline

Gardener analogy

Rama and King Dasharatha

Respecting parents

Teachers taking the place of parents

Helen Keller and Anne Sullivan

Traditional ways of showing respect

Ganesha and his parents

Gratitude and caring for parents

Each question must have:

One correct answer

Three plausible incorrect answers

Clear wording suitable for Class 9

No trick questions

Do NOT introduce facts outside the chapter unnecessarily.

9. QUESTION FLOW

The classroom experience should work like this:

STEP 1

Display:

WHO'S UP?

Randomly select a student.

STEP 2

Display:

QUESTION 01 / 10

Show the question.

Then show four large answer buttons:

A
B
C
D

STEP 3

The presenter/student chooses an answer.

STEP 4

Immediately show:

CORRECT ✓

or

NOT QUITE

Then briefly explain WHY the answer is correct.

Keep the explanation short enough for classroom use.

STEP 5

Button:

[ NEXT ]

Then return to the random student selection.

Repeat.

10. SCORE

Track:

Questions answered

Correct answers

Incorrect answers

Total score

Display a small progress indicator:

03 / 10

and:

SCORE: 2

Do not make the score overly complicated.

11. FINAL QUIZ SCREEN

After question 10:

QUIZ COMPLETE

Display:

YOUR SCORE

8 / 10

Then:

"Respect isn't just something we say.
It's something we show."

Buttons:

[ PLAY AGAIN ]

[ HOME ]

Also show:

Sri Hari • Pooja • Aavani

12. PRESENTER CONTROL

Create a simple presenter/settings panel.

Include:

STUDENT ROSTER

QUIZ STATUS

Current question:
3 / 10

Score:
2 / 3

Selected students:
3 / 10

Controls:

[ RESET SELECTED STUDENTS ]

[ RESTART QUIZ ]

[ MANAGE STUDENTS ]

[ HOME ]

This should be easy to operate during a live presentation.

13. KEYBOARD CONTROLS

Add optional keyboard controls for classroom convenience:

1 / 2 / 3 / 4
→ Select answer

N
→ Next

R
→ Randomize student

ESC
→ Open/close presenter controls

Do not let keyboard shortcuts interfere with text input fields.

14. SOUND

Add a settings toggle:

SOUND ON / OFF

If sound is implemented, use only subtle UI sounds.

Do not make it annoying or loud.

The website must work perfectly with sound disabled.

15. POWERPOINT CONNECTION

The website will be launched from a PowerPoint slide titled:

ENOUGH TALK.

The PowerPoint will contain:

"You've heard the story.
Now let's see what you remember."

START THE QUIZ →

The website must therefore open directly to the quiz home screen and look professional immediately.

IMPORTANT:
Do not assume or invent the PowerPoint URL.

The final website's deployed URL will later be added manually to the PowerPoint button and QR code.

Make sure the website has a clean standalone URL when deployed.

16. RETURN TO POWERPOINT

The website does NOT need to control PowerPoint.

After completing the quiz, the presenters will manually return to the PowerPoint.

The final quiz screen should therefore make it obvious that the quiz is finished.

17. EMPTY STUDENT LIST

If all students are deleted, show:

NO STUDENTS

"Add students before starting the quiz."

Button:

[ + ADD STUDENT ]

Do not allow random selection until at least one student exists.

18. DATA STRUCTURE

Keep the code organized.

Separate:

Student data

Quiz questions

localStorage utilities

Random selection logic

Quiz state

UI components

Do not put everything into one giant component.

Create reusable components where appropriate.

19. IMPORTANT DATA RULE

There are TWO different types of data:

PERMANENT:

respect_quiz_students

Contains the student roster.

TEMPORARY:

respect_quiz_selected

Contains IDs of students already selected during the current quiz session.

Never mix these two.

Deleting/resetting selected students must NOT delete the roster.

20. EMPTY / ERROR HANDLING

Handle:

Corrupted localStorage

Missing localStorage

Duplicate student names

Empty names

Student deletion

Zero students

Refreshing the page

Restarting the quiz

The application should never crash because of invalid student data.

Trim whitespace from names.

Do not allow completely empty student names.

21. FINAL UX GOAL

The entire experience should feel like this:

POWERPOINT

↓
"ENOUGH TALK."

↓
START THE QUIZ →

↓
QUIZ WEBSITE

↓
RESPECT
CHAPTER 3
INTERACTIVE QUIZ

↓
START QUIZ

↓
WHO'S UP?

↓
RANDOM STUDENT

↓
QUESTION

↓
ANSWER

↓
FEEDBACK

↓
NEXT STUDENT

↓
QUESTION

↓
...

↓
QUIZ COMPLETE

↓
RETURN TO POWERPOINT

The quiz should make the seminar feel interactive and memorable rather than simply showing information on slides.

IMPORTANT:
Do not add unnecessary features.
Do not add a backend.
Do not add authentication.
Do not add advertisements.
Do not add external student databases.

Build a polished, working classroom quiz application from scratch.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4cf57741-9860-4f07-965b-3605c491b123).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
