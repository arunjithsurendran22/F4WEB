import ProductCard from "@/components/productCard/ProductCard";
import Carousel from "@/components/ui/Carousel/Carousel";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
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
          //console.log(response.data.products);
          setProducts(response.data.products);
          setPlan(response.data.plan);
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

  return (
    <div className="relative w-full ">
      {/* Background Image */}
      <div className="relative w-full flex overflow-hidden h-[500px] xl:h-[550px]">
        <Image
          src="/images/your.png"
          alt="Wave Image"
          width={500}
          height={550}
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
                  <>
                    <Image
                      src="/images/price_tag.png"
                      alt="Price Tag"
                      width={140}
                      height={140}
                      className="object-fill"
                    />
                    {/* Overlay text for discount percentage */}
                    <div className="absolute inset-0 ml-10 mt-6 flex flex-col justify-center items-center text-white font-semibold txt-xs md:text-md">
                      <p>{plan?.discountPercentage}%</p>
                      <p>OFF</p>
                    </div>
                  </>

                ) : ''}
          </div>


        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <SpinnerLoader />
          </div>
        ) : products.length === 0 ? (
          // No Data Message
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold text-white">
              No Products Available
            </p>
          </div>
        ) : (
          <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-14 md:gap-12  w-full">
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
                  // width="w-full"
                  imgHeight="h-auto"
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default YourProducts;
