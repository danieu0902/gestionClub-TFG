"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p>Cargando...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
        {/* 🎥 Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://ciudaddelucena.es/wp-content/uploads/2024/09/cabecera.mp4"
            type="video/mp4"
          />
        </video>

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Contenido */}
        <div className="relative z-10  p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-white">
            BIENVENIDO A LA PAGINA WEB DEL CLUB (NOMBRE DEL CLUB)
          </h1>
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