"use client";
import React, { useEffect, useState } from "react";
import EditButton from "@/components/ui/Buttons/EditButton";
import { addressApi } from "@/services/addressService"; // Adjust the import based on your file structure
import Link from "next/link";

function DeliveryAddress() {
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);

  const fetchPrimaryAddress = async () => {
    try {
      const response = await addressApi.getAllAddresses();
      const addresses = response.data.addresses;
      const primary = addresses.find((address: any) => address.primary);
      if (primary) {
        setPrimaryAddress(`${primary.city}, ${primary.state}`);
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
    <div className="flex gap-3 mt-3 items-center">
      <h1 className="font-semibold text-xl">Delivery Address</h1>
      {primaryAddress ? (
        <h1 className="font-medium ml-5">{primaryAddress}</h1>
      ) : (
        <h1 className="font-medium ml-5">please add address</h1>
      )}
      <Link href="/profile/my-address">
        <EditButton />
      </Link>
    </div>
  );
}

export default DeliveryAddress;
