"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LinkButton from "../LinkButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = Boolean(user);
  const pathname = usePathname();
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
                active={pathname.startsWith("/grindstone")}
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
                active={pathname.startsWith("/goals")}
              />
            </li>
            <li>
              <LinkButton
                title="Achievements"
                route="/achievements"
                disabled={!isLoggedIn}
                active={pathname.startsWith("/achievements")}
              />
            </li>
            <li>
              <LinkButton
                title="Logout"
                onClick={logout}
                disabled={!isLoggedIn}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full top-[92px] left-0 bg-black z-50">
          <ul className="flex flex-col items-center space-y-4 p-4 justify-around h-full">
            <li className="w-full text-center flex">
              <LinkButton
                title="Grindstone"
                route="/grindstone"
                disabled={!isLoggedIn}
                addClasses="w-full py-4 bg-card-bg rounded-lg"
              />
            </li>
            <li className="w-full text-center flex">
              <LinkButton
                title="Goals"
                route="/goals"
                disabled={!isLoggedIn}
                addClasses="w-full py-4 bg-card-bg rounded-lg"
              />
            </li>
            <li className="w-full text-center flex">
              <LinkButton
                title="Habits"
                route="/habits"
                disabled={!isLoggedIn}
                addClasses="w-full py-4 bg-card-bg rounded-lg"
              />
            </li>
            <li className="w-full text-center flex">
              <LinkButton
                title="Achievements"
                route="/achievements"
                disabled={!isLoggedIn}
                addClasses="w-full py-4 bg-card-bg rounded-lg"
              />
            </li>
            <li className="w-full text-center flex">
              <LinkButton
                title="Logout"
                onClick={logout}
                disabled={!isLoggedIn}
                addClasses="w-full py-4 bg-card-bg rounded-lg"
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
