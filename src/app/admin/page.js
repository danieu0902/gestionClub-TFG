import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaUserFriends,
  FaTrophy,
  FaCalendarAlt,
  FaNewspaper,
  FaClipboardList,
  FaUserShield,
  FaChartBar,
} from "react-icons/fa";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Solo permitir acceso a administradores
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const sections = [
    {
      title: "Plantilla",
      description: "Gestiona los jugadores del equipo",
      href: "/team",
      icon: <FaUserFriends className="text-blue-600 text-4xl" />,
      color: "from-blue-50 to-blue-100 hover:shadow-blue-300",
    },
    {
      title: "Resultados",
      description: "Visualiza y gestiona los resultados de los partidos",
      href: "/resultados",
      icon: <FaTrophy className="text-yellow-500 text-4xl" />,
      color: "from-yellow-50 to-yellow-100 hover:shadow-yellow-300",
    },
    {
      title: "Clasificación",
      description: "Consulta la tabla de posiciones",
      href: "/resultados#clasificacion",
      icon: <FaChartBar className="text-green-600 text-4xl" />,
      color: "from-green-50 to-green-100 hover:shadow-green-300",
    },
    {
      title: "Planificación",
      description: "Administra las tareas y el calendario del club",
      href: "/planning",
      icon: <FaClipboardList className="text-indigo-600 text-4xl" />,
      color: "from-indigo-50 to-indigo-100 hover:shadow-indigo-300",
    },
    {
      title: "Noticias",
      description: "Crea y gestiona publicaciones del club",
      href: "/news",
      icon: <FaNewspaper className="text-red-500 text-4xl" />,
      color: "from-red-50 to-red-100 hover:shadow-red-300",
    },
    {
      title: "Eventos",
      description: "Organiza próximos eventos y actividades",
      href: "/events",
      icon: <FaCalendarAlt className="text-purple-600 text-4xl" />,
      color: "from-purple-50 to-purple-100 hover:shadow-purple-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center">
          Panel de Administración
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              <div
                className={`p-6 rounded-2xl bg-gradient-to-br ${section.color} shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{section.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}