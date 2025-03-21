import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Dumbbell } from "lucide-react";
// import WorkoutForm from "./workout-form"
// import WorkoutList from "./workout-list"
// import WorkoutProgress from "./workout-progress"
import type { Workout } from "@/lib/types";
import { Outlet } from "react-router";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState("workouts");
  const [isCreating, setIsCreating] = useState(false);

  // Load workouts from localStorage on component mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (workout: Workout) => {
    setWorkouts([...workouts, workout]);
    setIsCreating(false);
  };

  const handleUpdateWorkout = (updatedWorkout: Workout) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      )
    );
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">Workout Tracker</h1>
          <nav className="space-y-2">
            <Button
              variant={activeTab === "workouts" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "workouts" ? "" : "text-muted-foreground"
                }`}
              onClick={() => setActiveTab("workouts")}
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Workouts
            </Button>
            <Button
              variant={activeTab === "progress" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "progress" ? "" : "text-muted-foreground"
                }`}
              onClick={() => setActiveTab("progress")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress
            </Button>
          </nav>

          {activeTab === "workouts" && !isCreating && (
            <Button onClick={() => setIsCreating(true)} className="w-full mt-6">
              <Plus className="h-4 w-4 mr-2" />
              New Workout
            </Button>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 lg:hidden">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Workout Tracker</h1>
            {activeTab === "workouts" && !isCreating && (
              <Button
                onClick={() => setIsCreating(true)}
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-4 pb-20 lg:pb-4 lg:px-6 lg:py-6">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
          <div className="flex justify-around items-center h-16">
            <Button
              variant={activeTab === "workouts" ? "default" : "ghost"}
              className={`flex-1 h-full rounded-none flex flex-col items-center justify-center gap-1 ${activeTab === "workouts"
                  ? "bg-accent/10 text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              onClick={() => setActiveTab("workouts")}
            >
              <Dumbbell className="h-4 w-4" />
              <span className="text-xs">Workouts</span>
            </Button>
            <Button
              variant={activeTab === "progress" ? "default" : "ghost"}
              className={`flex-1 h-full rounded-none flex flex-col items-center justify-center gap-1 ${activeTab === "progress"
                  ? "bg-accent/10 text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              onClick={() => setActiveTab("progress")}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Progress</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
