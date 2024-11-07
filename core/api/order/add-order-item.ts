import type { OrderItem, Product } from "@prisma/client";
import axios from "axios";

const addOrderItem = async ({ data }: { data: OrderItem }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-order-item`;

    const addedOrderItem: Product = await axios
      .post(URL, { data })
      .then((res) => res.data);

    return addedOrderItem;
  } catch (error) {
    console.error(error);
  }
};

export default addOrderItem;