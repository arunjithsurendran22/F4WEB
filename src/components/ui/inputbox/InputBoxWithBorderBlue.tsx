import React from "react";

interface InputBoxProps {
  label: string; // Label text for the input
  value: string; // Value of the input box
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  backgroundColor?: string; // Optional background color for the input
  className?: string; // Optional additional class names for styling
}

const InputBoxWithBorderBlue: React.FC<InputBoxProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  backgroundColor = "bg-white", // Default background color if not passed
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 text-sm  mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`border border-customBlueLight appearance-none  rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${backgroundColor}`}
      />
    </div>
  );
};

export default InputBoxWithBorderBlue;
