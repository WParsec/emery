import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function useUpdateMilestoneStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMilestoneStatus = async (
    milestoneId: string,
    completed: boolean
  ) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("milestones")
      .update({ completed })
      .eq("id", milestoneId)
      .select();

    if (error) {
      setError("Error updating milestone status");
      console.error("Error updating milestone status:", error);
    } else {
      console.log("Milestone status updated:", data);
    }

    setLoading(false);
  };

  return { updateMilestoneStatus, loading, error };
}
