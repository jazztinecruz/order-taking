"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedProduct } from "@/core/types";
import { Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  product: Product;
};

const UpdateProductModal = ({ product }: Props) => {
  const [productData, setProductData] = useState({
    ...product,
    imageUrl: product.imageUrl || "",
    isActive: product.isActive || false,
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: (data: OmittedProduct) => api.mutation.updateProduct({ data }),
    onSuccess: () => {
      setIsUpdateModalOpen(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleUpdateProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateProduct(productData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/storage?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setProductData((prevState) => ({
      ...prevState,
      imageUrl: newBlob.url,
    }));
  };

  return (
    <>
      <Button onClick={() => setIsUpdateModalOpen(true)}>Edit</Button>
      <Modal
        title="Update Product"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}>
        <form className="space-y-4">
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            required
            onChange={handleUpload}
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
            src={productData.imageUrl || "/no-image.png"}
            alt={productData.name}
            width={100}
            height={100}
          />

          <Input
            label="Name"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Code"
            id="code"
            name="code"
            value={productData.code}
            onChange={handleChange}
            required
          />
          <Input
            label="Unit Price"
            id="unitPrice"
            name="unitPrice"
            value={productData.unitPrice}
            onChange={handleChange}
            required
          />

          <Input
            label="Active"
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={productData.isActive}
            onChange={handleChange}
          />

          <Button onClick={(e) => handleUpdateProduct(e)} disabled={isPending}>
            Update Product
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
