// src/app/resultados/edit-clasificacion/[id]/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FaEdit } from "react-icons/fa";

// Server Action para actualizar equipo
async function updateTeam(id, formData) {
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

  await prisma.classification.update({
    where: { id },
    data: { team, crest, points, pj, pg, pe, pp, gf, gc },
  });

  redirect("/resultados");
}

export default async function EditTeamPage({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    redirect("/resultados"); // solo admin puede entrar
  }

  const team = await prisma.classification.findUnique({
    where: { id: params.id },
  });

  if (!team) {
    redirect("/resultados");
  }

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaEdit className="text-yellow-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Editar Equipo</h1>
        </div>

        <form action={updateTeam.bind(null, team.id)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre del Equipo</label>
            <input
              type="text"
              name="team"
              defaultValue={team.team}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Escudo (URL)</label>
            <input
              type="text"
              name="crest"
              defaultValue={team.crest}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Puntos</label>
              <input type="number" name="points" defaultValue={team.points} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Partidos Jugados</label>
              <input type="number" name="pj" defaultValue={team.pj} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">PG</label>
              <input type="number" name="pg" defaultValue={team.pg} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">PE</label>
              <input type="number" name="pe" defaultValue={team.pe} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">PP</label>
              <input type="number" name="pp" defaultValue={team.pp} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles a Favor</label>
              <input type="number" name="gf" defaultValue={team.gf} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles en Contra</label>
              <input type="number" name="gc" defaultValue={team.gc} className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}