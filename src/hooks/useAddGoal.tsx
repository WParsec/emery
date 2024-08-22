"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const useAddGoal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addGoal = async (goalData: any) => {
    setLoading(true);
    setError(null);
    console.log("Adding goal in hook:", goalData);

    try {
      const { data, error } = await supabase
        .from("goals")
        .insert([goalData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      console.log("Supabase insert success:", data);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error("Error in useAddGoal:", error.message);
      setError(error.message || "An error occurred while adding the goal.");
      setLoading(false);
      return null;
    }
  };

  return { addGoal, loading, error };
};

export default useAddGoal;
