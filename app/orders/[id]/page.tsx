import api from "@/core/api";
import React from "react";
import OrderDetails from "./_components/order-details";
import OrderItems from "./_components/order-items";

const OrderTakingPage = async () => {
  const customers = await api.query.getCustomers();

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Order Taking</h1>
      <OrderDetails customers={customers} />
      <OrderItems />
    </div>
  );
};

export default OrderTakingPage;
