"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import CoalImage from "@/assets/images/coal.png";
import { useCurrentDate } from "@/utils/useCurrentDate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Categories from "@/components/Categories";

type DashboardHeaderProps = {
  user: any;
  habits: any[];
  goals: any[];
  loading: boolean;
};

export default function DashboardHeader({
  user,
  habits = [],
  goals = [],
  loading,
}: DashboardHeaderProps) {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const date = useCurrentDate();
  const [categories, setCategories] = useState<string[]>([]);
  const route = useRouter();

  // Function to extract unique categories
  const extractCategories = () => {
    const allCategories = [
      ...habits.map((habit) => habit.category),
      ...goals.map((goal) => goal.category),
    ];

    // Filter out duplicates
    const uniqueCategories = Array.from(new Set(allCategories));
    setCategories(uniqueCategories as string[]);
  };

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (habits.length > 0 || goals.length > 0) {
      extractCategories();
    }
  }, [habits, goals]);

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  return (
    <div className="h-fit flex flex-col gap-8 md:flex-row justify-between w-full bg-dark-gray text-white">
      {/* Left Section: Date, Username, ProgressBar, Categories */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 order-2 md:order-1">
        {/* Date, Username, ProgressBar */}
        <div className="flex flex-col gap-2">
          <p className="text-sm">{date}</p>
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <div className="relative w-full h-1 bg-card-bg rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green rounded-full"
              style={{ width: "42%" }}
            ></div>
          </div>
          <p className="text-sm">Rank: Coal</p>
        </div>

        {/* Categories */}
        {categories && <Categories categories={categories} />}
      </div>

      {/* Right Section: Coal Image and Motivational Quote */}
      <div className="rounded-lg p-8 flex flex-col items-center justify-center w-full md:w-1/2 gap-4 order-1 md:order-2">
        <div className="w-[8rem] h-[6rem]">
          <Image src={CoalImage} alt="Coal" className="object-contain" />
        </div>
        <p className="text-center lg:text-right text-sm text-silver">
          Pressure turns coal into diamonds. Keep pushing!
        </p>
      </div>
    </div>
  );
}
