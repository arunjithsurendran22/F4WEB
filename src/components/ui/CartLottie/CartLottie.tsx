import React from "react";
import CartAnimation from "../../../lottie/addToCart/done.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

const CartLottie = () => {
  return (
    <div>
      <LottieAnimation animationData={CartAnimation} width={500} height={500} />
    </div>
  );
};

export default CartLottie;
