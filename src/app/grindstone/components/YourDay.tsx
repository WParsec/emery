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
  onHabitUpdate: (updatedHabits: any[]) => void;
  onTaskUpdate: (updatedTasks: any[]) => void;
};

export default function YourDay({
  goals,
  habits,
  tasks,
  habitLogs,
  loading,
  error,
  onHabitUpdate,
  onTaskUpdate,
}: YourDayProps) {
  const [habitsState, setHabitsState] = useState<any[]>(habits);
  const [tasksState, setTasksState] = useState<any[]>(tasks);
  const [completedItems, setCompletedItems] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setHabitsState(habits); // Update state when props change
    setTasksState(tasks); // Update state when props change
  }, [habits, tasks]);

  useEffect(() => {
    calculateProgress(habitsState, tasksState);
  }, [habitsState, tasksState]); // Depend on habits and tasks state

  const calculateProgress = (habits: any[], tasks: any[]) => {
    const total = tasks.length + habits.length;
    const completed =
      tasks.filter((task) => task.completed).length +
      habits.filter((habit) => habit.completed).length;

    setTotalItems(total);
    setCompletedItems(completed);
  };

  const handleHabitStatusChange = (updatedHabits: any[]) => {
    setHabitsState(updatedHabits); // Update the habits state
    calculateProgress(updatedHabits, tasksState); // Recalculate progress with updated habits
    onHabitUpdate(updatedHabits); // Pass the updated habits array back to the parent component
  };

  const handleTaskStatusChange = (updatedTasks: any[]) => {
    setTasksState(updatedTasks); // Update the tasks state
    calculateProgress(habitsState, updatedTasks); // Recalculate progress with updated tasks
    onTaskUpdate(updatedTasks); // Pass the updated tasks array back to the parent component
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
          goals={goals}
          habits={habitsState}
          loading={loading}
          error={error}
          onHabitStatusChange={handleHabitStatusChange} // Pass the callback function here
        />
        <TasksSection
          goals={goals}
          tasks={tasksState}
          loading={loading}
          error={error}
          onTaskStatusChange={handleTaskStatusChange} // Add a similar handler for tasks
        />
      </div>
    </div>
  );
}
