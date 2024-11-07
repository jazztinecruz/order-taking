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
import { Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  product: Product;
};

const UpdateProductModal = ({ product }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<OmittedProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      code: product.code,
      unitPrice: product.unitPrice,
      id: product.id,
      imageUrl: product.imageUrl,
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: (data: OmittedProduct) => api.mutation.updateProduct({ data }),
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

  const handleUpdateProduct = (data: OmittedProduct) => {
    updateProduct({ ...data, id: product.id, imageUrl: watch("imageUrl") });
  };

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>Edit</Button>
      <Modal
        title="Update Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="space-y-4">
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

          <Image
            src={watch("imageUrl") || "/no-image.png"}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-md"
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
            id="unitPrice"
            {...register("unitPrice")}
            errorMessage={errors.unitPrice?.message}
            required
          />
          <Button type="submit" disabled={isPending}>
            Update Product
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
