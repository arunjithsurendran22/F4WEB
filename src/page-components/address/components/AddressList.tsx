"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Buttons/Button";
import DeleteButton from "@/components/ui/Buttons/DeleteButton";
import RadioButton from "@/components/ui/RadioButton/RadioButton";
import Modal from "@/components/ui/modal/Modal";
import DeleteConfirmationCard from "@/components/DeleteConfirmationCard/DeleteConfirmationCard";
import { addressApi } from "@/services/addressService";
import { Address } from "@/types/address";
import EditAddressModal from "./EditAddressModal";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";

interface AddressListProps {
  setDefaultAddressId?: ((id: string | null) => void) | undefined;
  refetchAddress?: boolean;
  onAddressSelect?: ((id: string) => void) | undefined;
}

const AddressList: React.FC<AddressListProps> = ({
  setDefaultAddressId,
  refetchAddress,
  onAddressSelect,
}) => {
  const dispatch = useDispatch();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editAddressData, setEditAddressData] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await addressApi.getAllAddresses();
      if (Array.isArray(response.data.addresses)) {
        setAddresses(response.data.addresses);

        // Find the primary address if it exists
        const primaryAddress = response.data.addresses.find(
          (address: any) => address.primary
        );

        if (primaryAddress) {
          setSelectedAddress(primaryAddress._id);
          if (onAddressSelect) {
            onAddressSelect(primaryAddress._id);
          }
        }
      } else {
        console.error("Expected an array but got:", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [refetchAddress]);

  const handleRadioChange = (id: string) => {
    setSelectedAddress(id);
    if (onAddressSelect) {
      onAddressSelect(id);
    }
    if (setDefaultAddressId) {
      setDefaultAddressId(id);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedAddress(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAddress !== null) {
      try {
        await addressApi.deleteAddress(selectedAddress);
        setAddresses((prev) =>
          prev.filter((address) => address._id !== selectedAddress)
        );
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (address: Address) => {
    setEditAddressData(address);
    setIsEditModalOpen(true);
  };

  const handleAddressUpdated = () => {
    fetchAddresses();
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative h-[30rem] overflow-y-auto hide-scrollbar">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <SpinnerLoader />
        </div>
      ) : (

        <>
          {addresses.length > 0 ? (
            <ul className="space-y-14">
              {
                addresses.map((address) => (
                  <li key={address._id} className="lg:w-[45rem] items-center">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {address.fullName}
                        </h3>
                        <p className="text-customGrayLight2">{address.phone}</p>
                        <div className="flex gap-3">
                          <p className="text-customGrayLight2">{address.address}</p>
                          <p className="text-customGrayLight2">{`${address.city}, ${address.state} ${address.zipcode}`}</p>
                        </div>
                      </div>
                      <RadioButton
                        checked={address._id === selectedAddress}
                        onChange={() => handleRadioChange(address._id)}
                        name="address"
                      />
                    </div>
                    <div className="mt-2 flex justify-between">
                      <Button
                        width="32"
                        height="10"
                        borderRadius="rounded-2xl"
                        padding="px-4 py-1"
                        onClick={() => handleEditClick(address)}
                      >
                        Edit Address
                      </Button>
                      <DeleteButton
                        onClick={() => handleDeleteClick(address._id)}
                        hoverColor="text-customBlueLight"
                      />
                    </div>
                  </li>
                ))
              }
            </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div>
                <Sorry />
                <p className="text-center italic text-gray-400">
                  No addresses found.
                </p>
              </div>
            </div>
          )}
        </>

      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <DeleteConfirmationCard
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title=""
      >
        <EditAddressModal
          addressData={editAddressData}
          onAddressUpdated={handleAddressUpdated}
        />
      </Modal>
    </div>
  );
};
export default AddressList;
