import React from "react";
import { GoalToggle } from "@/components/ToggleSwitch";

type GoalCompleteProps = {
  handleComplete: (goalId: string, completed: boolean) => void;
  goal: { id: string; completed: boolean };
  loading: boolean;
  error: string | null;
};

export default function GoalComplete({
  handleComplete,
  goal,
  loading,
  error,
}: GoalCompleteProps) {
  return (
    <div className="flex justify-between">
      <div>
        <p>Goal Reached:</p>
      </div>
      <div>
        <GoalToggle
          error={error}
          loading={loading}
          goal={goal}
          onToggleComplete={handleComplete}
        />
      </div>
    </div>
  );
}
