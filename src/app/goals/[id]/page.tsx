// app/goals/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For extracting the ID from the URL
import GoalSpecificHeader from "./components/GoalSpecificHeader";
import SecondHeaderSpecific from "./components/SecondHeaderSpecific";
import Modal from "@/components/modal/Modal";
import NewMilestoneForm from "@/components/forms/NewMilestoneForm";
import { supabase } from "@/utils/supabaseClient";
import useAddMilestone from "@/hooks/useAddMilestone";
import useFetchMilestones from "@/hooks/useFetchMilestones";
import useUpdateMilestoneStatus from "@/hooks/useUpdateMilestoneStatus";
import { MilestoneToggle } from "@/components/ToggleSwitch";

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

type Milestones = {
  id: string;
  goal_id: string;
  name: string;
  description: string;
  due_date: string;
  completed: boolean;
};

export default function GoalPage() {
  const { id: goalId } = useParams(); // Extract goal ID from the URL
  const [goal, setGoal] = useState<Goal>(); // Store the goal data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestones[]>([]); // Manage milestones state
  const { addMilestone } = useAddMilestone();
  const { milestones: initialMilestones } = useFetchMilestones(
    goalId as string
  );
  const {
    updateMilestoneStatus,
    loading: updateLoading,
    error: updateError,
  } = useUpdateMilestoneStatus();

  useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  useEffect(() => {
    // Fetch the goal data by ID
    const fetchGoal = async () => {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("id", goalId)
        .single();

      if (error) {
        console.error("Error fetching goal:", error);
      } else {
        setGoal(data);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleAddMilestone = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMilestoneSubmit = async (milestone: any) => {
    // Use the addMilestone hook to submit the milestone data
    const newMilestone = await addMilestone({
      ...milestone,
      goal_id: goalId, // Connect the milestone to the correct goal
    });

    if (newMilestone && newMilestone.length > 0) {
      console.log("Milestone added successfully:", newMilestone[0]);

      // Optionally update the state if you want to show the new milestone without re-fetching
      setMilestones([...milestones, newMilestone[0]]);

      // Close the modal after successful submission
      handleCloseModal();
    } else {
      console.log("Failed to add milestone", newMilestone);
    }
  };

  const handleToggleComplete = async (
    milestoneId: string,
    completed: boolean
  ) => {
    await updateMilestoneStatus(milestoneId, completed);
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === milestoneId ? { ...milestone, completed } : milestone
      )
    );
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  console.log(milestones);

  return (
    <div className="p-4 container">
      <GoalSpecificHeader name={goal.name} />

      <SecondHeaderSpecific
        goal={goal}
        handleAddMilestone={handleAddMilestone} // Rename handleAddGoal for adding milestone
      />

      <div className="py-4 border-b border-card-bg">
        <h2 className="font-bold">Description:</h2>
        <p className="text-sm">{goal.description}</p>
      </div>

      <div className="py-4">
        <h2 className="font-bold mb-2">Milestones:</h2>
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center gap-4">
            <div
              className={`flex-1 flex justify-between p-4 my-2 bg-card-bg rounded-lg ${
                milestone.completed
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-card-bg"
              }`}
            >
              <div>
                <p className="text-sm">{milestone.name}</p>
                {milestone.description && (
                  <p className="text-xs">{milestone.description}</p>
                )}
                <p className="text-xs">
                  Completed: {milestone.completed ? "Yes" : "No"}
                </p>
              </div>
              <MilestoneToggle
                milestone={milestone}
                onToggleComplete={handleToggleComplete}
                loading={updateLoading}
                error={updateError}
              />
            </div>
            <div className="text-sm">Delete</div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Milestone"
      >
        <NewMilestoneForm
          onSubmit={handleMilestoneSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
