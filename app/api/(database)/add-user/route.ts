import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { User } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: User };

  try {
    const existingPhoneNumber = await prisma.user.findUnique({
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

    const newUser = await prisma.user.create({
      data,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
