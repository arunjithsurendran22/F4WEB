"use client";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { categoryApi } from "@/services/categoryService";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; 

interface Category {
  _id: string; 
  categoryName: string; 
}

interface PopularCategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string) => void; 
}

const PopularCategoryFilter: React.FC<PopularCategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [popularCategories, setPopularCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => setExpanded(!expanded);

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const response = await categoryApi.getPopularCategories();
        console.log(response);
        const categories: Category[] = response.data.categories; 
        setPopularCategories(categories); 
      } catch (error) {
        console.error("Error fetching popular categories:", error);
        setError("Failed to load popular categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCategories();
  }, []);

  return (
    <div className="mt-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="text-lg font-semibold text-gray-700">
          Popular Categories
        </span>
        <span>
          {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </span>
      </div>

      {expanded && (
        <div className="text-sm font-normal mt-5 mb-5">
          <div className="grid grid-cols-3 gap-4">
            {loading ? ( 
              <div className="flex justify-center items-center col-span-3 h-24">
                {/* Center loader */}
                <SpinnerLoader />
              </div>
            ) : (
              popularCategories.map((category) => (
                <div
                  key={category._id} 
                  className={`border border-customGrayLight text-[9px] h-10 rounded-full items-center flex justify-center font-semibold text-customGrayLight2 
                    cursor-pointer // Always allow cursor pointer
                    ${
                      category._id === selectedCategory
                        ? "bg-customBlueLight"
                        : "hover:bg-customBlueLight3"
                    }`}
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} 
                  onClick={() => {
                    setSelectedCategory(category._id); 
                  }}
                >
                  {category.categoryName.length > 10 
                    ? `${category.categoryName.substring(0, 10)}..` 
                    : category.categoryName} 
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularCategoryFilter;