// src/app/clasificacion/create/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FaUsers } from "react-icons/fa";

// Server Action para crear un nuevo equipo en la clasificación
async function createTeam(formData) {
  "use server";

  const team = formData.get("team");
  const crest = formData.get("crest");
  const points = parseInt(formData.get("points"), 10);
  const pj = parseInt(formData.get("pj"), 10);
  const pg = parseInt(formData.get("pg"), 10);
  const pe = parseInt(formData.get("pe"), 10);
  const pp = parseInt(formData.get("pp"), 10);
  const gf = parseInt(formData.get("gf"), 10);
  const gc = parseInt(formData.get("gc"), 10);

  await prisma.classification.create({
    data: { team, crest, points, pj, pg, pe, pp, gf, gc },
  });

  redirect("/resultados");
}

export default async function CreateTeamPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/resultados"); // solo admin puede entrar
  }

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Añadir Equipo</h1>
        </div>

        <form action={createTeam} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre del Equipo</label>
            <input
              type="text"
              name="team"
              required
              className="mt-1 block w-full border border-black text-black placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Escudo (URL)</label>
            <input
              type="text"
              name="crest"
              required
              className="mt-1 block w-full border border-black text-black placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Puntos</label>
              <input type="number" name="points" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Partidos Jugados</label>
              <input type="number" name="pj" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">PG</label>
              <input type="number" name="pg" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">PE</label>
              <input type="number" name="pe" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">PP</label>
              <input type="number" name="pp" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles a Favor</label>
              <input type="number" name="gf" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles en Contra</label>
              <input type="number" name="gc" defaultValue="0" className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Guardar Equipo
          </button>
        </form>
      </div>
    </div>
  );
}