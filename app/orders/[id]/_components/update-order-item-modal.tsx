"use client";

import api from "@/core/api";
import Button from "@/core/components/button";
import Input from "@/core/components/input";
import Modal from "@/core/components/modal";
import type {
  ExtededOrderItem,
  ExtendedOrder,
  OmittedOrderItem,
  OptionalOrderFields,
} from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  orderItem: ExtededOrderItem;
  order: ExtendedOrder;
  refetchOrder: () => void;
};

const UpdateOrderItem = ({ orderItem, order, refetchOrder }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [itemData, setItemData] = useState<OmittedOrderItem>({
    id: orderItem.id,
    orderId: order.id,
    quantity: orderItem.quantity,
    skuid: orderItem.skuid,
    totalPrice: orderItem.totalPrice,
  });

  const { mutate: updateOrderItem } = useMutation({
    mutationFn: (data: OmittedOrderItem) =>
      api.mutation.updateOrderItem({ data }),
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: updateOrder, isPending } = useMutation({
    mutationFn: (data: OptionalOrderFields) =>
      api.mutation.updateOrder({ data }),
    onSuccess: () => {
      refetchOrder();
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleUpdateOrderItem = () => {
    updateOrderItem(itemData, {
      onSuccess: (data) => {
        updateOrder({
          id: order.id,
          totalAmount: String(
            order.OrderItems.reduce((acc) => acc + Number(data?.totalPrice), 0)
          ),
        });
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit</Button>

      <Modal
        title="Update Order Item"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <Input
            id="quantity"
            label="Quantity"
            type="number"
            name="quantity"
            value={itemData.quantity}
            min={1}
            onChange={(e) => {
              const quantity = Number(e.target.value);
              setItemData({
                ...itemData,
                quantity,
                totalPrice: String(Number(orderItem.sku?.unitPrice) * quantity),
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

          <Button onClick={handleUpdateOrderItem} disabled={isPending}>
            Update Order Item
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateOrderItem;
