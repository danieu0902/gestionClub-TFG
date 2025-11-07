import "./globals.css";
import Providers from "./providers";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Gestión Club',
  description: 'web para facilitar la gestión del club',
  manifest: '/pwa/manifest.json',
}
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers><Menu />{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}