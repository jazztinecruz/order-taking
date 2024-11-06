import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
