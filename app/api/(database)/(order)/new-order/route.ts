import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { Order } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  console.log(1);
  const body = await req.json();
  console.log(2);
  const { data } = body as { data: Order };
  console.log(3, body);

  try {
    console.log(4);
    const newOrder = await prisma.order.create({
      data: {
        ...data,
        userId: "cm35n1amz000012i5okizpc72",
      },
    });

    console.log(5);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
