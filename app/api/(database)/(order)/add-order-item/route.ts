import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { OrderItem } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: OrderItem };

  try {
    const addOrderItem = await prisma.orderItem.create({
      data: {
        ...data,
        userId: "cm35n1amz000012i5okizpc72",
      },
    });

    return NextResponse.json(addOrderItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
