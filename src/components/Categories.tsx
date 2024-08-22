import React from "react";
import Link from "next/link";

type CategoriesProps = {
  categories: string[];
};

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div>
      <h2 className="text-md font-bold mb-4">Categories</h2>
      <div className="pb-0 flex gap-4 flex-wrap md:pb-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category}`}
            key={category}
            className="bg-card-bg transition-colors w-20 h-20 rounded-lg p-2 text-xs flex items-center text-center justify-center cursor-pointer hover:bg-lighter-black"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
