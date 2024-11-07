import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { Order } from "@prisma/client";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: Order };

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        userId: "cm35n1amz000012i5okizpc72",
      },
    });

    return NextResponse.json(updatedOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
