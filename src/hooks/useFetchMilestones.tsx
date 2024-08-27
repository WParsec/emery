import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function useFetchMilestones(goalId: string) {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const { data, error } = await supabase
          .from("milestones")
          .select("*")
          .eq("goal_id", goalId);

        if (error) {
          setError(error.message);
        } else {
          setMilestones(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [goalId]);

  return { milestones, loading, error };
}
