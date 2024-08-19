"use client";

import React, { useEffect } from "react";

type ProgressBarProps = {
  completedItems: number;
  totalItems: number;
};

export default function YourDayProgressBar({
  completedItems,
  totalItems,
}: ProgressBarProps) {
  const completionPercentage = totalItems
    ? (completedItems / totalItems) * 100
    : 0;

  // Optional: Log to see if the component re-renders
  useEffect(() => {
    console.log("ProgressBar rendered", { completedItems, totalItems });
  }, [completedItems, totalItems]);

  return (
    totalItems > 0 && (
      <div className="relative w-full h-1 bg-card-bg rounded-full mb-8 md:w-1/4">
        <div
          className="absolute top-0 left-0 h-full bg-green rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    )
  );
}
