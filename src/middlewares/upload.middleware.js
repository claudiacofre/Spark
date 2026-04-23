import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Los archivos irán a la carpeta pública [cite: 111]
    },
    filename: (req, file, cb) => {
        // Renombramos para evitar duplicados: fecha + nombre original
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtro de validación (Tipo controlado) [cite: 56, 115]
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato no permitido. Solo JPEG, JPG y PNG.'), false);
    }
};

export const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Límite de 2MB [cite: 56]
});