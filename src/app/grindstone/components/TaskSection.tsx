import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import { format } from "date-fns";
import useUpdateTaskStatus from "@/hooks/useUpdateTaskStatus";
import { TaskToggle } from "@/components/ToggleSwitch";

type Task = {
  id: string;
  name: string;
  completed: boolean;
  due_date: string;
};

type TasksSectionProps = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onTaskStatusChange: (updatedTasks: Task[]) => void; // Callback function to pass the updated tasks
};

export default function TasksSection({
  tasks: initialTasks,
  loading,
  error,
  onTaskStatusChange,
}: TasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const router = useRouter();
  const {
    updateTaskStatus,
    loading: updateLoading,
    error: updateError,
  } = useUpdateTaskStatus();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const today = format(new Date(), "yyyy-MM-dd");

  const handleTaskClick = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      await updateTaskStatus(taskId, completed);

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      );
      setTasks(updatedTasks);
      onTaskStatusChange(updatedTasks); // Pass the updated tasks array back to the parent component
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Show error to user
    }
  };

  const handleAddTask = () => {
    console.log("Add task");
  };

  return (
    <div className="w-full md:w-1/2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Single Tasks</h3>
        <ButtonTransparent handleClick={handleAddTask} title={"Add Task"} />
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task: Task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className={`${
                task.completed
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-warning-orange"
              } transition-all duration-300 flex justify-between items-center mb-4 p-4 rounded-lg cursor-pointer`}
            >
              <div>
                <p className="text-sm">{task.name}</p>
                <p className={`text-xs`}>
                  Expires: {task.due_date === today ? "Today" : "Tomorrow"}
                </p>
              </div>
              <TaskToggle
                task={task}
                onToggleComplete={handleToggleComplete}
                loading={updateLoading}
                error={updateError}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No tasks for today!</div>
      )}
    </div>
  );
}
