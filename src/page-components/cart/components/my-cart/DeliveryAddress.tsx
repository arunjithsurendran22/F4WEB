"use client";
import React, { useEffect, useState } from "react";
import EditButton from "@/components/ui/Buttons/EditButton";
import { addressApi } from "@/services/addressService"; // Adjust the import based on your file structure
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function DeliveryAddress() {
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);
  const [deliverable, setDeliverable] = useState(false)
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const cartId = useSelector((state: RootState) => state.cart.cartId);


  const fetchPrimaryAddress = async () => {
    try {
      const response = await addressApi.getAllAddresses();
      const addresses = response.data.addresses;
      const primary = addresses.find((address: any) => address.primary);
      if (primary) {
        setPrimaryAddress(`${primary.address} ${primary.city}, ${primary.state}`);
        const checkAvailability = await addressApi.checkAddressAvailability(primary._id, { storeId })
        if (checkAvailability.data && checkAvailability.data.availability) {
          setDeliverable(true)
        }

      } else {
        setPrimaryAddress(null);
      }
    } catch (error) {
      console.error("Error fetching primary address:", error);
    }
  };

  useEffect(() => {
    fetchPrimaryAddress();
  }, []);

  return (
    <div className="delivery-address md:w-[28rem]">
      <div className="mt-3 items-center">
        <h1 className="font-semibold md:text-xl text-xs">Delivery Address</h1>
        {primaryAddress ? (

          <div className="mt-2">
            <h1 className="font-medium text-xs md:text-lg">{primaryAddress}</h1>
            {
              !deliverable ? (
                <p className="text-xs text-customRed font-medium ml-auto">
                  Not deliverable
                </p>
              ) : ''
            }
          </div>
        ) : (
          <h1 className="font-medium ml-5">please add address</h1>
        )}
        <Link href={`/cart/cartAddress?cartId=${cartId}`}>
          <EditButton />
        </Link>
      </div>

    </div>

  );
}

export default DeliveryAddress;
