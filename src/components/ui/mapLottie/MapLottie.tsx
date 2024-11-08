import React from "react";
import MapAnimation from "../../../lottie/map/map.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function MapLottie() {
  return (
    <div>
      <LottieAnimation animationData={MapAnimation} width={80} height={80} />
    </div>
  );
}

export default MapLottie;
