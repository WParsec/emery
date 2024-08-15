import { supabase } from "@/utils/supabaseClient";

export const addUserToDatabase = async (
  userUid: string,
  email: string,
  displayName: string
) => {
  try {
    // Check if the user already exists in the database
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userUid)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Handle unexpected errors
      console.error("Failed to fetch user data from Supabase:", fetchError);
      throw fetchError;
    }

    if (existingUser) {
      console.log("User already exists in the database:", existingUser);
      return existingUser;
    }

    // If the user does not exist, insert the new user
    const { data, error } = await supabase.from("users").insert([
      {
        id: userUid, // Firebase UID
        email,
        display_name: displayName, // Display name from Firebase
      },
    ]);

    if (error) {
      console.error("Failed to save user data to Supabase:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error adding user to database:", error);
    throw error;
  }
};
