"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Buttons/Button";
import InputBox from "@/components/ui/inputbox/InputBox";
import SelectionBox from "@/components/ui/selectionBox/SelectionBox";
import TextArea from "@/components/ui/textArea/TextArea";
import axios from "axios";
import LocationSearch from "@/components/locationSearch/LocationSearch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { addressApi } from "@/services/addressService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddAddressForm() {
  const router = useRouter();
  const latitude = useSelector((state: RootState) => state.location.latitude);
  const longitude = useSelector((state: RootState) => state.location.longitude);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_COUNTRIES_API_URL!
        );
        const countries = response.data.map((country: any) => ({
          label: country.name.common,
        }));

        setCountryOptions(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      if (country) {
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_STATES_API_URL!,
            {
              country,
            }
          );

          const states = response.data.data.states.map(
            (state: { name: string; state_code: string }) => ({
              label: state.name,
            })
          );

          setStateOptions(states);
          setState("");
          setCity("");
          setCityOptions([]);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    fetchStates();
  }, [country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      fullName,
      email,
      countryCode: "91",
      phone,
      address,
      city,
      state,
      zipcode: zipCode,
      latitude,
      longitude,
    };

    try {
      const response = await addressApi.createAddress(addressData);

      if (response.message === "Authorization Error: Token missing!") {
        toast.error("please login!!!!!");
      }

      if (response.data) {
        toast.success("Address saved successfully!");
        router.push("/profile/my-address");
      }
    } catch (err: any) {
      // Show error message as toast
      const errorMessage = err?.message || "An error occurred!";
      toast.error(errorMessage);
      console.error("Error:", err);
    }
  };

  // Determine if the form should be disabled
  const isFormDisabled = !latitude || !longitude;

  return (
    <div className="mt-10 xl:w-6/12">
      <p className="mb-2 text-customGrayLight2">Search your place...</p>
      <div className="mb-10">
        <LocationSearch />
      </div>

      <div
        className={`${isFormDisabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-14">
            <div className="">
              {/* Full Name */}
              <InputBox
                label="Full Name"
                value={fullName}
                placeHolder="Enter Full Name / Home / Office"
                onChange={(e) => setFullName(e.target.value)}
                border="border-none"
                disabled={isFormDisabled}
              />
              {/* Email */}
              <InputBox
                label="Email"
                value={email}
                placeHolder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                border="border-none"
                disabled={isFormDisabled}
              />
              {/* Phone */}
              <InputBox
                label="Phone"
                value={phone}
                placeHolder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                border="border-none"
                disabled={isFormDisabled} // Disable until lat/long are available
              />
              {/* Country */}
              <SelectionBox
                label="Country"
                options={countryOptions}
                value={country}
                onChange={(value) => {
                  console.log("Selected Country:", value);
                  setCountry(value);
                  setState(""); // Reset state when country changes
                  setCity(""); // Reset city when country changes
                  setStateOptions([]); // Clear previous state options
                  setCityOptions([]); // Clear previous city options
                }}
                placeholder="Select Country"
                disabled={isFormDisabled} // Disable until lat/long are available
              />
              {/* State */}
              <SelectionBox
                label="State"
                options={stateOptions}
                value={state}
                onChange={(value) => {
                  console.log("Selected State:", value);
                  setState(value);
                }}
                placeholder="Select State"
                disabled={!country || isFormDisabled} // Disable if no country or lat/long is selected
              />
              {/* City */}
              <InputBox
                label="City"
                value={city}
                placeHolder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                border="border-none"
                disabled={isFormDisabled} // Disable until lat/long are available
              />
            </div>
            <div>
              {/* Zip Code */}
              <InputBox
                label="Zip Code"
                value={zipCode}
                placeHolder="Enter Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
                border="border-none"
                disabled={isFormDisabled} // Disable until lat/long are available
              />
              {/* Detail Address */}
              <TextArea
                label="Detail Address"
                value={address}
                placeHolder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
                disabled={isFormDisabled} // Disable until lat/long are available
              />
              <div className="mt-12">
                <Button
                  width="w-full"
                  height="h-[3.5rem]"
                  backgroundColor="bg-customGrayLight4"
                  textColor="text-customGrayLight2"
                  border="border-none"
                  padding=""
                  fontWeight="font-[600]"
                  disabled={isFormDisabled} // Disable the button until lat/long are available
                >
                  Save Address
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAddressForm;
