import addCustomer from "./customer/add-customer";
import getCustomer from "./customer/get-customer";
import getCustomers from "./customer/get-multiple";
import updateCustomer from "./customer/update-customer";
import { OmittedCustomer, OmittedProduct } from "../types";
import addProduct from "./product/add-product";
import updateProduct from "./product/update-product";

const api = {
  query: {
    getCustomer: (id: string) => getCustomer(id),
    getCustomers: () => getCustomers(),
  },
  mutation: {
    addCustomer: ({ data }: { data: OmittedCustomer }) => addCustomer({ data }),
    updateCustomer: ({ data }: { data: OmittedCustomer }) =>
      updateCustomer({ data }),
    addProduct: ({ data }: { data: OmittedProduct }) => addProduct({ data }),
    updateProduct: ({ data }: { data: OmittedProduct }) =>
      updateProduct({ data }),
  },
};

export default api;
