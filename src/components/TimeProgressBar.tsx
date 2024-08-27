import React from "react";

type TimeProgressBarProps = {
  startDate: string;
  endDate: string;
  bgColor?: string;
};

export default function TimeProgressBar({
  startDate,
  endDate,
  bgColor = "",
}: TimeProgressBarProps) {
  // Function to calculate the time percentage
  const calculateTimePercentage = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date();

    if (startDate > currentDate) return 0;
    if (endDate < currentDate) return 100;

    const timePassed = currentDate.getTime() - startDate.getTime();
    const totalDuration = endDate.getTime() - startDate.getTime();

    return (timePassed / totalDuration) * 100;
  };

  const percentage = calculateTimePercentage(startDate, endDate);

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs">Time:</p>
      <div
        className={`relative w-1/2 md:w-3/4 h-1 ${
          bgColor == "" ? "bg-black" : bgColor
        } rounded-full`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-warning-orange rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
