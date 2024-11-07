import api from "@/core/api";
import ProductsRecord from "./_components";

// export const dynamic = "force-dynamic";

const Customers = async () => {
  const products = await api.query.getProducts();

  if (!products) {
    return <div>Loading...</div>;
  }

  return <ProductsRecord products={products} />;
};

export default Customers;
