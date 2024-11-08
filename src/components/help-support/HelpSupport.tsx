"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function HelpSupport() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expand/collapse
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="">
      {/* Heading Section */}
      <div
        className="flex justify-between items-center cursor-pointer "
        onClick={toggleExpand}
      >
        <h1 className="text-md font-medium">Lorem ipsum dolor sit amet</h1>
        {isExpanded ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </div>

      {/* Conditionally render the total amount */}
      {isExpanded && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-customGrayLight2">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpSupport;
