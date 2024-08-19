"use client";

import React, { useEffect, useState } from "react";

// components
import HabitsSection from "./HabitsSection";
import TasksSection from "./TaskSection";
import YourDayProgress from "./YourDayProgress";

type YourDayProps = {
  habits: any[];
  goals: any[];
  tasks: any[];
  habitLogs: any[];
  loading: boolean;
  error: string | null;
};

export default function YourDay({
  habits: initialHabits,
  tasks: initialTasks,
  habitLogs,
  loading,
  error,
}: YourDayProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [tasks, setTasks] = useState(initialTasks);
  const [completedItems, setCompletedItems] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    calculateProgress(habits, tasks);
  }, [habits, tasks]); // Depend on habits and tasks state

  const calculateProgress = (habits: any[], tasks: any[]) => {
    const total = tasks.length + habits.length;
    const completed =
      tasks.filter((task) => task.completed).length +
      habits.filter((habit) => habit.completed).length;

    setTotalItems(total);
    setCompletedItems(completed);
  };

  const handleHabitStatusChange = (updatedHabits: any[]) => {
    setHabits(updatedHabits); // Update the habits state
    calculateProgress(updatedHabits, tasks); // Recalculate progress with updated habits
  };

  const handleTaskStatusChange = (updatedTasks: any[]) => {
    setTasks(updatedTasks); // Update the tasks state
    calculateProgress(habits, updatedTasks); // Recalculate progress with updated tasks
  };

  return (
    <div className="bg-dark-gray text-white rounded-lg">
      <h2 className="text-md font-bold mb-4">Your Day</h2>
      <YourDayProgress
        completedItems={completedItems}
        totalItems={totalItems}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <HabitsSection
          habits={habits}
          loading={loading}
          error={error}
          onHabitStatusChange={handleHabitStatusChange} // Pass the callback function here
        />
        <TasksSection
          tasks={tasks}
          loading={loading}
          error={error}
          // onTaskStatusChange={handleTaskStatusChange} // Add a similar handler for tasks
        />
      </div>
    </div>
  );
}
