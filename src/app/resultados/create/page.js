import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createResult(formData) {
  "use server";

  const team1 = formData.get("team1");
  const team2 = formData.get("team2");
  const score1 = parseInt(formData.get("score1"), 10);
  const score2 = parseInt(formData.get("score2"), 10);
  const crest1 = formData.get("crest1");
  const crest2 = formData.get("crest2");
  const date = new Date(formData.get("date"));

  await prisma.result.create({
    data: { team1, team2, score1, score2, crest1, crest2, date },
  });

  redirect("/resultados");
}

export default async function CreateResultadoPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/resultados"); // no permitir acceso si no es admin
  }

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center flex items-center justify-center gap-3">
          📝 Añadir Resultado
        </h1>

        <form action={createResult} className="space-y-6">
          {/* EQUIPOS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Equipo 1
            </label>
            <input
              type="text"
              name="team1"
              required
              placeholder="Introduce el nombre del primer equipo"
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                         text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Equipo 2
            </label>
            <input
              type="text"
              name="team2"
              required
              placeholder="Introduce el nombre del segundo equipo"
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                         text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>

          {/* GOLES */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                ⚽ Goles Equipo 1
              </label>
              <input
                type="number"
                name="score1"
                required
                placeholder="0"
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                           text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 
                           focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                ⚽ Goles Equipo 2
              </label>
              <input
                type="number"
                name="score2"
                required
                placeholder="0"
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                           text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 
                           focus:border-red-500 transition"
              />
            </div>
          </div>

          {/* ESCUDOS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              🛡️ Escudo Equipo 1 (URL)
            </label>
            <input
              type="text"
              name="crest1"
              required
              placeholder="https://ejemplo.com/escudo1.png"
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                         text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              🛡️ Escudo Equipo 2 (URL)
            </label>
            <input
              type="text"
              name="crest2"
              required
              placeholder="https://ejemplo.com/escudo2.png"
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                         text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* FECHA */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              📅 Fecha del partido
            </label>
            <input
              type="date"
              name="date"
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                         text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                         focus:border-purple-500 transition"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 
                       rounded-lg font-bold shadow-md hover:shadow-xl hover:scale-[1.02] 
                       transition-transform"
          >
            Guardar Resultado
          </button>
        </form>
      </div>
    </div>
  );
}
