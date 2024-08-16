"use client";

import React from "react";

type HabitsSectionProps = {
  habits: any[];
  loading: boolean;
  error: string | null;
};

export default function HabitsSection({
  habits,
  loading,
  error,
}: HabitsSectionProps) {
  return (
    <div className="w-full md:w-1/2 border border-card-bg p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Habits</h3>
        <button className="bg-green text-white px-4 py-2 rounded-lg">
          Add Habit
        </button>
      </div>
      {loading ? <div>Loading...</div> : null}
      {habits.length > 0 ? <div></div> : <div>No habits yet.</div>}
    </div>
  );
}
