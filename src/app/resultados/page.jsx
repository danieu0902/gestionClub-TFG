import { Suspense } from "react";
import ResultadosList from "@/components/ResultadosList";

export default function ResultadosPage() {
  return (
    <div className="p-6 sm:p-8 font-sans bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <Suspense
        fallback={
         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            Cargando resultados y clasificación...
          </div>
        }
      >
        <ResultadosList />
      </Suspense>
    </div>
  );
}
