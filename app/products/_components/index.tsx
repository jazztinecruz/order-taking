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
import CreateProductModal from "./create-product-modal";
import { PRODUCTTABLEHEADERS } from "./constants";
import UpdateProductModal from "./update-product-modal";

type Props = {
  products: Product[];
};

const ProductsRecord = ({ products }: Props) => {
  return (
    <div className="space-y-6">
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
              <TableCell>Image</TableCell>
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