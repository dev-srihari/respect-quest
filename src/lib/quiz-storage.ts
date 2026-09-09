export interface Student {
  id: number;
  name: string;
}

export const STUDENTS_KEY = "respect_quiz_students";
export const SELECTED_KEY = "respect_quiz_selected";
export const SOUND_KEY = "respect_quiz_sound";

export const DEFAULT_STUDENTS: Student[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
}));

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
    const rec = item as { id?: unknown; name?: unknown };
    const name = typeof rec.name === "string" ? rec.name.trim() : "";
    if (!name) continue;
    let id = typeof rec.id === "number" && Number.isFinite(rec.id) ? Math.trunc(rec.id) : NaN;
    if (!Number.isFinite(id) || seenIds.has(id) || id <= 0) {
      id = nextId(clean);
    }
    seenIds.add(id);
    clean.push({ id, name });
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

/** TEMPORARY selection history for the current session */
export function loadSelectedIds(): number[] {
  const value = safeRead(SELECTED_KEY);
  const list =
    value && typeof value === "object" && Array.isArray((value as { selectedStudentIds?: unknown }).selectedStudentIds)
      ? (value as { selectedStudentIds: unknown[] }).selectedStudentIds
      : Array.isArray(value)
        ? value
        : [];
  return list.filter((n): n is number => typeof n === "number" && Number.isFinite(n));
}

export function saveSelectedIds(selectedStudentIds: number[]) {
  safeWrite(SELECTED_KEY, { selectedStudentIds });
}

export function clearSelectedIds() {
  saveSelectedIds([]);
}

export function loadSound(): boolean {
  const value = safeRead(SOUND_KEY);
  return typeof value === "boolean" ? value : true;
}

export function saveSound(on: boolean) {
  safeWrite(SOUND_KEY, on);
}
