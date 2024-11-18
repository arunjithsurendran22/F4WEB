"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { timeSlotApi } from "@/services/timeSlotService";
import Sorry from "@/components/ui/Sorry/Sorry";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import LocationSearch from "@/components/locationSearch/LocationSearch";
import { useAppSelector } from "@/hooks/useAppSelector";

interface Slot {
  _id: string;
  fromTime: string;
  toTime: string;
}

interface SlotGroup {
  date: string;
  slots: Slot[];
}

function CheckSlots() {
  const router = useRouter();
  const coinBalance = useAppSelector(
    (state: RootState) => state.profile.profile.coinBalance
  );
  const searchParams = useSearchParams();
  const addressId = searchParams?.get("addressId") ?? undefined;
  const cartId = searchParams?.get("cartId") ?? undefined;
  const [slotsData, setSlotsData] = useState<SlotGroup[]>([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const storeId = useSelector((state: RootState) => state.location.storeId);

  useEffect(() => {
    if (storeId) {
      fetchSlots();
    }
  }, [storeId]);

  const fetchSlots = async () => {
    try {
      const slotType = "NORMAL";
      const response = await timeSlotApi.getAllSlots(storeId, slotType);

      // Transforming the API data to fit the format of the component's state
      const formattedSlotsData = response.data.timeSlots.map(
        (timeSlotGroup: any) => ({
          date: timeSlotGroup.date,
          slots: timeSlotGroup.slots.map((slot: any) => ({
            _id: slot._id,
            fromTime: slot.fromTime,
            toTime: slot.toTime,
          })),
        })
      );

      setSlotsData(formattedSlotsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleSlotSelection = (date: string, slot: Slot) => {
    router.push(
      `/cart/blockDeliverySlot?slot=${encodeURIComponent(
        `${date} , ${slot.fromTime} - ${slot.toTime}`
      )}&slotId=${slot._id}&addressId=${addressId}&cartId=${cartId}`
    );
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  return (
    <div className="px-14 py-8 min-h-96 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between mb-6">
        <h1 className="font-semibold text-lg">Select Booking Slot</h1>
        <div className="flex gap-3 items-center">
          <Image
            src="/icons/star-coin 2.png"
            alt="Coin Icon"
            width={30}
            height={30}
          />
          <p className="font-medium">{coinBalance} Coins</p>
        </div>
      </div>

      {/* Grid layout for dates and slots */}
      {/* <div className="grid grid-cols-2 gap-6 w-6/12">
        {(!loading && slotsData.length === 0) ? ( // Check if there are no slots
          <div className="col-span-2 text-center text-gray-500">
            <Sorry />
            <h3 className="text-lg font-semibold italic">No Slots Available</h3>
            <p
              className="italic underline text-customBlueLight cursor-pointer"
              onClick={openSidebar}
            >
              Search Near by store
            </p>
          </div>
        ) : (
          slotsData.map((slotInfo, index) => (
            <div key={index}>
              <h2 className="font-semibold text-lg mb-4">{slotInfo.date}</h2>
              <div className="space-y-2">
                {slotInfo.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="p-2 border rounded-full bg-customBlueLight2 cursor-pointer text-customBlueLight font-medium text-lg mb-5"
                    onClick={() => handleSlotSelection(slotInfo.date, slot)}
                  >
                    {`${slot.fromTime} - ${slot.toTime}`}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div> */}
      {/* Grid layout for dates and slots */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-6/12">
        {(!loading && slotsData.length === 0) ? ( // Check if there are no slots
          <div className="col-span-2 text-center text-gray-500">
            <Sorry />
            <h3 className="text-lg font-semibold italic">No Slots Available</h3>
            <p
              className="italic underline text-customBlueLight cursor-pointer"
              onClick={openSidebar}
            >
              Search Near by store
            </p>
          </div>
        ) : (
          slotsData.map((slotInfo, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <h2 className="font-semibold text-lg">{slotInfo.date}</h2>
              <div className="grid gap-2">
                {slotInfo.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="p-2 border rounded-full bg-customBlueLight2 cursor-pointer text-customBlueLight font-medium text-lg"
                    onClick={() => handleSlotSelection(slotInfo.date, slot)}
                  >
                    {`${slot.fromTime} - ${slot.toTime}`}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
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

export default CheckSlots;
