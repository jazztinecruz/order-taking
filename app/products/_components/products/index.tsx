"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import type { Product } from "@prisma/client";
import CreateProductModal from "../modals/create-product";
import UpdateProductModal from "../modals/update-product";
import { PRODUCTTABLEHEADERS } from "@/core/constants/table";
import Image from "next/image";

type Props = {
  products: Product[];
};

const ProductsRecord = ({ products }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <CreateProductModal />
      <Table aria-label="Products data table">
        <TableHeader>
          {PRODUCTTABLEHEADERS.map((header) => (
            <TableColumn key={header} className="uppercase">
              {header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.unitPrice}</TableCell>
              <TableCell>{product.isActive ? "TRUE" : "FALSE"}</TableCell>
              <TableCell>
                <Image
                  src={product.imageUrl || "/no-image.png"}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>
                <UpdateProductModal product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsRecord;
