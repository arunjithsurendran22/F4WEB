import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import EditButton from "../ui/Buttons/EditButton";
import { addressApi } from "@/services/addressService";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "160px",
};

function OrderDetailsMap() {
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);
  const [primaryCoordinates, setPrimaryCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Your API key
  });

  // Fetch user primary address
  const fetchPrimaryAddress = async () => {
    try {
      const response = await addressApi.getAllAddresses();
      const addresses = response.data.addresses;
      const primary = addresses.find((address: any) => address.primary);
      if (primary) {
        setPrimaryAddress(`${primary.city}, ${primary.state}`);
        setPrimaryCoordinates({
          lat: primary.latitude,
          lng: primary.longitude,
        });
      } else {
        setPrimaryAddress(null);
        setPrimaryCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching primary address:", error);
    }
  };

  useEffect(() => {
    fetchPrimaryAddress();
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="">
      <h1 className="font-semibold text-lg mb-4">Delivery Address</h1>
      <div className="border border-gray-300 rounded-xl w-80 h-56 p-4 flex flex-col">
        {/* Map Container */}
        <div className="flex justify-center h-full w-full mb-2">
          {primaryCoordinates ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={primaryCoordinates} 
              zoom={14}
            >
              {/* Add Marker for primary address location */}
              <Marker position={primaryCoordinates} />
            </GoogleMap>
          ) : (
            <div>Loading your address location...</div>
          )}
        </div>

        {/* Address and Edit button on the same line */}
        <div className="flex justify-between items-center py-2">
          {primaryAddress ? (
            <h1 className="font-medium ml-5">{primaryAddress}</h1>
          ) : (
            <h1 className="font-medium ml-5">Address</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsMap;
