import React from "react";

interface InputBoxProps {
  label: string; // Label text for the input
  value: string; // Value of the input box
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  backgroundColor?: string; // Optional background color for the input
  className?: string; // Optional additional class names for styling
  border?: string;
  disabled?: boolean; // New prop to indicate if the input should be disabled
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  backgroundColor = "bg-customBlueLight2", // Default background color if not passed
  className = "",
  border = "border",
  disabled = false,
}) => {
  return (
    <div
      className={`mb-4 ${className} ${disabled ? "cursor-not-allowed" : ""}`}
    >
      <label className="block text-customGrayLight2 text-sm mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`appearance-none rounded-full w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${backgroundColor} ${border} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`} // Add styles for disabled state
        disabled={disabled} // Disable the input if the prop is true
      />
    </div>
  );
};

export default InputBox;