import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createNews(formData) {
  "use server";

  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  await prisma.news.create({
    data: { title, content, image },
  });

  redirect("/news");
}

export default async function CreateNewsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/news");

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Crear Comunicado</h1>

        <form action={createNews} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Título
            </label>
            <input
              type="text"
              name="title"
              required
              className=" text-gray-950 mt-1 block w-full border border-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Contenido
            </label>
            <textarea
              name="content"
              rows="6"
              required
              className="text-gray-950 mt-1 block w-full border border-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Imagen (URL)
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              className="text-blue-300 mt-1 block w-full border border-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Guardar Comunicado
          </button>
        </form>
      </div>
    </div>
  );
}