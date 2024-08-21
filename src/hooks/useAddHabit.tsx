"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient"; // Adjust this import according to your setup

const useAddHabit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addHabit = async (habitData: any) => {
    setLoading(true);
    setError(null);
    console.log("Adding habit in hook:", habitData);

    try {
      // Check and clean up the habit data if necessary
      const cleanedHabitData = { ...habitData };
      if (cleanedHabitData.goal_id === "") {
        delete cleanedHabitData.goal_id;
      }

      // Log the cleaned data
      console.log("Cleaned habit data:", cleanedHabitData);

      const { data, error } = await supabase
        .from("habits") // Make sure this matches your table name
        .insert([cleanedHabitData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      console.log("Supabase insert success:", data);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error("Error in useAddHabit:", error.message);
      setError(error.message || "An error occurred while adding the habit.");
      setLoading(false);
      return null;
    }
  };

  return { addHabit, loading, error };
};

export default useAddHabit;
