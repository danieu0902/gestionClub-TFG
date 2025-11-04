"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Credenciales inválidas. Revisa tu correo o contraseña.');
      } else {
        router.push('/team');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-blue-500 text-2xl font-bold mb-6 text-center">Inicia Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          disabled={loading}
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Divisor para separar el formulario del login social */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-blue-500">O inicia sesión con</span>
        </div>
      </div>

      {/* Botones de OAuth */}
      <div className="flex justify-between space-x-2"> 
        {/* Botón de Google con icono */}
        <button
          onClick={() => signIn("google")}
          className="flex-1 flex items-center justify-center py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <FaGoogle className="text-xl" />
        </button>
        {/* Botón de Discord con icono */}
        <button
          onClick={() => signIn("discord")}
          className="flex-1 flex items-center justify-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <FaDiscord className="text-xl" />
        </button>
      
      </div>
    </div>
  );
}