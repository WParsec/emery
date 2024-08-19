"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import HabitToggle from "@/components/ToggleSwitch";

// Api
import useUpdateHabitStatus from "@/hooks/useUpdateHabitStatus";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
  times_per_week: number;
};

type HabitsSectionProps = {
  habits: Habit[];
  loading: boolean;
  error: string | null;
};

export default function HabitsSection({
  habits: initialHabits,
  loading,
  error,
}: HabitsSectionProps) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const router = useRouter();

  // Destructure the necessary states and functions from the custom hook
  const {
    updateHabitStatus,
    error: updateError,
    loading: updateLoading,
  } = useUpdateHabitStatus();

  // Update habits when initialHabits prop changes
  useEffect(() => {
    setHabits(initialHabits);
  }, [initialHabits]);

  const handleHabitClick = (habitId: string) => {
    router.push(`/habit/${habitId}`);
  };

  const handleToggleComplete = async (habitId: string, completed: boolean) => {
    // Call the API to persist the state change in the database
    await updateHabitStatus(habitId, completed);

    // Only update the state locally if the API call was successful
    if (!updateError) {
      const updatedHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed } : habit
      );
      console.log(updatedHabits);
      setHabits(updatedHabits);

      console.log(
        `Habit ${habitId} is now ${completed ? "complete" : "incomplete"}`
      );
    } else {
      console.error("Failed to update habit status");
    }
  };

  const handleAddHabit = () => {
    console.log("Add habit");
  };

  return (
    <div className="w-full md:w-1/2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Habits</h3>
        <ButtonTransparent handleClick={handleAddHabit} title={"Add Habit"} />
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {habits.length > 0 ? (
        <div>
          {habits.map((habit: Habit) => (
            <div
              key={habit.id}
              onClick={() => handleHabitClick(habit.id)}
              className={`${
                habit.completed
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-card-bg"
              } transition-all duration-300 flex justify-between items-center mb-4 p-4 rounded-lg cursor-pointer`}
            >
              <div>
                <p className="text-sm">{habit.name}</p>
                <p className="text-xs">
                  Interval: {habit.times_per_week} days/week
                </p>
                <p className="text-xs">Remaining this week: </p>
              </div>
              <HabitToggle
                habit={habit}
                onToggleComplete={handleToggleComplete}
                loading={updateLoading}
                error={updateError}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No habits yet.</div>
      )}
    </div>
  );
}
