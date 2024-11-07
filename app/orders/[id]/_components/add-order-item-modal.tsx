"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import { OmittedOrderItem, OmittedProduct } from "@/core/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

const AddNewOrderItem = () => {
  const params = useParams();
  const orderId = params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OmittedProduct>();
  const [itemData, setItemData] = useState<OmittedOrderItem>({
    orderId,
    quantity: 0,
    skuid: "",
    totalPrice: "",
  });

  const {
    data: products,
    isLoading,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.query.getProducts(),
  });

  const { mutate: addOrderItem } = useMutation({
    mutationFn: (data: OmittedOrderItem) => api.mutation.addOrderItem({ data }),
    onSuccess: () => {
      refetchOrder();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) return <div>Fetching Products ...</div>;

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Order Item</Button>
      <Modal
        title="Order Item"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
          {products?.length && (
            <Autocomplete
              label="Select SKU"
              className="max-w-xs"
              onSelectionChange={(key) => {
                setItemData({
                  ...itemData,
                  skuid: key as string,
                });
                setSelectedProduct(products.find((p) => p.id === key));
              }}>
              {products.map((product) => (
                <AutocompleteItem key={product.id} value={product.name}>
                  {product.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
          <Input
            id="quantity"
            label="Quantity"
            type="number"
            name="quantity"
            value={itemData.quantity}
            onChange={(e) => {
              const quantity = Number(e.target.value);
              const unitPrice = selectedProduct?.unitPrice || 1;
              setItemData({
                ...itemData,
                quantity,
                totalPrice: String(Number(unitPrice) * quantity),
              });
            }}
            required
          />

          <Input
            label="Total Price"
            id="totalPrice"
            name="totalPrice"
            readOnly
            value={itemData.totalPrice}
            required
          />

          <Button onClick={() => addOrderItem(itemData)}>Add Order Item</Button>
        </form>
      </Modal>
    </>
  );
};

export default AddNewOrderItem;
