"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedProduct } from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const initialProductData: OmittedProduct = {
  name: "",
  code: "",
  unitPrice: "",
  imageUrl: "",
};

const CreateProductModal = () => {
  const [productData, setProductData] =
    useState<OmittedProduct>(initialProductData);

  const inputFileRef = useRef<HTMLInputElement>(null);

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
      <Button onClick={() => setIsCreateModalOpen(true)}>Add Product</Button>
      <Modal
        title="Create Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}>
        <div className="space-y-4">
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            required
            onChange={handleUpload}
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
          <Button onClick={(e) => handleAddProduct(e)} disabled={isPending}>
            Create Product
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateProductModal;
