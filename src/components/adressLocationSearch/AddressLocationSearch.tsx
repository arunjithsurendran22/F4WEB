"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentLocation, fetchNearbyStores } from "../../store/locationSlice";
import { AppDispatch, RootState } from "@/store";
import RightSidebar from "../ui/RightSidebar/RightSidebar";
import LocationSearch from "../locationSearch/LocationSearch";


interface LocationSearchProps {
  close?: () => void; // Optional close callback
  onChange: (latitude: number | null, longitude: number | null) => void;
}

const AddressLocationSearch: React.FC<LocationSearchProps> = ({ onChange }) => {

  const currentAddress = useSelector(
    (state: RootState) => state.location.currentAddress
  );
  const dispatch = useDispatch<AppDispatch>();
  const latitude = useSelector((state: RootState) => state.location.latitude);
  const longitude = useSelector((state: RootState) => state.location.longitude);
  onChange(latitude, longitude)

  // const [input, setInput] = useState('')
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

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      <div className="flex gap-3 mt-3 items-center">
        {/* {input ? (
          <h1 className="font-medium">{input}</h1>
        ) : (
          <h1 className="font-medium ml-5">Please select your location</h1>
        )} */}
        {loading ? (
            "Searching for your location..." 
          ) : (
            isClient
              ? currentAddress || "Please select your location!"
              : "Please select your location!"
          )}
        <div>
          <button
            onClick={() => { setSidebarVisible(true) }} // Use the onClick prop
            className='text-customBlueLight font-normal text-md'
          >
            Change
          </button>
        </div>
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
    </>
  );
};

export default AddressLocationSearch;
