
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Definimos la ruta hacia tu carpeta existente
const logFilePath = path.resolve('src/logs/access_log.json');

const loggerMiddleware = async (req, res, next) => {
    const logEntry = {
        method: req.method, // [cite: 22]
        url: req.url,
        at: new Date().toLocaleString(),
        ip: req.ip
    };

    try {
        // 1. Leer lo que ya existe (o crear un array vacío si no existe) 
        const rawData = await fs.readFile(logFilePath, 'utf8').catch(() => '[]');
        const logs = JSON.parse(rawData); // 

        // 2. Agregar el nuevo evento
        logs.push(logEntry);

        // 3. Guardar en el archivo plano (Persistencia Módulo #6) 
        await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error("Error escribiendo en logs:", error);
    }

    next(); // // Permite que la solicitud continúe a la ruta 
};

export default loggerMiddleware;