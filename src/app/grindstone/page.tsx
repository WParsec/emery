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
  const authUser = useAuth();
  const router = useRouter();

  // State to manage user loading state
  const [loadingUser, setLoadingUser] = useState(true);
  const [userState, setUserState] = useState<any>(null);

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

  // Set user state and handle displayName loading
  useEffect(() => {
    if (authUser) {
      setUserState(authUser);

      // Check if the displayName is already set
      if (authUser.displayName) {
        setLoadingUser(false); // Stop loading if displayName is available
      } else {
        // Poll until displayName is available
        const checkDisplayName = setInterval(() => {
          if (authUser.displayName) {
            setLoadingUser(false); // Stop loading once displayName is set
            clearInterval(checkDisplayName); // Clear interval to stop polling
          }
        }, 100); // Check every 100ms
      }
    } else {
      setLoadingUser(false);
    }
  }, [authUser]);

  // Redirect to home page if user is not logged in
  useEffect(() => {
    if (!authUser && !loadingUser) {
      router.push("/");
    }
  }, [authUser, loadingUser, router]);

  if (loadingUser) {
    return <div>Loading user information...</div>; // Show loading state while waiting for displayName
  }

  if (!authUser) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-8">
      <DashboardHeader
        user={userState}
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
