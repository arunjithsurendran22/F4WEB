import React, { useEffect, useState } from "react";
import { promocodeApi } from "@/services/promocodeService";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

interface OfferProps {
  id: string | null | undefined;
}

const Offer: React.FC<OfferProps> = ({ id }) => {
  const [promocode, setPromocode] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromocode = async () => {
      if (id) {
        try {
          const response = await promocodeApi.getSinglePromocode(id);
          setPromocode(response.data.promocode);
        } catch (err) {
          setError("Failed to fetch promocode.");
          console.error(err);
        }
      }
    };

    fetchPromocode();
  }, [id]);

  const handleCopy = () => {
    if (promocode && promocode.promocode) {
      navigator.clipboard
        .writeText(promocode.promocode)
        .then(() => {
          setCopySuccess("Promocode copied!");
          setTimeout(() => setCopySuccess(null), 2000);
        })
        .catch(() => {
          setCopySuccess("Failed to copy.");
        });
    }
  };

  return (
    <div className="p-14 min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        {promocode ? (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {promocode.title}
            </h2>
            <p className="text-gray-600 mt-1">{promocode.description}</p>
            <div className="mt-4">
              <p className="text-lg text-gray-800">
                <span className="font-semibold text-blue-500">
                  {promocode.discountPercentage}% Off
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <p className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 font-semibold">
                {promocode.promocode}
              </p>
              <FaRegCopy
                onClick={handleCopy}
                className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 transition"
              />
            </div>
            {copySuccess && (
              <div className="flex justify-center items-center mt-2 text-green-500">
                <FaCheckCircle className="w-5 h-5 mr-1" />
                <span>{copySuccess}</span>
              </div>
            )}
          </div>
        ) : (
          <SpinnerLoader />
        )}
      </div>
    </div>
  );
};

export default Offer;
