import OrderDetails from "./_components/order/details";
import OrderItems from "./_components/order/items";

const OrderTakingPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Order Taking</h1>
      <OrderDetails />
      <OrderItems />
    </div>
  );
};

export default OrderTakingPage;
