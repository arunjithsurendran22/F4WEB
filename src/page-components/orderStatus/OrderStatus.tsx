"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ordersApi } from "@/services/ordersService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal/Modal";
import SuccessfullCard from "@/components/successfullCard/SuccessfullCard";
import ReviewCard from "@/components/reviewCard/ReviewCard";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

interface OrderStatusProps {
    orderId: string;
}

const OrderStaus: React.FC<OrderStatusProps> = ({
    orderId
}) => {
    const router = useRouter();
    const storeId = useSelector((state: RootState) => state.location.storeId);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [grandTotal, setGrandTotal] = useState(0);
    const [orderVerified, setOrderVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await ordersApi.verifyPayment(orderId);
                console.log(response)
                if (response && response.status) {
                    if (response.data && response.data.paymentStatus) {
                        if (response.data.paymentStatusCode == 'PAYMENT_SUCCESS') {
                            setOrderVerified(true)
                            setIsLoading(false);
                            setGrandTotal(response.data.orderBookingDetails.grandTotal);
                            setIsSuccessModalOpen(true);
                        }

                    } else {
                        if (response.data && response.data.paymentStatusCode == 'PAYMENT_PENDING') {

                            setTimeout(() => {
                                verifyPayment()
                            }, 20000)

                        } else {
                            toast.error("Failed to verify order!")
                            setIsLoading(false)
                        }
                    }

                } else {
                    setIsLoading(false)
                    toast.error("Failed to verify order!")
                }
            } catch (error) {
                toast.error("Failed to verify order");
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(() => {
            verifyPayment()
        }, 3000)
    }, []);



    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleGoHome = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* Loader content */}
                <SpinnerLoader />
                <p className="text-xl font-semibold ml-2"> Fetching Order Status...</p>
            </div>
        );
    }

    if(!isLoading) {

        return (
            <>
                <div className="flex items-center justify-center h-screen px-2">
                    {orderVerified ? (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-green-600 mb-6">Order Successful!</h1>
                            <img
                                src="/icons/green-tick.png" // Replace with your success image path
                                alt="Order Success"
                                className="mx-auto w-48 mb-6"
                            />
                            <button
                                onClick={handleGoHome}
                                className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                            >
                                Go to Home
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-red-600 mb-4">Order Verification Failed!</h1>
                            <p className="text-lg text-gray-600 mb-6">{errorMessage}</p>
                            <button
                                onClick={handleGoHome}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                            >
                                Go to Home
                            </button>
                        </div>
                    )}
                </div>
    
                <div>
                    <Modal
                        isOpen={isSuccessModalOpen}
                        onClose={handleCloseSuccessModal}
                        title=""
                        showCloseButton={false}
                    >
                        <SuccessfullCard grandTotal={grandTotal} onContinue={handleCloseSuccessModal} />
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
                                orderId={orderId}
                                closeModal={() => setIsReviewModalOpen(false)}
                            />
                        </div>
                    </Modal>
                </div>
            </>
        );

    }
};

export default OrderStaus;
