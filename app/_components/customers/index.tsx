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

type Props = {
  customers: Customer[];
};

const CustomersRecord = ({ customers }: Props) => {
  return (
    <Table aria-label="Customer data table">
      <TableHeader>
        <TableColumn>Full Name</TableColumn>
        <TableColumn>Mobile Number</TableColumn>
        <TableColumn>City</TableColumn>
        <TableColumn>Is Active</TableColumn>
        <TableColumn>Actions</TableColumn>
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
