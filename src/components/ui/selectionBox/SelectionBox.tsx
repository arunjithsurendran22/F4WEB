import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectionBoxProps {
  options: Option[]; // Array of options to choose from
  label: string; // Label for the selection box
  value: string | number; // The currently selected value
  onChange: (value: string) => void; // Function to handle value changes
  placeholder?: string; // Optional placeholder text
  className?: string; // Optional additional class names for styling
  backgroundColor?: string; // Optional background color (default is light gray)
  disabled?: boolean; // Optional prop to disable the selection box
}

const SelectionBox: React.FC<SelectionBoxProps> = ({
  options,
  label,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  backgroundColor = "bg-customBlueLight2",
  disabled = false, // Default to false
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full ${backgroundColor} text-customGrayLight2 py-4 px-3 rounded-full leading-tight focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled} // Disable the select element based on the prop
      >
        <option value="" disabled className="text-customGrayLight2">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-customGrayLight2 rounded-2xl">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectionBox;
