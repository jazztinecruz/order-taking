import addCustomer from "./customer/add-customer";
import getCustomer from "./customer/get-customer";
import getCustomers from "./customer/get-multiple";
import updateCustomer from "./customer/update-customer";
import { OmittedCustomer, OmittedProduct } from "../types";
import addProduct from "./product/add-product";
import updateProduct from "./product/update-product";
import getProducts from "./product/get-multiple";
import getOrders from "./order/get-multiple";
import newOrder from "./order/new-order";
import { Order, OrderItem } from "@prisma/client";
import updateOrder from "./order/update-order";
import addOrderItem from "./order/add-order-item";

const api = {
  query: {
    getCustomer: (id: string) => getCustomer(id),
    getCustomers: () => getCustomers(),
    getProducts: () => getProducts(),
    getOrders: () => getOrders(),
  },
  mutation: {
    addCustomer: ({ data }: { data: OmittedCustomer }) => addCustomer({ data }),
    updateCustomer: ({ data }: { data: OmittedCustomer }) =>
      updateCustomer({ data }),
    addProduct: ({ data }: { data: OmittedProduct }) => addProduct({ data }),
    updateProduct: ({ data }: { data: OmittedProduct }) =>
      updateProduct({ data }),
    newOrder: ({ data }: { data: Order }) => newOrder({ data }),
    updateOrder: ({ data }: { data: Order }) => updateOrder({ data }),
    addOrderItem: ({ data }: { data: OrderItem }) => addOrderItem({ data }),
  },
};

export default api;
