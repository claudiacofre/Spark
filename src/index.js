import 'dotenv/config'; // Fundamental para leer el archivo .env 
import express from 'express';
import sequelize from './config/database.js'; // Importación ES6
import './models/spark.js'; // Importar para que Sequelize reconozca el modelo
import router from './routes/router.js'; // Importar rutas
import loggerMiddleware from './middlewares/logger.js'; // Importar el logger

const app = express();

// --- MIDDLEWARES ---
app.use(express.json()); // Para leer JSON en las peticiones
app.use(express.static('public')); // Para archivos estáticos
app.use(loggerMiddleware); // Aplicar el logger globalmente

// --- RUTAS ---
app.use('/', router); // Conectamos el router principal

// --- CONFIGURACIÓN DEL PUERTO ---
const PORT = process.env.PORT || 3333;

// --- ARRANQUE DEL SERVIDOR Y BASE DE DATOS ---
const startServer = async () => {
    try {
        // 1. Sincronizar Base de Datos
        // 'alter: true' actualiza las tablas si haces cambios en los modelos
        await sequelize.sync({ alter: true });
        console.log('✅ Conexión a la base de datos de Spark establecida.');

        // 2. Iniciar el servidor (Solo UNA vez y después de la DB)
        app.listen(PORT, () => {
            console.log(`Servidor iniciado`); // Frase exacta requerida
            console.log(`corriendo en el puerto: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error fatal al iniciar el servidor:', error);
    }
};

// Encendemos Spark
startServer();
  