import type { Student } from "./quiz-storage";

export interface PickResult {
  student: Student;
  /** selected ids after this pick (pool auto-resets when everyone was picked) */
  selectedIds: number[];
  poolReset: boolean;
}

export function pickStudent(students: Student[], selectedIds: number[]): PickResult | null {
  if (students.length === 0) return null;

  let pool = students.filter((s) => !selectedIds.includes(s.id));
  let poolReset = false;
  let history = selectedIds;

  if (pool.length === 0) {
    pool = students;
    history = [];
    poolReset = true;
  }

  const student = pool[Math.floor(Math.random() * pool.length)];
  return { student, selectedIds: [...history, student.id], poolReset };
}

export function shuffleNames(students: Student[], count: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(students[Math.floor(Math.random() * students.length)].name);
  }
  return names;
}
