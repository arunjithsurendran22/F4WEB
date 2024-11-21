// src/page-components/cart/components/my-cart/ProductListCart.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import ProductCardCart from "@/components/ProductCardCart/ProductCardCart";
import DeliveryAddress from "./DeliveryAddress";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { RootState } from "@/store";
import CartEmpty from "@/components/ui/CartEmpty/CartEmpty";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/hooks/useAppSelector";

const ProductListCart: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.cart);
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  

  const [products, setProducts] = useState<any[]>([]);
  const [expressProducts, setExpressProducts] = useState(false);
  const [subscribedProducts, setSubscribedProducts] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const action = await dispatch(fetchCartItems() as any);
      if (action.payload) {
        setProducts(action.payload.items);
        setExpressProducts(action.payload.expressProducts);
        setSubscribedProducts(action.payload.subscribedProducts);
      }
    };
    fetchItems();
  }, [dispatch]);

  const handleUpdateQuantity = (
    productId: string,
    subProductId: string | null,
    isSubProduct: boolean,
    mainProductId: string | null,
    newQuantity: number
  ) => {
    const updatedProducts = products.map((productItem) => {
      // Check if the item is a subproduct or a main product
      if (
        isSubProduct &&
        productItem.subProduct &&
        productItem.subProduct._id === subProductId
      ) {
        return {
          ...productItem,
          cartQuantity: newQuantity, // Update the quantity for the subproduct
        };
      } else if (
        !isSubProduct &&
        productItem.product &&
        productItem.product._id === productId
      ) {
        return {
          ...productItem,
          cartQuantity: newQuantity, // Update the quantity for the main product (corrected from ';' to ',')
        };
      }
      return productItem; // Return unchanged product
    });

    setProducts(updatedProducts); // Update local state

    const item = {
      productId: isSubProduct ? mainProductId! : productId,
      storeId,
      isSubProduct,
      subProductId: isSubProduct ? subProductId : undefined,
      cartQuantity: newQuantity,
      subscribedProduct: subscribedProducts,
      expressProduct: expressProducts,
    };

    dispatch(addToCart(item) as any).then(() => {
      dispatch(setCartUpdated(true));
    });
  };

  const handleRemoveFromCart = (
    productId: string,
    subProductId: string | null,
    isSubProduct: boolean,
    mainProductId: string | null
  ) => {
    const updatedProducts = products.filter((productItem) => {
      return productItem.isSubProduct
        ? productItem.subProduct && productItem.subProduct._id != productId
        : productItem.product && productItem.product._id != productId;
    });

    setProducts(updatedProducts);

    toast.error("🗑️ Item removed from your cart!", {
      style: {
        background: "linear-gradient(135deg, #FF4C4C, #D32F2F)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        fontStyle: "italic",
        borderRadius: "12px",
        padding: "16px 24px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        border: "2px solid #FF4C4C",
        transform: "scale(1)",
        transition: "transform 0.2s ease",
      },
      iconTheme: {
        primary: "#FF0000",
        secondary: "#D32F2F",
      },
      duration: 3000,
    });

    dispatch(
      removeFromCart({
        productId: isSubProduct ? mainProductId! : productId,
        isSubProduct,
        subProductId: isSubProduct ? subProductId : undefined,
      }) as any
    ).then(() => {
      dispatch(setCartUpdated(true));
    });
  };

  return (
    <>
      <DeliveryAddress />
      <div className="overflow-y-auto h-96 md:w-[28rem] hide-scrollbar mt-5">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <SpinnerLoader />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center w-72">
            <CartEmpty />
          </div>
        ) : (
          products.map((cartItem: any) => {
            const product = cartItem.product;
            const subProduct = cartItem.subProduct;
            if (!product || !product._id) {
              return null;
            }

            const displayProduct = subProduct ? subProduct : product;
            return (
              <ProductCardCart
                key={cartItem._id}
                _id={displayProduct._id}
                imageSrc={displayProduct.thumbnail}
                title={displayProduct.name}
                rating={displayProduct.rating}
                price={displayProduct.sellingPrice}
                originalPrice={displayProduct.mrp}
                ratingCount={displayProduct.ratingCount}
                offer={displayProduct.discountPercentage}
                quantity={cartItem.cartQuantity}
                baseQuantity={displayProduct.quantity}
                unit={displayProduct.unit}
                subscribedProduct={subscribedProducts || false}
                onRemove={() =>
                  handleRemoveFromCart(
                    displayProduct._id,
                    subProduct ? subProduct._id : null,
                    !!subProduct,
                    subProduct ? subProduct.mainProduct : null
                  )
                }
                handleUpdateQuantity={(newQuantity) =>
                  handleUpdateQuantity(
                    displayProduct._id,
                    subProduct ? subProduct._id : null,
                    !!subProduct,
                    subProduct ? subProduct.mainProduct : null,
                    newQuantity
                  )
                }
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default ProductListCart;
