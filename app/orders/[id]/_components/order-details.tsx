"use client";

import api from "@/core/api";
import Input from "@/core/components/input";
import { OptionalOrderFields } from "@/core/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type Props = {
  customers: Customer[] | undefined;
};

const OrderDetails = ({ customers }: Props) => {
  const params = useParams();
  const orderId = params.id as string;

  const {
    data: order,
    isLoading,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => api.query.getOrder(orderId),
  });

  const { mutate: updateOrder } = useMutation({
    mutationFn: (data: OptionalOrderFields) =>
      api.mutation.updateOrder({ data }),
    onSuccess: () => {
      refetchOrder();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) return <div>Fetching Order Details ...</div>;

  return (
    <div className="space-y-4">
      {/* selecting customer */}
      {customers?.length && (
        <Autocomplete
          label="Select Customer"
          className="max-w-xs"
          placeholder="Select Customer"
          defaultInputValue={
            order?.customer
              ? `${order.customer.firstName} ${order.customer.lastName}`
              : "Select Customer"
          }
          onSelectionChange={(key) =>
            updateOrder({
              id: orderId,
              customerId: key as string,
            })
          }>
          {customers.map((customer) => {
            const fullName = `${customer.firstName} ${customer.lastName}`;
            return (
              <AutocompleteItem key={customer.id} value={fullName}>
                {fullName}
              </AutocompleteItem>
            );
          })}
        </Autocomplete>
      )}

      <Input
        id="dateOfDelivery"
        label="Date of Delivery"
        type="date"
        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // tomorrow's date
        defaultValue={
          order?.dateOfDelivery
            ? new Date(order.dateOfDelivery).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) => {
          updateOrder({
            id: orderId,
            dateOfDelivery: new Date(e.target.value),
          });
        }}
        className="max-w-xs"
      />
    </div>
  );
};

export default OrderDetails;
