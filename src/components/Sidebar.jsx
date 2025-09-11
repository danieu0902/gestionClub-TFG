"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/team">Plantilla</Link></li>
        <li><Link href="/calendar">Planning Semanal</Link></li>
        {session?.user.role === "ADMIN" && (
          <li><Link href="/dashboard/admin">Panel de Admin</Link></li>
        )}
      </ul>
    </nav>
  );
}