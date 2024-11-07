import { Customer, Order, OrderItem, Product } from "@prisma/client";

export type OmittedCustomer = Omit<
  Customer,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
>;

export type OmittedProduct = Omit<
  Product,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
> & {
  imageUrl?: string;
};

export type OptionalOrderFields = Partial<Order>;

export type ExtendedOrder = Order & {
  customer: OmittedCustomer;
  OrderItems: (OrderItem & {
    sku: Product;
  })[];
};

export type ExtededOrderItem = OrderItem & {
  sku?: Product;
};

export type OmittedOrderItem = Omit<
  OrderItem,
  "id" | "userId" | "timestamp"
> & {
  id?: string;
};
