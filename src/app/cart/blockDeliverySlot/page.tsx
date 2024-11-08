"use client";
import BlockDeliverySlot from "@/page-components/cart/components/blockDeliverySlot/BlockDeliverySlot";
import { useSearchParams } from "next/navigation";
import React from "react";

function BlockDeliverySlotPage() {
  // Get the search parameters from the URL
  const searchParams = useSearchParams();

  // Extract the 'date', 'slot', 'addressId', and 'slotId' query parameters
  const date = searchParams?.get("date") ?? "";
  let slot = searchParams?.get("slot") ?? "";
  let addressId = searchParams?.get("addressId") ?? "";
  const slotId = searchParams?.get("slotId") ?? "";
  const cartId = searchParams?.get("cartId") ?? "";

  // If the slot parameter includes 'addressId=', we need to separate it
  if (slot.includes("addressId=")) {
    const [actualSlot, extractedAddressId] = slot.split("addressId=");
    slot = actualSlot.trim(); // Clean up the actual slot
    addressId = extractedAddressId.trim(); // Extract and trim addressId
  }

  return (
    <div>
      {/* Pass the extracted query parameters as props */}
      <BlockDeliverySlot
        selectedDate={date}
        selectedSlot={slot}
        addressId={addressId}
        slotId={slotId}
        cartId={cartId}
      />
    </div>
  );
}

export default BlockDeliverySlotPage;
