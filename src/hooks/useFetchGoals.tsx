import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

// Define the Goal type
type Goal = {
  id: string;
  name: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  milestone_count: number;
  completed_milestones: number;
};

export default function useFetchGoals() {
  const [goals, setGoals] = useState<Goal[]>([]); // Specify the Goal[] type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the error type

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data, error } = await supabase.from("goals").select("*");

        // Handle error from Supabase
        if (error) {
          console.error("Supabase error:", error.message);
          setError(error.message);
          return;
        }

        // Handle case when data is null
        if (!data) {
          setError("No data returned from Supabase");
          return;
        }

        // Update state with fetched data
        setGoals(data as Goal[]); // Cast the data to Goal[]
      } catch (err: any) {
        // Handle any unexpected errors
        console.error("Unexpected error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, loading, error };
}
