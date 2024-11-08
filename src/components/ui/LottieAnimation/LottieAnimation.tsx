import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: object; // Animation JSON data
  width?: number | string;
  height?: number | string;
  loop?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  width = "100%",
  height = "100%",
  loop = true,
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      style={{ width, height }}
    />
  );
};

export default LottieAnimation;
