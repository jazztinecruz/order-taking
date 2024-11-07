"use client";

import api from "@/core/api";
import { ORDERITEMSTABLEHEADERS } from "@/core/constants/table";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { OrderItem } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AddNewOrderItem from "./add-order-item-modal";

const OrderItems = () => {
  const params = useParams();
  const orderId = params.id as string;

  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => api.query.getOrder(orderId),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.query.getProducts(),
  });

  if (!order?.customerId) return null;

  return (
    <div className="space-y-6">
      <AddNewOrderItem order={order} />

      <Table aria-label="Order data table">
        <TableHeader>
          {ORDERITEMSTABLEHEADERS.map((header) => (
            <TableColumn key={header} className="uppercase">
              {header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {order?.OrderItems?.length ? (
            order.OrderItems.map((orderItem: OrderItem) => {
              const product = products?.find(
                (product) => product.id === orderItem.skuid
              );
              return (
                <TableRow key={orderItem.id}>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={ORDERITEMSTABLEHEADERS.length}>
                No order items found
              </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2 className="text-bold text-lg">
        Total Amount: {order.totalAmount || 0}
      </h2>
    </div>
  );
};

export default OrderItems;
