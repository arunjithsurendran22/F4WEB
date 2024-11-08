'use client'
import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import RightSidebar from "../ui/RightSidebar/RightSidebar";
import LocationSearch from "../locationSearch/LocationSearch";
import MapLottie from "../ui/mapLottie/MapLottie";

const NoStoreAvailable = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const openSidebar = () => setSidebarVisible(true);
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700 p-6">
      <FiAlertTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">No Store Available</h1>
      <p className="text-lg text-gray-600 mt-2 text-center max-w-md">
        Sorry, we couldn’t find any store available at the moment. Please select
        a store to view the content.
      </p>

      {/* Button to open the RightSidebar */}
      <button
        onClick={openSidebar}
        className="mt-4 flex items-center px-4 py-2 text-customBlueLight rounded-lg underline italic justify-center "
      >
        <MapLottie /> Search nearby Location
      </button>

      {/* RightSidebar component */}
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
};

export default NoStoreAvailable;
