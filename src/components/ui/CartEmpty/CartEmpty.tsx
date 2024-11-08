import React from "react";
import cartAnimation from "../../../lottie/cart/cart.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function CartEmpty() {
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
      <LottieAnimation animationData={cartAnimation} width={300} height={300} />
    </div>
  );
}

export default CartEmpty;
