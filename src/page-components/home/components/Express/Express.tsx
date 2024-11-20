"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/productCard/ProductCard";
import ViewAll from "@/components/ui/Buttons/ViewAll";
import { useRouter } from "next/navigation";
import { productApi } from "@/services/productService";
import toast from "react-hot-toast";
import { Product, ProductResponse } from "@/types/product";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Sorry from "@/components/ui/Sorry/Sorry";

const Express: React.FC = () => {
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response: ProductResponse = await productApi.getExpressProducts({
          storeId,
        });
        if (response.status && response.data) {
          setProducts(response.data.products);
        } else {
          throw new Error(
            response.message || "Failed to fetch express products"
          );
        }
      } catch (error) {
        console.error("Error fetching express products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const handleClick = () => {
    router.push("/products");
  };
  const displayedProducts = products.slice(0, 5);

  return (
    <div >
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold">F4 Express</h2>
        { products.length>0 && <ViewAll onClick={handleClick} /> }
      </div>

      <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-14 md:gap-12  w-full">
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
          <div className="col-span-5 text-center text-gray-500">
            <h3 className="text-lg font-semibold italic mb-8">
              No Trending Products Found!
            </h3>
          </div>
        ) : (
          displayedProducts.map((product) => (
            <div key={product._id} className="mb-10 w-full">
              <ProductCard
                _id={product._id}
                imageSrc={product.thumbnail}
                title={product.name}
                rating={product.rating}
                price={product.sellingPrice}
                originalPrice={product.mrp}
                ratingCount={product.ratingCount}
                hasSubProducts={product.hasSubProducts}
                discountPercentage={product.discountPercentage}
                subscriptionProduct={product.subscriptionProduct}
                express={product.express}
                storeId={storeId}
                width="w-full" 
                imgHeight="h-auto"
                unit={product.unit}
                quantity={product.quantity}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Express;
