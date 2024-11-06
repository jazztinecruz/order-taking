import type { Customer } from "@prisma/client";
import addCustomer from "./customer/add-customer";
import getCustomer from "./customer/get-customer";
import getCustomers from "./customer/get-multiple";
import updateCustomer from "./customer/update-customer";

const api = {
  query: {
    getCustomer: (id: string) => getCustomer(id),
    getCustomers: () => getCustomers(),
  },
  mutation: {
    addUser: ({ data }: { data: Customer }) => addCustomer({ data }),
    updateUser: ({ data }: { data: Customer }) => updateCustomer({ data }),
  },
};

export default api;
