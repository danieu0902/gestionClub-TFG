import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { revalidatePath } from "next/cache";

export default async function NoticiasList() {
  const session = await getServerSession(authOptions);
  const userIsAdmin = session?.user?.role === "ADMIN";

  const noticias = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Eliminación directa sin archivo externo
  async function deleteNews(id) {
    "use server";

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news/${id}`, {
      method: "DELETE",
    });

    // refrescar la lista
    revalidatePath("/news");
  }

  if (noticias.length === 0) {
    return (
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
    );
  }

  return (
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
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-800">{n.title}</h2>

              {userIsAdmin && (
                <div className="flex items-center gap-3">

                  {/* EDITAR */}
                  <a
                    href={`/news/edit/${n.id}`}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Editar"
                  >
                    <FiEdit size={20} />
                  </a>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm flex-grow">{n.content}</p>

            <p className="text-xs text-gray-400 mt-4">
              {new Date(n.createdAt).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}