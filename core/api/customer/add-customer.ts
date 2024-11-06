import type { Customer } from "@prisma/client";

const addCustomer = async ({ data }: { data: Customer }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-customer`;

    const newCustomer: Customer = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ data }),
    }).then((res) => res.json());
    return newCustomer;
  } catch (error) {
    console.error(error);
  }
};

export default addCustomer;
