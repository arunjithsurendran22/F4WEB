import React from "react";
import "./SpinnerLoader.css";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "w-7 h-7",
  medium: "w-10 h-10",
  large: "w-16 h-16",
};

const SpinnerLoader: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`border-8 border-t-8 border-gray-300 border-t-customBlueLight rounded-full animate-spin ${sizeClass}`}
    ></div>
  );
};

export default SpinnerLoader;
