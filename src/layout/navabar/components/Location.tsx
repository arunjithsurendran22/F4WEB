"use client";
import React, { useEffect, useState } from "react";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import LocationSearch from "@/components/locationSearch/LocationSearch";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchCurrentLocation,
  fetchNearbyStores,
} from "@/store/locationSlice";

function Location() {
  const dispatch = useDispatch<AppDispatch>();
  const latitude = useSelector((state: RootState) => state.location.latitude);
  const longitude = useSelector((state: RootState) => state.location.longitude);
  const currentAddress = useSelector(
    (state: RootState) => state.location.currentAddress
  );
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true); 
      if (latitude && longitude) {
        await dispatch(fetchNearbyStores({ latitude, longitude }));
      } else {
        await dispatch(fetchCurrentLocation());
      }
      setLoading(false); 
    };

    fetchLocation();
  }, [latitude, longitude, dispatch]);

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5">
        <FaMapMarkerAlt
          className="text-gray-600 cursor-pointer"
          onClick={openSidebar}
        />
      </div>
      <div className="flex gap-3">
        <p
          className="text-gray-600 font-semibold text-xs md:text-[12px] cursor-pointer"
          onClick={openSidebar}
        >
          {loading ? (
            "Searching for your location..." 
          ) : (
            isClient
              ? currentAddress || "No store available near this location!!!"
              : "No store available near this location!!!"
          )}
        </p>
      </div>
      <RightSidebar
        isVisible={isSidebarVisible}
        onClose={closeSidebar}
        title="Select a Location"
      >
        <div>
          <LocationSearch close={closeSidebar} />
        </div>
      </RightSidebar>
    </div>
  );
}

export default Location;