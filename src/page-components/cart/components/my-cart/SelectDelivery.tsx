"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import AppliedCoupon from "./AppliedCoupon";
import InputBoxAddButton from "@/components/ui/inputbox/InputBoxAddButton";
import PaymentDetails from "../../../../components/PaymentDetails/PaymentDetails";
import Link from "next/link";
import Button from "@/components/ui/Buttons/Button";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { cartApi } from "@/services/cartService";
import { setCartUpdated } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { addressApi } from "@/services/addressService";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { useAppSelector } from "@/hooks/useAppSelector";

function SelectDelivery() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { couponDiscount, coinsAmount, subTotal, couponCode, coins } = useSelector(
    (state: RootState) => state.cart
  );
  const itemCount = useAppSelector((state: RootState) => state.cart.itemCount);
  const cartId = useSelector((state: RootState) => state.cart.cartId);
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );

  const [inputValueCoupon, setInputValueCoupon] = useState<string>(couponCode);
  const [inputValueCoins, setInputValueCoins] = useState<string>('');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [isCoinsApplied, setIsCoinsApplied] = useState<boolean>(false);
  const [isEnable, setEnable] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loader, setLoader] = useState(false);

  useEffect(()=> {
    setInputValueCoupon(couponCode);
    setInputValueCoins(coins? coins.toString() : '')
    if(couponCode){
      setIsCouponApplied(true)
    }
    if(coins){
      setIsCoinsApplied(true);
    }
  },[couponCode])

  const handleCouponInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueCoupon(e.target.value);
  };

  const handleCoinsInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueCoins(e.target.value);
  };

  const handleCouponButtonClick = async () => {
    try {
      if(!subTotal){
        toast.error("Failed to apply coupon! Cart total is zero")
        return;
      } 
      if (cartId && inputValueCoupon) {
        const response = await cartApi.applyCoupon({
          cartId,
          storeId,
          couponCode: inputValueCoupon,
        });
        if (!response.status) {
          toast.error(response.message);
        } else {
          if (response.data) {
            toast.success("Coupon applied successfully!");
            dispatch(setCartUpdated(true));
            //setInputValueCoupon("");
            setIsCouponApplied(true);
          }
        }
      }
    } catch (error: any) {
      console.error("Failed to apply coupon:", error);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      if (cartId) {
        const response = await cartApi.removeCoupon({ cartId });
        if (response.data) {
          toast.success("Coupon removed successfully!");
          dispatch(setCartUpdated(true));
          setInputValueCoupon("");
          setIsCouponApplied(false);
        }
      }
    } catch (error: any) {
      console.error("Failed to remove coupon:", error);
    }
  };

  const handleCoinsButtonClick = async () => {
    try {
      const coinAmount = parseFloat(inputValueCoins);
      if (coinAmount <= 0) {
        toast.error("Please enter a valid coin amount.");
        return;
      }

      if(!subTotal){
        toast.error("Failed to apply coins! Cart total is zero")
        return;
      } 

      if (cartId && inputValueCoins) {
        const response = await cartApi.applyCoins({
          cartId,
          storeId,
          coins: inputValueCoins,
        });
        if (!response.status) {
          toast.error(response.message);
        } else {
          if (response.data) {
            toast.success("Coins applied successfully!");
            dispatch(setCartUpdated(true));
            //setInputValueCoins("");
            setIsCoinsApplied(true);
          }
        }
      }
    } catch (error: any) {
      console.error("Failed to apply coins:", error);
    }
  };

  const handleRemoveCoins = async () => {
    try {
      if (cartId) {
        const response = await cartApi.removeCoins({ cartId });
        if (response.data) {
          toast.success("Coins removed successfully!");
          dispatch(setCartUpdated(true));
          setInputValueCoins("");
          setIsCoinsApplied(false);
        }
      }
    } catch (error: any) {
      console.error("Failed to remove coins:", error);
      toast.error(error.message);
    }
  };

  const totalDiscount = (couponDiscount ?? 0) + (coinsAmount ?? 0);

  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };
  const fetchAddresses = async () => {
    setLoader(true);
    try {
      const response = await addressApi.getAllAddresses();
      if (Array.isArray(response.data.addresses)) {
        const primaryAddress = response.data.addresses.find(
          (address: any) => address.primary
        );

        if (primaryAddress) {
          const checkAvailability = await addressApi.checkAddressAvailability(primaryAddress._id, {storeId} )
          if(checkAvailability.data && checkAvailability.data.availability){
            router.push(
              `/cart/blockDeliverySlot?addressId=${primaryAddress._id}&&cartId=${cartId}`
            );
          }else{
            router.push(`/cart/cartAddress?cartId=${cartId}`);
          }
          
        } else {
          router.push(`/cart/cartAddress?cartId=${cartId}`);
        }
      } else {
        console.error("Expected an array but got:", response.data);
      }
      setLoader(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  return (
    <div className="md:w-96">
      <div className="mt-4">
        <InputBoxAddButton
          label="Have a promo code?"
          value={inputValueCoupon}
          onChange={handleCouponInputChange}
          buttonLabel={isCouponApplied ? "Remove" : "Add"}
          onButtonClick={
            isCouponApplied ? handleRemoveCoupon : handleCouponButtonClick
          }
          placeholder="Enter Your Promo Code"
          disabled={itemCount <= 0 || isCouponApplied}
        />
      </div>

      <div className="mt-4">
        <InputBoxAddButton
          label="Save using your Coins"
          value={inputValueCoins}
          onChange={handleCoinsInputChange}
          buttonLabel={isCoinsApplied ? "Remove" : "Use"}
          onButtonClick={
            isCoinsApplied ? handleRemoveCoins : handleCoinsButtonClick
          }
          placeholder="Enter Coins Amount"
          disabled={itemCount <= 0 || isCoinsApplied}
        />
      </div>

      <div className="mt-5">
        {(couponDiscount ?? 0) > 0 || (coinsAmount ?? 0) > 0 ? (
          <AppliedCoupon totalDiscount={totalDiscount} />
        ) : null}
      </div>

      <div className="mt-5">
        <PaymentDetails onTotalChange={handleTotalChange} />
      </div>
      <div className="mt-5">
        <Button
          backgroundColor="bg-customBlueLight"
          borderRadius="rounded-full"
          width="w-full"
          height="h-14"
          textColor="text-white"
          fontSize="font-normal"
          onClick={fetchAddresses}
          disabled={itemCount <= 0}
        >
          {loader ? <SpinnerLoader /> : "Select delivery Slot"}
        </Button>
      </div>
    </div>
  );
}

export default SelectDelivery;
