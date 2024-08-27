"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function GoalPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the goal ID from the route
  const [goal, setGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        // Fetch goal data from the database using the ID
        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError("Failed to fetch goal data");
          console.error(error);
        } else {
          setGoal(data);
        }
      } catch (err) {
        setError("Unexpected error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGoal();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container p-4">
      <h1>{goal?.name}</h1>
      <p>{goal?.description}</p>
      {/* Add more details about the goal here */}
    </div>
  );
}
