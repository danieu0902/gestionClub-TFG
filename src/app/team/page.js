import Image from 'next/image';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { redirect } from 'next/navigation';

// Función para obtener los datos de la API
async function getPlayers() {
  const res = await fetch('https://nxapi-gestion-club.vercel.app/api/players', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch players');
  }

  return res.json();
}

// SERVER ACTION para eliminar un jugador
async function deletePlayer(playerId) {
  "use server";
  try {
    const res = await fetch(`https://nxapi-gestion-club.vercel.app/api/players/${playerId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Error al eliminar jugador:', await res.json());
      throw new Error('Failed to delete player');
    }

  } catch (error) {
    console.error("Error al eliminar el jugador:", error);
    return redirect('/team?error=fallo');
  }

  return redirect('/team?message=eliminado');
}

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  const players = await getPlayers();
  
  // Agrupar jugadores por su demarcación
  const playersByDemarcacion = players.reduce((acc, player) => {
    const { demarcacion } = player;
    if (!acc[demarcacion]) {
      acc[demarcacion] = [];
    }
    acc[demarcacion].push(player);
    return acc;
  }, {});

  // Ordenar las demarcaciones de forma manual
  const orderedDemarcaciones = ["Portero", "Defensa", "Centrocampista", "Delantero"];
  const allDemarcaciones = Object.keys(playersByDemarcacion);
  const sortedDemarcaciones = orderedDemarcaciones.filter(d => allDemarcaciones.includes(d)).concat(allDemarcaciones.filter(d => !orderedDemarcaciones.includes(d)));


  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
<h1 className="text-5xl font-bold text-center mb-6 text-gray-800">Plantilla</h1>
        
        {/* Botón para crear nuevo jugador (solo para ADMIN) */}
        {session?.user?.role === 'ADMIN' && (
          <Link href="/team/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition">
              <FaUserPlus /> Crear Nuevo Jugador
            </button>
          </Link>
        )}
      </div>
      
      {sortedDemarcaciones.map((demarcacion) => (
        <div key={demarcacion} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-700 border-b-4 border-blue-500 pb-2">
            {demarcacion}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playersByDemarcacion[demarcacion].map((player) => (
              <div key={player._id} className="bg-white p-4 rounded-xl shadow-md relative transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={player.fotoUrl}
                  alt={player.nombre}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg mb-4 object-cover aspect-square"
                />
                <div>
                  <h1 className='text-blue-600 text-3xl font-extrabold'>{player.dorsal}</h1>
                  <h2 className="text-xl font-semibold text-gray-900">{player.nombre}</h2>
                </div>
                <p className="text-gray-600">{player.demarcacion}</p>

                {/* Renderizado Condicional de Botones de Edición/Eliminación */}
                {session?.user?.role === 'ADMIN' && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* Botón de Editar */}
                    <Link href={`/team/edit/${player._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit />
                      </button>
                    </Link>

                    {/* Formulario para el botón de Eliminar (usando Server Action) */}
                    <form action={deletePlayer.bind(null, player._id)}>
                      <button type="submit" className="text-red-500 hover:text-red-700 transition">
                        <FaTrash />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}