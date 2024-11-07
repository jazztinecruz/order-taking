"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { customerSchema } from "@/core/schemas/customer";
import { OmittedCustomer } from "@/core/types";
import grabError from "@/core/util/grab-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const initialCustomerData: OmittedCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  city: "",
};

const CreateCustomerModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OmittedCustomer>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialCustomerData,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: addCustomer, isPending } = useMutation({
    mutationFn: (data: OmittedCustomer) => api.mutation.addCustomer({ data }),
    onSuccess: () => {
      toast.success("Customer added successfully!");
      setIsCreateModalOpen(false);
      reset(initialCustomerData);
      router.refresh();
    },
    onError: (error: Error) => {
      grabError(error);
    },
  });

  const onSubmit = (data: OmittedCustomer) => {
    addCustomer(data);
  };

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>Add Customer</Button>
      <Modal
        title="Create Customer"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            label="First Name"
            id="firstName"
            {...register("firstName")}
            errorMessage={errors.firstName?.message}
            required
          />
          <Input
            label="Last Name"
            id="lastName"
            {...register("lastName")}
            errorMessage={errors.lastName?.message}
            required
          />
          <Input
            label="Phone Number"
            id="phoneNumber"
            {...register("phoneNumber")}
            errorMessage={errors.phoneNumber?.message}
            required
          />
          <Input
            label="City"
            id="city"
            {...register("city")}
            errorMessage={errors.city?.message}
            required
          />
          <Button type="submit" disabled={isPending}>
            Add Customer
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateCustomerModal;
