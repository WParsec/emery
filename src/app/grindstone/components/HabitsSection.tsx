// app/[yourPath]/HabitsSection.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import useUpdateHabitStatus from "@/hooks/useUpdateHabitStatus";
import Modal from "@/components/modal/Modal";
import NewHabitForm from "@/components/forms/NewHabitForm";
import useAddHabit from "@/hooks/useAddHabit";
import HabitCard from "@/components/HabitCard"; // Import the new HabitCard component

type Habit = {
  id: string;
  name: string;
  completed: boolean;
  times_per_week: number;
};

type HabitsSectionProps = {
  goals: any[];
  habits: Habit[];
  loading: boolean;
  error: string | null;
  onHabitStatusChange: (updatedHabits: Habit[]) => void;
};

export default function HabitsSection({
  goals,
  habits: initialHabits,
  loading,
  error,
  onHabitStatusChange,
}: HabitsSectionProps) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const router = useRouter();
  const { addHabit } = useAddHabit();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (habit: any) => {
    const newHabit = await addHabit(habit);

    if (newHabit && newHabit.length > 0) {
      const updatedHabits = [...habits, newHabit[0]];
      setHabits(updatedHabits);
      onHabitStatusChange(updatedHabits);
    }

    handleCloseModal();
  };

  const {
    updateHabitStatus,
    error: updateError,
    loading: updateLoading,
  } = useUpdateHabitStatus();

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
      onHabitStatusChange(updatedHabits);
    } catch {
      console.error("Failed to update habit status");
    }
  };

  return (
    <div className="w-full md:w-1/2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Habits</h3>
        <ButtonTransparent handleClick={handleAddHabit} title={"Add Habit"} />
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {habits.length > 0 ? (
        <div>
          {habits.map((habit: Habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={handleHabitClick}
              onToggleComplete={handleToggleComplete}
              loading={updateLoading}
              error={updateError}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm">No habits yet.</div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Habit">
        <NewHabitForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          goals={goals}
        />
      </Modal>
    </div>
  );
}
