import React from "react";
import TimeProgressBar from "@/components/TimeProgressBar";

type GoalCardProps = {
  goal: any;
  handleGoalClick: (id: string) => void;
};

const GoalCard = ({ goal, handleGoalClick }: GoalCardProps) => {
  // Calculate the percentage of completed milestones
  const progressPercentage =
    goal.milestone_count > 0
      ? (goal.completed_milestones / goal.milestone_count) * 100
      : 0;

  return (
    <div
      onClick={() => handleGoalClick(goal.id)}
      className="bg-card-bg p-4 rounded-lg mb-4 cursor-pointer flex flex-col md:flex-row gap-4"
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-sm font-bold">{goal.name}</h3>
        <p className="text-xs text-silver">{goal.description}</p>
        <p className="text-xs text-silver">
          Category: {goal.category || "General"}
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Time Progress Bar */}
        <TimeProgressBar startDate={goal.start_date} endDate={goal.end_date} />

        {/* Milestone Progress Bar */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <p className="text-xs">Progress:</p>
          {goal.milestone_count > 0 ? (
            <div className="relative w-1/2 md:w-3/4 h-1 bg-black rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-green rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>
            </div>
          ) : (
            <p className="text-xs text-silver">
              Add milestones to track progress
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
