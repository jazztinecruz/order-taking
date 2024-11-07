import api from "@/core/api";
import OrdersRecord from "./_components";

const Orders = async () => {
  const orders = await api.query.getOrders();

  if (!orders) {
    return <div>Loading...</div>;
  }

  return <OrdersRecord orders={orders} />;
};

export default Orders;
