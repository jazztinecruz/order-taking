import { Customer, Order, Product } from "@prisma/client";

export type OmittedCustomer = Omit<
  Customer,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
>;

export type OmittedProduct = Omit<
  Product,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
>;

export type ExtendedOrder = Order & {
  customer: OmittedCustomer;
};
