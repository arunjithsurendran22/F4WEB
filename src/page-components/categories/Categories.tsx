"use client";
import CategoriesCard from "@/components/categoriesCard/CategoriesCard";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { categoryApi } from "@/services/categoryService";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
  sortNumber: number;
}

interface ApiResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    categories: Category[];
    count: number;
    hasNext: boolean;
  };
}

const Categories: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: ApiResponse = await categoryApi.getAllCategories();
        setCategories(response.data.categories);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClickProducts = (id: string, name: string) => {
    router.push(
      `/products-by-category?id=${encodeURIComponent(
        id
      )}&name=${encodeURIComponent(name)}`
    );
  };

  return (
    <div className="p-2 md:p-14">
      <div className="mb-5">
        <h5 className="font-semibold text-xl">Categories</h5>
      </div>
      {/* Grid View for Larger Screens */}
      <div className="gap-3  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-10 xl:gap-20">
        {loading
          ? [...Array(10)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <SkeletonLoader className="h-52 w-52 rounded-xl" />
              </div>
            ))
          : categories.map((category) => (
              <div
                key={category._id}
                className="flex-shrink-0"
                onClick={() =>
                  handleClickProducts(category._id, category.categoryName)
                }
              >
                <CategoriesCard
                  imageSrc={category.categoryImage}
                  title={category.categoryName}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categories;
