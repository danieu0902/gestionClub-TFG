import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import PlanningList from "@/components/PlanningList";

export default async function PlanningPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
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

      {/* Suspense para carga de tareas */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            Cargando planificación...
          </div>
        }
      >
        <PlanningList />
      </Suspense>
    </div>
  );
}