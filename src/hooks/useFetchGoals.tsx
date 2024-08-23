import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/context/AuthContext"; // Import your useAuth hook

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
  const user = useAuth(); // Get the user from the auth context

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        if (!user || !user.uid) {
          setError("User not logged in");
          return;
        }

        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.uid); // Filter by user_id

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

        // Update state with fetched data and clear any previous errors
        setGoals(data as Goal[]);
        setError(null); // Clear the error state
      } catch (err: any) {
        // Handle any unexpected errors
        console.error("Unexpected error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user]); // Dependency array includes user to refetch goals if user changes

  return { goals, loading, error };
}
