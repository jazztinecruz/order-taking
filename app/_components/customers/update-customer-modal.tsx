"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedCustomer } from "@/core/types";
import { Customer } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  customer: Customer;
};

const UpdateCustomerModal = ({ customer }: Props) => {
  const [customerData, setCustomerData] = useState({
    ...customer,
    isActive: customer.isActive || false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: updateCustomer, isPending } = useMutation({
    mutationFn: (data: OmittedCustomer) =>
      api.mutation.updateCustomer({ data }),
    onSuccess: () => {
      setIsModalOpen(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleUpdateCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCustomer(customerData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
      <Modal
        title="Create Customer"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            defaultValue={customerData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            defaultValue={customerData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={customerData.phoneNumber}
            onChange={handleChange}
            required
          />
          <Input
            label="City"
            id="city"
            name="city"
            defaultValue={customerData.city}
            placeholder="New York"
            onChange={handleChange}
            required
          />

          <Input
            label={customer.isActive ? "Deactivate" : "Activate"}
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={customerData.isActive}
            onChange={handleChange}
          />

          <Button onClick={(e) => handleUpdateCustomer(e)} disabled={isPending}>
            Update Customer
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateCustomerModal;
