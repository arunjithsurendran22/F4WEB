"use client";
import React, { useState, useEffect } from "react";
import CustomizeCard from "../CustomizeCard/CustomizeCard";
import { productApi } from "@/services/productService";
import ProductCustomizeSkeleton from "../Skeletons/ProductCustomizeSkeleton";
import Sorry from "../ui/Sorry/Sorry";

interface CustomizeProps {
  productId: string | null;
  column?: boolean;
  storeId?: string;
  subscribedProduct?: boolean;
  expressProduct?: boolean;
}

interface SubProduct {
  _id: string;
  mainProduct: string;
  sku: string;
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
  videoLink: string;
  unit: string;
  quantity: number;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  archived: boolean;
  createdAt: string;
  stock: {
    store: string;
    stock: number;
  } | null;
}

interface SubProductResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    subProducts: SubProduct[];
    count: number;
    hasNext: boolean;
  };
}

const Customize: React.FC<CustomizeProps> = ({
  productId,
  column,
  storeId,
  subscribedProduct,
  expressProduct,
}) => {
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubProducts = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response: SubProductResponse = await productApi.getSubProducts(
          productId
        );
        if (response.status && response.data) {
          setSubProducts(response.data.subProducts);
        } else {
          throw new Error(response.message || "Failed to fetch subproducts");
        }
      } catch (error) {
        console.error("Error fetching subproducts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubProducts();
  }, [productId]);

  return (
    <div className={`${column ? "grid grid-cols-5" : ""}`}>
      {loading ? (
        [...Array(4)].map((_, index) => (
          <ProductCustomizeSkeleton key={index} />
        ))
      ) : subProducts.length > 0 ? (
        subProducts.map((subProduct) => (
          <CustomizeCard
            key={subProduct._id}
            _id={subProduct._id}
            mainProduct={subProduct.mainProduct}
            imageSrc={subProduct.thumbnail}
            title={subProduct.name}
            rating={0}
            price={subProduct.sellingPrice}
            originalPrice={subProduct.mrp}
            ratingCount={0}
            offer={subProduct.discountPercentage}
            storeId={storeId}
            subscribedProduct={subscribedProduct}
            expressProduct={expressProduct}
          />
        ))
      ) : (
        <div className="text-center w-full py-6 text-gray-500 italic">
          <Sorry />
          No products available
        </div>
      )}
    </div>
  );
};

export default Customize;
