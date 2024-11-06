import { OmittedProduct } from "@/core/types";
import type { Product } from "@prisma/client";
import axios from "axios";

const addProduct = async ({ data }: { data: OmittedProduct }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-product`;

    const newProduct: Product = await axios
      .post(URL, { data })
      .then((res) => res.data);

    return newProduct;
  } catch (error) {
    console.error(error);
  }
};

export default addProduct;
