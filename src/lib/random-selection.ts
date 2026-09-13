import type { Gender, SelectionState, Student } from "./quiz-storage";

export interface PickResult {
  student: Student;
  /** selection state after this pick */
  selection: SelectionState;
  poolReset: boolean;
}

const other = (g: Gender): Gender => (g === "boy" ? "girl" : "boy");

const activeUsedIds = (roster: Student[], used: number[]) => {
  const ids = new Set(roster.map((student) => student.id));
  return used.filter((id) => ids.has(id));
};

/**
 * Picks a random student of the requested gender, alternating girl → boy → girl…
 * Falls back to the other gender when the requested one has no students at all,
 * and resets only that gender's pool when everyone in it has been called.
 */
export function pickStudent(students: Student[], state: SelectionState): PickResult | null {
  if (students.length === 0) return null;

  const girls = students.filter((student) => student.gender === "girl");
  const boys = students.filter((student) => student.gender === "boy");
  const selectedGirls = activeUsedIds(girls, state.selectedGirls);
  const selectedBoys = activeUsedIds(boys, state.selectedBoys);
  let gender = state.nextGender;
  if (!students.some((student) => student.gender === gender)) gender = other(gender);
  const roster = students.filter((s) => s.gender === gender);
  if (roster.length === 0) return null;

  let used = gender === "girl" ? selectedBoys : selectedGirls;
  let pool = roster.filter((s) => !used.includes(s.id));
  let poolReset = false;

  if (pool.length === 0) {
    pool = roster;
    used = [];
    poolReset = true;
  }

  const student = pool[Math.floor(Math.random() * pool.length)];
  if (!student) return null;
  const nextUsed = [...used, student.id];

  const selection: SelectionState = {
    selectedGirls: gender === "girl" ? nextUsed : selectedGirls,
    selectedBoys: gender === "boy" ? nextUsed : selectedBoys,
    nextGender: other(gender),
  };

  return { student, selection, poolReset };
}

export function shuffleNames(students: Student[], count: number, gender?: Gender): string[] {
  const pool = gender ? students.filter((s) => s.gender === gender) : students;
  const source = pool.length > 0 ? pool : students;
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(source[Math.floor(Math.random() * source.length)].name);
  }
  return names;
}
