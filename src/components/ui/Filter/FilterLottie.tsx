import React from "react";
import FilterAnimation from "../../../lottie/Filter/filter2.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function FilterLottie({ width = 20, height = 20 }) {
  return (
    <LottieAnimation
      animationData={FilterAnimation}
      width={width}
      height={height}
      loop={false}
    />
  );
}

export default FilterLottie;
