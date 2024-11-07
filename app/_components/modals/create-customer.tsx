"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedCustomer } from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialCustomerData: OmittedCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  city: "",
};

const CreateCustomerModal = () => {
  const [customerData, setCustomerData] =
    useState<OmittedCustomer>(initialCustomerData);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: addCustomer, isPending } = useMutation({
    mutationFn: (data: OmittedCustomer) => api.mutation.addCustomer({ data }),
    onSuccess: () => {
      setIsCreateModalOpen(false);
      setCustomerData(initialCustomerData);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addCustomer(customerData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>Add Customer</Button>
      <Modal
        title="Create Customer"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
        <form className="space-y-4">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            value={customerData.phoneNumber}
            onChange={handleChange}
            required
          />
          <Input
            label="City"
            id="city"
            name="city"
            value={customerData.city}
            placeholder="New York"
            onChange={handleChange}
            required
          />
          <Button onClick={(e) => handleAddCustomer(e)} disabled={isPending}>
            Create Customer
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateCustomerModal;
