export type Gender = "girl" | "boy";

export interface Student {
  id: number;
  name: string;
  gender: Gender;
}

/** Temporary, per-session selection pools */
export interface SelectionState {
  selectedGirls: number[];
  selectedBoys: number[];
  nextGender: Gender;
}

export const STUDENTS_KEY = "respect_quiz_students";
export const SELECTED_KEY = "respect_quiz_selected";
export const SOUND_KEY = "respect_quiz_sound";

const DEFAULT_NAMES: Array<[string, Gender]> = [
  ["Pooja", "girl"],
  ["Arjun", "boy"],
  ["Avani", "girl"],
  ["Rahul", "boy"],
  ["Anu", "girl"],
  ["Sri Hari", "boy"],
  ["Meera", "girl"],
  ["Karthik", "boy"],
  ["Diya", "girl"],
  ["Rohan", "boy"],
];

export const DEFAULT_STUDENTS: Student[] = DEFAULT_NAMES.map(([name, gender], i) => ({
  id: i + 1,
  name,
  gender,
}));

export const EMPTY_SELECTION: SelectionState = {
  selectedGirls: [],
  selectedBoys: [],
  nextGender: "girl",
};

const hasStorage = () => typeof window !== "undefined" && !!window.localStorage;

function safeRead<T>(key: string): unknown | null {
  if (!hasStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown) {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the app keeps working in memory */
  }
}

function sanitizeStudents(value: unknown): Student[] | null {
  const list = Array.isArray(value)
    ? value
    : value && typeof value === "object" && Array.isArray((value as { students?: unknown }).students)
      ? (value as { students: unknown[] }).students
      : null;
  if (!list) return null;

  const seenIds = new Set<number>();
  const clean: Student[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const rec = item as { id?: unknown; name?: unknown; gender?: unknown };
    const name = typeof rec.name === "string" ? rec.name.trim() : "";
    if (!name) continue;
    const gender: Gender = rec.gender === "boy" ? "boy" : "girl";
    let id = typeof rec.id === "number" && Number.isFinite(rec.id) ? Math.trunc(rec.id) : NaN;
    if (!Number.isFinite(id) || seenIds.has(id) || id <= 0) {
      id = nextId(clean);
    }
    seenIds.add(id);
    clean.push({ id, name, gender });
  }
  return clean;
}

export function nextId(students: Student[]): number {
  return students.reduce((max, s) => Math.max(max, s.id), 0) + 1;
}

/** PERMANENT roster */
export function loadStudents(): Student[] {
  const parsed = sanitizeStudents(safeRead(STUDENTS_KEY));
  if (parsed === null) {
    saveStudents(DEFAULT_STUDENTS);
    return [...DEFAULT_STUDENTS];
  }
  return parsed;
}

export function saveStudents(students: Student[]) {
  safeWrite(STUDENTS_KEY, { students });
}

const numbers = (value: unknown): number[] =>
  Array.isArray(value) ? value.filter((n): n is number => typeof n === "number" && Number.isFinite(n)) : [];

/** TEMPORARY selection history for the current session */
export function loadSelection(): SelectionState {
  const value = safeRead(SELECTED_KEY);
  if (!value || typeof value !== "object") return { ...EMPTY_SELECTION };
  const rec = value as {
    selectedGirls?: unknown;
    selectedBoys?: unknown;
    nextGender?: unknown;
  };
  return {
    selectedGirls: numbers(rec.selectedGirls),
    selectedBoys: numbers(rec.selectedBoys),
    nextGender: rec.nextGender === "boy" ? "boy" : "girl",
  };
}

export function saveSelection(state: SelectionState) {
  safeWrite(SELECTED_KEY, state);
}

export function clearSelection() {
  saveSelection({ ...EMPTY_SELECTION });
}

export function loadSound(): boolean {
  const value = safeRead(SOUND_KEY);
  return typeof value === "boolean" ? value : true;
}

export function saveSound(on: boolean) {
  safeWrite(SOUND_KEY, on);
}
