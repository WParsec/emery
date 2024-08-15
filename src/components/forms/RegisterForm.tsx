import { useState, useEffect } from "react";
import { registerSchema } from "@/validation"; // Import Yup validation schema

interface RegisterFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  validationErrors: Record<string, string>;
  firebaseError: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  validationErrors,
  firebaseError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        await registerSchema.validate({ email, password, confirmPassword });
        setIsFormValid(true); // Form is valid
        setLocalValidationErrors({}); // Clear any previous validation errors
      } catch (err) {
        setIsFormValid(false); // Form is not valid
      }
    };

    validateForm(); // Call the validation function
  }, [name, email, password, confirmPassword]); // Re-run the effect whenever form values change

  // Reset validation and Firebase errors when inputs change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setLocalValidationErrors((prev) => ({ ...prev, name: "" }));
    setLocalFirebaseError(null);
  };

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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setLocalValidationErrors((prev) => ({ ...prev, confirmPassword: "" }));
    setLocalFirebaseError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, password, confirmPassword);
  };

  return (
    <div className="bg-card-bg px-4 py-8 md:px-8 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 rounded"
            placeholder="Vhaegar"
          />
          {localValidationErrors.name && (
            <p className="text-warning-red text-sm">
              {localValidationErrors.name}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 rounded"
            placeholder="vhaegar@targaryan.wes"
          />
          {localValidationErrors.email && (
            <p className="text-warning-red text-sm">
              {localValidationErrors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
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
        <div className="mb-8">
          <label className="block text-sm">Repeat password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 rounded"
            placeholder="Repeat your password"
          />
          {localValidationErrors.confirmPassword && (
            <p className="text-warning-red text-sm">
              {localValidationErrors.confirmPassword}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
