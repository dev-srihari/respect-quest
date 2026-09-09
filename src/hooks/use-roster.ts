import { useCallback, useEffect, useState } from "react";
import {
  clearSelectedIds,
  DEFAULT_STUDENTS,
  loadSelectedIds,
  loadSound,
  loadStudents,
  nextId,
  saveSelectedIds,
  saveSound,
  saveStudents,
  type Student,
} from "@/lib/quiz-storage";

/** Roster + selection history, hydrated from localStorage after mount (SSR safe). */
export function useRoster() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStudents(loadStudents());
    setSelectedIds(loadSelectedIds());
    setSoundOn(loadSound());
    setReady(true);
  }, []);

  const commit = useCallback((list: Student[]) => {
    setStudents(list);
    saveStudents(list);
  }, []);

  const addStudent = useCallback(
    (name: string) => {
      const clean = name.trim();
      if (!clean) return false;
      commit([...students, { id: nextId(students), name: clean }]);
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

  const removeStudent = useCallback(
    (id: number) => {
      commit(students.filter((s) => s.id !== id));
      const nextSelected = selectedIds.filter((sid) => sid !== id);
      setSelectedIds(nextSelected);
      saveSelectedIds(nextSelected);
    },
    [students, selectedIds, commit],
  );

  const restoreDefaults = useCallback(() => {
    commit([...DEFAULT_STUDENTS]);
  }, [commit]);

  const updateSelected = useCallback((ids: number[]) => {
    setSelectedIds(ids);
    saveSelectedIds(ids);
  }, []);

  const resetSelected = useCallback(() => {
    setSelectedIds([]);
    clearSelectedIds();
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      saveSound(!on);
      return !on;
    });
  }, []);

  return {
    students,
    selectedIds,
    soundOn,
    ready,
    addStudent,
    renameStudent,
    removeStudent,
    restoreDefaults,
    updateSelected,
    resetSelected,
    toggleSound,
  };
}
