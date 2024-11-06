"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import type { Customer } from "@prisma/client";
import { CUSTOMERTABLEHEADERS } from "../constants";
import CreateCustomerModal from "./create-customer-modal";
import UpdateCustomerModal from "./update-customer-modal";
import { useState } from "react";
import Button from "@/core/components/button";

type Props = {
  customers: Customer[];
};

const CustomersRecord = ({ customers }: Props) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      <CreateCustomerModal />
      <Table aria-label="Customer data table">
        <TableHeader>
          {CUSTOMERTABLEHEADERS.map((header) => (
            <TableColumn key={header} className="uppercase">
              {header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.isActive ? "TRUE" : "FALSE"}</TableCell>
              <TableCell>
                <UpdateCustomerModal customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersRecord;
