import { redirect } from 'next/navigation';

// SERVER ACTION para crear un nuevo jugador
async function createPlayer(formData) {
  "use server";
  
  const newPlayer = {
    nombre: formData.get('nombre'),
    demarcacion: formData.get('demarcacion'),
    dorsal: parseInt(formData.get('dorsal'), 10),
    fotoUrl: formData.get('fotoUrl'),
  };

  try {
    const res = await fetch('https://nxapi-gestion-club.vercel.app/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });

    if (!res.ok) {
      console.error('Error al crear jugador:', await res.json());
      throw new Error('Failed to create player');
    }

  } catch (error) {
    console.error("Error al crear el jugador:", error);
    return redirect('/team?error=fallo');
  }

  return redirect('/team?message=creado');
}

export default function CreatePlayerPage() {
  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Crear Nuevo Jugador</h1>
        
        <form action={createPlayer} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="nombre" name="nombre" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div>
            <label htmlFor="demarcacion" className="block text-sm font-medium text-gray-700">Demarcación</label>
            <select id="demarcacion" name="demarcacion" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900">
              <option value="">Selecciona una demarcación</option>
              <option value="Portero">Portero</option>
              <option value="Defensa">Defensa</option>
              <option value="Centrocampista">Centrocampista</option>
              <option value="Delantero">Delantero</option>
            </select>
          </div>

          <div>
            <label htmlFor="dorsal" className="block text-sm font-medium text-gray-700">Dorsal</label>
            <input type="number" id="dorsal" name="dorsal" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div>
            <label htmlFor="fotoUrl" className="block text-sm font-medium text-gray-700">URL de la Foto</label>
            <input type="url" id="fotoUrl" name="fotoUrl" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
              Crear Jugador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}