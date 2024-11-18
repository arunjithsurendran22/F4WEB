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
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";
import { toast } from "react-hot-toast";
import { fetchCartItems } from "@/store/cartSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/navigation";
import { fetchNotifications } from "@/store/notificationSlice";

interface CashOnDeliveryProps {
  addressId: string;
  timeSlotId: string | null;
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
  if(!timeSlotId) timeSlotId = null;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ordersId, setOrdersId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCheckout = async () => {
    // if (grandTotal <= 0) {
    //   console.error("Total amount must be greater than 0 to proceed.");
    //   return;
    // }
    setIsLoading(true);
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
      setIsLoading(false);
      if(result.status){
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
      if (result.data.orderDetails) {
        setOrdersId(result.data.orderDetails.orderId);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Error creating COD payment:", error);
    }finally{
      setIsLoading(false);
    }

  };

  const handleCloseModal = () => {
    dispatch(fetchCartItems());
    setIsReviewModalOpen(false);
    router.push("/");
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    dispatch(fetchCartItems() as any);
    dispatch(fetchNotifications({storeId}) as any)
    setIsReviewModalOpen(false);
    router.push("/");
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
            disabled = {isLoading}
          >
            {isLoading ? <SpinnerLoader /> : "Checkout"}
          </Button>
        </div>
      )}

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title=""
        showCloseButton={false}
        backgroundClickClose={false}
      >
        <SuccessfullCard
          grandTotal={grandTotal}
          onContinue={handleCloseSuccessModal}
        />
      </Modal>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        title=""
        showCloseButton={true}
        backgroundClickClose={false}
      >
        <div className="p-4">
          <ReviewCard orderId={ordersId} closeModal={handleCloseReviewModal} />
        </div>
      </Modal>
    </div>
  );
};

export default CashOnDelivery;
