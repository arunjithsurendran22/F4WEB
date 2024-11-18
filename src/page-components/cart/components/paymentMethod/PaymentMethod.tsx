"use client";
import CashOnDelivery from "@/components/CashOnDelivery/CashOnDelivery";
import Map from "@/components/map/Map";
import OnlinePayment from "@/components/OnlinePayment/OnlinePayment";
import PaymentDetails from "@/components/PaymentDetails/PaymentDetails";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function PaymentMethod() {
  const searchParams = useSearchParams();
  const addressId = searchParams?.get("addressId") ?? "";
  const slotId = searchParams?.get("slotId") ?? "";
  const cartId = searchParams?.get("cartId") ?? "";
  const [total, setTotal] = useState<number>(0);


  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };

  return (
    <div className="px-14 py-8 flex gap-28 min-h-96">
      <div>
        <Map />
      </div>
      <div className="mt-10 w-80">
        <h1 className="font-semibold text-lg">Payment Method</h1>
        <div className="mt-10">
          <PaymentDetails onTotalChange={handleTotalChange} />
        </div>
        <div className="mt-5">
          <CashOnDelivery
            addressId={addressId}
            timeSlotId={slotId}
            cartId={cartId}
          />
        </div>
        {
          total>0 &&(
          <div className="mt-5">
            <OnlinePayment
              addressId={addressId}
              timeSlotId={slotId}
              cartId={cartId}
            />
          </div>)}
      </div>
    </div>
  );
}

export default PaymentMethod;
