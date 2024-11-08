"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Buttons/Button";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Address from "@/page-components/address/Address";

function SelectAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartId = searchParams?.get("cartId") ?? "";
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleNavigate = () => {
    setLoading(true);

    if (selectedAddressId) {
      router.push(
        `/cart/blockDeliverySlot?addressId=${selectedAddressId}&&cartId=${cartId}`
      );
    } else {
      console.warn("No address selected.");
      setLoading(false);
    }
  };

  return (
    <div className="px-14 py-8">
      <Address
        navigationUrl="/cart/cartAddAddress"
        onAddressSelect={setSelectedAddressId}
      />
      <div className="flex justify-end w-5/12 mb-5 mt-5">
        <Button
          borderRadius="rounded-xl"
          backgroundColor="bg-customBlueLight"
          textColor="text-white"
          fontSize="font-medium"
          onClick={handleNavigate}
          disabled={loading}
          
        >
          {loading ? <SpinnerLoader /> : "Next"}{" "}
        </Button>
      </div>
    </div>
  );
}

export default SelectAddress;
