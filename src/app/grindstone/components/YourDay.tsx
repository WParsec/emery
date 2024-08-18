"use client";

import React from "react";

// components
import HabitsSection from "./HabitsSection";
import ButtonTransparent from "@/components/ButtonTransparent";
import TasksSection from "./TaskSection";

type YourDayProps = {
  habits: any[];
  goals: any[];
  loading: boolean;
  error: string | null;
};

export default function YourDay({
  habits,
  goals,
  loading,
  error,
}: YourDayProps) {
  console.log("Habits in Your day:", habits);
  console.log("Goals:", goals);

  const tasks = [
    {
      id: "1",
      name: "Task 1",
      completed: false,
    },
    {
      id: "2",
      name: "Task 2",
      completed: true,
    },
    {
      id: "3",
      name: "Task 3",
      completed: false,
    },
  ];
  return (
    <div className="bg-dark-gray text-white rounded-lg">
      {/* Title */}
      <h2 className="text-md font-bold mb-4">Your Day</h2>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-card-bg rounded-full mb-8 md:w-1/4">
        <div
          className="absolute top-0 left-0 h-full bg-green rounded-full"
          style={{ width: "50%" }} // Example progress percentage
        ></div>
      </div>

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
