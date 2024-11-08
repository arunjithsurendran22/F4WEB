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
    newQuantity: number
  ) => {
    const updatedProducts = products.map((productItem) => {
      if (productItem.product && productItem.product._id === productId) {
        return { ...productItem, cartQuantity: newQuantity };
      }
      return productItem;
    });

    setProducts(updatedProducts);

    const item = {
      productId,
      storeId,
      isSubProduct,
      subProductId: isSubProduct ? subProductId : "",
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
    subProductId: string,
    isSubProduct: boolean
  ) => {
    const updatedProducts = products.filter((productItem) => {
      // Check if productItem.product exists before checking _id
      return productItem.product && productItem.product._id !== productId;
    });

    setProducts(updatedProducts);

    dispatch(
      removeFromCart({ productId, isSubProduct, subProductId }) as any
    ).then(() => {
      dispatch(setCartUpdated(true));
    });
  };

  return (
    <div>
      <DeliveryAddress />
      <div className="overflow-y-auto h-96 w-[28rem] hide-scrollbar mt-5">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <SpinnerLoader />
          </div>
        ) : products.length === 0 ? (
          <CartEmpty />
        ) : (
          products.map((cartItem: any) => {
            const product = cartItem.product;
            if (!product || !product._id) {
              return null; 
            }
            return (
              <ProductCardCart
                key={cartItem._id}
                _id={product._id}
                imageSrc={product.thumbnail}
                title={product.name}
                buttonText={
                  cartItem.cartQuantity > 0 ? "In Cart" : "Out of Stock"
                }
                rating={product.discountPercentage}
                price={product.sellingPrice}
                originalPrice={product.mrp}
                ratingCount={cartItem.cartQuantity}
                offer={product.discountPercentage}
                quantity={cartItem.cartQuantity}
                onRemove={() =>
                  handleRemoveFromCart(
                    product._id,
                    cartItem.subProduct?._id || null,
                    cartItem.isSubProduct
                  )
                }
                handleUpdateQuantity={(newQuantity) =>
                  handleUpdateQuantity(
                    product._id,
                    cartItem.subProduct?._id || null,
                    cartItem.isSubProduct,
                    newQuantity
                  )
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductListCart;
