import type { Order } from "@prisma/client";

const getOrders = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-orders`;

    const orders: Order[] = await fetch(URL).then((res) => res.json());
    return orders;
  } catch (error) {
    console.error(error);
  }
};

export default getOrders;
