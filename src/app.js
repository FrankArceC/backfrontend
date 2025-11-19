// import express from 'express';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import authRoutes from './routes/auth.routes.js';   
// import taskroutes from './routes/task.routes.js';
// const app = express();
// app.use(cors({origin: 'http://localhost:5173',
//               credentials : true
// }));
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api",authRoutes);
// app.use("/api",taskroutes);

// export default app;

// Dependencias de Express y middleware
import express from 'express';      // Importa Express, el framework de Node.js para construir la API.
import morgan from 'morgan';        // Importa morgan para el registro (logging) de solicitudes HTTP.
import cookieParser from 'cookie-parser'; // Importa cookie-parser para manejar y parsear las cookies en las solicitudes.
import cors from 'cors';            // Importa CORS (Cross-Origin Resource Sharing) para gestionar permisos de origen.

// Rutas específicas del proyecto
import authRoutes from './routes/auth.routes.js';   // Importa las rutas relacionadas con autenticación (registro, login, etc.). 
import taskroutes from './routes/task.routes.js';   // Importa las rutas relacionadas con la gestión de tareas.

// Inicialización de la aplicación Express
const app = express();

// --- Configuración de Middleware ---

// Middleware CORS: Permite solicitudes desde el frontend (React/Vite)
app.use(cors({
  // Define el origen permitido (URL de tu frontend, por ejemplo, en desarrollo).
  origin: 'http://localhost:5173', 
  // Habilita el envío y recepción de cookies (necesario para la autenticación basada en JWT en cookies HTTP-only).
  credentials: true
}));

// Middleware de registro: Muestra información de cada solicitud en la consola (formato 'dev').
app.use(morgan('dev'));

// Middleware para parsear cuerpos de solicitud JSON
// Permite que la aplicación entienda los datos JSON enviados en las peticiones (ej. al registrar un usuario).
app.use(express.json());

// Middleware para parsear las cookies de las solicitudes
// Es esencial para leer y verificar los tokens de autenticación almacenados en las cookies.
app.use(cookieParser());

// --- Definición de Rutas ---

// Usa las rutas de autenticación. Todas las rutas dentro de authRoutes se prefijarán con '/api'.
app.use("/api", authRoutes);

// Usa las rutas de tareas. Todas las rutas dentro de taskroutes se prefijarán también con '/api'.
app.use("/api", taskroutes);

// Exporta la instancia de la aplicación Express para que pueda ser utilizada en el punto de entrada (servidor).
export default app;