import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para obtener rutas en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loggerMiddleware = async (req, res, next) => {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString();
    const ruta = req.originalUrl;

    // Estructura requerida: fecha, hora, ruta accedida 
    const lineaLog = `[${fecha} ${hora}] Acceso a: ${ruta}\n`;

    try {
        // Se guarda en la carpeta /logs 
        await fs.appendFile(path.join(__dirname, '../logs/log.txt'), lineaLog);
    } catch (error) {
        console.error("Error al escribir el log:", error);
    }

    next(); // Permite que la solicitud continúe a la ruta 
};

export default loggerMiddleware;