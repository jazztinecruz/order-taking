import type { Customer } from "@prisma/client";

const getCustomer = async (id: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-customer?id=${id}`;

    const customer: Customer = await fetch(URL).then((res) => res.json());
    return customer;
  } catch (error) {
    console.error(error);
  }
};

export default getCustomer;
