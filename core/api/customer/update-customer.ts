import type { Customer } from "@prisma/client";

const updateCustomer = async ({ data }: { data: Customer }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-customer`;

    const customers: Customer[] = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify({ data }),
    }).then((res) => res.json());
    return customers;
  } catch (error) {
    console.error(error);
  }
};

export default updateCustomer;
