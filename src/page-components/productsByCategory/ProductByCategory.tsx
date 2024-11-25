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
  name?: string | null | undefined;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ id, name }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );

  useEffect(() => {
    const fetchCategoryByProduct = async () => {
      try {
        const response = await productApi.getAllProducts({ category: id, storeId: storeId });
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
      <Header name = {name}/>
      {products.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <Sorry/>
          No products available in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-3 lg:w-10/12 mt-5">
          
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductByCategory;
