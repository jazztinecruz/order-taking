"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import {
  ExtendedOrder,
  OmittedOrderItem,
  OmittedProduct,
  OptionalOrderFields,
} from "@/core/types";
import grabError from "@/core/util/grab-error";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  order: ExtendedOrder;
};

const AddNewOrderItem = ({ order }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OmittedProduct>();
  const [itemData, setItemData] = useState<OmittedOrderItem>({
    orderId: order.id,
    quantity: 0,
    skuid: "",
    totalPrice: "",
  });

  const {
    data: products,
    isLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.query.getProducts(),
  });

  const { mutate: updateOrder } = useMutation({
    mutationFn: (data: OptionalOrderFields) =>
      api.mutation.updateOrder({ data }),
    onError: (error) => {
      grabError(error);
    },
  });

  const { mutate: addOrderItem } = useMutation({
    mutationFn: (data: OmittedOrderItem) => api.mutation.addOrderItem({ data }),
    onSuccess: () => {
      toast.success("Order Item added successfully");
      refetchProducts();
    },
    onError: (error) => {
      grabError(error);
    },
  });

  const availableProductsToOrder =
    products
      ?.filter((product) => product.isActive)
      .filter(
        (product) =>
          !order.OrderItems?.some(
            (orderedItem) => orderedItem.skuid === product.id
          )
      ) || [];

  const handleAddOrderItem = () => {
    if (!selectedProduct) return;

    addOrderItem(itemData);
    updateOrder({
      id: order.id,
      totalAmount: String(
        order.OrderItems.reduce(
          (acc, item) => acc + Number(item.totalPrice),
          0
        ) + Number(itemData.totalPrice)
      ),
      isActive: true,
    });
  };

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
              {availableProductsToOrder.map((product) => (
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
            min={1}
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
            type="number"
            readOnly
            disabled
            value={itemData.totalPrice}
          />

          <Button onClick={handleAddOrderItem}>Add Order Item</Button>
        </form>
      </Modal>
    </>
  );
};

export default AddNewOrderItem;
