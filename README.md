# Gestión de la Plantilla del Club

#GestionDeLaPlantillaDelClub  
Este repositorio (**gestionClub-TFG**) contiene una aplicación web construida con **Next.js** para la gestión de la plantilla de un club deportivo.  
La aplicación permite realizar operaciones de **CRUD** (Crear, Leer, Actualizar y Eliminar) sobre una lista de jugadores, con funcionalidades exclusivas para el rol de **administrador**.

---

## 🛠️ Tecnologías Utilizadas
- **Next.js 14**: Framework de React para el lado del servidor y cliente.
- **React**: Biblioteca para la interfaz de usuario.
- **Tailwind CSS**: Framework CSS para un desarrollo rápido y con diseños atractivos.
- **Server Actions**: Funcionalidad de Next.js para manejar peticiones de servidor de forma segura.

---

## ✨ Funcionalidades

### Listado de Jugadores
- Visualiza a todos los jugadores, agrupados por su demarcación (Portero, Defensa, etc.).

### CRUD para Admins
Los usuarios con rol **ADMIN** tienen acceso a las siguientes funcionalidades:
- **Crear Jugador**: Un formulario para añadir nuevos jugadores a la plantilla.
- **Actualizar Jugador**: Un formulario para editar la información de un jugador existente.
- **Eliminar Jugador**: Un botón para eliminar un jugador de forma permanente.

### Integración con API
La aplicación se conecta con la API externa:  
➡️ [https://nxapi-gestion-club.vercel.app/api/players](https://nxapi-gestion-club.vercel.app/api/players)  
para gestionar los datos de los jugadores.

---

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/danieu0902/gestionClub-TFG.git
   cd gestionClub-TFG

2. **Instala las dependencias**:
   ```bash
   npm install

3. **Ejecuta la aplicacion en modo desarrollo**:
   ```bash
   npm run dev


## 🔒 Control de acceso
