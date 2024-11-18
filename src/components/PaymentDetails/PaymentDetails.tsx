import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartTotal, setCartUpdated } from "@/store/cartSlice";
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";

interface PaymentDetailsProps {
  onTotalChange?: (total: number) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onTotalChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();

  const { cartTotal, loading, error, cartUpdated } = useSelector(
    (state: any) => state.cart
  );

  const [localTotal, setLocalTotal] = useState(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchTotal = async () => {
      await dispatch(fetchCartTotal() as any);
    };
    fetchTotal();
  }, [dispatch]);

  useEffect(() => {
    if (cartUpdated) {
      dispatch(fetchCartTotal() as any);
      dispatch(setCartUpdated(false));
    }
  }, [cartUpdated, dispatch]);

  useEffect(() => {
    if (cartTotal && cartTotal.total !== undefined) {
      setLocalTotal(cartTotal.total);
      if (onTotalChange) onTotalChange(cartTotal.total);
    }
  }, [cartTotal, onTotalChange]);

  return (
    <div className="">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h1 className="text-lg font-semibold">Payment Details</h1>
        {isExpanded ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-4">
        { cartTotal.subTotal > localTotal ? (

          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Sub Total</p>
            {loading ? (
              <h2 className="text-lg font-semibold">
                <SpinnerLoader />
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">₹{cartTotal.subTotal}</h2>
            )}
          </div>
          ) : '' 
        }

          { cartTotal.couponDiscount> 0 ? (
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Coupon Discount</p>
            {loading ? (
              <h2 className="text-lg font-semibold">
                <SpinnerLoader />
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">₹{cartTotal.couponDiscount}</h2>
            )}
          </div>
          ) : '' 
          }

          { cartTotal.coinsAmount> 0 ? (

          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Coins Amount</p>
            {loading ? (
              <h2 className="text-lg font-semibold">
                <SpinnerLoader />
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">₹{cartTotal.coinsAmount}</h2>
            )}
          </div>
          ) : '' 
        }

          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Total</p>
            {loading ? (
              <h2 className="text-lg font-semibold">
                <SpinnerLoader />
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">₹{localTotal}</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
