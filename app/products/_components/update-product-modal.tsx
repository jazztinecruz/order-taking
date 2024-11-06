"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedProduct } from "@/core/types";
import { Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  product: Product;
};
const UpdateProductModal = ({ product }: Props) => {
  const [productData, setProductData] = useState({
    ...product,
    isActive: product.isActive || false,
  });

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

  return (
    <>
      <Button onClick={() => setIsUpdateModalOpen(true)}>Edit</Button>
      <Modal
        title="Update Product"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}>
        <form className="space-y-4">
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
