"use client";
import React, { useState, useEffect } from "react";
import ViewAll from "@/components/ui/Buttons/ViewAll";
import Link from "next/link";
import { productApi } from "@/services/productService";
import { Product, ProductResponse } from "@/types/product";
import toast from "react-hot-toast";
import ProductCardHorizontal from "@/components/productCardHorizondal/productCardHorizondal";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchProfileDetails } from "@/store/profileSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Sorry from "@/components/ui/Sorry/Sorry";

function Recommended() {
  const dispatch = useAppDispatch();
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: ProductResponse =
          await productApi.getRecommendedProducts({storeId});
        if (response.status && response.data) {
          setProducts(response.data.products);
        } else {
          throw new Error(
            response.message || "Failed to fetch recommended products"
          );
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  return (
    <div  className="mb-10">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-sm md:text-2xl font-semibold">
            Recommended for {profile ? profile.name : "You"}
          </h1>
        </div>
        <Link href="/products">
          { products.length>0 && <ViewAll />}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-3 lg:w-9/12">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <SkeletonLoader
                key={index}
                className="md:w-48 lg:w-52 xl:w-60 h-64 rounded-xl"
              />
            ))}
          </>
        ) : products.length === 0 ? (
          <div className="w-full text-center items-center justify-cener text-gray-500">
          
            <h3 className="text-xs md:text-lg font-semibold italic items-end mb-8">
              No Recommended Products Found!
            </h3>
          </div>
        ) : (
          // Limit the number of displayed products to 6
          products
            .slice(0, 6)
            .map((product) => (
              <ProductCardHorizontal
                key={product._id}
                _id={product._id}
                imageSrc={product.thumbnail}
                title={product.name}
                rating={product.rating}
                price={product.sellingPrice}
                originalPrice={product.mrp}
                ratingCount={product.ratingCount}
                offer={product.discountPercentage}
                hasSubProducts={product.hasSubProducts}
                subscriptionProduct={product.subscriptionProduct}
                express={product.express}
                storeId={storeId}
                unit={product.unit}
                quantity={product.quantity}
                stockId={product.stock?._id}
                stock={product.stock?.stock}

              />
            ))
        )}
      </div>
    </div>
  );
}

export default Recommended;
