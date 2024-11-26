"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Buttons/Button";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Address from "@/page-components/address/Address";
import toast from "react-hot-toast";
import { addressApi } from "@/services/addressService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function SelectAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartId = searchParams?.get("cartId") ?? "";
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  
  const handleNavigate = async () => {
    setLoading(true);

    if (selectedAddressId) {
      const checkAvailability = await addressApi.checkAddressAvailability(selectedAddressId, {storeId} )
      if(checkAvailability.data && checkAvailability.data.availability){
        await addressApi.setDefaultPrimary(selectedAddressId);

        router.push(
          `/cart/blockDeliverySlot?addressId=${selectedAddressId}&&cartId=${cartId}`
        );
      }else{
        toast.error("The selected address is not deliverable. Please choose another or add a new address to proceed.");
        setLoading(false);

      }
      
    } else {
      toast.error("Select an address or add new address to proceed");
      setLoading(false);
    }
  };

  return (
    <div className="px-14 py-8">
      <Address
        navigationUrl={`/cart/cartAddAddress?cartId=${cartId}`}
        onAddressSelect={setSelectedAddressId}
      />
      <div className="flex justify-end w-full mb-5 mt-6 md:w-[35rem]">
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
