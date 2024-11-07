"use client";

import api from "@/core/api";
import Input from "@/core/components/input";
import { OptionalOrderFields } from "@/core/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { OrderStatus } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params.id as string;

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: () => api.query.getCustomers(),
  });

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

  if (isLoading) return <p>Fetching Order Details ...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
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
            {customers
              .filter((customer) => customer.isActive)
              .map((customer) => {
                const fullName = `${customer.firstName} ${customer.lastName}`;
                return (
                  <AutocompleteItem key={customer.id} value={fullName}>
                    {fullName}
                  </AutocompleteItem>
                );
              })}
          </Autocomplete>
        )}

        <Autocomplete
          label="Select Status"
          className="max-w-xs"
          placeholder="Select Customer"
          defaultInputValue={order?.status || "Select Status"}
          onSelectionChange={(key) =>
            updateOrder({
              id: orderId,
              status: key as OrderStatus,
            })
          }>
          {Object.values(OrderStatus).map((status) => (
            <AutocompleteItem key={status} value={status}>
              {status}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      <Input
        id="dateOfDelivery"
        label="Date of Delivery"
        type="date"
        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
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
