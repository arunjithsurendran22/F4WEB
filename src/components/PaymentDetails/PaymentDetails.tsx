import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartTotal, fetchDeliveryCharge, setCartUpdated } from "@/store/cartSlice";
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";
import { RootState } from "@/store";

interface PaymentDetailsProps {
  onTotalChange?: (total: number) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onTotalChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();

  const { cartTotal, loading, error, cartUpdated, deliveryCharge, deliveryChargeExpress, expressProducts, subscribedProducts } = useSelector(
    (state: any) => state.cart
  );

  const { storeId, latitude, longitude } = useSelector(
    (state: RootState) => state.location
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
      //calculate local total by adding delivery charge
      const totalValue = calculateLocalTotal(cartTotal.total, cartTotal.subTotal)
      setLocalTotal(totalValue);
      if (onTotalChange) onTotalChange(totalValue);
    }
  }, [cartTotal, onTotalChange]);

  const calculateLocalTotal = (total: number, subTotal: number) => {
    console.log(subscribedProducts)
    //if subTotal is zero, i.e cart contains no items or contains subscribed items only, 
    //then there is no need to calculate delivery charge
    if(subTotal <= 0) return total;
    //if cart contains atleast one subscribed product, then there will be no delivery charge
    //else if express products, then apply express delivery charge,
    //else apply normal delivery charge
    return total + (subscribedProducts ? 0 : expressProducts ? deliveryChargeExpress : deliveryCharge)
  }

  useEffect(() => {
    const findDeliveryCharge = async () => {
      if (storeId && latitude && longitude) {
        await dispatch(fetchDeliveryCharge({ storeId, latitude, longitude, cartAmount: cartTotal.subTotal }) as any);
      }
    };
    findDeliveryCharge();
  }, [dispatch]);

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
          {cartTotal.subTotal > 0 ? (

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

          {/* coupon discount */}
          {cartTotal.couponDiscount > 0 ? (
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

          {/* coins discount */}
          {cartTotal.coinsAmount > 0 ? (

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

          {/* express delivery charge */}
          {(expressProducts && deliveryChargeExpress > 0 && !subscribedProducts && cartTotal.subTotal > 0) ? (

            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-customGrayLight2">Express Delivery Charge</p>
              {loading ? (
                <h2 className="text-lg font-semibold">
                  <SpinnerLoader />
                </h2>
              ) : (
                <h2 className="text-lg font-semibold">₹{deliveryChargeExpress}</h2>
              )}
            </div>
          ) : ''

          }

          {/* normal delivery charge */}
          {(!expressProducts && deliveryCharge > 0 && !subscribedProducts && cartTotal.subTotal > 0) ? (

            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-customGrayLight2">Delivery Charge</p>
              {loading ? (
                <h2 className="text-lg font-semibold">
                  <SpinnerLoader />
                </h2>
              ) : (
                <h2 className="text-lg font-semibold">₹{deliveryCharge}</h2>
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
