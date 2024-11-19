"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Buttons/Button";
import InputBox from "@/components/ui/inputbox/InputBox";
import SelectionBox from "@/components/ui/selectionBox/SelectionBox";
import TextArea from "@/components/ui/textArea/TextArea";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { addressApi } from "@/services/addressService";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AddressLocationSearch from "@/components/adressLocationSearch/AddressLocationSearch";

function AddAddressForm() {

  const router = useRouter();
  const pathname = usePathname();
  let latitude = useSelector((state: RootState) => state.address.latitude);
  let longitude = useSelector((state: RootState) => state.address.longitude);
  
  // Form fields state
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    country: "",
    address: "",
    city: "",
    state: "",
  });

  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([
    {
      label: 'India',
      value: 'India'
    }
  ]);
  const [stateOptions, setStateOptions] = useState<{ label: string; value: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (latitude && longitude) {
      setIsFormDisabled(false);
    }
  }, [latitude, longitude]);

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await axios.get(process.env.NEXT_PUBLIC_COUNTRIES_API_URL!);
  //       const countries = response.data.map((country: any) => ({ label: country.name.common }));
  //       setCountryOptions(countries);
  //     } catch (error) {
  //       console.error("Error fetching countries:", error);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (country) {
        // try {
        //   const response = await axios.post(process.env.NEXT_PUBLIC_STATES_API_URL!, { country });
        //   const states = response.data.data.states.map((state: { name: string }) => ({ label: state.name }));
        //   setStateOptions(states);
        //   setState("");
        //   setCity("");
        //   setCityOptions([]);
        // } catch (error) {
        //   console.error("Error fetching states:", error);
        // }

        const states = [{
          label: 'Kerala',
          value: 'Kerala'
        },
        {
          label: 'Karnataka',
          value: 'Karnataka'
        },
        {
          label: 'Tamilnadu',
          value: 'Tamilnadu'
        }]
        setStateOptions(states);
        setState("");
        setCity("");
        setCityOptions([]);
      }
    };

    fetchStates();
  }, [country]);

  const setLocation = (lat: number | null, lng: number | null) => {
    latitude = lat;
    longitude = lng;
  }

  // Dynamic validation for each input
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "email":
        if (!value.includes("@")) error = "Invalid email";
        break;
      case "phone":
        if (!value.match(/^\d{10}$/)) error = "Invalid phone number";
        break;
      case "zipCode":
        if (!value.match(/^\d{6}$/)) error = "Invalid Zip Code";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "state":
        if (!value) error = "State is required";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Validation function on form submission
  const validateForm = () => {
    const newErrors: any = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.includes("@")) newErrors.email = "Invalid email";
    if (!phone.match(/^\d{10}$/)) newErrors.phone = "Invalid phone number";
    if (!zipCode.match(/^\d{5,6}$/)) newErrors.zipCode = "Invalid Zip Code";
    if (!country) newErrors.country = "Country is required";
    if (!state) newErrors.state = "State is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!latitude && !longitude) {
      toast.error("Please search your location");
      return;
    }

    // Run full form validation before submission
    if (!validateForm()) return;

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
        toast.error("Please login!");
      }

      if (response.data) {
        toast.success("Address saved successfully!");
        if (pathname == '/cart/cartAddAddress') {
          // If the current route is not '/target-route', redirect
          router.push('/cart');
        }else {
          router.push("/profile/my-address");
        }
      }
    } catch (err: any) {
      const errorMessage = err?.message || "An error occurred!";
      toast.error(errorMessage);
    }
  };

    return (
    <div className="mt-10 xl:w-6/12 p-3">
      {/* <p className="mb-2 text-customGrayLight2">Search your place...</p> */}
       <div className="mb-10">
        <AddressLocationSearch
        onChange = {(latitude, longitude)=>{
          setLocation(latitude, longitude)
        }}
         />
      </div> 

      <form onSubmit={handleSubmit}>
        <div className="md:grid md:grid-cols-2 gap-14">
          <div className="">
            {/* Full Name */}
            <InputBox
              label="Full Name"
              value={fullName}
              placeHolder="Enter Full Name / Home / Office"
                           onChange={(e) => {
                setFullName(e.target.value);
                validateField("fullName", e.target.value);
              }}
              border="border-none"
              disabled={isFormDisabled}
              error={errors.fullName}
            />
            {/* Email */}
            <InputBox
              label="Email"
              value={email}
              placeHolder="Enter Email"
                           onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              border="border-none"
              disabled={isFormDisabled}
              error={errors.email}
            />
            {/* Phone */}
            <InputBox
              label="Phone"
              value={phone}
              placeHolder="Enter Phone Number"
                            onChange={(e) => {
                setPhone(e.target.value);
                validateField("phone", e.target.value);
              }}
              border="border-none"
              disabled={isFormDisabled}
              error={errors.phone}
            />
            {/* Country */}
            <SelectionBox
              label="Country"
              options={countryOptions}
              value={country}
                            onChange={(value) => {
                setCountry(value);
                validateField("country", value);
              }}
              placeholder="Select Country"
              disabled={isFormDisabled}
              error={errors.country}
            />
            {/* State */}
            <SelectionBox
              label="State"
              options={stateOptions}
              value={state}
                           onChange={(value) => {
                setState(value);
                validateField("state", value);
              }}
              placeholder="Select State"
              disabled={!country || isFormDisabled}
              error={errors.state}
            />
            {/* City */}
            <InputBox
              label="City"
              value={city}
              placeHolder="Enter City"
                            onChange={(e) => {
                setCity(e.target.value);
                validateField("city", e.target.value);
              }}
              border="border-none"
              disabled={isFormDisabled}
              error={errors.city}
            />
          </div>
          <div>
            {/* Zip Code */}
            <InputBox
              label="Zip Code"
              value={zipCode}
              placeHolder="Enter Zip Code"
                          onChange={(e) => {
              setZipCode(e.target.value);
              validateField("zipCode", e.target.value);
            }}
              border="border-none"
              disabled={isFormDisabled}
              error={errors.zipCode}
            />
            {/* Detail Address */}
            <TextArea
              label="Detail Address"
              value={address}
              placeHolder="Enter Your Address"
                         onChange={(e) => {
              setAddress(e.target.value);
              validateField("address", e.target.value);
            }}
              disabled={isFormDisabled}
              error={errors.address}
            />
            <div className="mt-12">
              <Button
                width="w-full"
                height="h-[3.5rem]"
                backgroundColor={!isFormDisabled ? "bg-customBlueLight" : "bg-customGrayLight4"}
                textColor={!isFormDisabled ? "text-white" : "text-customGrayLight2"}
                border="border-none"
                fontWeight="font-[600]"
              >
                Save Address
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAddressForm;


