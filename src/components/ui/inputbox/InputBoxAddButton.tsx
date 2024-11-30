'use client'
import React, { useState, ChangeEvent, FC } from "react";

interface InputBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  disabled?: boolean;
}

const InputBoxAddButton: FC<InputBoxProps> = ({
  label, 
  placeholder = "Search for your place",
  value,
  onChange,
  buttonLabel = "Add",
  onButtonClick,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);


  return (
    <div className="flex flex-col md:w-96">
      {label && (
        <label className="text-sm md:text-lg mb-4 font-semibold ">{label}</label>
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
          disabled={disabled}
        />
        <button
          onClick={onButtonClick}
          onMouseOver={()=> setIsButtonFocused(true)}
          onMouseLeave={()=> setIsButtonFocused(false)}
          className={`${
            isButtonFocused ? (buttonLabel == 'Add' || buttonLabel == 'Use') ? "text-customBlueLight" : "text-customRed" : "text-customGrayLight"
          } px-4 py-2`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default InputBoxAddButton;
