import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// components
import ButtonTransparent from "@/components/ButtonTransparent";
import TimeProgressBar from "@/components/TimeProgressBar";
// modal
import Modal from "@/components/modal/Modal";
import NewGoalForm from "@/components/forms/NewGoalForm";
import useAddGoal from "@/hooks/useAddGoal"; // Import your useAddGoal hook

type Goal = {
  id: string;
  name: string;
  connectedHabit?: string; // Optional field for connected habit
  start_date: string; // Corrected to match your data structure
  end_date: string; // Corrected to match your data structure
  milestone_count: number; // Corrected to match your data structure
  completed_milestones: number; // Corrected to match your data structure
};

type GoalsSectionProps = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
};

export default function GoalsSection({
  goals: initialGoals,
  loading,
  error,
}: GoalsSectionProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { addGoal } = useAddGoal(); // Add the useAddGoal hook

  // Use useEffect to update goals state when initialGoals prop changes
  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  console.log("Goals in GoalsSection:", goals);

  const handleGoalClick = (goalId: string) => {
    router.push(`/goal/${goalId}`);
  };

  const handleAddGoal = () => {
    console.log("Add Goal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (goal: any) => {
    console.log("Submitting goal:", goal);
    const newGoal = await addGoal(goal);

    if (newGoal && newGoal.length > 0) {
      console.log("New goal added in GoalsSection:", newGoal[0]);
      const updatedGoals = [...goals, newGoal[0]];
      setGoals(updatedGoals);
    } else {
      console.log("Failed to add goal", newGoal);
    }

    handleCloseModal();
    newGoal && newGoal.length > 0 && router.push(`/goal/${newGoal[0].id}`);
  };

  return (
    <div className="w-full rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Goals</h3>
        <ButtonTransparent handleClick={handleAddGoal} title={"New Goal"} />
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {goals.length > 0 ? (
        <div>
          {goals.map((goal: Goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)} // Handle click for the entire goal
              className="bg-card-bg transition-all duration-300 flex flex-col md:flex-row gap-4 mb-4 p-4 rounded-lg cursor-pointer"
            >
              {/* Left Section: Name and Connected Habit */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-sm">{goal.name}</p>
                <p className="text-xs text-silver">
                  Connected habit: {goal.connectedHabit || "None"}
                </p>
              </div>

              {/* Right Section: End Date, Progress Bars */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                {/* Progress Bar */}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs">Progress:</p>
                  {goal.milestone_count > 0 ? (
                    <div className="relative w-1/2 md:w-3/4 h-1 bg-black rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-green rounded-full"
                        style={{
                          width: `${
                            (goal.completed_milestones / goal.milestone_count) *
                            100
                          }%`,
                        }} // Example progress percentage
                      ></div>
                    </div>
                  ) : (
                    <p className="text-xs text-silver">
                      Add milestones to track progress
                    </p>
                  )}
                </div>

                {/* Time Remaining Bar */}
                <TimeProgressBar
                  startDate={goal.start_date}
                  endDate={goal.end_date}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No goals yet.</div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Goal">
        <NewGoalForm onSubmit={handleSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}
