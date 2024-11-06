import { OmittedCustomer } from "@/core/types";
import type { Customer } from "@prisma/client";
import axios from "axios";

const updateCustomer = async ({ data }: { data: OmittedCustomer }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-customer`;

    const updatedCustomer: Customer = await axios
      .put(URL, { data })
      .then((res) => res.data);

    return updatedCustomer;
  } catch (error) {
    console.error(error);
  }
};

export default updateCustomer;
