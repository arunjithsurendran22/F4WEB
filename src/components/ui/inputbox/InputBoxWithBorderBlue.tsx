import React from "react";

interface InputBoxProps {
  label: string;
  value: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor?: string;
  className?: string;
  readOnly?: boolean;
}
const InputBoxWithBorderBlue: React.FC<InputBoxProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  backgroundColor = "bg-white",
  className = "",
  readOnly = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-customGrayLight2 text-sm mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        readOnly={readOnly}
        className={`${
          readOnly ? "bg-customGrayLight4 text-gray-400 italic" : "bg-white  text-gray-600"
        } border border-customBlueLight appearance-none rounded-full w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline ${backgroundColor}`}
      />
    </div>
  );
};

export default InputBoxWithBorderBlue;
