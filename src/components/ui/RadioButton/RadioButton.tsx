"use client";
import React, { FC } from "react";
import { MdDone } from "react-icons/md";

interface RadioButtonProps {
  checked?: boolean;
  onChange?: () => void;
  name: string; // Required for radio buttons
}

const RadioButton: FC<RadioButtonProps> = ({ checked, onChange, name }) => {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name} // Grouping by name for radio buttons
        className="sr-only" // Hide default radio button
      />
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
          checked ? "bg-customBlueLight" : "bg-customGrayLight"
        }`}
      >
        {checked && (
          <div>
            <MdDone className="text-white" />
          </div>
        )}
      </div>
    </label>
  );
};

export default RadioButton;
