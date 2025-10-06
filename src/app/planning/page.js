import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";

async function toggleTask(taskId, completed) {
  "use server";

  await prisma.task.update({
    where: { id: taskId },
    data: { completed: !completed },
  });

  redirect("/planning");
}

export default async function PlanningPage() {
  const session = await getServerSession(authOptions);

  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Planificación
        </h1>

        {session?.user?.role === "ADMIN" && (
          <Link href="/planning/create">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              <FaPlus /> Añadir Tarea
            </button>
          </Link>
        )}
      </div>

      {/* LISTADO DE TAREAS */}
      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-gray-600 text-lg">No hay tareas todavía.</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-between"
          >
            <div>
              <h2
                className={`text-lg font-semibold ${
                  task.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {task.description}
              </h2>
              <p className="text-sm text-gray-500">📅 {task.day}</p>
            </div>

            {/* Botón para completar solo visible para admins */}
            {session?.user?.role === "ADMIN" && (
              <form action={toggleTask.bind(null, task.id, task.completed)}>
                <button
                  type="submit"
                  className={`text-2xl ${
                    task.completed
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-400 hover:text-blue-600"
                  } transition`}
                  title={
                    task.completed ? "Marcar como pendiente" : "Marcar como completada"
                  }
                >
                  {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
                  
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}