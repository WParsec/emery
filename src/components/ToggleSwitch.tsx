"use client";

import Switch from "@mui/material/Switch";
import { ChangeEvent, useState } from "react";

type HabitToggleProps = {
  habit: any;
  onToggleComplete: (habitId: string, completed: boolean) => void;
  loading: boolean;
  error: string | null;
};

type TaskToggleProps = {
  task: any;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  loading: boolean;
  error: string | null;
};

type GoalToggleProps = {
  goal: { id: string; completed: boolean };
  onToggleComplete: (goalId: string, completed: boolean) => void;
  loading: boolean;
  error: string | null;
};

type MilestoneToggleProps = {
  milestone: any;
  onToggleComplete: (milestoneId: string, completed: boolean) => void;
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

export function TaskToggle({
  task,
  onToggleComplete,
  loading,
  error,
}: TaskToggleProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent
    const newStatus = e.target.checked;
    setIsCompleted(newStatus);
    onToggleComplete(task.id, newStatus);
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

export function MilestoneToggle({
  milestone,
  onToggleComplete,
  loading,
  error,
}: MilestoneToggleProps) {
  const [isCompleted, setIsCompleted] = useState(milestone.completed);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent
    const newStatus = e.target.checked;
    setIsCompleted(newStatus);
    onToggleComplete(milestone.id, newStatus);
  };

  return (
    <div>
      <Switch
        checked={isCompleted}
        onChange={handleToggle}
        color="primary"
        inputProps={{ "aria-label": "milestone toggle" }}
        onClick={(e) => e.stopPropagation()}
        disabled={loading} // Disable the toggle while loading
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}

export function GoalToggle({
  goal,
  onToggleComplete,
  loading,
  error,
}: GoalToggleProps) {
  const [isCompleted, setIsCompleted] = useState(goal.completed);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newStatus = e.target.checked;
    setIsCompleted(newStatus);
    onToggleComplete(goal.id, newStatus);
  };

  return (
    <div>
      <Switch
        checked={isCompleted}
        onChange={handleToggle}
        color="primary"
        inputProps={{ "aria-label": "goal toggle" }}
        onClick={(e) => e.stopPropagation()}
        disabled={loading}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
