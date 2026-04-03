import express from "express";
import "dotenv/config"; // Manejo de variables de entorno para seguridad y portabilidad.
import hbs from "hbs"; // Motor de plantillas para renderizar contenido dinámico en HTML.
import path from "path"; // Módulo nativo para manejar rutas de carpetas.
import { fileURLToPath } from "url"; // Convierte URLs de módulos en rutas de sistema de archivos.

// --- CONFIGURACIÓN DE RUTAS PARA ES MODULES --- Necesario para gestionar rutas absolutas en entornos de ejecución modernos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hbs.registerPartials(path.join(__dirname, "views/partials"));

// --- IMPORTACIONES DE PROYECTO ---
import sequelize from "./config/database.js"; // Conector ORM para bases de datos.
import "./models/spark.js"; // Importar para que Sequelize reconozca el modelo
import router from "./routes/router.js"; // Implementación de Routing para definir rutas de la app.
import loggerMiddleware, { simularAccesos } from "./middlewares/logger.js"; // Función Middleware que se ejecuta antes de la respuesta.

const app = express();

// --- CONFIGURACIÓN DEL PUERTO ---
const PORT = process.env.PORT || 3333; 

// --- CONFIGURACIÓN DEL MOTOR DE PLANTILLAS (HBS) --- Define Handlebars como el motor para generar vistas dinámicas
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// --- MIDDLEWARES ---
app.use(express.json()); // Permite procesar datos en formato JSON en las peticiones HTTP .
app.use(express.static(path.join(__dirname, "../public"))); // Sirve archivos estáticos (CSS, JS cliente) desde la carpeta pública.
app.use(loggerMiddleware); // Registra cada actividad en un archivo plano. Aplica el logger globalmente.
app.use(express.urlencoded({ extended: true }));  // Middleware para leer datos de formularios (POST)
 
// --- RUTAS ---
app.use("/", router); // Conecta el sistema de ruteo principal de la aplicación.

// --- ARRANQUE DEL SERVIDOR Y BASE DE DATOS ---
const startServer = async () => {
  try {
    // Sincroniza los modelos con la base de datos (Preparación para la evaluación del Módulo 7).
    await sequelize.sync({ alter: true });
    console.log("Conexión a la base de datos de Spark establecida. ✅");

    // --- TAREA LECCIÓN 5: Ejecutar simulación de logs ---
    await simularAccesos();

    // Inicia el servidor Node.js basado en el motor V8. (Solo UNA vez y después de la DB)
    app.listen(PORT, () => {
      console.log(
        `Servidor iniciado corriendo en el puerto: http://localhost:${PORT} 🎉`,
      );
    });
  } catch (error) {
    // Manejo de errores fatales para evitar que la app colapse sin aviso.
    console.error("Error fatal al iniciar el servidor: ❌", error);
  }
};

// Encendemos Spark 
startServer();
