"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../ui/Buttons/Button";
import Modal from "../ui/modal/Modal";
import SuccessfullCard from "../successfullCard/SuccessfullCard";
import ReviewCard from "../reviewCard/ReviewCard";
import { ordersApi } from "@/services/ordersService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CashOnDeliveryProps {
  addressId: string;
  timeSlotId: string;
  cartId: string;
}

const CashOnDelivery: React.FC<CashOnDeliveryProps> = ({
  addressId,
  timeSlotId,
  cartId,
}) => {
  const {
    grandTotal = 0,
    subTotal = 0,
    couponDiscount = 0,
    coinsAmount = 0,
  } = useSelector((state: RootState) => state.cart);
  const storeId = useSelector((state: RootState) => state.location.storeId);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ordersId, setOrdersId] = useState<string | null>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCheckout = async () => {
    if (grandTotal <= 0) {
      console.error("Total amount must be greater than 0 to proceed.");
      return;
    }

    const orderData = {
      cartId,
      addressId,
      timeSlotId,
      storeId,
      subTotal,
      couponDiscount,
      coinsAmount,
      deliveryCharge: 0,
      grandTotal,
    };

    try {
      const result = await ordersApi.createCodPayment(orderData);
      if (result.data.orderDetails) {
        setOrdersId(result.data.orderDetails.orderId);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Error creating COD payment:", error);
    }
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h1 className="text-lg font-semibold">Cash on Delivery</h1>
        {isExpanded ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-4">
          <Button
            backgroundColor="bg-customBlueLight"
            textColor="text-white"
            width="w-full"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      )}

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title=""
        showCloseButton={false}
      >
        <SuccessfullCard
          onContinue={() => {
            setIsSuccessModalOpen(false);
            setIsReviewModalOpen(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title=""
        showCloseButton={false}
      >
        <div className="p-4">
          <ReviewCard
            orderId={ordersId}
            closeModal={() => setIsReviewModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CashOnDelivery;
