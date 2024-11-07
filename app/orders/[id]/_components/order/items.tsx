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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AddNewOrderItem from "../modals/add-order-item";
import UpdateOrderItem from "../modals/update-order-item";
import { ExtededOrderItem } from "@/core/types";
import Image from "next/image";

const OrderItems = () => {
  const params = useParams();
  const orderId = params.id as string;

  const { data: order, refetch: refetchOrder } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => api.query.getOrder(orderId),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.query.getProducts(),
  });

  if (!order?.customerId)
    return (
      <p className="italic text-gray-500">
        ** Please select a Customer first to start taking order items. **
      </p>
    );

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
            order.OrderItems.map((orderItem: ExtededOrderItem) => {
              const product = products?.find(
                (product) => product.id === orderItem.skuid
              );

              return (
                <TableRow key={orderItem.id}>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                  <TableCell>
                    <Image
                      src={product?.imageUrl || "/no-image.png"}
                      alt="Product Image"
                      width={75}
                      height={75}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <UpdateOrderItem
                      orderItem={orderItem}
                      order={order}
                      refetchOrder={refetchOrder}
                    />
                  </TableCell>
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
