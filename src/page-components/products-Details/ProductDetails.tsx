"use client";
import React, { useEffect, useState } from "react";
import ProductDetailsCard from "@/components/productDetailsCard/ProductDetailsCard";
import { productApi } from "@/services/productService";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import ProductDetailsCardSkeleton from "@/components/Skeletons/ProductDetailsCardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Sorry from "@/components/ui/Sorry/Sorry";

interface ProductDetailsProps {
  id: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await productApi.getProductById(id);
        setProduct(response?.data?.product);
      } catch (error) {
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="p-14">
      {loading ? (
        <ProductDetailsCardSkeleton />
      ) : product ? (
        <ProductDetailsCard
          _id={product._id}
          imageSrc={product.thumbnail}
          discount={product.discountPercentage}
          rating={product.rating}
          reviewsCount={product.ratingCount}
          title={product.name}
          description={product.description}
          price={product.sellingPrice}
          originalPrice={product.mrp}
          hasSubProducts={product.hasSubProducts}
          images={product.images || []}
          expressProduct={product.express}
          subscribedProduct={product.subscriptionProduct}
          unit={product.unit}
          quantity={product.quantity}
          storeId={storeId}
        />
      ) : (
        <div className="flex justify-center flex-col items-center h-96">
          <Sorry />
          <p className="text-gray-400 italic">Product not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
