"use client";

import { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // LOG PARA DEPURACIÓN
  console.log("Sesión del servidor:", session);
  if (session) {
    console.log("Rol del usuario en la sesión:", session.user.role);
  } else {
    console.log("No hay sesión.");
  }
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <PlayerManagement />
    </div>
  );
}

// Componente para la gestión de jugadores
function PlayerManagement() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, position, image }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Jugador creado con éxito!");
      setName('');
      setPosition('');
      setImage('');
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Añadir Nuevo Jugador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Posición:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">URL de la imagen:</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Añadir Jugador
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}