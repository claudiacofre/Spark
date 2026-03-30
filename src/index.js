import 'dotenv/config'; // Manejo de variables de entorno para seguridad y portabilidad.
import express from 'express';
import fs from 'fs/promises'; // Módulo para manipular archivos y directorios (Persistencia plana)[cite: 11].
import hbs from 'hbs'; // Motor de plantillas para renderizar contenido dinámico en HTML[cite: 12].
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURACIÓN DE RUTAS PARA ES MODULES --- Necesario para gestionar rutas absolutas en entornos de ejecución modernos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- IMPORTACIONES DE PROYECTO ---
import sequelize from './config/database.js'; // Conector ORM para bases de datos[cite: 18].
import './models/spark.js'; // Importar para que Sequelize reconozca el modelo
import router from './routes/router.js'; // Implementación de Routing para definir rutas de la app.
import loggerMiddleware from './middlewares/logger.js'; // Función Middleware que se ejecuta antes de la respuesta.

const app = express();

// --- CONFIGURACIÓN DEL MOTOR DE PLANTILLAS (HBS) --- Define Handlebars como el motor para generar vistas dinámicas
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views')); 

// --- MIDDLEWARES ---  
app.use(express.json()); // Permite procesar datos en formato JSON en las peticiones HTTP 
app.use(express.static(path.join(__dirname, '../public'))); // Sirve archivos estáticos (CSS, JS cliente) desde la carpeta pública.
app.use(loggerMiddleware); // Registra cada actividad en un archivo plano. Aplicar el logger globalmente

// --- RUTAS ---
app.use('/', router); // Conecta el sistema de ruteo principal de la aplicación.

// --- CONFIGURACIÓN DEL PUERTO ---
const PORT = process.env.PORT || 3333; // El puerto se obtiene de variables de entorno o usa el 3333 por defecto.

// --- ARRANQUE DEL SERVIDOR Y BASE DE DATOS ---
const startServer = async () => {
    try {
        // Sincroniza los modelos con la base de datos (Preparación para la evaluación del Módulo 7).
        await sequelize.sync({ alter: true });
        console.log('✅ Conexión a la base de datos de Spark establecida.');

        // Inicia el servidor Node.js basado en el motor V8. (Solo UNA vez y después de la DB)
        app.listen(PORT, () => {
            console.log(`Servidor iniciado`); 
            console.log(`corriendo en el puerto: http://localhost:${PORT}`);
        });
    } catch (error) {
        // Manejo de errores fatales para evitar que la app colapse sin aviso.
        console.error('❌ Error fatal al iniciar el servidor:', error);
    }
};

// Encendemos Spark --- Ejecuta la lógica de inicio de Spark.
startServer();