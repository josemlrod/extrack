import { NavLink, Outlet, useMatch } from "react-router";
import { Plus, BarChart3, Dumbbell } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/layout";

export default function WorkoutTracker({ }: Route.ComponentProps) {
  const disableNewWorkout = !useMatch({ path: "/workouts", end: false });

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">Workout Tracker</h1>
          <nav className="space-y-2">
            <NavLink
              to="/workouts"
              aria-label="Navigation item"
              viewTransition
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "link" }),
                  isActive ? "underline" : "text-muted-foreground"
                )
              }
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Workouts
            </NavLink>
            <NavLink
              to="/progress"
              aria-label="Navigation item"
              viewTransition
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "link" }),
                  isActive ? "underline" : "text-muted-foreground"
                )
              }
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress
            </NavLink>
          </nav>

          <Button
            disabled={disableNewWorkout}
            onClick={() => { }}
            className="w-full mt-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Workout
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 lg:hidden">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Workout Tracker</h1>
            <Button
              disabled={disableNewWorkout}
              onClick={() => { }}
              size="sm"
              className="rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-4 pb-20 lg:pb-4 lg:px-6 lg:py-6">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
          <div className="flex justify-around items-center h-16">
            <NavLink
              viewTransition
              to="/workouts"
              aria-label="Navigation item"
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 h-full rounded-none flex flex-col items-center justify-center gap-1",
                  isActive
                    ? "bg-accent/10 text-primary border-t-2 border-primary"
                    : "bg-transparent text-secondary-foreground border-0 border-secondary-foreground"
                )
              }
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Workouts
            </NavLink>
            <NavLink
              to="/progress"
              aria-label="Navigation item"
              viewTransition
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 h-full rounded-none flex flex-col items-center justify-center gap-1",
                  isActive
                    ? "bg-accent/10 text-primary border-t-2 border-primary"
                    : "bg-transparent text-secondary-foreground border-0 border-secondary-foreground"
                )
              }
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
