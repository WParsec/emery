import { supabase } from "@/utils/supabaseClient";

export const addUserToDatabase = async (
  userUid: string,
  email: string,
  displayName: string
) => {
  try {
    console.log("Checking if user exists in the database...");

    // Check if the user already exists in the database
    const {
      data: existingUser,
      error: fetchError,
      status,
    } = await supabase.from("users").select("id").eq("id", userUid).single();

    // Handle the case where the user already exists
    if (existingUser) {
      console.log("User already exists in the database:", existingUser);
      return existingUser;
    }

    // Handle any errors that are not related to the user not being found
    if (fetchError && status !== 406) {
      // 406 status code is returned when no rows are found with `.single()`
      console.error("Failed to fetch user data from Supabase:", fetchError);
      throw fetchError;
    }

    console.log("User does not exist, inserting into database...");

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

    console.log("User successfully added to the database:", data);
    return data;
  } catch (error) {
    console.error("Error adding user to database:", error);
    throw error;
  }
};
