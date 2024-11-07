import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
