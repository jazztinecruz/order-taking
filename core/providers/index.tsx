"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
