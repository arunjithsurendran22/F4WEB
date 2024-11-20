import React from "react";
import cartAnimation from "../../../lottie/cart/cart.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function CartEmpty() {
  return (
    <div>
      <LottieAnimation animationData={cartAnimation} width={200} height={300} />
    </div>
  );
}

export default CartEmpty;
