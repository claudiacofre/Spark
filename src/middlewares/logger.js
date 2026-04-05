import fs from 'fs/promises'; // Módulo para manipular archivos y directorios (Persistencia plana).
import path from 'path';

const logFilePath = path.resolve('src/logs/log.txt'); // Uso path.resolve para asegurar que encuentre la carpeta logs desde la raíz

// --- Función para simular 3 accesos (Lección 5) ---
export const simularAccesos = async () => {
    const rutasSimuladas = ['/', '/status', '/public/index.html'];
    try {
        for (const ruta of rutasSimuladas) {
            const ahora = new Date();
            const fecha = ahora.toLocaleDateString('es-CL');
            const hora = ahora.toLocaleTimeString('es-CL');
            const logEntrada = `[SIMULADO] Fecha: ${fecha} | Hora: ${hora} | Ruta: ${ruta}\n`;
            
            await fs.appendFile(logFilePath, logEntrada);
        }
        console.log("Se han registrado 3 accesos simulados en logs ✅");
    } catch (error) {
        console.error("Error en la simulación de logs ❌:", error);
    }
};

// --- Middleware para el registro real ---
const loggerMiddleware = async (req, res, next) => {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-CL');
    const hora = ahora.toLocaleTimeString('es-CL');
    const ruta = req.url;
    const method = req.method;
    const logEntrada = `Fecha: ${fecha} | Hora: ${hora} | Ruta: ${method}: ${ruta}\n`;

    try {
        await fs.appendFile(logFilePath, logEntrada);
    } catch (error) {
        console.error("Error registrando en logs ❌:", error);
    }

    next(); 
};

export default loggerMiddleware;