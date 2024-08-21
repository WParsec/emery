"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// components
import DashboardHeader from "./components/DashboardHeader";
import YourDay from "./components/YourDay";
import GoalsSection from "./components/GoalsSection";

// utils
import useFetchUserData from "@/hooks/useFetchUserData";

export default function Grindstone() {
  const user = useAuth();
  const router = useRouter();

  // Fetch user data
  const {
    habits: initialHabits,
    goals,
    tasks: initialTasks,
    habitLogs,
    loading,
    error,
  } = useFetchUserData();

  const [habits, setHabits] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (initialHabits && initialHabits.length > 0) {
      setHabits(initialHabits);
    }
    if (initialTasks && initialTasks.length > 0) {
      setTasks(initialTasks);
    }
  }, [initialHabits, initialTasks]);

  const handleHabitUpdate = (updatedHabits: any[]) => {
    setHabits(updatedHabits);
  };

  const handleTaskUpdate = (updatedTasks: any[]) => {
    setTasks(updatedTasks);
  };

  // Get the user's display name and route if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-8">
      <DashboardHeader
        user={user}
        habits={habits}
        goals={goals}
        loading={loading}
      />
      <YourDay
        habits={habits}
        goals={goals}
        loading={loading}
        error={error}
        habitLogs={habitLogs}
        tasks={tasks}
        onHabitUpdate={handleHabitUpdate}
        onTaskUpdate={handleTaskUpdate}
      />
      <GoalsSection goals={goals} loading={loading} error={error} />
    </div>
  );
}
