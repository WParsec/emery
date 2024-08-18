"use client";

import Switch from "@mui/material/Switch";
import { ChangeEvent, useState } from "react";

type HabitToggleProps = {
  habit: any;
  onToggleComplete: (habitId: string, completed: boolean) => void;
  loading: boolean;
  error: string | null;
};

export default function HabitToggle({
  habit,
  onToggleComplete,
  loading,
  error,
}: HabitToggleProps) {
  const [isCompleted, setIsCompleted] = useState(habit.completed);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent
    const newStatus = e.target.checked;
    setIsCompleted(newStatus);
    onToggleComplete(habit.id, newStatus);
  };

  return (
    <div>
      <Switch
        checked={isCompleted}
        onChange={handleToggle}
        color="primary"
        inputProps={{ "aria-label": "habit toggle" }}
        onClick={(e) => e.stopPropagation()}
        disabled={loading} // Disable the toggle while loading
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}
