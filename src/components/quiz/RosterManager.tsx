import { useState } from "react";
import { motion } from "motion/react";
import { Pencil, Plus, RotateCcw, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Gender, Student } from "@/lib/quiz-storage";

interface Props {
  students: Student[];
  onAdd: (name: string, gender: Gender) => boolean;
  onRename: (id: number, name: string) => boolean;
  onGenderChange: (id: number, gender: Gender) => void;
  onRemove: (id: number) => void;
  onRestoreDefaults: () => void;
  compact?: boolean;
}

const selectClass =
  "h-9 rounded-lg border border-border/60 bg-background/40 px-2 text-sm text-foreground outline-none focus:border-primary/60";

export function RosterManager({
  students,
  onAdd,
  onRename,
  onGenderChange,
  onRemove,
  onRestoreDefaults,
  compact,
}: Props) {
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState<Gender>("girl");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const submitNew = () => {
    if (!onAdd(newName, newGender)) {
      setError("Please enter a name.");
      return;
    }
    setError("");
    setNewName("");
  };

  const duplicate = (name: string, id?: number) =>
    students.some((s) => s.id !== id && s.name.toLowerCase() === name.trim().toLowerCase());

  const girls = students.filter((s) => s.gender === "girl").length;
  const boys = students.length - girls;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="display-title text-lg text-primary">Student roster</h2>
          <p className="text-xs text-muted-foreground">
            {girls} girls · {boys} boys
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestoreDefaults}
          className="text-muted-foreground"
        >
          <RotateCcw className="size-4" /> Restore defaults
        </Button>
      </div>

      {students.length === 0 ? (
        <div className="glass rounded-2xl px-6 py-10 text-center">
          <p className="display-title text-lg">No students</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add students before starting the quiz.
          </p>
        </div>
      ) : (
        <ul className={compact ? "max-h-64 space-y-2 overflow-y-auto pr-1" : "space-y-2"}>
          {students.map((student, i) => (
            <motion.li
              key={student.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass flex flex-wrap items-center gap-3 rounded-xl px-4 py-3"
            >
              <span className="display-title w-8 text-xs text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {editingId === student.id ? (
                <>
                  <Input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && onRename(student.id, draft)) setEditingId(null);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="h-9 min-w-32 flex-1 bg-background/40"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onRename(student.id, draft) && setEditingId(null)}
                  >
                    <Check className="size-4 text-success" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                    <X className="size-4" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="min-w-24 flex-1 truncate text-base">
                    {student.name}
                    {duplicate(student.name, student.id) && (
                      <span className="ml-2 text-xs text-accent">duplicate name</span>
                    )}
                  </span>
                  <select
                    aria-label={`Gender for ${student.name}`}
                    value={student.gender}
                    onChange={(e) => onGenderChange(student.id, e.target.value as Gender)}
                    className={selectClass}
                  >
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                  </select>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Edit ${student.name}`}
                    onClick={() => {
                      setEditingId(student.id);
                      setDraft(student.name);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Delete ${student.name}`}
                    onClick={() => onRemove(student.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </>
              )}
            </motion.li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={newName}
          placeholder="New student name"
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitNew()}
          className="h-11 max-w-xs bg-background/40"
        />
        <select
          aria-label="Gender for new student"
          value={newGender}
          onChange={(e) => setNewGender(e.target.value as Gender)}
          className={`${selectClass} h-11`}
        >
          <option value="girl">Girl</option>
          <option value="boy">Boy</option>
        </select>
        <Button onClick={submitNew} className="display-title h-11">
          <Plus className="size-4" /> Add student
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
