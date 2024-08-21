import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export const useLogout = () => {
  const router = useRouter();
  const user = useAuth();

  const logout = async () => {
    if (user) {
      try {
        await signOut(auth);
        router.push("/"); // Redirect to home page or login page after logout
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return logout;
};
