import { Customer, Order, OrderItem, Product } from "@prisma/client";

export type OmittedCustomer = Omit<
  Customer,
  "id" | "createdAt" | "createdBy" | "timestamp" | "userId" | "isActive"
> & {
  id?: string;
  isActive?: boolean;
};

export type OmittedProduct = Omit<
  Product,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
> & {
  id?: string;
  imageUrl?: string | null;
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
