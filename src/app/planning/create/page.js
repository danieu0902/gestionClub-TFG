import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FaClipboardList } from "react-icons/fa";

async function createTask(formData) {
  "use server";

  const description = formData.get("description");
  const day = formData.get("day");
  const userId = formData.get("userId");

  await prisma.task.create({
    data: {
      description,
      day,
      userId,
    },
  });

  redirect("/planning");
}

export default async function CreateTaskPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/planning"); // solo admins pueden crear
  }

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <FaClipboardList className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Añadir Tarea</h1>
        </div>

        <form action={createTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              required
              placeholder="Ej: Entrenamiento en el campo"
              className="mt-1 block w-full border border-black text-black placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Día
            </label>
            <input
              type="text"
              name="day"
              required
              placeholder="Ej: Lunes"
              className="mt-1 block w-full border border-black text-black placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* campo oculto con el userId del admin */}
          <input type="hidden" name="userId" value={session.user.id} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Guardar Tarea
          </button>
        </form>
      </div>
    </div>
  );
}