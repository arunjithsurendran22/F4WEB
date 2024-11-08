// InputBoxCloseButton.tsx
"use client";
import React, { useState, ChangeEvent, FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface InputBoxProps {
  label?: string; // New prop for label
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  clearInput?: boolean; // New prop for clearing input
}

const InputBoxCloseButton: FC<InputBoxProps> = ({
  label,
  placeholder = "Enter text",
  onChange,
  onButtonClick,
  clearInput, // Destructure clearInput prop
}) => {
  const [inputValue, setInputValue] = useState(""); // Local input state

  // Effect to clear the input box when clearInput becomes true
  useEffect(() => {
    if (clearInput) {
      setInputValue(""); // Clear input value
    }
  }, [clearInput]);

  const handleButtonClick = () => {
    setInputValue(""); // Clear the input value
    if (onButtonClick) {
      onButtonClick(); // Notify parent of the clear action
    }
  };

  return (
    <div className="flex flex-col">
      {label && <label className="mb-4 font-medium">{label}</label>}
      <div
        className={`flex items-center border border-customBlueLight rounded-full overflow-hidden h-14 `}
      >
        <input
          type="text"
          value={inputValue} // Use internal state for input value
          onChange={(e) => {
            setInputValue(e.target.value); // Update local state with input value
            if (onChange) {
              onChange(e); // Notify parent of the input change
            }
          }}
          placeholder={placeholder}
          className="px-5 py-3 w-full h-12 outline-none"
        />
        <button onClick={handleButtonClick} className="text-black px-3 text-xl">
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default InputBoxCloseButton;
