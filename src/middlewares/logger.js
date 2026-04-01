
import fs from 'fs/promises';
import path from 'path';

const logFilePath = path.resolve('src/logs/log.txt');

const loggerMiddleware = async (req, res, next) => {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-CL');
    const hora = ahora.toLocaleTimeString('es-CL');
    const ruta = req.url;

    const logEntrada = `Fecha: ${fecha} | Hora: ${hora} | Ruta: ${ruta}\n`;

    try {
        await fs.appendFile(logFilePath, logEntrada);
    } catch (error) {
        console.error("Error registrando en logs ❌:", error);
    }

    next(); 
};

export default loggerMiddleware;

