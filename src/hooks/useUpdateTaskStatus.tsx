import { useState } from "react";
import { supabase } from "@/utils/supabaseClient"; // Adjust the path as needed

export default function useUpdateTaskStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("tasks")
      .update({ completed })
      .eq("id", taskId)
      .select();

    if (error) {
      setError("Error updating task status");
      console.error("Error updating task status:", error);
    } else {
      console.log("Task status updated:", data);
    }

    setLoading(false);
  };

  return { updateTaskStatus, loading, error };
}
