import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RosterManager } from "@/components/quiz/RosterManager";
import { useRoster } from "@/hooks/use-roster";

export const Route = createFileRoute("/roster")({
  head: () => ({
    meta: [
      { title: "Student Roster — RESPECT Chapter 3 Quiz" },
      {
        name: "description",
        content:
          "Add, rename or remove students for the RESPECT Chapter 3 classroom quiz. Saved privately in this browser.",
      },
      { property: "og:title", content: "Student Roster — RESPECT Chapter 3 Quiz" },
      {
        property: "og:description",
        content: "Manage the class list used by the RESPECT Chapter 3 classroom quiz.",
      },
    ],
  }),
  component: RosterPage,
});

function RosterPage() {
  const roster = useRoster();

  return (
    <main className="grid-backdrop min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="display-title glow-text text-2xl text-primary sm:text-3xl">
            Student Settings
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={roster.resetSelected}>
              Reset selection history
            </Button>
            <Link to="/">
              <Button variant="outline" className="display-title border-primary/40 bg-transparent">
                Home
              </Button>
            </Link>
          </div>
        </header>

        <section className="glass rounded-3xl p-6 sm:p-8">
          {roster.ready ? (
            <RosterManager
              students={roster.students}
              onAdd={roster.addStudent}
              onRename={roster.renameStudent}
              onRemove={roster.removeStudent}
              onRestoreDefaults={roster.restoreDefaults}
            />
          ) : (
            <p className="text-muted-foreground">Loading roster…</p>
          )}
        </section>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Names stay in this browser only — nothing is uploaded.
          </p>
          <Button variant="ghost" onClick={roster.toggleSound} className="display-title text-xs">
            Sound {roster.soundOn ? "on" : "off"}
          </Button>
        </div>
      </div>
    </main>
  );
}
