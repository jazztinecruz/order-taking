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

type Props = {
  customers: Customer[];
};

const CustomersRecord = ({ customers }: Props) => {
  return (
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
            <TableCell>{customer.isActive ? "Active" : "Inactive"}</TableCell>
            <TableCell>
              <button>Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersRecord;
