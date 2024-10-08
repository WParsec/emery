import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import { format } from "date-fns";
import useUpdateTaskStatus from "@/hooks/useUpdateTaskStatus";
import { TaskToggle } from "@/components/ToggleSwitch";
import Modal from "@/components/modal/Modal";
import NewTaskForm from "@/components/forms/NewTaskForm";
import useAddTask from "@/hooks/useAddTask";
import Link from "next/link";

type Task = {
  id: string;
  name: string;
  completed: boolean;
  due_date: string;
};

type TasksSectionProps = {
  goals: any[];
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onTaskStatusChange: (updatedTasks: Task[]) => void;
};

export default function TasksSection({
  goals,
  tasks: initialTasks,
  loading,
  error,
  onTaskStatusChange,
}: TasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTask } = useAddTask();
  const router = useRouter();
  const {
    updateTaskStatus,
    loading: updateLoading,
    error: updateError,
  } = useUpdateTaskStatus();

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    // Filter tasks to only include those that expire today
    const todayTasks = initialTasks.filter((task) => task.due_date === today);
    setTasks(todayTasks);
  }, [initialTasks, today]);

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
      onTaskStatusChange(updatedTasks);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (task: any) => {
    console.log("Submitting task:", task);
    const newTask = await addTask(task);

    if (newTask && newTask.length > 0) {
      console.log("New task added in TasksSection:", newTask[0]);

      // Add the new task only if it expires today
      if (newTask[0].due_date === today) {
        const updatedTasks = [...tasks, newTask[0]];
        setTasks(updatedTasks);
        onTaskStatusChange(updatedTasks);
      }
    } else {
      console.log("Failed to add task", newTask);
    }

    handleCloseModal(); // Close the modal
  };

  return (
    <div className="w-full md:w-1/2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Tasks</h3>
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
                  : "bg-card-bg"
              } transition-all duration-300 flex justify-between items-center mb-4 p-4 rounded-lg cursor-pointer`}
            >
              <div>
                <p className="text-sm">{task.name}</p>
                <p className={`text-xs`}>
                  Expires:{" "}
                  <span className="text-warning-text">
                    {task.due_date === today ? "Today" : `${task.due_date}`}
                  </span>
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
        <div className="flex justify-between items-center text-sm">
          <p>No tasks expires today!</p>
          <Link href="/tasks" className="p-4">
            View All
          </Link>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Task">
        <NewTaskForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          goals={goals}
        />
      </Modal>
    </div>
  );
}
