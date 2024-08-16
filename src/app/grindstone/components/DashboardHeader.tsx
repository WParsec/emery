"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import CoalImage from "@/assets/images/coal.png";
import { useCurrentDate } from "@/utils/useCurrentDate";

type DashboardHeaderProps = {
  hasCategories: boolean;
  user: any;
};

export default function DashboardHeader({
  hasCategories,
  user,
}: DashboardHeaderProps) {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const date = useCurrentDate();

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
        {hasCategories && (
          <div>
            <h2 className="text-md font-bold mb-4">Categories</h2>
            <div className="pb-0 flex gap-4 flex-wrap md:pb-4">
              <div className="w-16 h-16 bg-card-bg rounded-md"></div>
              <div className="w-16 h-16 bg-card-bg rounded-md"></div>
              <div className="w-16 h-16 bg-card-bg rounded-md"></div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Coal Image and Motivational Quote */}
      <div className="border border-lighter-black rounded-lg p-8 flex flex-col items-center justify-center w-full md:w-1/2 gap-4 order-1 md:order-2">
        <div className="w-24 h-24 md:w-30 md:h-30">
          <Image src={CoalImage} alt="Coal" className="object-contain" />
        </div>
        <p className="text-center lg:text-right text-sm text-silver">
          Pressure turns coal into diamonds. Keep pushing!
        </p>
      </div>
    </div>
  );
}
