import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <div>Acceso denegado. No tienes permisos de administrador.</div>;
  }

  return (
    <div>
      <h1>Panel de administrador</h1>
      {/* Aquí puedes crear formularios para crear, editar o borrar contenido */}
    </div>
  );
}