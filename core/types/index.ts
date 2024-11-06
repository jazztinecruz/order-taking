import { Customer } from "@prisma/client";

export type OmittedCustomer = Omit<
  Customer,
  "id" | "createdAt" | "createdBy" | "isActive" | "timestamp" | "userId"
>;
