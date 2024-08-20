"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import HabitToggle from "@/components/ToggleSwitch";
import useUpdateHabitStatus from "@/hooks/useUpdateHabitStatus";

// Modal
import Modal from "@/components/modal/Modal";
import NewHabitForm from "@/components/forms/NewHabitForm";

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
  onHabitStatusChange: (updatedHabits: Habit[]) => void; // Callback function to pass the updated habits
};

export default function HabitsSection({
  habits: initialHabits,
  loading,
  error,
  onHabitStatusChange,
}: HabitsSectionProps) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const router = useRouter();

  console.log("Habits:", initialHabits);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = () => {
    console.log("Add habit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    try {
      await updateHabitStatus(habitId, completed);
      const updatedHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed } : habit
      );
      setHabits(updatedHabits);
      onHabitStatusChange(updatedHabits); // Pass the updated habits array back to the parent component
    } catch {
      console.error("Failed to update habit status");
    }
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Habit">
        {/* Modal Content goes here */}
        <NewHabitForm onSubmit={() => {}} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}
