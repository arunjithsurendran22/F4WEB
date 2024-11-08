import React from "react";

interface TextAreaProps {
  label: string; // Label for the textarea
  value: string; // Textarea value
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Function to handle changes
  className?: string; // Optional additional class names for styling
  backgroundColor?: string; // Optional background color (default is light gray)
  height?: string;
  border?: string;
  disabled?: boolean; // New prop to indicate if the textarea should be disabled
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  className = "",
  backgroundColor = "bg-customBlueLight2",
  height = 'h-40',
  border = "border-none",
  disabled = false, // Default value for disabled
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 text-sm mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`block w-full ${backgroundColor} ${height} ${border} text-gray-700 py-2 px-3 rounded-2xl leading-tight focus:outline-none ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`} // Add styles for disabled state
        rows={4} // You can adjust the default number of rows
        disabled={disabled} // Disable the textarea if the prop is true
      />
    </div>
  );
};

export default TextArea;