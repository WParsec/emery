"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { skranji } from "@/utils/fonts";
import Image from "next/image";
import Coal from "@/assets/images/coal.png";
import { loginSchema, registerSchema } from "@/validation";
import * as yup from "yup";
import { auth } from "@/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Components
import Button from "@/components/Button";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";

// Database
import { AddUserToDatabase } from "@/utils/database/AddUserToDatabase";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Handle post login actions
      console.log("Login successful:", user);
      // Navigate user to /grindstone
      router.push("/grindstone");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Collect and set validation errors
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      } else {
        // Handle any other errors (e.g., Firebase errors)
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
      // Register the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userUid = user?.uid;

      // Update the user's display name
      await updateProfile(user, { displayName: name });
      // Store the name and other details in the database
      await AddUserToDatabase({ userUid, email });
      // Handle post registration actions
      console.log("Registration successful:", user);
      // Navigate user to /grindstone
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
              bgColor={isLogin ? "bg-green" : "bg-card-bg"}
            />
          </div>
          <div className="w-1/2 ml-2">
            <Button
              onClick={() => setIsLogin(false)}
              disabled={false}
              title="Register"
              bgColor={!isLogin ? "bg-green" : "bg-card-bg"}
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
