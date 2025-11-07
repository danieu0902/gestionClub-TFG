import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { redirect } from "next/navigation";

// Obtener jugadores desde la API
async function getPlayers() {
  const res = await fetch("https://nxapi-gestion-club.vercel.app/api/players", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al cargar los jugadores");
  return res.json();
}

// Acción del servidor para eliminar jugador
async function deletePlayer(playerId) {
  "use server";
  try {
    const res = await fetch(
      `https://nxapi-gestion-club.vercel.app/api/players/${playerId}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      console.error("Error al eliminar jugador:", await res.json());
      throw new Error("Fallo al eliminar jugador");
    }
  } catch (error) {
    console.error("Error al eliminar jugador:", error);
    return redirect("/team?error=fallo");
  }

  return redirect("/team?message=eliminado");
}

export default async function TeamList() {
  const session = await getServerSession(authOptions);
  const players = await getPlayers();

  // Agrupar jugadores por demarcación
  const playersByDemarcacion = players.reduce((acc, player) => {
    const { demarcacion } = player;
    if (!acc[demarcacion]) acc[demarcacion] = [];
    acc[demarcacion].push(player);
    return acc;
  }, {});

  const orderedDemarcaciones = [
    "Portero",
    "Defensa",
    "Centrocampista",
    "Delantero",
  ];

  const allDemarcaciones = Object.keys(playersByDemarcacion);
  const sortedDemarcaciones = orderedDemarcaciones
    .filter((d) => allDemarcaciones.includes(d))
    .concat(allDemarcaciones.filter((d) => !orderedDemarcaciones.includes(d)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Botón Crear jugador (solo admin) */}
      {session?.user?.role === "ADMIN" && (
        <div className="flex justify-center sm:justify-end mb-8">
          <Link href="/team/create">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition w-full sm:w-auto justify-center">
              <FaUserPlus /> Crear Nuevo Jugador
            </button>
          </Link>
        </div>
      )}

      {/* Listado por demarcaciones */}
      {sortedDemarcaciones.map((demarcacion) => (
        <section key={demarcacion} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700 border-b-4 border-blue-500 pb-2 text-center sm:text-left">
            {demarcacion}
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playersByDemarcacion[demarcacion].map((player) => (
              <article
                key={player._id}
                className="bg-white p-4 rounded-xl shadow-md relative transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
              >
                <Image
                  src={player.fotoUrl}
                  alt={player.nombre}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg mb-4 object-cover aspect-square"
                />

                <div className="text-center">
                  <h1 className="text-blue-600 text-3xl font-extrabold">
                    {player.dorsal}
                  </h1>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {player.nombre}
                  </h2>
                  <p className="text-gray-600 text-sm">{player.demarcacion}</p>
                </div>

                {session?.user?.role === "ADMIN" && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Link href={`/team/edit/${player._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit />
                      </button>
                    </Link>

                    <form action={deletePlayer.bind(null, player._id)}>
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </form>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
