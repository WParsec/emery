"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { skranji } from "@/utils/fonts";
import Image from "next/image";
import Coal from "@/assets/images/coal.png";
import { loginSchema, registerSchema } from "@/validation";
import * as yup from "yup";
import { registerUser, loginUser } from "@/services/auth"; // Import the new auth functions
import { addUserToDatabase } from "@/db/users";

// Components
import Button from "@/components/Button";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("User:", user);
    if (user) {
      router.push("/grindstone");
    }
  }, [user, router]);

  // Handle login form submission
  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      // Validate form data using Yup
      await loginSchema.validate({ email, password }, { abortEarly: false });

      // Clear any previous validation errors
      setValidationErrors({});

      // If validation passes, proceed with Firebase Auth
      const loggedInUser = await loginUser(email, password);

      console.log("Login successful:", loggedInUser);
      router.push("/grindstone");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      } else {
        setError("Login failed. Please check your email and password.");
        console.error("Login failed:", err);
      }
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await registerSchema.validate(
        { email, password, confirmPassword },
        { abortEarly: false }
      );
      setValidationErrors({});

      // Register the user with Firebase Auth and store details in Supabase
      const registeredUser = await registerUser(name, email, password);

      if (registeredUser && registeredUser.uid) {
        // Insert the user into the Supabase database
        await addUserToDatabase(registeredUser.uid, email, name);
      }

      console.log("Registration successful:", registeredUser);
      router.push("/grindstone");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      } else {
        setError("Registration failed. Credentials may already exist.");
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div className="flex pt-8 justify-center h-screen">
      <div className="w-full max-w-lg px-4">
        <div className="h-[6rem]">
          <Image
            className="h-full w-full object-contain"
            src={Coal}
            alt="Coal"
          />
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-dark-turquoise to-green rounded-sm my-8"></div>
        <h1 className={`text-2xl mb-12 text-center ${skranji.className}`}>
          FORGE YOUR WAY TO SUCCESS
        </h1>

        {/* Toggle Buttons for Login and Register */}
        <div className="flex justify-center mb-6">
          <div className="w-1/2 mr-2">
            <Button
              onClick={() => setIsLogin(true)}
              disabled={false}
              title="Login"
              bgColor={
                isLogin
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-card-bg"
              }
            />
          </div>
          <div className="w-1/2 ml-2">
            <Button
              onClick={() => setIsLogin(false)}
              disabled={false}
              title="Register"
              bgColor={
                !isLogin
                  ? "bg-gradient-to-r from-dark-turquoise to-green"
                  : "bg-card-bg"
              }
            />
          </div>
        </div>

        {/* Conditionally Render the Login or Register Form */}
        {isLogin ? (
          <LoginForm
            onSubmit={handleLoginSubmit}
            validationErrors={validationErrors}
            firebaseError={error}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            validationErrors={validationErrors}
            firebaseError={error}
          />
        )}
      </div>
    </div>
  );
}
