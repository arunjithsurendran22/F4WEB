import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PlanDetails, SubscriptionOrder } from "../AllSubscriptionProducts";
import OrderCardDetails from "@/components/orderCardDetails/OrderCardDetails";
import Link from "next/link";


interface DetailsModalProps {
    planDetails: PlanDetails | null;
    ordersList: SubscriptionOrder[] | null;
}

function titleCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

const DetailsModal: React.FC<DetailsModalProps> = ({
    planDetails,
    ordersList
}) => {

    return (
        <div className="bottom-0 w-full p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Title */}
            <p className="text-sm font-bold text-center mb-5 text-gray-800">
                {planDetails?.title}
            </p>

            {/* Duration and Quantity Info */}
            <div className="flex justify-between items-center mb-4 gap-x-12">
                {/* Total Quantity */}
                <div className="border-2 border-blue-500 bg-blue-100 rounded-lg text-center p-3 w-26">
                    <p className="font-bold text-xl text-blue-700">
                        {planDetails?.allowedQuantity} {planDetails?.unit}
                    </p>
                    <p className="text-xs text-gray-600">Total Quantity</p>
                </div>

                {/* Used Quantity */}
                <div className="border-2 border-pink-500 bg-pink-100 rounded-lg text-center p-3 w-26">
                    <p className="font-bold text-xl text-pink-700">
                        {planDetails?.purchasedQuantity} {planDetails?.unit}
                    </p>
                    <p className="text-xs text-gray-600">Used Quantity</p>
                </div>
            </div>

            <div className="p-2 overflow-y-auto h-[460px] hide-scrollbar">
                <p className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">
                    { ordersList?.length ? "Purchased Product List" : "No purchases have been made yet!"}
                </p>
                {ordersList?.map((item: SubscriptionOrder, index) => (
                    <div key={index} >
                        <div className="flex gap-5 py-3">
                            <div className="bg-customGrayLight w-24 h-24 rounded-xl flex justify-center items-center">
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col md:w-44">
                                <h1 className="text-xs md:text-md font-semibold text-gray-800">{item.orderId}</h1>
                                <h6 className="text-xs md:text-sm font-[480] text-customGrayLight5 mt-1">
                                    {item.name}
                                </h6>

                            </div>

                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <div>
                                <p className="text-xs md:text-md text-customGrayLight2">Status </p>
                                <p className="text-xs md:text-md text-gray-800">
                                    {titleCase(item.orderStatus)}
                                </p>
                            </div>
                            <Link href={`/profile/my-orders/order-details/${item.orderId}`}>
                                <div className="flex gap-1 items-center">
                                    <div>
                                        <h2 className="text-sm font-semibold text-customBlueLight">
                                        Details
                                        </h2>
                                    </div>    
                                </div>
                            </Link>
                        </div>
                    </div>

                ))}


            </div>
        </div>
    );


};

export default DetailsModal;
