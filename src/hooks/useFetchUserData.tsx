import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient"; // Ensure your Supabase client is set up correctly
import { useAuth } from "@/context/AuthContext"; // Assuming you have a context for auth

export default function useFetchUserData() {
  const [habits, setHabits] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [habitLogs, setHabitLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        // Fetch habits
        let { data: habitsData, error: habitsError } = await supabase
          .from("habits")
          .select("*")
          .eq("user_id", user.uid);

        if (habitsError) throw habitsError;

        // Fetch goals
        let { data: goalsData, error: goalsError } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.uid);

        if (goalsError) throw goalsError;

        // Check if habitsData is not null or empty before mapping
        let habitIds = habitsData
          ? habitsData.map((habit: any) => habit.id)
          : [];

        // Fetch habit logs if there are habit IDs
        let { data: habitLogsData, error: habitLogsError } = await supabase
          .from("habit_logs")
          .select("*")
          .in("habit_id", habitIds.length > 0 ? habitIds : [""]); // Ensure array is not empty

        if (habitLogsError) throw habitLogsError;

        setHabits(habitsData || []);
        setGoals(goalsData || []);
        setHabitLogs(habitLogsData || []);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { habits, goals, habitLogs, loading, error };
}
