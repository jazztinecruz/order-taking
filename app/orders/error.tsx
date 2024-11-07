"use client";

import ErrorCard from "@/core/components/error-card";
import { useEffect } from "react";

const OrdersErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorCard reset={reset} />;
};

export default OrdersErrorPage;
