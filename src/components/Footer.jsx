export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto border-t border-gray-800">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Club Manager</span>. Todos los derechos reservados.
      </p>
      <p className="text-sm">Desarrollado por Daniel Serrano Portillo</p>
    </footer>
  );
}