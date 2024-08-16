"use client";

import React from "react";

// components
import HabitsSection from "./HabitsSection";

type YourDayProps = {
  habits: any[];
  goals: any[];
  loading: boolean;
  error: string | null;
};

export default function YourDay({
  habits,
  goals,
  loading,
  error,
}: YourDayProps) {
  return (
    <div className="bg-dark-gray text-white rounded-lg">
      {/* Title */}
      <h2 className="text-md font-bold mb-4">Your Day</h2>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-card-bg rounded-full mb-8 md:w-1/4">
        <div
          className="absolute top-0 left-0 h-full bg-green rounded-full"
          style={{ width: "50%" }} // Example progress percentage
        ></div>
      </div>

      {/* Main Sections: Habits and Single Tasks */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Habits Section */}
        <HabitsSection habits={habits} loading={loading} error={error} />

        {/* Single Tasks Section */}
        <div className="w-full md:w-1/2 border border-card-bg p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Single Tasks</h3>
            <button className="bg-green text-white px-4 py-2 rounded-lg">
              Add Task
            </button>
          </div>
          {/* Single Tasks content goes here */}
        </div>
      </div>
    </div>
  );
}
