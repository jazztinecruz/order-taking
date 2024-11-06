import api from "@/core/api";

const Customers = async () => {
  const customers = await api.query.getCustomers();

  console.log(customers);
  return <div>Customers</div>;
};

export default Customers;
