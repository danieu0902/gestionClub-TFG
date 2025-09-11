import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"; // <-- ¡Importa esto!
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'; // <-- ¡Importa bcryptjs!

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma), 
  providers: [
    // Proveedores OAuth existentes
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ¡Nuevo proveedor de credenciales!
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null; // Usuario no encontrado o sin contraseña (si usa OAuth)
        }

        // Compara la contraseña hasheada
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null; // Contraseña incorrecta
        }

        // Si la autenticación es exitosa, devuelve el objeto de usuario
        // NextAuth usará este objeto 'user' para el callback 'jwt'
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image, // Asegúrate de que tu modelo User tenga 'image'
          role: user.role, // <-- Asegúrate de que el rol se devuelve aquí
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Obtenemos el usuario de la base de datos para el rol
        const userInDb = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.role = userInDb?.role || "USER";
        token.id = user.id; // Guarda el ID del usuario en el token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Asigna el ID del token a la sesión
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Usa JWT para las sesiones
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };