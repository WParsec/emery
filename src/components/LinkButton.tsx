"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";

interface LinkButtonProps {
  disabled?: boolean;
  title: string;
  route?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  active?: boolean;
  isSmall?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  disabled = false,
  title,
  route = "#",
  onClick,
  active = false,
  isSmall = false,
}) => {
  // Apply Montserrat font class and dynamic classes for styling
  const baseClasses = `font-montserrat ${isSmall ? "text-sm" : "text-base"} ${
    disabled ? "cursor-not-allowed opacity-50" : ""
  } ${
    active ? "text-green" : "text-white"
  } hover:text-green transition-colors duration-300`;

  // If disabled, prevent the default link behavior
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (disabled) {
      e.preventDefault();
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link href={route} onClick={handleClick} className={baseClasses}>
      {title}
    </Link>
  );
};

export default LinkButton;
