import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaPlus, FaEdit } from "react-icons/fa";

export default async function ResultadosPage() {
  const session = await getServerSession(authOptions);

  const resultados = await prisma.result.findMany({
    orderBy: { date: "desc" },
  });

  const clasificacion = await prisma.classification.findMany({
    orderBy: { points: "desc" },
  });

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      {/* encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">Resultados</h1>

        {session?.user?.role === "ADMIN" && (
          <Link href="/resultados/create">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              <FaPlus /> Añadir
            </button>
          </Link>
        )}
      </div>

    {/* LISTADO DE RESULTADOS */}
<div className="space-y-6 mb-16">
  {resultados.map((r) => {
    const dateStr = new Date(r.date).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return (
      <div
        key={r.id}
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
      >
        {/* fila principal */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <img src={r.crest1} alt={r.team1} className="w-12 h-12 object-contain" />

          <span className="flex-1 text-lg font-semibold text-gray-800">{r.team1}</span>

          <div className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {r.score1} <span className="text-gray-400">-</span> {r.score2}
          </div>

          <span className="flex-1 text-lg font-semibold text-gray-800 text-right">
            {r.team2}
          </span>

          <img src={r.crest2} alt={r.team2} className="w-12 h-12 object-contain" />
        </div>

        {/* fecha + boton editar */}
        <div className="mt-3 w-full flex justify-center items-center gap-4 text-sm text-gray-500">
          <span>{dateStr}</span>

          {session?.user?.role === "ADMIN" && (
            <Link href={`/resultados/edit/${r.id}`}>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-xs font-bold">
                ✏️ Editar
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  })}
</div>

      {/* TABLA DE CLASIFICACIÓN */}
      <h2 className="text-4xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 pb-2">
        Clasificación
      </h2>
      {session?.user?.role === "ADMIN" && (
        <Link href="/resultados/create-clasificacion">
          <button className="flex items-center gap-2 px-5 py-3 mb-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
            <FaPlus /> Añadir
          </button>
        </Link>
      )}

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white uppercase text-xs tracking-wider">
              <th className="px-4 py-3 rounded-tl-xl">Equipo</th>
              <th className="px-4 py-3">Pts</th>
              <th className="px-4 py-3">PJ</th>
              <th className="px-4 py-3">PG</th>
              <th className="px-4 py-3">PE</th>
              <th className="px-4 py-3">PP</th>
              <th className="px-4 py-3">GF</th>
              <th className="px-4 py-3">GC</th>
              {session?.user?.role === "ADMIN" && <th className="px-4 py-3 rounded-tr-xl">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {clasificacion.map((c, idx) => (
              <tr
                key={c.id}
                className={`transition transform hover:scale-[1.01] ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium flex items-center gap-3">
                  <span className="text-gray-500 font-bold w-6">{idx + 1}</span>
                  <img src={c.crest} alt={c.team} className="w-8 h-8 object-contain" />
                  <span className="text-gray-800 font-semibold">{c.team}</span>
                </td>
                <td className="px-4 py-3 text-black">{c.points}</td>
                <td className="px-4 py-3 text-black">{c.pj}</td>
                <td className="px-4 py-3 text-black">{c.pg}</td>
                <td className="px-4 py-3 text-black">{c.pe}</td>
                <td className="px-4 py-3 text-black">{c.pp}</td>
                <td className="px-4 py-3 text-black">{c.gf}</td>
                <td className="px-4 py-3 text-black">{c.gc}</td>

                {/* Botón Editar solo para ADMIN */}
                {session?.user?.role === "ADMIN" && (
                  <td className="px-4 py-3">
                    <Link href={`/resultados/edit-clasificacion/${c.id}`}>
                      <button className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                        <FaEdit /> Editar
                      </button>
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
