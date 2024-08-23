"use client";

import React, { useState } from "react";
import Button from "@/components/Button";

type NewMilestoneFormProps = {
  onSubmit: (milestone: any) => void;
  onCancel: () => void;
};

export default function NewMilestoneForm({
  onSubmit,
  onCancel,
}: NewMilestoneFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Milestone Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter milestone name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded max-h-32"
            placeholder="Enter milestone description"
            maxLength={200}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onCancel}
            title="Cancel"
            bgColor="bg-warning-orange"
          />
          <Button onClick={() => {}} title="Add Milestone" bgColor="bg-green" />
        </div>
      </form>
    </div>
  );
}
