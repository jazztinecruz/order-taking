"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import CreateProductModal from "./new-order";
import { ORDERSTABLEHEADERS } from "@/core/constants/table";
import { ExtendedOrder } from "@/core/types";

type Props = {
  orders: ExtendedOrder[];
};

const OrdersRecord = ({ orders }: Props) => {
  return (
    <div className="space-y-6">
      <CreateProductModal />
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
              <TableCell>
                {order.customer.firstName}, {order.customer.lastName}
              </TableCell>
              <TableCell>
                {order.dateOfDelivery
                  ? new Date(order.dateOfDelivery).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersRecord;
