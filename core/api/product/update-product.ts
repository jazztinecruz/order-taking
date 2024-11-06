import { OmittedProduct } from "@/core/types";
import type { Product } from "@prisma/client";
import axios from "axios";

const updateProduct = async ({ data }: { data: OmittedProduct }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-product`;

    const updatedProduct: Product = await axios
      .put(URL, { data })
      .then((res) => res.data);

    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};

export default updateProduct;
