import type { Order, Product } from "@prisma/client";
import axios from "axios";

const newOrder = async ({ data }: { data: Order | null }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/new-order`;

    const newOrder: Product = await axios
      .post(URL, { data })
      .then((res) => res.data);

    return newOrder;
  } catch (error) {
    console.error(error);
  }
};

export default newOrder;
