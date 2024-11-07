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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "@/core/schemas/customer";
import toast from "react-hot-toast";
import grabError from "@/core/util/grab-error";

type Props = {
  customer: Customer;
};

const UpdateCustomerModal = ({ customer }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      city: customer.city,
      isActive: customer.isActive || false,
    },
  });

  const { mutate: updateCustomer, isPending } = useMutation({
    mutationFn: (data: OmittedCustomer) =>
      api.mutation.updateCustomer({ data }),
    onSuccess: () => {
      toast.success("Customer updated successfully");
      setIsModalOpen(false);
      router.refresh();
    },
    onError: (error: Error) => {
      grabError(error);
    },
  });

  const onSubmit = (data: OmittedCustomer) => {
    updateCustomer({ ...data, id: customer.id, isActive: watch("isActive") });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Customer">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            id="firstName"
            label="First Name"
            required
            {...register("firstName")}
            errorMessage={errors.firstName?.message}
          />
          <Input
            id="lastName"
            label="Last Name"
            required
            {...register("lastName")}
            errorMessage={errors.lastName?.message}
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            required
            {...register("phoneNumber")}
            errorMessage={errors.phoneNumber?.message}
          />
          <Input
            id="city"
            label="City"
            required
            {...register("city")}
            errorMessage={errors.city?.message}
          />
          <Input
            id="isActive"
            label="Active"
            {...register("isActive")}
            type="checkbox"
            errorMessage={errors.isActive?.message}
          />
          <Button type="submit" disabled={isPending}>
            Update Customer
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateCustomerModal;
