"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../ui/Buttons/Button";
import Modal from "../ui/modal/Modal";
import SuccessfullCard from "../successfullCard/SuccessfullCard";
import ReviewCard from "../reviewCard/ReviewCard";
import { fetchCartTotal, setCartUpdated } from "@/store/cartSlice";
import { RootState } from "@/store";
import { ordersApi } from "@/services/ordersService";
import { initiatePayment } from "@/utils/razorpay";
import toast from "react-hot-toast";

interface OnlinePaymentProps {
  addressId: string;
  timeSlotId: string;
  cartId: string;
}

const OnlinePayment: React.FC<OnlinePaymentProps> = ({
  addressId,
  timeSlotId,
  cartId,
}) => {
  const dispatch = useDispatch();
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
  const [paymentData, setPaymentData] = useState({
    cartId,
    addressId,
    timeSlotId,
    storeId,
    subTotal,
    couponDiscount,
    coinsAmount,
    deliveryCharge: 0,
    grandTotal,
  });

  useEffect(() => {
    dispatch(fetchCartTotal() as any);
  }, [dispatch]);

  useEffect(() => {
    setPaymentData({
      cartId,
      addressId,
      timeSlotId,
      storeId,
      subTotal,
      couponDiscount,
      coinsAmount,
      deliveryCharge: 0,
      grandTotal,
    });
  }, [
    cartId,
    addressId,
    timeSlotId,
    storeId,
    subTotal,
    couponDiscount,
    coinsAmount,
  ]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckout = async () => {
    if (grandTotal <= 0) {
      console.error("Total amount must be greater than 0 to proceed.");
      return;
    }
    try {
      dispatch(setCartUpdated(true));
      const response = await ordersApi.createPayment(paymentData);
      const { paymentOrderDetails } = response.data;

      const responsePayment = await initiatePayment({
        key: paymentOrderDetails.key_id,
        amount: paymentOrderDetails.amount_due,
        currency: paymentOrderDetails.currency,
        name: paymentOrderDetails.notes.name,
        description: "Your purchase description",
        order_id: paymentOrderDetails.id,
        customerName: paymentOrderDetails.notes.name,
        customerEmail: paymentOrderDetails.notes.email || "",
        customerContact: paymentOrderDetails.notes.phone || "",
      });

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        responsePayment;

      const verificationResponse = await ordersApi.verifyPayment(
        {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        },
        {
          headers: {
            "x-razorpay-signature": razorpay_signature,
          },
        }
      );

      const verifiedOrderId =
        verificationResponse.data.orderBookingDetails.orderId;
      setOrdersId(verifiedOrderId);

      if (verificationResponse.data.orderBookingDetails) {
        setIsSuccessModalOpen(true);
      } else {
        toast.error("Payment verification failed. Please try again.");
      }

      await dispatch(fetchCartTotal() as any);
    } catch (error: any) {
      console.error("Checkout failed:", error.message || error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h1 className="text-lg font-semibold">Online Payment</h1>
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
        onClose={handleCloseSuccessModal}
        title=""
        showCloseButton={false}
      >
        <SuccessfullCard onContinue={handleCloseSuccessModal} />
      </Modal>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        title=""
        showCloseButton={false}
        showCloseBtnRounded={true}
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

export default OnlinePayment;
