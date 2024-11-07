import type { ExtendedOrder } from "@/core/types";
import axios from "axios";

const getOrder = async (orderId: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-order`;

    const order: ExtendedOrder = await axios
      .post(URL, { orderId })
      .then((res) => res.data);

    return order;
  } catch (error) {
    console.error(error);
  }
};

export default getOrder;
