"use client";

import React, { useState, useEffect } from "react";
import { format, isValid } from "date-fns";

type HabitFormProps = {
  onSubmit: (habit: any) => void;
  onCancel: () => void;
  initialData?: any;
};

export default function HabitForm({
  onSubmit,
  onCancel,
  initialData = {},
}: HabitFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [timesPerWeek, setTimesPerWeek] = useState(
    initialData.times_per_week || 1
  );
  const [daily, setDaily] = useState(initialData.daily || false);

  const handleSetDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaily(e.target.checked);
    if (e.target.checked) {
      setTimesPerWeek(7);
    }
  };

  const handleTimesPerWeekChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(e.target.value);
    setTimesPerWeek(value);

    if (value < 7) {
      setDaily(false); // Uncheck daily habit if times per week is not 7
    } else {
      setDaily(true); // Check daily habit if times per week is 7
    }
  };

  const formattedStartDate = isValid(new Date(initialData.start_date))
    ? format(new Date(initialData.start_date), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const formattedEndDate = isValid(new Date(initialData.end_date))
    ? format(new Date(initialData.end_date), "yyyy-MM-dd")
    : "";

  const [startDate, setStartDate] = useState(formattedStartDate);
  const [endDate, setEndDate] = useState(formattedEndDate);
  const [category, setCategory] = useState(initialData.category || "General");
  const [goalId, setGoalId] = useState(initialData.goal_id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      times_per_week: timesPerWeek,
      daily,
      start_date: startDate,
      end_date: endDate,
      category,
      goal_id: goalId,
    });
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
            placeholder="Enter habit name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter habit description"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="mb-4">
            <label className="block text-sm">Times Per Week</label>
            <select
              value={timesPerWeek}
              onChange={handleTimesPerWeekChange}
              className="w-full px-3 py-2 rounded"
              disabled={daily} // Disable the select if the daily habit is checked
              required
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={daily}
              onChange={handleSetDaily}
              className="form-checkbox h-8 w-8"
            />
            <label className="text-sm">Daily Habit</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded"
          >
            <option value="General">General</option>
            <option value="Health">Health</option>
            <option value="Productivity">Productivity</option>
            <option value="Learning">Learning</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Connected Goal</label>
          <input
            type="text"
            value={goalId}
            onChange={(e) => setGoalId(e.target.value)}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter connected goal ID"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 pb-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-warning-orange rounded-lg w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 w-full bg-gradient-to-r from-dark-turquoise to-green text-white rounded-lg"
          >
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}
