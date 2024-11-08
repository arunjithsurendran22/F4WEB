// src/components/AppliedCoupon.tsx
import React from "react";

interface AppliedCouponProps {
  totalDiscount: number; // Receive total discount directly as a prop
}

function AppliedCoupon({ totalDiscount }: AppliedCouponProps) {
  return (
    <div className="bg-gradient-to-r from-gradientBlueStart to-gradientBlueEnd p-4">
      {totalDiscount > 0 ? (
        <p>
          🥳{" "}
          <span className="font-bold">₹{totalDiscount.toFixed(2)} Saved</span>{" "}
          on this order
        </p>
      ) : (
        <p>No discounts applied</p>
      )}
    </div>
  );
}

export default AppliedCoupon;
