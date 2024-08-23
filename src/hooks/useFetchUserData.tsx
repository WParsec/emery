import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

export default function useFetchUserData() {
  const [habits, setHabits] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [habitLogs, setHabitLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAuth();
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.uid) return;

        // Fetch habits
        const { data: habitsData, error: habitsError } = await supabase
          .from("habits")
          .select("*")
          .eq("user_id", user.uid);

        if (habitsError) throw habitsError;

        // Fetch tasks for today
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.uid)
          .eq("due_date", today); // Only fetch tasks due today

        if (tasksError) throw tasksError;

        // Fetch goals
        const { data: goalsData, error: goalsError } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.uid);

        if (goalsError) throw goalsError;

        // Fetch habit logs if there are habit IDs
        let habitLogsData = [];
        if (habitsData && habitsData.length > 0) {
          const habitIds = habitsData.map((habit: any) => habit.id);

          const { data, error: habitLogsError } = await supabase
            .from("habit_logs")
            .select("*")
            .in("habit_id", habitIds);

          if (habitLogsError) throw habitLogsError;
          habitLogsData = data;
        }

        // Set data
        setHabits(habitsData || []);
        setTasks(tasksData || []); // Only tasks due today
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

  return { habits, goals, tasks, habitLogs, loading, error };
}
