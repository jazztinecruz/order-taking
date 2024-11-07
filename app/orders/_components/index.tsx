"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ORDERSTABLEHEADERS } from "@/core/constants/table";
import { ExtendedOrder } from "@/core/types";
import Button from "@/core/components/button";
import { useMutation } from "@tanstack/react-query";
import { Order } from "@prisma/client";
import api from "@/core/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  orders: ExtendedOrder[];
};

const OrdersRecord = ({ orders }: Props) => {
  const router = useRouter();

  const { mutate: newOrder, isPending } = useMutation({
    mutationFn: (data: Order | null) => api.mutation.newOrder({ data }),
    onSuccess: (data) => {
      router.push(`/orders/${data?.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="space-y-6">
      <Button disabled={isPending} onClick={() => newOrder(null)}>
        Add new order
      </Button>

      <Table aria-label="Order data table">
        <TableHeader>
          {ORDERSTABLEHEADERS.map((header) => (
            <TableColumn key={header} className="uppercase">
              {header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {order.customer ? (
                <TableCell>
                  {order.customer?.firstName || ""}{" "}
                  {order.customer?.lastName || ""}
                </TableCell>
              ) : (
                <TableCell> </TableCell>
              )}
              <TableCell>
                {order.dateOfDelivery
                  ? new Date(order.dateOfDelivery).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>
                <Link href={`/orders/${order.id}`} className="hover:underline">
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersRecord;
