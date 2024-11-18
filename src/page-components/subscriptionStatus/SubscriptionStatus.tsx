"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { subscriptionApi } from "@/services/subscriptionService";

interface SubscriptionStatusProps {
    orderId: string;
}

const SubscriptionStaus: React.FC<SubscriptionStatusProps> = ({
    orderId
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [orderVerified, setOrderVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await subscriptionApi.verifyPayment(orderId);
                if (response && response.status) {
                    if (response.data && response.data.paymentStatus) {
                        if (response.data.paymentStatusCode == 'PAYMENT_SUCCESS') {
                            setOrderVerified(true)
                            setIsLoading(false);
                        }

                    } else {
                        if (response.data && response.data.paymentStatusCode == 'PAYMENT_PENDING') {

                            setTimeout(() => {
                                verifyPayment()
                            }, 20000)

                        } else {
                            toast.error("Failed to verify payment!")
                            setIsLoading(false)
                        }
                    }

                } else {
                    setIsLoading(false)
                    toast.error("Failed to verify payment!")
                }
            } catch (error) {
                toast.error("Failed to verify payment");
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(() => {
            verifyPayment()
        }, 3000)
    }, []);


    const handleGoHome = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* Loader content */}
                <SpinnerLoader />
                <p className="text-xl font-semibold ml-2"> Fetching Payment Status...</p>
            </div>
        );
    }

    if(!isLoading) {

        return (
            <>
                <div className="flex items-center justify-center h-screen px-2">
                    {orderVerified ? (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-green-600 mb-6">Subscription Activated!</h1>
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
                            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Verification Failed!</h1>
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
            </>
        );

    }
};

export default SubscriptionStaus;
