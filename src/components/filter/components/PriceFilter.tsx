"use client";
import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const PriceFilter: React.FC<{
  lowestPrice: number;
  highestPrice: number;
  reset: boolean;
  setPriceRange: (lowest: number, highest: number) => void;
}> = ({ lowestPrice, highestPrice, reset, setPriceRange }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [localLowestPrice, setLocalLowestPrice] = useState<number>(lowestPrice);
  const [localHighestPrice, setLocalHighestPrice] =
    useState<number>(highestPrice);

  useEffect(() => {
    if (reset) {
      setLocalLowestPrice(0);
      setLocalHighestPrice(5000);
      setPriceRange(0, 5000);
    } else {
      setLocalLowestPrice(lowestPrice);
      setLocalHighestPrice(highestPrice);
    }
  }, [reset, setPriceRange, lowestPrice, highestPrice]);

  const toggleExpand = () => setExpanded(!expanded);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setLocalLowestPrice(value[0]);
      setLocalHighestPrice(value[1]);
      setPriceRange(value[0], value[1]);
    }
  };

  return (
    <div className="mt-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="text-lg font-semibold text-gray-700">Price</span>
        <span>
          {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </span>
      </div>

      {expanded && (
        <div className="text-sm font-normal mt-5 mb-5">
          <Slider
            range
            min={0}
            max={5000}
            value={[localLowestPrice, localHighestPrice]}
            onChange={handleSliderChange}
            trackStyle={{ backgroundColor: "#1E40AF" }}
            handleStyle={[
              { backgroundColor: "#015DB3", borderColor: "#015DB3" },
              { backgroundColor: "#015DB3", borderColor: "#015DB3" },
            ]}
            railStyle={{ backgroundColor: "#D9D9D9" }}
          />
          <div className="flex justify-between mt-2 text-gray-700">
            <span className="border px-5 py-2 rounded-xl border-customGrayLight text-customBlueLight font-semibold">
              ₹{localLowestPrice}
            </span>
            <span className="border px-5 py-2 rounded-xl border-customGrayLight text-customBlueLight font-semibold">
              ₹{localHighestPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
