"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogout } from "@/hooks/useLogout";

export default function Grindstone() {
  const user = useAuth();
  const router = useRouter();
  const logout = useLogout();

  const displayName = user?.displayName;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      {/* Dashboard content goes here */}
      <h1>Welcome to Grindstone, {displayName}</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
