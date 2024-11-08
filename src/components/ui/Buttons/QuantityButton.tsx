"use client";
import React, { useState, useEffect } from "react";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

interface QuantityButtonProps {
  buttonSize?: string;
  textSize?: string;
  containerPadding?: string;
  borderColor?: string;
  btnSize?: string;
  initialQuantity?: number;
  onRemove?: () => void;
  onUpdateQuantity?: (newQuantity: number) => void;
  quantityLoader?: boolean;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  buttonSize = "w-10 h-10",
  textSize = "text-2xl",
  containerPadding = "px-3",
  borderColor = "border-customBlueLight",
  btnSize = "text-xl",
  initialQuantity = 1,
  onRemove,
  onUpdateQuantity,
  quantityLoader,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onUpdateQuantity) {
      onUpdateQuantity(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onUpdateQuantity) {
        onUpdateQuantity(newQuantity);
      }
    } else {
      if (onRemove) {
        onRemove();
      }
    }
  };

  return (
    <div
      className={`flex items-center space-x-1 border-2 ${borderColor} rounded-full ${containerPadding}`}
    >
      <button
        onClick={handleDecrement}
        className={`${buttonSize} flex items-center justify-center text-black font-bold ${btnSize} leading-none`}
      >
        -
      </button>
      <span className={`${textSize} font-semibold w-5 text-center`}>
        {quantityLoader ? <SpinnerLoader size="small" /> : quantity}
      </span>
      <button
        onClick={handleIncrement}
        className={`${buttonSize} flex items-center justify-center text-black font-bold ${btnSize} leading-none`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
