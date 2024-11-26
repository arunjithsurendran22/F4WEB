import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Buttons/Button";
import InputBox from "@/components/ui/inputbox/InputBox";
import TextArea from "@/components/ui/textArea/TextArea";
import { addressApi } from "@/services/addressService";
import { Address } from "@/types/address";
import toast from "react-hot-toast";
import SelectionBox from "@/components/ui/selectionBox/SelectionBox";

interface EditAddressModalProps {
  addressData: Address | null;
  onAddressUpdated: () => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  addressData,
  onAddressUpdated,
}) => {
  const [formData, setFormData] = useState<Address | null>(addressData);
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: "India",
      value: "India",
    },
  ]);
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: "Kerala",
      value: "Kerala",
    },
    {
      label: "Karnataka",
      value: "Karnataka",
    },
    {
      label: "Tamilnadu",
      value: "Tamilnadu",
    },
  ]);
  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    zipcode: "",
    country: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    setFormData(addressData);
  }, [addressData]);

  const handleChange = (field: keyof Address, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

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
      case "zipcode":
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

    if (!formData?.fullName.trim())
      newErrors.fullName = "Full Name is required";
    if (!formData?.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData?.phone.match(/^\d{10}$/))
      newErrors.phone = "Invalid phone number";
    if (!formData?.zipcode.match(/^\d{5,6}$/))
      newErrors.zipcode = "Invalid Zip Code";
    //if (!formData?.country) newErrors.country = "Country is required";
    if (!formData?.state) newErrors.state = "State is required";
    if (!formData?.city.trim()) newErrors.city = "City is required";
    if (!formData?.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData) {
      try {
        const response = await addressApi.updateAddress(formData._id, formData);
        if (!response.status) {
          toast.error(response.message);
        } else {
          toast.success("Address details updated");

          onAddressUpdated();
        }
      } catch (error) {
        console.error("Error updating address:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full md:w-96  h-[30rem] overflow-y-auto ">
      <div className=" md:grid md:grid-cols-2 gap-4">
        <div>
          <InputBox
            label="Full Name"
            value={formData?.fullName || ""}
            placeHolder="Enter Full Name"
            onChange={(e) => {
              handleChange("fullName", e.target.value);
              validateField("fullName", e.target.value);
            }}
            border="border-none"
            error={errors.fullName}
          />
        </div>
        <div>
          <InputBox
            label="Phone"
            value={formData?.phone || ""}
            placeHolder="Enter Phone Number"
            onChange={(e) => {
              handleChange("phone", e.target.value);
              validateField("phone", e.target.value);
            }}
            border="border-none"
            error={errors.phone}
          />
        </div>
        <div className="col-span-2">
          <TextArea
            label="Detail Address"
            value={formData?.address || ""}
            placeHolder="Enter Your Address"
            onChange={(e) => {
              handleChange("address", e.target.value);
              validateField("address", e.target.value);
            }}
            border="border-none"
            error={errors.address}
          />
        </div>
        <div>
          <InputBox
            label="Email"
            value={formData?.email || ""}
            placeHolder="Enter Email Address"
            onChange={(e) => {
              handleChange("email", e.target.value);
              validateField("email", e.target.value);
            }}
            border="border-none"
            error={errors.email}
          />
        </div>
        <div>
          <SelectionBox
            label="Country"
            options={countryOptions}
            value={formData?.country || "India"}
            onChange={(value) => {
              handleChange("country", value);
              validateField("country", value);
            }}
            placeholder="Select Country"
            error={errors.country}
          />
        </div>
        <div>
          <InputBox
            label="City"
            value={formData?.city || ""}
            placeHolder="Enter City"
            onChange={(e) => {
              handleChange("city", e.target.value);
              validateField("city", e.target.value);
            }}
            border="border-none"
            error={errors.city}
          />
        </div>
        <div>
          <SelectionBox
            label="State"
            options={stateOptions}
            value={formData?.state || ""}
            onChange={(value) => {
              handleChange("state", value);
              validateField("state", value);
            }}
            placeholder="Select State"
            error={errors.state}
          />
        </div>
        <div>
          <InputBox
            label="Zip Code"
            value={formData?.zipcode || ""}
            placeHolder="Enter Zip Code"
            onChange={(e) => {
              handleChange("zipcode", e.target.value);
              validateField("zipcode", e.target.value);
            }}
            border="border-none"
            error={errors.zipcode}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          width="w-full"
          height="h-10 md:h-[3.5rem]"
          backgroundColor={
            formData ? "bg-customBlueLight" : "bg-customGrayLight4"
          }
          //backgroundColor="bg-customGrayLight4"
          //textColor="text-customGrayLight2"
          textColor={formData ? "text-white" : "text-customGrayLight2"}
          border="border-none"
          padding="py-1 px-2"
          fontWeight="md:font-[600]"
          fontSize="text-xs md:text-sm"
        >
          Update Address
        </Button>
      </div>
    </form>
  );
};

export default EditAddressModal;
