import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { ExtendedOrder } from "@/core/types";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { orderId } = body as { orderId: string };

  if (!orderId) {
    return NextResponse.json(
      { message: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const order = (await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        customer: true,
        OrderItems: {
          include: {
            sku: true,
          },
        },
      },
    })) as ExtendedOrder;

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
