"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  bgColor: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  title,
  bgColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgColor} text-white py-4 rounded-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
