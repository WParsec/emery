"use client";

import React, { useEffect, useState } from "react";
import GoalsHeader from "./components/GoalsHeader";
import SecondHeader from "./components/SecondHeader";
import GoalCard from "./components/GoalCard";
import Modal from "@/components/modal/Modal";
import NewGoalForm from "@/components/forms/NewGoalForm";
import NewMilestoneForm from "@/components/forms/NewMilestoneForm"; // Import NewMilestoneForm
import useFetchGoals from "@/hooks/useFetchGoals";
import useAddMilestone from "@/hooks/useAddMilestone";
import { useRouter } from "next/navigation";

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
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [milestones, setMilestones] = useState<any[]>([]); // Manage milestones state
  const { addMilestone } = useAddMilestone();
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
    setSelectedGoal(null); // Ensure no goal is selected when adding a new goal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null); // Clear selected goal when closing modal
  };

  const handleMilestoneClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleMilestoneSubmit = async (milestone: any) => {
    console.log("New milestone added:", milestone, "to goal:", selectedGoal);

    // Use the addMilestone hook to submit the milestone data
    const newMilestone = await addMilestone({
      ...milestone,
      goal_id: selectedGoal?.id, // Ensure you connect the milestone to the correct goal
    });

    if (newMilestone && newMilestone.length > 0) {
      console.log("Milestone added successfully:", newMilestone[0]);

      // Optionally update the state if you want to show the new milestone without re-fetching
      const updatedMilestones = [...milestones, newMilestone[0]];
      setMilestones(updatedMilestones);

      // Close the modal after successful submission
      handleCloseModal();
      route.push(`/goal/${selectedGoal?.id}`);
    } else {
      console.log("Failed to add milestone", newMilestone);
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
            handleGoalClick={() => {
              handleGoalClick(goal.id);
            }}
            handleMilestoneClick={() => handleMilestoneClick(goal)} // Pass the goal to handleMilestoneClick
          />
        ))
      ) : (
        <div>No goals available</div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedGoal ? "Add Milestone" : "Add Goal"}
      >
        {selectedGoal ? (
          <NewMilestoneForm
            onSubmit={handleMilestoneSubmit}
            onCancel={handleCloseModal}
          />
        ) : (
          <NewGoalForm
            onSubmit={() => {}} // Add functionality for adding a goal if needed
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
