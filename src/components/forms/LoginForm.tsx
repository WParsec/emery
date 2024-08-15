import { useState, useEffect } from "react";
import { loginSchema } from "@/validation"; // Import Yup validation schema

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  validationErrors: Record<string, string>;
  firebaseError: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  validationErrors,
  firebaseError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const [localValidationErrors, setLocalValidationErrors] =
    useState(validationErrors);
  const [localFirebaseError, setLocalFirebaseError] = useState(firebaseError);

  // Sync validation errors from parent component
  useEffect(() => {
    setLocalValidationErrors(validationErrors);
  }, [validationErrors]);

  // Sync Firebase error from parent component
  useEffect(() => {
    setLocalFirebaseError(firebaseError);
  }, [firebaseError]);

  // Validate the form in real-time whenever the input values change
  useEffect(() => {
    const validateForm = async () => {
      try {
        // Validate the form using Yup
        await loginSchema.validate({ email, password });
        setIsFormValid(true); // Form is valid
        setLocalValidationErrors({}); // Clear any previous validation errors
      } catch (err) {
        setIsFormValid(false); // Form is not valid
      }
    };

    validateForm(); // Call the validation function
  }, [email, password]); // Re-run the effect whenever email or password changes

  // Reset validation and Firebase errors when inputs change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLocalValidationErrors((prev) => ({ ...prev, email: "" }));
    setLocalFirebaseError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLocalValidationErrors((prev) => ({ ...prev, password: "" }));
    setLocalFirebaseError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password); // Submit the form when the button is clicked
  };

  return (
    <div className="bg-card-bg p-8 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter your email"
          />
          {localValidationErrors.email && (
            <p className="text-warning-red text-sm">
              {localValidationErrors.email}
            </p>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 rounded"
            placeholder="Enter your password"
          />
          {localValidationErrors.password && (
            <p className="text-warning-red text-sm">
              {localValidationErrors.password}
            </p>
          )}
        </div>
        {localFirebaseError && (
          <p className="text-warning-red text-center text-sm">
            {localFirebaseError}
          </p>
        )}
        <button
          type="submit"
          className={`w-full py-4 rounded-lg text-white ${
            isFormValid
              ? "bg-gradient-to-r from-dark-turquoise to-green rounded-lg"
              : "bg-gradient-to-r from-dark-turquoise to-green rounded-lg opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormValid} // Disable the button if the form is not valid
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
