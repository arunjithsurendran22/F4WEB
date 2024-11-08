"use client";
import React, { useState, useEffect, useRef } from "react";
import InputBoxSearch from "@/components/ui/inputbox/InputBoxSearch";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/store/filterSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";

const SearchBox: React.FC = () => {
  const storeId = useAppSelector((state: RootState) => state.location.storeId);
  const [inputValue, setInputValue] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [disableBox, setDisableBox] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const savedSearches =
      typeof window !== "undefined"
        ? window.localStorage.getItem("recentSearches")
        : "";

    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    setDisableBox(!storeId);
  }, [storeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    trackSearchTerm(value);
  };

  const trackSearchTerm = (value: string) => {
    if (value.trim() === "") {
      dispatch(setSearchTerm(""));
    } else {
      dispatch(setSearchTerm(value.trim()));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      saveSearch(inputValue.trim());
      setShowDropdown(false);

      // Navigate to the products page
      router.push("/products");
    }
  };

  const handleInputClick = () => {
    if (recentSearches.length > 0) {
      setShowDropdown(true);
    }
  };

  const saveSearch = (searchTerm: string) => {
    let updatedSearches = [...recentSearches];
    updatedSearches = updatedSearches.filter((term) => term !== searchTerm);
    updatedSearches.unshift(searchTerm);
    updatedSearches = updatedSearches.slice(0, 4);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const handleSelectSearch = (searchTerm: string) => {
    setInputValue(searchTerm);
    setShowDropdown(false);
    dispatch(setSearchTerm(searchTerm)); // Dispatch the selected search term
  };

  const handleRemoveSearch = (searchTerm: string) => {
    const updatedSearches = recentSearches.filter(
      (term) => term !== searchTerm
    );
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <div className="relative w-full " ref={inputRef}>
      <InputBoxSearch
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        className="mb-2"
        disable={disableBox}
      />

      {showDropdown && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-md max-h-48 overflow-y-auto mt-1">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium">Recent Searches</span>
            <button
              onClick={handleClearAll}
              className="text-customBlueLight font-medium"
            >
              Clear All
            </button>
          </div>
          <ul className="p-1">
            {recentSearches.map((searchTerm, index) => (
              <li
                key={index}
                onClick={() => handleSelectSearch(searchTerm)}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/time (2) 1.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                  <p>{searchTerm}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSearch(searchTerm);
                  }}
                >
                  <IoClose className="text-xl hover:text-customBlueLight" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
