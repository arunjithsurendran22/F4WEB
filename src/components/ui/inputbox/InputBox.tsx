import React from "react";

interface InputBoxProps {
  label: string; // Label text for the input
  value: string; // Value of the input box
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  backgroundColor?: string; // Optional background color for the input
  className?: string; // Optional additional class names for styling
  border?: string;
  disabled?: boolean; // Prop to indicate if the input should be disabled
  error?: string; // Error message for validation
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
  error, // Error message prop
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 text-sm mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`appearance-none rounded-full w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${backgroundColor} ${border} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${
          error ? "border-red-500" : ""
        }`} // Adds a red border if there's an error
        disabled={disabled} // Disable the input if the prop is true
      />
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p> // Display error message
      )}
    </div>
  );
};

export default InputBox;
