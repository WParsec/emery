"use client";

import React, { useEffect, useState } from "react";
import GoalsHeader from "./components/GoalsHeader";
import SecondHeader from "./components/SecondHeader";
import GoalCard from "./components/GoalCard";
import Modal from "@/components/modal/Modal";
import NewGoalForm from "@/components/forms/NewGoalForm";
import useFetchGoals from "@/hooks/useFetchGoals";
import { useRouter } from "next/navigation";
import useAddGoal from "@/hooks/useAddGoal";

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

export default function GoalsPage() {
  const { goals: initialGoals, loading, error } = useFetchGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const { addGoal } = useAddGoal();
  const route = useRouter();

  useEffect(() => {
    setGoals(initialGoals);
    setFilteredGoals(initialGoals); // Initialize filteredGoals with goals data
  }, [initialGoals]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;

    if (sortBy === "All") {
      setFilteredGoals(goals); // Show all goals if "All" is selected
    } else {
      const sortedGoals = goals.filter((goal) => goal.category === sortBy);
      setFilteredGoals(sortedGoals); // Update the state with the filtered goals
    }
  };

  const handleAddGoal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGoalSubmit = async (goal: any) => {
    const newGoal = await addGoal(goal);
    if (newGoal && newGoal.length > 0) {
      const updatedGoals = [...goals, newGoal[0]];
      setGoals(updatedGoals);
      setFilteredGoals(updatedGoals); // Update the filtered goals as well
      handleCloseModal();
    }
  };

  const handleGoalClick = (goalId: string) => {
    route.push(`/goals/${goalId}`);
  };

  // Extract unique categories from the goals
  const categories = Array.from(
    new Set(goals.map((goal: Goal) => goal.category))
  );

  return (
    <div className="p-4 container">
      <GoalsHeader />
      <SecondHeader
        handleSort={handleSort}
        handleAddGoal={handleAddGoal}
        categories={categories as string[]}
      />
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && filteredGoals.length > 0 ? (
        filteredGoals.map((goal: Goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            handleGoalClick={handleGoalClick}
          />
        ))
      ) : (
        <div>No goals available</div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Goal">
        <NewGoalForm onSubmit={handleGoalSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}
