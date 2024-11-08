import React from "react";
import SorryAnimation from "../../../lottie/sorry/sorry.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function Sorry() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <LottieAnimation animationData={SorryAnimation} width={150} height={150} />
    </div>
  );
}

export default Sorry;
