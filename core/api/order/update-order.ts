import { OptionalOrderFields } from "@/core/types";
import type { Product } from "@prisma/client";
import axios from "axios";

const updateOrder = async ({ data }: { data: OptionalOrderFields }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-order`;

    const updatedOrder: Product = await axios
      .put(URL, { data })
      .then((res) => res.data);

    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};

export default updateOrder;
