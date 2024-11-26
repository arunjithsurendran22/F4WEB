'use client'
import ProductCard from "@/components/productCard/ProductCard";
import ViewAll from "@/components/ui/Buttons/ViewAll";
import Carousel from "@/components/ui/Carousel/Carousel";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { products } from "@/constant/data";
import { productApi } from "@/services/productService";
import { RootState } from "@/store";
import { Plan, Product, ProductResponse } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function YourProducts() {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [products, setProducts] = useState<Product[]>([]);
  const [plan, setPlan] = useState<Plan>();
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(0)
  const [subscribed, setSubscribed] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptionProducts = async () => {
      try {
        setLoading(true);
        const response: ProductResponse =
          await productApi.getSubscriptionProducts(storeId);
        if (response.status && response.data) {
          console.log(response.data.products);
          setProducts(response.data.products);
          setPlan(response.data.plan);
          setSavings(response.data.savings);
          setSubscribed(response.data.subscribed)
        } else {
          throw new Error(
            response.message || "Failed to fetch subscription products"
          );
        }
      } catch (error) {
        console.error("Error fetching subscription products:", error);
        toast.error(
          "Failed to load subscription products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionProducts();
  }, [storeId]);

  const handleClick = () => {
    router.push("/all-subscription-products");
  };

  return (
    <div>
      <div className="flex justify-end md:px-14 md:py-5">
        {products.length > 0 && <ViewAll onClick={handleClick} />}
      </div>

      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative w-full flex overflow-hidden h-[500px] xl:h-[620px] lg:h-[600px] md:h-[600px] sm:h-[500px]">
          <Image
            src="/images/your.png"
            alt="Wave Image"
            width={500}
            height={620}
            className="object-fill w-full"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 md:p-14 p-3">
          <div className="flex justify-between">
            <div className="text-customBlueLight mt-5 md:mt-0">
              <h1 className="font-bold mb-4 md:text-2xl">
                Subscription Products
              </h1>
              <p className="md:text-lg font-semibold">
                Unlock savings with every product
              </p>
            </div>
            {/* Adjusted price tag position */}

            <div className="w-[140px] h-[140px] flex justify-center items-center relative top-[-30px] md:top-[-65px] right-[10px]">
              {
                (plan?.discountPercentage) ?
                  (
                    <></>
                    // <>
                    //   <Image
                    //     src="/images/price_tag.png"
                    //     alt="Price Tag"
                    //     width={140}
                    //     height={140}
                    //     className="object-fill"
                    //   />
                    //   // Overlay text for discount percentage 
                    //   <div className="absolute inset-0 ml-10 mt-6 flex flex-col justify-center items-center text-white font-semibold txt-xs md:text-md">
                    //     <p>{plan?.discountPercentage}%</p>
                    //     <p>OFF</p>
                    //   </div>
                    // </>

                  ) : ''}
            </div>


          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <SpinnerLoader />
            </div>
          ) : (products.length === 0 || !subscribed) ? (
            // No Data Message
            <div className="flex justify-center items-center h-64">
              <p className="text-lg font-semibold text-white">
                No Products Available
              </p>
            </div>
          ) : (
            <div className="">
              <Carousel gap={30}>
                {products.map((product) => (
                  <div className="" key={product._id} >
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
                      width="w-45"
                      imgHeight="h-auto"
                      stockId={product.stock?._id}
                      stock={product.stock?.stock}
                    />
                  </div>

                ))}
              </Carousel>
            </div>
          )}

          {/* Gradient Overlay at Bottom with Absolute Positioning */}
          {savings > 0 ? (

            <div
              className="absolute bottom-10 left-0 w-full sm:h-8 md:h-12 lg:h-14 xl:h-14 flex items-center justify-center text-center"
              style={{
                background: "linear-gradient(to right, #BA973B, #F1DD80, #A57D24)",
              }}
            >
              <h2 className="xl:text-xl lg:text-lg md:text-lg sm:text-lg">
                <span className="font-semibold mr-2"> 🥳 You Saved ₹{savings}</span>
                on this deal
              </h2>
            </div>
          ) : ''
          }
        </div>
      </div>
    </div>


  );
}

export default YourProducts;
