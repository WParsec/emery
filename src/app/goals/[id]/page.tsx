"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // For extracting the ID from the URL
import GoalSpecificHeader from "./components/GoalSpecificHeader";
import SecondHeaderSpecific from "./components/SecondHeaderSpecific";
import Modal from "@/components/modal/Modal";
import NewMilestoneForm from "@/components/forms/NewMilestoneForm";
import { supabase } from "@/utils/supabaseClient";
import useAddMilestone from "@/hooks/useAddMilestone";
import useFetchMilestones from "@/hooks/useFetchMilestones";
import useUpdateMilestoneStatus from "@/hooks/useUpdateMilestoneStatus";
import { MilestoneToggle } from "@/components/ToggleSwitch";
import HabitCard from "@/components/HabitCard"; // Import HabitCard
import useFetchConnectedHabits from "@/hooks/useFetchConnectedHabits";
import useUpdateHabitStatus from "@/hooks/useUpdateHabitStatus";
import DeleteForm from "@/components/forms/DeleteForm";
import GoalComplete from "./components/GoalComplete";

type Goal = {
  id: string;
  name: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  milestone_count: number;
  completed_milestones: number;
  completed: boolean;
};

type Milestones = {
  id: string;
  goal_id: string;
  name: string;
  description: string;
  due_date: string;
  completed: boolean;
};

type Habits = {
  id: string;
  name: string;
  completed: boolean;
  times_per_week: number;
};

export default function GoalPage() {
  const { id: goalId } = useParams(); // Extract goal ID from the URL
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>(); // Store the goal data
  console.log(goal);

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [milestones, setMilestones] = useState<Milestones[]>([]);
  const [habits, setHabits] = useState<Habits[]>([]);
  const { addMilestone } = useAddMilestone();
  const { milestones: initialMilestones } = useFetchMilestones(
    goalId as string
  );
  const { habits: initialHabits } = useFetchConnectedHabits(goalId as string);
  const {
    updateMilestoneStatus,
    loading: updateLoading,
    error: updateError,
  } = useUpdateMilestoneStatus();
  const { updateHabitStatus } = useUpdateHabitStatus();

  useEffect(() => {
    setMilestones(initialMilestones);
    setHabits(initialHabits);
  }, [initialMilestones, initialHabits]);

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
    setIsMilestoneModalOpen(true);
  };

  const handleCloseMilestoneModal = () => {
    setIsMilestoneModalOpen(false);
  };

  const handleDeleteGoal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditGoal = () => {
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!goal) return;

    const { error } = await supabase.from("goals").delete().eq("id", goal.id);

    if (error) {
      console.error("Error deleting goal:", error);
    } else {
      setIsDeleteModalOpen(false);
      router.push("/goals"); // Redirect to the goals page after deletion
    }
  };

  const handleMilestoneSubmit = async (milestone: any) => {
    const newMilestone = await addMilestone({
      ...milestone,
      goal_id: goalId, // Connect the milestone to the correct goal
    });

    if (newMilestone && newMilestone.length > 0) {
      setMilestones([...milestones, newMilestone[0]]);
      handleCloseMilestoneModal();
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

  const handleHabitToggleComplete = async (
    habitId: string,
    completed: boolean
  ) => {
    await updateHabitStatus(habitId, completed);
    setHabits(
      habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed } : habit
      )
    );
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  const handleGoalComplete = async (goalId: string, completed: boolean) => {
    // Update the goal status
    console.log(goalId, completed);
    const { error } = await supabase
      .from("goals")
      .update({ completed })
      .eq("id", goalId);

    if (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="p-4 container">
      <GoalSpecificHeader
        name={goal.name}
        handleDelete={handleDeleteGoal}
        handleEdit={handleEditGoal}
      />

      <GoalComplete
        handleComplete={handleGoalComplete}
        goal={goal}
        loading={false}
        error={null}
      />

      <SecondHeaderSpecific
        goal={goal}
        handleAddMilestone={handleAddMilestone}
      />

      <div className="py-4 border-b border-card-bg">
        <h2 className="font-bold">Description:</h2>
        <p className="text-sm">{goal.description}</p>
      </div>

      <div className="py-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h2 className="font-bold mb-2">Milestones:</h2>
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-4">
              <div
                className={`flex-1 flex justify-between p-4 mb-2 bg-card-bg rounded-lg ${
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
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="font-bold mb-2">Connected Habits:</h2>
          {habits.map((habit) => (
            <HabitCard
              onClick={() => {}}
              key={habit.id}
              habit={habit}
              onToggleComplete={handleHabitToggleComplete}
              loading={updateLoading}
              error={updateError}
            />
          ))}
        </div>
      </div>

      {/* Milestone Modal */}
      <Modal
        isOpen={isMilestoneModalOpen}
        onClose={handleCloseMilestoneModal}
        title="Add Milestone"
      >
        <NewMilestoneForm
          onSubmit={handleMilestoneSubmit}
          onCancel={handleCloseMilestoneModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Goal"
      >
        <DeleteForm
          handleConfirmDelete={handleConfirmDelete}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Goal"
      >
        <div></div>
      </Modal>
    </div>
  );
}
