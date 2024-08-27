import React from "react";
import ButtonTransparent from "@/components/ButtonTransparent";
import TimeProgressBar from "@/components/TimeProgressBar";
import ProgressBar from "@/components/ProgressBar";

type Goal = {
  id: string;
  name: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  milestone_count: number;
  completed_milestones: number;
};

type SortingAndNewGoalProps = {
  handleAddMilestone: () => void;
  goal: Goal;
};

const SecondHeaderSpecific = ({
  handleAddMilestone,
  goal,
}: SortingAndNewGoalProps) => {
  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <div>
          <p className="text-xs">Total Milestones: {goal.milestone_count}</p>
          <p className="text-xs">
            Milestones Completed: {goal.completed_milestones}
          </p>
        </div>
        <ButtonTransparent
          handleClick={handleAddMilestone}
          title={"New Milestone"}
        />
      </div>
      <div>
        <TimeProgressBar
          startDate={goal.start_date}
          endDate={goal.end_date}
          bgColor={"bg-card-bg"}
        />
        <ProgressBar
          completed_milestones={goal.completed_milestones}
          milestone_count={goal.milestone_count}
          bgColor={"bg-card-bg"}
        />
      </div>
    </div>
  );
};

export default SecondHeaderSpecific;
