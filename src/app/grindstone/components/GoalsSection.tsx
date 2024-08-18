import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// components
import ButtonTransparent from "@/components/ButtonTransparent";
import TimeProgressBar from "@/components/TimeProgressBar";

type Goal = {
  id: string;
  name: string;
  connectedHabit?: string; // Optional field for connected habit
  start_date: string; // Corrected to match your data structure
  end_date: string; // Corrected to match your data structure
};

type GoalsSectionProps = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
};

export default function GoalsSection({
  goals: initialGoals,
  loading,
  error,
}: GoalsSectionProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const router = useRouter();

  // Use useEffect to update goals state when initialGoals prop changes
  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  const handleGoalClick = (goalId: string) => {
    router.push(`/goal/${goalId}`);
  };

  const handleAddGoal = () => {
    console.log("Add Goal");
  };

  // Calculate the percentage of time passed
  const calculateTimePercentage = (start_date: string, end_date: string) => {
    const start = new Date(start_date).getTime();
    const end = new Date(end_date).getTime();
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const timePassed = now - start;

    return (timePassed / totalDuration) * 100;
  };

  return (
    <div className="w-full rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Goals</h3>
        <ButtonTransparent handleClick={handleAddGoal} title={"New Goal"} />
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {goals.length > 0 ? (
        <div>
          {goals.map((goal: Goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)} // Handle click for the entire goal
              className="bg-card-bg transition-all duration-300 flex flex-col md:flex-row gap-4 mb-4 p-4 rounded-lg cursor-pointer"
            >
              {/* Left Section: Name and Connected Habit */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-sm">{goal.name}</p>
                <p className="text-xs">
                  Connected habit: {goal.connectedHabit || "None"}
                </p>
              </div>

              {/* Right Section: End Date, Progress Bars */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <p className="text-xs text-right">End date: {goal.end_date}</p>

                {/* Progress Bar */}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs">Progress:</p>
                  <div className="relative w-1/2 md:w-3/4 h-1 bg-black rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full bg-green rounded-full"
                      style={{ width: "50%" }} // Example progress percentage
                    ></div>
                  </div>
                </div>

                {/* Time Remaining Bar */}
                <TimeProgressBar
                  startDate={goal.start_date}
                  endDate={goal.end_date}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No goals yet.</div>
      )}
    </div>
  );
}
