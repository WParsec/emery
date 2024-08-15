import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUserToDatabase } from "@/db/users";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Register the user with Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Update the user's display name in Firebase Auth
  await updateProfile(user, { displayName: name });

  // Store user details in Supabase
  await addUserToDatabase(user.uid, email, name);

  return user;
}

export async function loginUser(email: string, password: string) {
  // Log in the user with Firebase Auth
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}
