import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  }

  const { name, position, image } = await req.json();

  if (!name || !position || !image) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const newPlayer = await prisma.player.create({
      data: {
        name,
        position,
        image,
      },
    });
    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating player" }, { status: 500 });
  }
}