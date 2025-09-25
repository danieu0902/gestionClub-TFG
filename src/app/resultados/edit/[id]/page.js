import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FaEdit } from "react-icons/fa";

// Server Action para actualizar resultado
async function updateResult(id, formData) {
  "use server";

  const team1 = formData.get("team1");
  const team2 = formData.get("team2");
  const score1 = parseInt(formData.get("score1"), 10);
  const score2 = parseInt(formData.get("score2"), 10);
  const crest1 = formData.get("crest1");
  const crest2 = formData.get("crest2");
  const date = new Date(formData.get("date"));

  await prisma.result.update({
    where: { id },
    data: { team1, team2, score1, score2, crest1, crest2, date },
  });

  redirect("/resultados");
}

export default async function EditResultadoPage({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    redirect("/resultados");
  }

  const result = await prisma.result.findUnique({
    where: { id: params.id },
  });

  if (!result) {
    redirect("/resultados");
  }

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaEdit className="text-yellow-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Editar Resultado</h1>
        </div>

        <form action={updateResult.bind(null, result.id)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Equipo 1</label>
            <input
              type="text"
              name="team1"
              defaultValue={result.team1}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Equipo 2</label>
            <input
              type="text"
              name="team2"
              defaultValue={result.team2}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles Equipo 1</label>
              <input
                type="number"
                name="score1"
                defaultValue={result.score1}
                required
                className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Goles Equipo 2</label>
              <input
                type="number"
                name="score2"
                defaultValue={result.score2}
                required
                className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Cresta Equipo 1 (URL)</label>
            <input
              type="text"
              name="crest1"
              defaultValue={result.crest1}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Cresta Equipo 2 (URL)</label>
            <input
              type="text"
              name="crest2"
              defaultValue={result.crest2}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Fecha</label>
            <input
              type="date"
              name="date"
              defaultValue={new Date(result.date).toISOString().split("T")[0]}
              required
              className="mt-1 block w-full border border-black text-black rounded-md px-3 py-2"
            />
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