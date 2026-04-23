import path from 'path';

export const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                status: "error", 
                message: "No se subió ningún archivo" 
            });
        }

        // Estructura de respuesta consistente (Requerimiento del Módulo 8) 
        res.status(201).json({
            status: "success",
            message: "Archivo subido correctamente",
            data: {
                filename: req.file.filename,
                url: `/uploads/${req.file.filename}`,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: "error", 
            message: "Error al procesar la subida" 
        });
    }
};