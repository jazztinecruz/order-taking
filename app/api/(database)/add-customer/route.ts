import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { Customer } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: Customer };

  try {
    const existingPhoneNumber = await prisma.customer.findUnique({
      where: {
        phoneNumber: data.phoneNumber,
      },
    });

    if (existingPhoneNumber) {
      return NextResponse.json(
        { message: "Phone number already exists" },
        { status: 400 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data,
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
