"use client";

import React, { useState } from "react";
import { format, isValid } from "date-fns";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

type TaskFormProps = {
  goals: any[];
  onSubmit: (task: any) => void;
  onCancel: () => void;
  initialData?: any;
};

export default function NewTaskForm({
  goals,
  onSubmit,
  onCancel,
  initialData = {},
}: TaskFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    isValid(new Date(initialData.due_date))
      ? format(new Date(initialData.due_date), "yyyy-MM-dd")
      : ""
  );
  const [priority, setPriority] = useState(initialData.priority || "Medium");
  const [category, setCategory] = useState(initialData.category || "General");
  const [goalId, setGoalId] = useState(initialData.goal_id || "");
  const user = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("No user in handleSubmit in NewTaskForm");
      return;
    }

    // Create the task payload
    const taskPayload: any = {
      name,
      description,
      due_date: dueDate,
      priority,
      category,
      user_id: user.uid,
      completed: false,
      reminder: false, // Default value
      reminder_time: null, // Default value
    };

    // Only include goal_id if it is not an empty string
    if (goalId) {
      taskPayload.goal_id = goalId;
    }

    console.log("Submitting task data:", taskPayload);

    onSubmit(taskPayload);
  };

  return (
    <div className="bg-card-bg px-4 pt-2 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter task name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded max-h-32"
            placeholder="Enter task description"
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full h-10 py-2 rounded bg-black-main px-4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full h-10 py-2 rounded bg-black-main px-4"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 py-2 rounded bg-black-main px-4"
          >
            <option value="General">General</option>
            <option value="Health">Health</option>
            <option value="Productivity">Productivity</option>
            <option value="Learning">Learning</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {goals.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm">
              Do you want to connect to a goal?
            </label>
            <select
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              className="w-full h-10 py-2 px-4 rounded bg-black-main"
            >
              <option value="">Select a goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4 pb-8">
          <Button
            onClick={onCancel}
            title="Cancel"
            bgColor="bg-warning-orange"
          />
          <Button
            onClick={() => {}}
            title="Save Task"
            bgColor="bg-gradient-to-r from-dark-turquoise to-green"
          />
        </div>
      </form>
    </div>
  );
}
