"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface RatingFilterProps {
  selectedRating: number;
  setSelectedRating: (rating: number) => void; 
  reset: boolean;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRating,
  setSelectedRating,
  reset, 
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (reset) {
      setSelectedRating(0); 
    }
  }, [reset, setSelectedRating]);

  const toggleExpand = () => setExpanded(!expanded);
  const starOptions = [1, 2, 3, 4, 5];

  return (
    <div className="mt-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="text-lg font-semibold text-gray-800"> Rating </span>
        <span>
          {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </span>
      </div>
      {expanded && (
        <div className="text-sm font-normal mt-5 mb-5 md:w-80">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {starOptions.map((rating) => (
              <div
                key={rating}
                className={`flex items-center justify-center border w-full py-2 px-5 rounded-full 
                  ${
                    rating === selectedRating
                      ? "bg-customBlueLight"
                      : "hover:bg-customBlueLight3"
                  } 
                  cursor-pointer`} 
                onClick={() => {
                  setSelectedRating(rating); 
                }}
              >
                {[...Array(rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-customYellow ${
                      i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingFilter;