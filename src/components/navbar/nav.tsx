"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LinkButton from "../LinkButton";
import Link from "next/link";

export default function Navbar() {
  const user = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = Boolean(user); // Check if the user is logged in

  return (
    <nav className="w-full bg-dark-gray text-white">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link href="/grindstone" className="text-xl font-bold">
          Emery
        </Link>

        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Icon */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navbar Links */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <LinkButton
                title="Grindstone"
                route="/grindstone"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton title="Goals" route="/goals" disabled={!isLoggedIn} />
            </li>
            <li>
              <LinkButton
                title="Habits"
                route="/habits"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton
                title="Achievements"
                route="/achievements"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton
                title="Logout"
                onClick={() => console.log("Logout clicked")}
                disabled={!isLoggedIn}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center space-y-4 p-4">
            <li>
              <LinkButton
                title="Grindstone"
                route="/grindstone"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton title="Goals" route="/goals" disabled={!isLoggedIn} />
            </li>
            <li>
              <LinkButton
                title="Habits"
                route="/habits"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton
                title="Achievements"
                route="/achievements"
                disabled={!isLoggedIn}
              />
            </li>
            <li>
              <LinkButton
                title="Logout"
                onClick={() => console.log("Logout clicked")}
                disabled={!isLoggedIn}
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
