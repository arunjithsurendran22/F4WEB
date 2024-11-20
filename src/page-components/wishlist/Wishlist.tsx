"use client";
import React, { useEffect } from "react";
import WishlistCard from "@/components/WishlistCard/WishlistCard";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Sorry from "@/components/ui/Sorry/Sorry";
import { fetchFavourites } from "@/store/wishListSlice";
import { favouriteApi } from "@/services/wishListService";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );

  const loading = useSelector((state: RootState) => state.wishList.loading);
  const favourites = useSelector(
    (state: RootState) => state.wishList.favourites
  );

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        await dispatch(fetchFavourites({storeId}) as any).unwrap();
      } catch (error) {
        console.error("Error fetching favourites:", error);
        toast.error("Failed to load favourites. Please try again later.");
      }
    };

    loadFavourites();
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await favouriteApi.changeFavouriteStatus(productId);
      if (response.status) {
        dispatch(fetchFavourites({storeId}) as any);
        toast.success("Item removed from favourites");
      } else {
        throw new Error(response.message || "Failed to remove from favourites");
      }
    } catch (error) {
      console.error("Error removing from favourites:", error);
      toast.error("Failed to remove from favourites. Please try again.");
    }
  };

  return (
    <div className="p-3 md:p-14 ">
      <div>
        <h1 className="text-2xl font-semibold mb-5">Wishlist</h1>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {[...Array(10)].map((_, index) => (
            <SkeletonLoader key={index} className="w-full h-64 rounded-xl" />
          ))}
        </div>
      ) : favourites.length > 0 ? (
        <div className=" grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {favourites.map((product) => (
            <WishlistCard
              key={product._id}
              _id={product._id}
              imageSrc={product.thumbnail}
              title={product.name}
              rating={product.rating}
              price={product.sellingPrice}
              originalPrice={product.mrp}
              ratingCount={product.ratingCount}
              hasSubProducts={product.hasSubProducts}
              discountPercentage={product.discountPercentage}
              express={product.express}
              subscriptionProduct={product.subscriptionProduct}
              storeId={storeId}
              onRemove={() => handleRemoveFromWishlist(product._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center text-center">
          <Sorry />
          <p className="italic">No items in your wishlist...</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
