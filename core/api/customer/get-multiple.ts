import type { Customer } from "@prisma/client";

const getCustomers = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-customers`;

    const customers: Customer[] = await fetch(URL).then((res) => res.json());
    return customers;
  } catch (error) {
    console.error(error);
  }
};

export default getCustomers;
