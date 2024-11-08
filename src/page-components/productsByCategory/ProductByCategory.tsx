"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCardHorizondal from "../../components/productCardHorizondal/productCardHorizondal";
import { productApi } from "@/services/productService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";

interface ProductByCategoryProps {
  id?: string | null | undefined;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ id }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );

  useEffect(() => {
    const fetchCategoryByProduct = async () => {
      try {
        const response = await productApi.getAllProducts({ category: id });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryByProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="px-14 py-8">
      <Header />
      {products.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <Sorry/>
          No products available in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 2xl:w-8/12 mt-5">
          {products.map((product, index) => (
            <ProductCardHorizondal
              key={index}
              _id={product._id}
              imageSrc={product.thumbnail}
              title={product.name}
              rating={product.rating}
              price={product.sellingPrice}
              originalPrice={product.mrp}
              ratingCount={product.ratingCount}
              hasSubProducts={product.hasSubProducts}
              subscriptionProduct={product.subscriptionProduct}
              express={product.express}
              storeId={storeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductByCategory;
