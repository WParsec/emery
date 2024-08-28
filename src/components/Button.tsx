"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  bgColor: string;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  title,
  bgColor,
  small = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${bgColor} text-white py-4 rounded-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${small ? "text-sm py-[2px] w-full px-6" : "w-full"}`}
    >
      {title}
    </button>
  );
};

export default Button;
