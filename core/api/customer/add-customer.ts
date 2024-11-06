import { OmittedCustomer } from "@/core/types";
import type { Customer } from "@prisma/client";
import axios from "axios";

const addCustomer = async ({ data }: { data: OmittedCustomer }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-customer`;

    const newCustomer: Customer = await axios
      .post(URL, { data })
      .then((res) => res.data);

    return newCustomer;
  } catch (error) {
    console.error(error);
  }
};

export default addCustomer;
