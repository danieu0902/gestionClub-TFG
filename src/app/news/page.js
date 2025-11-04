import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

export default async function NoticiasPage() {
  const session = await getServerSession(authOptions);
  const noticias = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Noticias y Comunicados
        </h1>

        {session?.user?.role === "ADMIN" && (
          <Link href="/noticias/create">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              <FaPlus /> Añadir Noticia
            </button>
          </Link>
        )}
      </div>

      {/* Si no hay noticias */}
      {noticias.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
             src="https://media1.tenor.com/m/Dcr0r2g05GUAAAAd/carvajal-musiala.gif"
             alt="Sin noticias"
             className="w-72 h-72 object-contain mb-6 rounded-lg"
            />
          <div className="bg-white shadow-md rounded-xl p-6 max-w-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No hay noticias disponibles
            </h2>
            <p className="text-gray-500">
              Vuelve más tarde para estar al tanto de los comunicados más recientes del club.
            </p>
          </div>
        </div>
      ) : (
        // ✅ Mostrar las noticias si existen
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02]"
            >
              {n.image && (
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-5 flex flex-col justify-between h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {n.title}
                </h2>
                <p className="text-gray-600 text-sm flex-grow">{n.content}</p>
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(n.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}