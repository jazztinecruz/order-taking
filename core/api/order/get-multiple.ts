import type { ExtendedOrder } from "@/core/types";
import axios from "axios";

const getOrders = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-orders`;

    const orders: ExtendedOrder[] = await axios
      .get(URL)
      .then((res) => res.data);
    return orders;
  } catch (error) {
    console.error(error);
  }
};

export default getOrders;
