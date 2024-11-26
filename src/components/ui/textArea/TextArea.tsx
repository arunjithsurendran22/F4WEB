import React from "react";

interface TextAreaProps {
  label: string;
  value: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  backgroundColor?: string;
  height?: string;
  border?: string;
  disabled?: boolean;
  error?: string; // New prop for error message
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  className = "",
  backgroundColor = "bg-customBlueLight2",
  height = "h-40",
  border = "border-none",
  disabled = false,
  error, // Destructure errorMessage prop
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 text-xs md:text-sm mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`block w-full ${backgroundColor} ${height} ${border} text-gray-700 md:py-2 md:px-3 p-2 text-xs md:text-sm rounded-2xl leading-tight focus:outline-none ${
          disabled ? "cursor-not-allowed" : ""
        } ${error ? "border-red-500" : ""}`} // Add red border if error
        rows={4}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default TextArea;
