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
      setLoading(false);
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
    <div className="px-4 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 md:py-8 min-h-96 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 className="font-semibold text-sm sm:text-base md:text-lg">
          Select Booking Slot
        </h1>
        <div className="flex gap-2 sm:gap-3 items-center">
          <Image
            src="/icons/star-coin 2.png"
            alt="Coin Icon"
            width={30}
            height={30}
          />
          <p className="font-medium text-sm sm:text-base md:text-lg">
            {coinBalance} Coins
          </p>
        </div>
      </div>

      {/* Grid layout for dates and slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:w-6/12 h-96 overflow-y-auto ">
        {!loading && slotsData.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            <Sorry />
            <h3 className="text-base sm:text-lg font-semibold italic">
              No Slots Available
            </h3>
            <p
              className="italic underline text-customBlueLight cursor-pointer"
              onClick={openSidebar}
            >
              Search Nearby Store
            </p>
          </div>
        ) : (
          slotsData.map((slotInfo, index) => (
            <div key={index} className="flex flex-col space-y-2 sm:space-y-3">
              <h2 className="font-semibold text-sm sm:text-base md:text-lg">
                {slotInfo.date}
              </h2>
              <div className="grid gap-2">
                {slotInfo.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="p-2 border rounded-full bg-customBlueLight2 cursor-pointer text-customBlueLight font-medium text-sm sm:text-base"
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
