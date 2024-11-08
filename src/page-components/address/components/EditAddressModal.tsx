import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Buttons/Button";
import InputBox from "@/components/ui/inputbox/InputBox";
import TextArea from "@/components/ui/textArea/TextArea";
import { addressApi } from "@/services/addressService";
import { Address } from "@/types/address";

interface EditAddressModalProps {
  addressData: Address | null;
  onAddressUpdated: () => void; 
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  addressData,
  onAddressUpdated,
}) => {
  const [formData, setFormData] = useState<Address | null>(addressData);

  useEffect(() => {
    setFormData(addressData); 
  }, [addressData]);

  const handleChange = (field: keyof Address, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await addressApi.updateAddress(formData._id, formData);
        onAddressUpdated(); 
      } catch (error) {
        console.error("Error updating address:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <InputBox
            label="Full Name"
            value={formData?.fullName || ""}
            placeHolder="Enter Full Name"
            onChange={(e) => handleChange("fullName", e.target.value)}
            border="border-none"
          />
        </div>
        <div>
          <InputBox
            label="Phone"
            value={formData?.phone || ""}
            placeHolder="Enter Phone Number"
            onChange={(e) => handleChange("phone", e.target.value)}
            border="border-none"
          />
        </div>
        <div className="col-span-2">
          <TextArea
            label="Detail Address"
            value={formData?.address || ""}
            placeHolder="Enter Your Address"
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div>
          <InputBox
            label="City"
            value={formData?.city || ""}
            placeHolder="Enter City"
            onChange={(e) => handleChange("city", e.target.value)}
            border="border-none"
          />
        </div>
        <div>
          <InputBox
            label="State"
            value={formData?.state || ""}
            placeHolder="Enter State"
            onChange={(e) => handleChange("state", e.target.value)}
            border="border-none"
          />
        </div>
        <div>
          <InputBox
            label="Zip Code"
            value={formData?.zipcode || ""}
            placeHolder="Enter Zip Code"
            onChange={(e) => handleChange("zipcode", e.target.value)}
            border="border-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          width="w-full"
          height="h-[3.5rem]"
          backgroundColor="bg-customGrayLight4"
          textColor="text-customGrayLight2"
          border="border-none"
          padding=""
          fontWeight="font-[600]"
        >
          Update Address
        </Button>
      </div>
    </form>
  );
};

export default EditAddressModal;
