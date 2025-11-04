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
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/team">Plantilla</Link></li>
        <li><Link href="/planning">Planning Semanal</Link></li>
        <li><Link href="/resultados">Resultados y Clasificación</Link></li>
        <li><Link href="/gallery">Galería Multimedia</Link></li>
        <li><Link href="/news">Noticias y Comunicados</Link></li>
        {session.user.role === "ADMIN" && (
          <li><Link href="/admin">Panel de Administración</Link></li>
        )}
         {session && (
          <li><button
                        onClick={() => signOut()}
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Cerrar sesión
                      </button></li>
        )}
      </ul>
    </nav>
  );
}