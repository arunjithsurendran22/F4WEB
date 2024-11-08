"use client";
import React, { FC } from "react";
import { MdDone } from "react-icons/md";

interface CheckboxProps {
  checked?: boolean;
  onChange?: () => void;
  borderRadius?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  borderRadius = "rounded-full",
}) => {
  return (
    <label className="relative cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only" // Hide default checkbox
      />
      <div
        className={`w-6 h-6 ${borderRadius} flex items-center justify-center transition-colors ${
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

export default Checkbox;
