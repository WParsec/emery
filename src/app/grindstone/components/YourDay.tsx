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
  habits,
  tasks,
  habitLogs,
  loading,
  error,
}: YourDayProps) {
  const [completedItems, setCompletedItems] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate the total and completed items whenever habits, tasks, or habitLogs change
  useEffect(() => {
    console.log("Calculating progress...");
    console.log("Habits:", habits);
    console.log("Tasks:", tasks);

    const total = tasks.length + habits.length;
    const completed =
      tasks.filter((task) => task.completed).length +
      habits.filter((habit) => habit.completed).length;

    setTotalItems(total);
    setCompletedItems(completed);

    console.log("Total Items:", total);
    console.log("Completed Items:", completed);
  }, [tasks, habits, habitLogs]);

  return (
    <div className="bg-dark-gray text-white rounded-lg">
      {/* Title */}
      <h2 className="text-md font-bold mb-4">Your Day</h2>

      {/* Progress Bar */}
      <YourDayProgress
        completedItems={completedItems}
        totalItems={totalItems}
      />

      {/* Main Sections: Habits and Single Tasks */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Habits Section */}
        <HabitsSection habits={habits} loading={loading} error={error} />

        {/* Single Tasks Section */}
        <TasksSection tasks={tasks} loading={loading} error={error} />
      </div>
    </div>
  );
}
