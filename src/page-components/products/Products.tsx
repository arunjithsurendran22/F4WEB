"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import ProductCard from "@/components/productCard/ProductCard";
import Filter from "@/components/filter/Filter";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader";
import { productApi } from "@/services/productService";
import { Product } from "@/types/product";
import { parseJwt } from "@/utils/UserId";
import Sorry from "@/components/ui/Sorry/Sorry";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { resetFilters } from "@/store/filterSlice";
import FilterLottie from "@/components/ui/Filter/FilterLottie";
import LeftSidebar from "@/components/ui/LeftSidebar/LeftSidebar";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { category, priceFrom, priceTo, rating } = useSelector(
    (state: RootState) => state.filters
  );
  const storeId = useSelector(
    (state: RootState) => state.location.storeId || undefined
  );
  const searchTerm = useSelector(
    (state: RootState) => state.filters.searchTerm
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [filtersCleared, setFiltersCleared] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(resetFilters());
    setFiltersCleared(true);
  }, [dispatch]);

  useEffect(() => {
    if (!filtersCleared) return;

    const fetchFilteredProducts = async () => {
      setLoading(true);
      const userIdParsed = parseJwt() || null;
      setUserId(userIdParsed);

      try {
        const response = await productApi.getAllProducts({
          pageNumber: page,
          pageSize: 10,
          category,
          priceFrom,
          priceTo,
          rating,
          searchTag: searchTerm,
          storeId,
          userId,
        });
        const productsList = response.data.products;
        setHasNext(response.data.hasNext);
        setProducts((prevProducts) =>
          page === 1 ? productsList : [...prevProducts, ...productsList]
        );
      } catch (error) {
        setError("Failed to fetch products");
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [
    category,
    priceFrom,
    priceTo,
    rating,
    searchTerm,
    page,
    userId,
    filtersCleared,
  ]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [category, priceFrom, priceTo, rating, searchTerm]);

  const loadMoreProducts = useCallback(() => {
    if (hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasNext]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMoreProducts();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMoreProducts, hasNext, loading]);

  const toggleSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleVisible = () => {
    toggleSidebar();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <div className="flex">
        <div className="absolute block lg:hidden p-1 bg-white z-50 rounded-xl  left-2  mt-2">
          <button onClick={handleVisible}>
            <FilterLottie width={30} height={30} />
          </button>
        </div>
        <div className="p-14 w-96 hidden lg:block">
          <Filter />
        </div>

        <div className="lg:w-9/12 py-14 overflow-y-auto h-[800px] hide-scrollbar p-1">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl font-semibold">Result</h2>
          </div>

          {loading && page === 1 ? (
            <div className="flex flex-col justify-center items-center mt-20">
              <SpinnerLoader />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">
              <Sorry />
              <h3 className="text-lg font-semibold italic">
                No Products Found ....
              </h3>
            </div>
          ) : (
            <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 xl:gap-14 md:gap-12  w-full p-2 xl:p-0">
              {products.map((product) => (
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
          {loading && page > 1 && (
            <div className="flex justify-center mt-4">
              <SkeletonLoader className="w-full h-64 rounded-xl" />
            </div>
          )}
          <div ref={observerRef} className="h-10"></div>
        </div>
        <LeftSidebar
          isVisible={isSidebarVisible}
          onClose={closeSidebar}
          title=""
        >
          <Filter closeSidebar={closeSidebar} />
        </LeftSidebar>
      </div>
    </div>
  );
};

export default Products;
