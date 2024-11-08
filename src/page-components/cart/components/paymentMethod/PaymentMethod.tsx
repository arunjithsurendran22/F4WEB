"use client";
import CashOnDelivery from "@/components/CashOnDelivery/CashOnDelivery";
import Map from "@/components/map/Map";
import OnlinePayment from "@/components/OnlinePayment/OnlinePayment";
import PaymentDetails from "@/components/PaymentDetails/PaymentDetails";
import { useSearchParams } from "next/navigation";
import React from "react";

function PaymentMethod() {
  // Extract addressId and slotId from query parameters
  const searchParams = useSearchParams();
  const addressId = searchParams?.get("addressId") ?? "";
  const slotId = searchParams?.get("slotId") ?? "";
  const cartId = searchParams?.get("cartId") ?? "";

  return (
    <div className="px-14 py-8 flex gap-28">
      <div>
        <Map />
      </div>
      <div className="mt-10 w-80">
        <h1 className="font-semibold text-lg">Payment Method</h1>
        <div className="mt-10">
          <PaymentDetails />
        </div>
        <div className="mt-5">
          <CashOnDelivery
            addressId={addressId}
            timeSlotId={slotId}
            cartId={cartId}
          />
        </div>
        <div className="mt-5">
          <OnlinePayment
            addressId={addressId}
            timeSlotId={slotId}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
