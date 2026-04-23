import User from '../models/user.models.js'; // Asegúrate de importar tu modelo
import path from 'path';

export const uploadFile = async (req, res) => {
    try {
        console.log("Archivo recibido:", req.file);

        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No se recibió archivo" });
        }

        // La ruta que guardaremos (asumiendo que uploads está dentro de public)
        const imageUrl = `/uploads/${req.file.filename}`;

        // Respondemos ÉXITO (esto quita el 'Error de conexión' en el front)
        return res.status(201).json({
            status: "success",
            message: "¡Imagen subida!",
            data: { url: imageUrl }
        });

    } catch (error) {
        console.error("Error en servidor:", error);
        return res.status(500).json({ status: "error", message: "Error interno" });
    }
};