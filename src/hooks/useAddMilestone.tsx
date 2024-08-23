"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const useAddMilestone = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMilestone = async (milestoneData: any) => {
    setLoading(true);
    setError(null);
    console.log("Adding milestone in hook:", milestoneData);

    try {
      const { data, error } = await supabase
        .from("milestones") // Ensure this matches your milestones table name
        .insert([milestoneData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      console.log("Supabase insert success:", data);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error("Error in useAddMilestone:", error.message);
      setError(
        error.message || "An error occurred while adding the milestone."
      );
      setLoading(false);
      return null;
    }
  };

  return { addMilestone, loading, error };
};

export default useAddMilestone;
