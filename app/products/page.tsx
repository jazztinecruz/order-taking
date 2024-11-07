import api from "@/core/api";
import ProductsRecord from "./_components/products";

const Customers = async () => {
  const products = await api.query.getProducts();

  if (!products) {
    return <div>No Products Found.</div>;
  }

  return <ProductsRecord products={products} />;
};

export default Customers;
