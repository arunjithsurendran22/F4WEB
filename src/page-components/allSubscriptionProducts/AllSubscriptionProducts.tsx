"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCardHorizondal from "../../components/productCardHorizondal/productCardHorizondal";
import { productApi } from "@/services/productService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";
import ProductCard from "@/components/productCard/ProductCard";
import ViewAll from "@/components/ui/Buttons/ViewAll";
import Modal from "@/components/ui/modal/Modal";
import DetailsModal from "./components/DetailsModal";
import { subscriptionApi } from "@/services/subscriptionService";

export interface PlanDetails {
  subscriptionId: string
  title: string,
  allowedQuantity: number,
  purchasedQuantity: number,
  unit: string,
}

export interface SubscriptionOrder {
  orderId: string
  name: string,
  thumbnail: string
  orderStatus: string
}


const AllSubscriptionProducts: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<PlanDetails>({
    subscriptionId: '',
    title: '',
    allowedQuantity: 0,
    purchasedQuantity: 0,
    unit: ''
  })
  const [ordersList, setOrdersList] = useState<SubscriptionOrder[]>([])

  const storeId = useSelector(
    (state: RootState) => state.location.storeId || null || undefined
  );

  useEffect(() => {
    const fetchAllSubscriptionProducts = async () => {
      try {
        const response = await productApi.getAllSubscriptionProducts(storeId)
        console.log(response)
        if (response && response.data && response.data.length) {
          setItems(response.data.filter((item: any) => item.subscribed));

        }
      } catch (error) {
        console.error("Error fetching subscription products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSubscriptionProducts();
  }, [storeId]);

  const handleClick = (item: any) => {
    setSelectedPlanDetails(
      {
        subscriptionId: item.subscriptionId,
        title: item.plan.title,
        allowedQuantity: item.plan.allowedQuantity,
        purchasedQuantity: item.plan.purchasedQuantity,
        unit: item.plan.unit
      }
    )
    const fetchAllSubscriptionPurchase = async () => {
      try {
        const response = await subscriptionApi.getAllSubscriptionPurchases(item.subscriptionId)
        console.log(response)
        if (response && response.data && 
          response.data.subscriptionPurchases && response.data.subscriptionPurchases.length) {
          setOrdersList(response.data.subscriptionPurchases.map((item: any) => {
            return {
              orderId: item.order.orderId,
              name: item.product.name,
              thumbnail: item.product.thumbnail,
              orderStatus: item.order.orderStatus
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching subscription products:", error);
      } finally {
        setIsDetailsModalOpen(true);
      }
    };
    fetchAllSubscriptionPurchase()
  };

  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  // return (
  //   <div className="md:px-14 p-2">
  //     {items.length === 0 ? (
  //       <div className="text-center mt-10 text-gray-500">
  //         <Sorry />
  //         No Plans available.
  //       </div>
  //     ) : (
  //       <div className="flex">
  //           <div className="lg:w-100 py-14 p-1">

  //             {
  //               items.map((item, index) => (
  //                 <div key={index}>
  //                   <div className="flex justify-between md:py-5">
  //                   <Header name={item.plan.title} />

  //                     <ViewAll buttonText = 'View Details' onClick={()=> {
  //                       handleClick(item.subscriptionId)
  //                     }} />

  //                   </div>

  //                   {item.products.length === 0 ? (
  //                     <div className="text-center text-gray-500">
  //                       <Sorry />
  //                       <h3 className="text-lg font-semibold italic">
  //                         No Products Found ....
  //                       </h3>
  //                     </div>
  //                   ) : (
  //                     <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-14 md:gap-12  w-full p-2 xl:p-0">
  //                       {item.products.map((product: any) => (
  //                         <div key={product._id} className="mb-10">
  //                           <ProductCard
  //                             _id={product._id}
  //                             imageSrc={product.thumbnail}
  //                             title={product.name}
  //                             rating={product.rating}
  //                             price={product.sellingPrice}
  //                             originalPrice={product.mrp}
  //                             ratingCount={product.ratingCount}
  //                             hasSubProducts={product.hasSubProducts}
  //                             discountPercentage={product.discountPercentage}
  //                             subscriptionProduct={product.subscriptionProduct}
  //                             express={product.express}
  //                             storeId={storeId}
  //                             unit={product.unit}
  //                             quantity={product.quantity}
  //                             width="w-full"
  //                             imgHeight="h-auto"
  //                             stockId={product.stock?._id}
  //                             stock={product.stock?.stock}
  //                           />
  //                         </div>
  //                       ))}
  //                     </div>
  //                   )}

  //                 </div>
  //               ))
  //             }
  //           </div>

  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="md:px-14 p-2">
      {items.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <Sorry />
          No Plans available.
        </div>
      ) : (
        <div className="flex">
          {/* Gradient Background Wrapper */}
          <div className="lg:w-100 my-6 py-14 p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
            {items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-5 mb-8">
                <div className="flex justify-between md:py-5">
                  <Header name={item.plan.title} />

                  <ViewAll
                    buttonText="View Details"
                    onClick={() => {
                      handleClick(item);
                    }}
                  />
                </div>

                {item.products.length === 0 ? (
                  <div className="text-center text-gray-500">
                    <Sorry />
                    <h3 className="text-lg font-semibold italic">
                      No Products Found ....
                    </h3>
                  </div>
                ) : (
                  <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-14 md:gap-12 w-full p-2 xl:p-0">
                    {item.products.map((product: any) => (
                      <div key={product._id} className="mb-10">
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
                          unit={product.unit}
                          quantity={product.quantity}
                          width="w-full"
                          imgHeight="h-auto"
                          stockId={product.stock?._id}
                          stock={product.stock?.stock}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      )}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title=""
      >
        <DetailsModal
          planDetails={selectedPlanDetails}
          ordersList = {ordersList}
        />
      </Modal>
    </div>
  );

};

export default AllSubscriptionProducts;
