"use client";

import React, { useState } from "react";
import { format, isValid } from "date-fns";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

type GoalFormProps = {
  onSubmit: (goal: any) => void;
  onCancel: () => void;
  initialData?: any;
};

export default function NewGoalForm({
  onSubmit,
  onCancel,
  initialData = {},
}: GoalFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "General");

  const [endDate, setEndDate] = useState(
    isValid(new Date(initialData.end_date))
      ? format(new Date(initialData.end_date), "yyyy-MM-dd")
      : ""
  );
  const user = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("No user in handleSubmit in NewGoalForm");
      return;
    }

    // Create the goal payload
    const goalPayload: any = {
      name,
      description,
      category,
      end_date: endDate,
      user_id: user.uid,
      completed: false, // Default value
    };

    console.log("Submitting goal data:", goalPayload);

    onSubmit(goalPayload);
  };

  return (
    <div className="bg-card-bg px-4 pt-2 md:px-8 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter goal name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded max-h-32"
            placeholder="Enter goal description"
            maxLength={200}
          />
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
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm">
            I aim to complete my goal before:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-10 py-2 rounded bg-black-main px-4"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 pb-8">
          <Button
            onClick={onCancel}
            title="Cancel"
            bgColor="bg-warning-orange"
          />
          <Button
            onClick={() => {}}
            title="Continue"
            bgColor="bg-gradient-to-r from-dark-turquoise to-green"
          />
        </div>
      </form>
    </div>
  );
}
