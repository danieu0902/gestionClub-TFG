"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Menu() {
  const { data: session } = useSession();

  // Solo muestra el menú si hay una sesión activa
  if (!session) {
    return null;
  }

  return (
    <nav className="p-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto  flex items-center justify-around">
    
    <Link href="/" className="text-2xl font-semibold tracking-wide text-white hover:text-blue-400 transition">
       <img
              src="https://ciudaddelucena.es/wp-content/uploads/2024/09/blanco1-e1726916122836-300x287.png"
              alt="Club Logo"
              className="h-20 w-auto"
            />
    </Link>

    <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
      <li>
        <Link href="/team" className="hover:text-blue-400 transition-colors duration-300">
          Plantilla
        </Link>
      </li>
      <li>
        <Link href="/planning" className="hover:text-blue-400 transition-colors duration-300">
          Planning Semanal
        </Link>
      </li>
      <li>
        <Link href="/resultados" className="hover:text-blue-400 transition-colors duration-300">
          Resultados y Clasificación
        </Link>
      </li>
      <li>
        <Link href="/news" className="hover:text-blue-400 transition-colors duration-300">
          Noticias y Comunicados
        </Link>
      </li>

      {session?.user?.role === "ADMIN" && (
        <li>
          <Link
            href="/admin"
            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          >
            Panel Admin
          </Link>
        </li>
      )}

      {session && (
        <li>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-red-500/30"
          >
            Cerrar sesión
          </button>
        </li>
      )}
    </ul>

    {/* BOTÓN MÓVIL */}
    <button className="md:hidden text-white focus:outline-none hover:text-blue-400 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>
  );
}