"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../ui/Buttons/Button";
import Modal from "../ui/modal/Modal";
import SuccessfullCard from "../successfullCard/SuccessfullCard";
import ReviewCard from "../reviewCard/ReviewCard";
import {
  fetchCartItems,
  fetchCartTotal,
  setCartUpdated,
} from "@/store/cartSlice";
import { RootState } from "@/store";
import { ordersApi } from "@/services/ordersService";
import { initiatePayment } from "@/utils/razorpay";
import toast from "react-hot-toast";
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";
import { useRouter } from "next/navigation";
import { fetchNotifications } from "@/store/notificationSlice";

interface OrderPlaceProps {
  addressId: string;
  timeSlotId: string | null;
  cartId: string;
}

const OrderPlace: React.FC<OrderPlaceProps> = ({
  addressId,
  timeSlotId,
  cartId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    grandTotal = 0,
    subTotal = 0,
    couponDiscount = 0,
    coinsAmount = 0,
    deliveryCharge = 0,
    deliveryChargeExpress = 0,
    expressProducts,
    subscribedProducts
  } = useSelector((state: RootState) => state.cart);
  const storeId = useSelector((state: RootState) => state.location.storeId);
  if (!timeSlotId) timeSlotId = null;

  const [isExpanded, setIsExpanded] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ordersId, setOrdersId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cartId,
    addressId,
    timeSlotId,
    storeId,
    subTotal,
    couponDiscount,
    coinsAmount,
    deliveryCharge: subscribedProducts ? 0 : expressProducts ? deliveryChargeExpress : deliveryCharge,
    grandTotal: subscribedProducts ? grandTotal : expressProducts ? grandTotal + deliveryChargeExpress : grandTotal + deliveryCharge,
    source: "WEB",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("online");


  useEffect(() => {
    if(grandTotal <= 0) setSelectedPaymentMethod('cash')
    dispatch(fetchCartTotal() as any);
  }, [dispatch]);

  useEffect(() => {
    console.log(paymentData)
    setPaymentData({
      cartId,
      addressId,
      timeSlotId,
      storeId,
      subTotal,
      couponDiscount,
      coinsAmount,
      deliveryCharge: subscribedProducts ? 0 : expressProducts ? deliveryChargeExpress : deliveryCharge,
      grandTotal: subscribedProducts ? grandTotal : expressProducts ? grandTotal + deliveryChargeExpress : grandTotal + deliveryCharge,
      source: "WEB"
    });
  }, [
    cartId,
    addressId,
    timeSlotId,
    storeId,
    subTotal,
    couponDiscount,
    coinsAmount,
    grandTotal,
    deliveryCharge,
    deliveryChargeExpress,
    subscribedProducts,
    expressProducts
  ]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleCheckout = async () => {
    //handle cash on delivery
    if (selectedPaymentMethod == 'cash') {
      setIsLoading(true);
      const orderData = {
        cartId,
        addressId,
        timeSlotId,
        storeId,
        subTotal,
        couponDiscount,
        coinsAmount,
        deliveryCharge: subscribedProducts ? 0 : expressProducts ? deliveryChargeExpress : deliveryCharge,
        grandTotal: subscribedProducts ? grandTotal : expressProducts ? grandTotal + deliveryChargeExpress : grandTotal + deliveryCharge,
      };

      try {
        const result = await ordersApi.createCodPayment(orderData);
        setIsLoading(false);
        if (result.status) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        if (result.data.orderDetails) {
          setOrdersId(result.data.orderDetails.orderId);
          setIsSuccessModalOpen(true);
        }
      } catch (error) {
        console.error("Error creating COD payment:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      //handle online payment
      if (grandTotal <= 0) {
        console.error("Total amount must be greater than 0 to proceed.");
        return;
      }
      setIsLoading(true);
      try {
        dispatch(setCartUpdated(true));
        const response = await ordersApi.createPayment(paymentData);
        if (!response || !response.status) {
          setIsLoading(false);
          toast.error(response.message);
        } else {
          const { paymentOrderDetails } = response.data;
          setIsLoading(false);
          const url = paymentOrderDetails.instrumentResponse.redirectInfo.url;
          router.push(url);

          //console.log(paymentOrderDetails)

          // const responsePayment = await initiatePayment({
          //   key: paymentOrderDetails.key_id,
          //   amount: paymentOrderDetails.amount_due,
          //   currency: paymentOrderDetails.currency,
          //   name: paymentOrderDetails.notes.name,
          //   description: "Your purchase description",
          //   order_id: paymentOrderDetails.id,
          //   customerName: paymentOrderDetails.notes.name,
          //   customerEmail: paymentOrderDetails.notes.email || "",
          //   customerContact: paymentOrderDetails.notes.phone || "",
          // });

          // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          //   responsePayment;

          // const verificationResponse = await ordersApi.verifyPayment(
          //   {
          //     order_id: razorpay_order_id,
          //     payment_id: razorpay_payment_id,
          //   },
          //   {
          //     headers: {
          //       "x-razorpay-signature": razorpay_signature,
          //     },
          //   }
          // );

          // const verifiedOrderId =
          //   verificationResponse.data.orderBookingDetails.orderId;
          // setOrdersId(verifiedOrderId);

          // if (verificationResponse.data.orderBookingDetails) {
          //   setIsSuccessModalOpen(true);
          // } else {
          //   toast.error("Payment verification failed. Please try again.");
          // }

          // await dispatch(fetchCartTotal() as any);
          // setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Checkout failed:", error.message || error);
        toast.error("Checkout failed. Please try again.");
      }
    }

  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    dispatch(fetchCartItems() as any);
    dispatch(fetchNotifications({ storeId }) as any)
    router.push("/");
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h1 className="text-lg font-semibold">Payment Mode</h1>
        {isExpanded ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </div>

      {isExpanded && (
        <div className="payment-section">
          {/* Payment Methods */}
          <div className="flex flex-col space-y-4 mt-4">
            <label className="flex items-center justify-between">
              <span>Cash on Delivery</span>
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded"
                checked={selectedPaymentMethod === "cash"}
                onChange={() => handlePaymentMethodChange("cash")}
              />
            </label>
            { grandTotal > 0 ? (<label className="flex items-center justify-between">
              <span>Online Payment</span>
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded"
                checked={selectedPaymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
              />
            </label>
          ):''}
          </div>
          <div className="mt-4">
            <Button
              backgroundColor="bg-customBlueLight"
              textColor="text-white"
              width="w-full"
              onClick={handleCheckout}
            >
              {isLoading ? <SpinnerLoader /> : selectedPaymentMethod == 'online' ? "Pay Now" :  "Place Order"}
            </Button>
          </div>
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
          grandTotal={paymentData.grandTotal}
          onContinue={handleCloseSuccessModal}
        />
      </Modal>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        title=""
        showCloseButton={false}
        showCloseBtnRounded={true}
        backgroundClickClose={false}
      >
        <div className="p-4">
          <ReviewCard orderId={ordersId} closeModal={handleCloseReviewModal} />
        </div>
      </Modal>
    </div>
  );
};

export default OrderPlace;
