import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 });
    }

    // Comprobar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Ya existe un usuario con este correo electrónico.' }, { status: 409 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el costo del salt

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Guarda la contraseña hasheada
        role: 'USER', // Asigna el rol por defecto
      },
    });

    // No devolver la contraseña en la respuesta
    const { password: userPassword, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}