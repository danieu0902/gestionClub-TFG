import { Suspense } from "react";
import TeamList from "@/components/TeamList";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Plantilla
      </h1>

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            Cargando jugadores...
          </div>
        }
      >
        <TeamList />
      </Suspense>
    </div>
  );
}