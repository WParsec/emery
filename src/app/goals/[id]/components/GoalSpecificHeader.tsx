import React from "react";
import { format } from "date-fns";
import Button from "@/components/Button";

type GoalSpecificProps = {
  name: string;
  handleEdit: () => void;
  handleDelete: () => void;
};

const GoalsHeader = ({ name, handleDelete, handleEdit }: GoalSpecificProps) => {
  const today = format(new Date(), "MMMM dd, yyyy");

  return (
    <div className="mb-8 flex justify-between items-center gap-4">
      <div>
        <small className="block text-gray-400">{today}</small>
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          title="Edit"
          bgColor="bg-green"
          onClick={handleEdit}
          small={true}
        />
        <Button
          title="Delete"
          bgColor="bg-warning-red"
          onClick={handleDelete}
          small={true}
        />
      </div>
    </div>
  );
};

export default GoalsHeader;
