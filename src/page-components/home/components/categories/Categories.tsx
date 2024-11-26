"use client";
import CategoriesCard from "@/components/categoriesCard/CategoriesCard";
import ViewAll from "@/components/ui/Buttons/ViewAll";
import Carousel from "@/components/ui/Carousel/Carousel";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { categoryApi } from "@/services/categoryService";
import CategorySkeletons from "@/components/Skeletons/CategorySkeletons";
import toast from "react-hot-toast";
import { ApiResponse, Category } from "@/types/category";
import Sorry from "@/components/ui/Sorry/Sorry";

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
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = () => {
    router.push("/categories");
  };

  const handleClickProducts = (id: string, name: string) => {
    router.push(
      `/products-by-category?id=${encodeURIComponent(
        id
      )}&name=${encodeURIComponent(name)}`
    );
  };

  const renderCategoryItem = (category: Category) => (
    <div
      key={category._id}
      className="flex-shrink-0 cursor-pointer"
      onClick={() => handleClickProducts(category._id, category.categoryName)}
    >
      <CategoriesCard
        imageSrc={category.categoryImage}
        title={category.categoryName}
      />
    </div>
  );

  const renderSkeletons = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <CategorySkeletons key={index} />
      ))}
    </>
  );

  return (
    <div>
      <div className="flex justify-between mb-8 ">
        <h4 className="text-customBlueLight font-semibold text-sm md:text-lg items-center ">
          Categories
        </h4>
        <ViewAll onClick={handleClick} />
      </div>
      {/* Grid View for Larger Screens */}
      <div className="hidden xl:grid grid-cols-6 xl:gap-16">
        {loading ? (
          renderSkeletons()
        ) : categories.length === 0 ? (
          <div className="col-span-6 text-center text-gray-500">
            <h3 className="text-lg font-semibold italic">
              No Categories Found
            </h3>
          </div>
        ) : (
          categories.slice(0, 6).map(renderCategoryItem)
        )}
      </div>

      {/* Carousel for Smaller Screens */}
      <div className="xl:hidden">
        <Carousel>
          {loading ? (
            renderSkeletons()
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-semibold">No Categories Found</h3>
            </div>
          ) : (
            categories.slice(0, 6).map(renderCategoryItem)
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
