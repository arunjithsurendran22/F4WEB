import ProductCard from "@/components/productCard/ProductCard";
import Carousel from "@/components/ui/Carousel/Carousel";
import { products } from "@/constant/data";
import { productApi } from "@/services/productService";
import { RootState } from "@/store";
import { Plan, Product, ProductResponse } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function YourProducts() {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [products, setProducts] = useState<Product[]>([]);
  const [plan, setPlan] = useState<Plan>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionProducts = async () => {
      try {
        setLoading(true);
        const response: ProductResponse =
          await productApi.getSubscriptionProducts(storeId);
        if (response.status && response.data) {
          setProducts(response.data.products);
          setPlan(response.data.plan);
        } else {
          throw new Error(
            response.message || "Failed to fetch subscription products"
          );
        }
      } catch (error) {
        console.error("Error fetching subscription products:", error);
        // toast.error(
        //   "Failed to load subscription products. Please try again later."
        // );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionProducts();
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="relative w-full flex overflow-hidden  h-[500px] xl:h-auto">
        <Image
          src="/images/subscribedBg.png"
          alt="Wave Image"
          width={500}
          height={550}
          className="object-cover w-full "
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 p-10">
        <h1 className="text-lg font-semibold text-white mb-4">Your Products</h1>

        <div className="w-full">
          <Carousel gap={40}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                imageSrc={product.thumbnail}
                title={product.name}
                rating={product.rating}
                price={product.sellingPrice}
                originalPrice={product.mrp}
                ratingCount={product.ratingCount}
                subscriptionProduct={product.subscriptionProduct}
                width="w-full" // Ensures full width for the product card
                imgHeight="h-auto" // Remove fixed height for better responsiveness
              />
            ))}
          </Carousel>
        </div>
      </div>

      {/* Gradient Overlay at Bottom with Absolute Positioning */}
      <div
        className="absolute bottom-10 left-0 w-full h-14 flex items-center justify-center text-center"
        style={{
          background: "linear-gradient(to right, #BA973B, #F1DD80, #A57D24)",
        }}
      >
        <h2 className="text-xl">
          <span className="font-semibold mr-2">
            {" "}
            🥳 Save {plan?.discountPercentage}%
          </span>
          on this order
        </h2>
      </div>
    </div>
  );
}

export default YourProducts;
