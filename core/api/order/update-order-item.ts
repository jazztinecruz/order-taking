import type { OmittedOrderItem } from "@/core/types";
import type { OrderItem } from "@prisma/client";
import axios from "axios";

const updateOrderItem = async ({ data }: { data: OmittedOrderItem }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-order-item`;

    const updatedOrderItem: OrderItem = await axios
      .put(URL, { data })
      .then((res) => res.data);

    return updatedOrderItem;
  } catch (error) {
    console.error(error);
  }
};

export default updateOrderItem;
