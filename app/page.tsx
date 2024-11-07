import api from "@/core/api";
import CustomersRecord from "./_components/customers";

const Customers = async () => {
  const customers = await api.query.getCustomers();

  if (!customers) {
    return <div>Loading...</div>;
  }

  return <CustomersRecord customers={customers} />;
};

export default Customers;
