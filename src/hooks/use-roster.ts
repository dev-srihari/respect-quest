import { useCallback, useEffect, useState } from "react";
import {
  clearSelection,
  DEFAULT_STUDENTS,
  EMPTY_SELECTION,
  loadSelection,
  loadSound,
  loadStudents,
  nextId,
  saveSelection,
  saveSound,
  saveStudents,
  type Gender,
  type SelectionState,
  type Student,
} from "@/lib/quiz-storage";

/** Roster + selection history, hydrated from localStorage after mount (SSR safe). */
export function useRoster() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selection, setSelection] = useState<SelectionState>({ ...EMPTY_SELECTION });
  const [soundOn, setSoundOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStudents(loadStudents());
    setSelection(loadSelection());
    setSoundOn(loadSound());
    setReady(true);
  }, []);

  const commit = useCallback((list: Student[]) => {
    setStudents(list);
    saveStudents(list);
  }, []);

  const addStudent = useCallback(
    (name: string, gender: Gender) => {
      const clean = name.trim();
      if (!clean) return false;
      commit([...students, { id: nextId(students), name: clean, gender }]);
      return true;
    },
    [students, commit],
  );

  const renameStudent = useCallback(
    (id: number, name: string) => {
      const clean = name.trim();
      if (!clean) return false;
      commit(students.map((s) => (s.id === id ? { ...s, name: clean } : s)));
      return true;
    },
    [students, commit],
  );

  const setGender = useCallback(
    (id: number, gender: Gender) => {
      commit(students.map((s) => (s.id === id ? { ...s, gender } : s)));
    },
    [students, commit],
  );

  const removeStudent = useCallback(
    (id: number) => {
      commit(students.filter((s) => s.id !== id));
      const next: SelectionState = {
        ...selection,
        selectedGirls: selection.selectedGirls.filter((sid) => sid !== id),
        selectedBoys: selection.selectedBoys.filter((sid) => sid !== id),
      };
      setSelection(next);
      saveSelection(next);
    },
    [students, selection, commit],
  );

  const restoreDefaults = useCallback(() => {
    commit([...DEFAULT_STUDENTS]);
  }, [commit]);

  const updateSelection = useCallback((next: SelectionState) => {
    setSelection(next);
    saveSelection(next);
  }, []);

  const resetSelected = useCallback(() => {
    setSelection({ ...EMPTY_SELECTION });
    clearSelection();
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      saveSound(!on);
      return !on;
    });
  }, []);

  return {
    students,
    selection,
    soundOn,
    ready,
    addStudent,
    renameStudent,
    setGender,
    removeStudent,
    restoreDefaults,
    updateSelection,
    resetSelected,
    toggleSound,
  };
}
