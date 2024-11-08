"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import PriceFilter from "./components/PriceFilter";
import Button from "../ui/Buttons/Button";
import {
  setCategoryFilter,
  setPriceFromFilter,
  setPriceToFilter,
  setRatingFilter,
} from "@/store/filterSlice";
import PopularCategoryFilter from "./components/PopularCategoryFilter";
import RatingFilter from "./components/RatingFilter";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(5000);
  const [reset, setReset] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  useEffect(() => {
    const hasChanges =
      selectedFood !== null ||
      priceFrom !== 0 ||
      priceTo !== 5000 ||
      selectedRating !== 0;

    setIsFilterChanged(hasChanges);
  }, [selectedFood, priceFrom, priceTo, selectedRating]);

  const handleFilterChange = () => {
    setIsApplied(false);
  };

  const handleApplyOrClearFilters = () => {
    if (isApplied) {
      setSelectedFood(null);
      setPriceFrom(0);
      setPriceTo(5000);
      setSelectedRating(0);
      dispatch(setCategoryFilter(null));
      dispatch(setPriceFromFilter(0));
      dispatch(setPriceToFilter(5000));
      dispatch(setRatingFilter(0));
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 1000);

      setIsApplied(false);
    } else {
      // Apply filters
      if (isFilterChanged) {
        dispatch(setCategoryFilter(selectedFood));
        dispatch(setPriceFromFilter(priceFrom));
        dispatch(setPriceToFilter(priceTo));
        dispatch(setRatingFilter(selectedRating));
        setIsApplied(true);
        setReset(false);
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Filter</h1>
        {isFilterChanged && (
          <Button
            width="w-20"
            fontSize="text-xs"
            height="h-8"
            onClick={handleApplyOrClearFilters}
          >
            {isApplied ? "CLEAR" : "APPLY"}
          </Button>
        )}
      </div>
      <PriceFilter
        lowestPrice={priceFrom}
        highestPrice={priceTo}
        reset={reset}
        setPriceRange={(lowest, highest) => {
          setPriceFrom(lowest);
          setPriceTo(highest);
          handleFilterChange();
        }}
      />
      <PopularCategoryFilter
        selectedCategory={selectedFood}
        setSelectedCategory={(category) => {
          setSelectedFood(category);
          handleFilterChange();
        }}
      />
      <RatingFilter
        selectedRating={selectedRating}
        setSelectedRating={(rating) => {
          setSelectedRating(rating);
          handleFilterChange();
        }}
        reset={reset}
      />
    </div>
  );
};

export default Filter;
