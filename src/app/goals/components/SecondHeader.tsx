import React from "react";
import ButtonTransparent from "@/components/ButtonTransparent";

type SortingAndNewGoalProps = {
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddGoal: () => void;
  categories: string[];
};

const SecondHeader = ({
  handleSort,
  handleAddGoal,
  categories,
}: SortingAndNewGoalProps) => {
  return (
    <div className="flex justify-between items-center my-4">
      <div>
        <select
          onChange={(e) => handleSort(e)}
          defaultValue={"All"}
          className="px-3 py-2 rounded"
        >
          <option value="All">All</option>
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <ButtonTransparent handleClick={handleAddGoal} title={"New Goal"} />
    </div>
  );
};

export default SecondHeader;
