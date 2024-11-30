"use client"
import React, { useEffect, useState } from "react";
import { promocodeApi } from "@/services/promocodeService";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";


function Offers() {
    const [promocodes, setPromocodes] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllPromocode = async () => {
            try {
                const response = await promocodeApi.getAllPromocodes();
                console.log(response)
                setPromocodes(response.data.promocodes);
            } catch (err) {
                setError("Failed to fetch promocode.");
                console.error(err);
            }

        };

        fetchAllPromocode();
    }, []);

    const handleCopy = (promocode: any) => {
        if (promocode && promocode.promocode) {
            navigator.clipboard
                .writeText(promocode.promocode)
                .then(() => {
                    toast.success("Promocode copied!")
                })
                .catch(() => {
                    toast.error("Failed to copy promocode");
                });
        }
    };

    // return (
    //     <div>
    //         {promocodes.map((promocode: any, index: number) => (
    //             <div className="p-2 md:p-14 min-h-screen" key={index}>
    //                 <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">

    //                     <div className="mt-4 text-center">
    //                         <h2 className="text-xl font-bold text-gray-800">
    //                             {promocode.title}
    //                         </h2>
    //                         <p className="text-gray-600 mt-1">{promocode.description}</p>
    //                         <div className="mt-4">
    //                             <p className="text-lg text-gray-800">
    //                                 <span className="font-semibold text-blue-500">
    //                                     {promocode.discountPercentage}% Off
    //                                 </span>
    //                             </p>
    //                         </div>
    //                         <div className="flex items-center justify-center gap-2 mt-4">
    //                             <p className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 font-semibold">
    //                                 {promocode.promocode}
    //                             </p>
    //                             <FaRegCopy
    //                                 onClick={() => { handleCopy(promocode) }}
    //                                 className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 transition"
    //                             />
    //                         </div>
    //                         {copySuccess && (
    //                             <div className="flex justify-center items-center mt-2 text-green-500">
    //                                 <FaCheckCircle className="w-5 h-5 mr-1" />
    //                                 <span>{copySuccess}</span>
    //                             </div>
    //                         )}
    //                     </div>

    //                 </div>
    //             </div>
    //         )
    //         )}


    //     </div>

    // );
    return (
        <div className="p-4 md:p-14 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {promocodes.map((promocode: any, index: number) => (
                    <div
                        className="w-full max-w-md p-6 bg-white shadow-md rounded-xl"
                        key={index}
                    >
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                {promocode.title}
                            </h2>
                            <p className="text-gray-600 mt-1">{promocode.description}</p>
                            <div className="mt-4">
                                <p className="text-lg text-gray-800">
                                    <span className="font-semibold text-blue-500">
                                        {promocode.discountValue}{promocode.discountType == 0 ? `% Off`: 'Rs. Off'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <p className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 font-semibold">
                                    {promocode.promocode}
                                </p>
                                <FaRegCopy
                                    onClick={() => handleCopy(promocode)}
                                    className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 transition"
                                />
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
