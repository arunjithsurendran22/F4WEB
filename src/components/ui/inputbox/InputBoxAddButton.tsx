'use client'
import React, { useState, ChangeEvent, FC } from "react";

interface InputBoxProps {
  label?: string; // New prop for label
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const InputBoxAddButton: FC<InputBoxProps> = ({
  label, // Destructure label prop
  placeholder = "Search for your place",
  value,
  onChange,
  buttonLabel = "Add",
  onButtonClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col w-96">
      {label && (
        <label className="mb-4 font-semibold ">{label}</label>
      )}
      <div
        className={`flex items-center border rounded-xl overflow-hidden h-14 ${
          isFocused ? "border-customBlueLight" : "border-customGrayLight"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="px-5 py-3 w-full h-12 outline-none"
        />
        <button
          onClick={onButtonClick}
          className={`${
            isFocused ? "text-customBlueLight" : "text-customGrayLight"
          } px-4 py-2`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default InputBoxAddButton;
