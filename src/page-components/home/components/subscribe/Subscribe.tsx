"use client";
import InputBoxWithButton from "@/components/ui/inputbox/InputWithButtonProps ";
import { newsletterApi } from "@/services/newsLetterSubscription";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const Subscribe: React.FC = () => {
  // State to handle input value
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle button click to call API
  const handleButtonClick = async () => {
    if (!inputValue) {
      toast.error("Email is required!"); // Show error toast
      return;
    }

    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputValue))) {
      toast.error("Please enter a valid email."); // Show error toast
      return;
    }

    setIsLoading(true); // Start loading
    try {
      // Call the API
      const response = await newsletterApi.subscribe(inputValue);

      // Handle success response
      if (response.success) {
        toast.success("Subscribed successfully!");
      }else{
        toast.error(response.message);

      }
      setInputValue("");

    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-subscribe md:flex justify-between items-center p-5 md:p-14 ">
      {/* Left section */}
      <div>
        <h1 className="xl:text-3xl font-semibold mb-2">
          Subscribe to our Newsletter
        </h1>
        <p className="text-sm text-gray-500">
          Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
          Phasellus imperdiet elit eu magna.
        </p>
      </div>

      {/* Right section with InputBoxWithButton */}
      <div className="xl:w-6/12 w-full flex justify-end mt-5 md:mt-0 ">
        <InputBoxWithButton
          placeholder="Enter your email..."
          value={inputValue}
          onChange={handleInputChange}
          buttonText={isLoading ? "Subscribing..." : "Subscribe"}
          onButtonClick={handleButtonClick}
          className=""
        />
      </div>
    </div>
  );
};

export default Subscribe;
