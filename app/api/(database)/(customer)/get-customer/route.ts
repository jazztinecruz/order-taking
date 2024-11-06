import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = String(searchParams.get("id"));

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
