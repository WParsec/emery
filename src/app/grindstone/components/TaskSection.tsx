import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import ButtonTransparent from "@/components/ButtonTransparent";
import { format, addDays } from "date-fns"; // Import date-fns for easier date manipulation

type Task = {
  id: string;
  name: string;
  completed: boolean;
  due_date: string; // Ensure the due_date is present
};

type TasksSectionProps = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

export default function TasksSection({
  tasks: initialTasks,
  loading,
  error,
}: TasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const router = useRouter();

  // Use useEffect to update tasks state when initialTasks prop changes
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Define today's and tomorrow's date
  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  // Filter tasks for today and tomorrow
  const todayTasks = tasks.filter((task) => task.due_date === today);
  const tomorrowTasks = tasks.filter((task) => task.due_date === tomorrow);

  // Combine today's and tomorrow's tasks
  const combinedTasks = [...todayTasks, ...tomorrowTasks];

  const handleTaskClick = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  const handleToggleComplete = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    completed: boolean
  ) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent
    // Update the state locally for visual feedback
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedTasks);

    console.log(
      `Task ${taskId} is now ${completed ? "complete" : "incomplete"}`
    );

    // Here, you can call the API to persist the state change in the database
    // e.g., updateTaskStatus(taskId, completed);
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
      {combinedTasks.length > 0 ? (
        <div>
          {combinedTasks.map((task: Task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task.id)} // Handle click for the entire task
              className={`transition-all ${
                task.completed
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-card-bg"
              } ${
                task.due_date === today ? "bg-warning-orange" : ""
              } transition-all duration-300 flex justify-between items-center mb-4 p-4 rounded-lg cursor-pointer`}
            >
              <div>
                <p className="text-sm">{task.name}</p>
                <p className={`text-xs`}>
                  Expires: {task.due_date === today ? "Today" : "Tomorrow"}
                </p>
              </div>
              <Switch
                checked={task.completed}
                onChange={(e) =>
                  handleToggleComplete(e, task.id, e.target.checked)
                }
                color="primary"
                onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to parent
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No tasks yet.</div>
      )}
    </div>
  );
}
