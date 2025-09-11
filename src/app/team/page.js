import Image from 'next/image';

// Función para obtener los datos de la API
async function getPlayers() {
  const res = await fetch('https://nxapi-gestion-club.vercel.app/api/players', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch players');
  }

  return res.json();
}

export default async function TeamPage() {
  const players = await getPlayers();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Plantilla</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <div key={player._id} className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src={player.fotoUrl}
              alt={player.nombre}
              width={200}
              height={200}
              className="w-full h-auto rounded-md mb-4"
            />
            <div>
              <h1 className='text-blue-500 text-3xl font-bold'>{player.dorsal}</h1>
              <h2 className="text-xl font-semibold text-black">{player.nombre}</h2>
            </div>
            
            <p className="text-gray-600">{player.demarcacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}