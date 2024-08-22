import React from "react";
import { format } from "date-fns";

const GoalsHeader = () => {
  const today = format(new Date(), "MMMM dd, yyyy");

  return (
    <div className="mb-8">
      <small className="block text-gray-400">{today}</small>
      <h1 className="text-3xl font-bold">My Goals</h1>
    </div>
  );
};

export default GoalsHeader;
