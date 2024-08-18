import { useState } from "react";
import { supabase } from "@/utils/supabaseClient"; // Adjust the path as needed

export default function useUpdateHabitStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateHabitStatus = async (habitId: string, completed: boolean) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("habits")
      .update({ completed })
      .eq("id", habitId)
      .select();

    if (error) {
      setError("Error updating habit status");
      console.error("Error updating habit status:", error);
    } else {
      console.log("Habit status updated:", data);
    }

    setLoading(false);
  };

  return { updateHabitStatus, loading, error };
}
