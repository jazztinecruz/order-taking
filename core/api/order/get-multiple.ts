import type { ExtendedOrder } from "@/core/types";

const getOrders = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-orders`;

    const orders: ExtendedOrder[] = await fetch(URL).then((res) => res.json());
    return orders;
  } catch (error) {
    console.error(error);
  }
};

export default getOrders;
