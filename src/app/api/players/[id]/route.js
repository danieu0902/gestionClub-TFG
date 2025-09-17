import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// Obtener un solo jugador por ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const player = await prisma.player.findUnique({
      where: { id },
    });
    if (!player) {
      return NextResponse.json({ message: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching player" }, { status: 500 });
  }
}

// Actualizar un jugador
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  }

  const { id } = params;
  const { name, position, image } = await req.json();

  try {
    const updatedPlayer = await prisma.player.update({
      where: { id },
      data: { name, position, image },
    });
    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating player" }, { status: 500 });
  }
}

// Eliminar un jugador
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  }

  const { id } = params;
  try {
    await prisma.player.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Player deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting player" }, { status: 500 });
  }
}