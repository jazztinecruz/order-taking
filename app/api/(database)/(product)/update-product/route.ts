import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import type { Product } from "@prisma/client";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: Product };

  try {
    const existingCode = await prisma.product.findUnique({
      where: {
        code: data.code,
        NOT: {
          id: data.id,
        },
      },
    });

    const existingName = await prisma.product.findUnique({
      where: {
        name: data.name,
        NOT: {
          id: data.id,
        },
      },
    });

    if (existingCode || existingName) {
      return NextResponse.json(
        { message: "Code or Name already exists" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        unitPrice: String(data.unitPrice),
        userId: "cm35n1amz000012i5okizpc72",
      },
    });

    return NextResponse.json(updatedProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
