"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { productSchema } from "@/core/schemas/product";
import { OmittedProduct } from "@/core/types";
import grabError from "@/core/util/grab-error";
import handleUpload from "@/core/util/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const initialProductData: OmittedProduct = {
  name: "",
  code: "",
  unitPrice: "",
  imageUrl: "",
};

const CreateProductModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<OmittedProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: initialProductData,
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: (data: OmittedProduct) => api.mutation.addProduct({ data }),
    onSuccess: () => {
      toast.success("Product added successfully!");
      setIsCreateModalOpen(false);
      reset();
      router.refresh();
    },
    onError: (error: Error) => {
      grabError(error);
    },
  });

  const handleAddProduct = (data: OmittedProduct) => {
    addProduct({ ...data, imageUrl: watch("imageUrl") });
  };

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>Add Product</Button>
      <Modal
        title="Create Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            onChange={(e) => handleUpload(e, inputFileRef, setValue)}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer
          "
          />
          <Input
            label="Name"
            id="name"
            {...register("name")}
            required
            errorMessage={errors.name?.message}
          />
          <Input
            label="Code"
            id="code"
            {...register("code")}
            required
            errorMessage={errors.code?.message}
          />
          <Input
            label="Unit Price"
            type="number"
            min={1}
            id="unitPrice"
            {...register("unitPrice")}
            errorMessage={errors.unitPrice?.message}
            required
          />
          <Button type="submit" disabled={isPending}>
            Create Product
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateProductModal;
