// components/HabitCard.tsx

import React from "react";
import HabitToggle from "@/components/ToggleSwitch";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
  times_per_week: number;
};

type HabitCardProps = {
  habit: Habit;
  onToggleComplete: (habitId: string, completed: boolean) => void;
  loading: boolean;
  error: string | null;
  onClick: (habitId: string) => void;
};

export default function HabitCard({
  habit,
  onToggleComplete,
  loading,
  error,
  onClick,
}: HabitCardProps) {
  return (
    <div
      onClick={() => onClick(habit.id)}
      className={`${
        habit.completed
          ? "bg-gradient-to-r from-dark-turquoise to-green"
          : "bg-card-bg"
      } transition-all duration-300 flex justify-between items-center mb-4 p-4 rounded-lg cursor-pointer`}
    >
      <div>
        <p className="text-sm">{habit.name}</p>
        <p className="text-xs">Interval: {habit.times_per_week} days/week</p>
      </div>
      <HabitToggle
        habit={habit}
        onToggleComplete={onToggleComplete}
        loading={loading}
        error={error}
      />
    </div>
  );
}
