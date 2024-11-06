"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedProduct } from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialProductData: OmittedProduct = {
  name: "",
  code: "",
  unitPrice: "",
};

const CreateProductModal = () => {
  const [productData, setProductData] =
    useState<OmittedProduct>(initialProductData);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: (data: OmittedProduct) => api.mutation.addProduct({ data }),
    onSuccess: () => {
      setIsCreateModalOpen(false);
      setProductData(initialProductData);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addProduct(productData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>Add Product</Button>
      <Modal
        title="Create Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
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
          <Button onClick={(e) => handleAddProduct(e)} disabled={isPending}>
            Create Product
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateProductModal;
