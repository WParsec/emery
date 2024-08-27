import React from "react";

type ProgressBarProps = {
  milestone_count: number;
  completed_milestones: number;
  bgColor?: string;
};

export default function ProgressBar({
  milestone_count,
  completed_milestones,
  bgColor = "bg-black", // Default color if none provided
}: ProgressBarProps) {
  console.log("milestone_count", milestone_count);

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs">Progress:</p>
      {milestone_count > 0 ? (
        <div
          className={`relative w-1/2 md:w-3/4 h-1 ${
            bgColor ? bgColor : "bg-black"
          } rounded-full`}
        >
          <div
            className="absolute top-0 left-0 h-full bg-green rounded-full"
            style={{
              width: `${(completed_milestones / milestone_count) * 100}%`,
            }}
          ></div>
        </div>
      ) : (
        <p className="text-xs text-silver">Add milestones to track progress</p>
      )}
    </div>
  );
}
