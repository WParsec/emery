import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function useFetchGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data, error } = await supabase.from("goals").select("*");
        if (error) throw error;
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, loading, error };
}
