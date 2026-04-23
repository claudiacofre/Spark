import User from '../models/user.models.js'; 
import path from 'path';

export const uploadFile = async (req, res) => {
    try {
        console.log("Archivo recibido:", req.file);

        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No se recibió archivo" });
        }

        // 1. Definimos la ruta
        const imageUrl = `/uploads/${req.file.filename}`;

        // 2. PRIMERO guardamos en la base de datos y sesión
        if (req.session && req.session.user) {
            await User.update(
                { avatar: imageUrl }, 
                { where: { id: req.session.user.id } }
            );
            req.session.user.avatar = imageUrl; // Esto es vital para Handlebars
            console.log("Base de datos actualizada con:", imageUrl);
        }

        // 3. POR ÚLTIMO respondemos al cliente
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