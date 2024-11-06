import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { User } from "@prisma/client";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: User };

  try {
    const existingPhoneNumber = await prisma.user.findFirst({
      where: {
        phoneNumber: data.phoneNumber,
        NOT: {
          id: data.id,
        },
      },
    });

    if (existingPhoneNumber) {
      return NextResponse.json(
        { message: "Phone number already exists" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
