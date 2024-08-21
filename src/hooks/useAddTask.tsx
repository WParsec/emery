"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const useAddTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (taskData: any) => {
    setLoading(true);
    setError(null);
    console.log("Adding task in hook:", taskData);

    try {
      // Clean up task data if necessary
      const cleanedTaskData = { ...taskData };
      if (cleanedTaskData.goal_id === "") {
        delete cleanedTaskData.goal_id;
      }

      const { data, error } = await supabase
        .from("tasks") // Make sure this matches your table name
        .insert([cleanedTaskData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      console.log("Supabase insert success:", data);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error("Error in useAddTask:", error.message);
      setError(error.message || "An error occurred while adding the task.");
      setLoading(false);
      return null;
    }
  };

  return { addTask, loading, error };
};

export default useAddTask;
