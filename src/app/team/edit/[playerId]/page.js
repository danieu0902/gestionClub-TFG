import { redirect } from 'next/navigation';

// Función para obtener los datos del jugador a partir del ID en la URL
async function getPlayer(playerId) {
  const res = await fetch(`https://nxapi-gestion-club.vercel.app/api/players/${playerId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch player');
  }
  return res.json();
}

// SERVER ACTION para actualizar un jugador
async function updatePlayer(formData) {
  "use server";
  
  const playerId = formData.get('id');
  const updatedPlayer = {
    nombre: formData.get('nombre'),
    demarcacion: formData.get('demarcacion'),
    dorsal: parseInt(formData.get('dorsal'), 10),
    fotoUrl: formData.get('fotoUrl'),
  };

  try {
    const res = await fetch(`https://nxapi-gestion-club.vercel.app/api/players/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    });

    if (!res.ok) {
      console.error('Error al actualizar jugador:', await res.json());
      throw new Error('Failed to update player');
    }

  } catch (error) {
    console.error("Error al actualizar el jugador:", error);
    return redirect('/team?error=fallo');
  }

  return redirect('/team?message=actualizado');
}

export default async function EditPlayerPage({ params }) {
  const player = await getPlayer(params.playerId);
  
  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Editar Jugador</h1>
        
        <form action={updatePlayer} className="space-y-6">
          <input type="hidden" name="id" value={player._id} />
          
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="nombre" name="nombre" defaultValue={player.nombre} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div>
            <label htmlFor="demarcacion" className="block text-sm font-medium text-gray-700">Demarcación</label>
            <select id="demarcacion" name="demarcacion" defaultValue={player.demarcacion} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900">
              <option value="">Selecciona una demarcación</option>
              <option value="Portero">Portero</option>
              <option value="Defensa">Defensa</option>
              <option value="Centrocampista">Centrocampista</option>
              <option value="Delantero">Delantero</option>
            </select>
          </div>

          <div>
            <label htmlFor="dorsal" className="block text-sm font-medium text-gray-700">Dorsal</label>
            <input type="number" id="dorsal" name="dorsal" defaultValue={player.dorsal} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div>
            <label htmlFor="fotoUrl" className="block text-sm font-medium text-gray-700">URL de la Foto</label>
            <input type="url" id="fotoUrl" name="fotoUrl" defaultValue={player.fotoUrl} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900" />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              Actualizar Jugador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}