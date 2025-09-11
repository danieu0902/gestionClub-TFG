"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-2">
            ¡Hola, {session.user.name}!
          </h1>
          <p className="text-gray-600 mb-4">Tu rol es: {session.user.role}</p>

          <div className="flex flex-col space-y-4">
            <Link href="/team" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Ver Plantilla
            </Link>
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4 gap-8">
      {/* Columna de Login */}
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>

      {/* Columna de Registro */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-600">¿No tienes cuenta? Regístrate aquí:</p>
        <RegisterForm />
      </div>
    </div>
  );
}