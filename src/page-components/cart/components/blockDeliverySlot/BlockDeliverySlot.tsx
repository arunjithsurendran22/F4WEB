import React, { useState } from "react";
import Map from "@/components/map/Map";
import PaymentDetails from "@/components/PaymentDetails/PaymentDetails";
import { IoIosArrowForward, IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "@/components/ui/Buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface BlockDeliverySlotsProps {
  selectedDate: string;
  selectedSlot: string;
  addressId: string;
  slotId: string;
  cartId: string;
}

const BlockDeliverySlot: React.FC<BlockDeliverySlotsProps> = ({
  selectedSlot,
  addressId,
  slotId,
  cartId,
}) => {
  const router = useRouter();

  const expressProducts = useSelector((state: RootState) => state.cart.expressProducts);

  const isSlotSelected = !!selectedSlot || expressProducts;

  const handleNavigateToCheckSlot = () => {
    router.push(`/cart/checkSlots?addressId=${addressId}&&cartId=${cartId}`);
  };

  const handleRemoveSlot = () => {
    router.push(`/cart/blockDeliverySlot?addressId=${addressId}&&cartId=${cartId}`);
  }

  return (
    <div className="px-14 py-8 lg:flex justify-between lg:w-[52rem] min-h-96">
      <div>
        <Map />
      </div>
      <div className="mt-10 w-80">
        <PaymentDetails />
        <div>
          <h1 className="font-semibold text-lg">Select Booking Slot</h1>
          {
            expressProducts ? (
              <button
                className="border rounded-full flex justify-between w-full h-12 items-center p-4 mt-5"
              >
                Express

              </button>
            ) : (
              <>
                <button
                  className="border rounded-full flex justify-between w-full h-12 items-center p-4 mt-5"
                  onClick={handleNavigateToCheckSlot}
                >
                  Check Slots
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>

                {!!selectedSlot ? (
                  <button
                    className="rounded-full flex justify-between w-full h-12 items-center p-4 mt-5"
                  >
                    {selectedSlot} 
                    <span>
                      <IoIosRemoveCircleOutline onClick={handleRemoveSlot} />
                    </span>
                  </button>
                ) : ''}
              </>
            )
          }

          <div className="mt-5">
            {/* Conditionally disable the button based on slot selection */}
            <Link
              href={`/cart/paymentMethod?addressId=${addressId}&slotId=${slotId}&cartId=${cartId}`}
            >
              <Button
                backgroundColor={
                  isSlotSelected ? "bg-customBlueLight" : "bg-customBlueLight"
                }
                width="w-full"
                textColor={isSlotSelected ? "text-white" : "text-white"}
                disabled={!isSlotSelected}
              >
                Select Payment Method
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDeliverySlot;
