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

const FlashSale: React.FC = () => {
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const response: ProductResponse =
          await productApi.getFlashSaleProducts({storeId});
        if (response.status && response.data) {
          setProducts(response.data.products);
        } else {
          throw new Error(
            response.message || "Failed to fetch flash sale products"
          );
        }
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  const handleClick = () => {
    router.push("/products");
  };

  const displayedProducts = products.slice(0, 10);

  return (
    <div >
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold">Flash Sale ⏰️</h2>
        <ViewAll onClick={handleClick} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-14 md:gap-12  w-full">
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
           
            <h3 className="text-lg font-semibold italic">
              No Flash Sale Products Found
            </h3>
          </div>
        ) : (
          displayedProducts.map((product) => (
            <div key={product._id} className="">
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
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlashSale;
