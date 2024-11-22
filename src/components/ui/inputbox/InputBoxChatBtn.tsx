import React, { useState, ChangeEvent, FC, useEffect } from "react";
import Image from "next/image";

interface InputBoxProps {
  label?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: (inputValue: string) => void; // Pass the input value on button click
  clearInput?: boolean;
}

const InputBoxChatBtn: FC<InputBoxProps> = ({
  label,
  placeholder = "Type your message...",
  onChange,
  onButtonClick,
  clearInput,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (clearInput) {
      setInputValue(""); // Clear input value if clearInput prop is true
    }
  }, [clearInput]);

  // Trigger the button click when the Enter key is pressed
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick && inputValue.trim()) {
      onButtonClick(inputValue); // Pass the input value back to parent
      setInputValue(""); // Clear the input after sending the message
    }
  };

  return (
    <div className="flex flex-col">
      {label && <label className="mb-4 font-medium">{label}</label>}
      <div className="flex items-center border bg-customBlueLight2 rounded-full p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value); // Update local state with input value
            if (onChange) {
              onChange(e); // Notify parent of the input change
            }
          }}
          onKeyDown={handleKeyPress} // Listen for Enter key
          placeholder={placeholder}
          className="px-5 md:py-3 w-full h-full outline-none bg-customBlueLight2 text-sm rounded-full"
        />
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 bg-customGrayLight text-black rounded-full p-2 ml-2"
        >
          <Image src="/icons/Send.png" alt="Send" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default InputBoxChatBtn;
