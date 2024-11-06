import type { Product } from "@prisma/client";

const getProducts = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-products`;

    const products: Product[] = await fetch(URL).then((res) => res.json());
    return products;
  } catch (error) {
    console.error(error);
  }
};

export default getProducts;
