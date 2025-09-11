import "./globals.css";
import Providers from "./providers";
import Menu from "@/components/Menu";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers><Menu />{children}</Providers>
      </body>
    </html>
  );
}