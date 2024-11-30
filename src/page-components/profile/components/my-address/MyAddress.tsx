"use client";
import Button from "@/components/ui/Buttons/Button";
import Address from "@/page-components/address/Address";
import { addressApi } from "@/services/addressService";
import React, { useState } from "react";
import toast from "react-hot-toast";

function MyAddress() {
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [refetchAddress, setRefetchAddress] = useState<boolean>(false);

  const handleSetDefaultAddress = async () => {
    if (defaultAddressId) {
      try {
        const response = await addressApi.setDefaultPrimary(defaultAddressId);

        if (response.status) {
          toast.success("Success! Default address changed!");
          setRefetchAddress(true);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error setting default address:", error);
      }
    }
  };

  return (
    <div className="p-3">
      <Address
        navigationUrl="/profile/my-address/new-address"
        setDefaultAddressId={setDefaultAddressId}
        refetchAddress={refetchAddress}
      />
      {
        defaultAddressId && (
          <div className="mt-10">
            <Button
              width="w-full md:w-96"
              height="h-14"
              backgroundColor="bg-customBlueLight"
              textColor="text-white"
              fontSize="font-medium"
              onClick={handleSetDefaultAddress}
            >
              Set as default address
            </Button>
          </div>
        )
      }
    </div>
  );
}

export default MyAddress;
