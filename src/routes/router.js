import { Router } from 'express';
import Spark from '../models/spark.js'; 
import { getIndex, getStatus } from '../controllers/sparkController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', getIndex);
router.get('/status', getStatus);

// --- RUTAS DE NAVEGACIÓN (HTML/Status) --- 
// Ruta de Inicio HTML optimizada con motor de plantillas 
router.get('/', (req, res) => {
    res.render('index', {
        nombreProyecto: 'Spark',
        status: 'Online',
        mensaje: 'Listo para encender nuevas ideas.'
    });
});
// Ruta de Status - Devuelve JSON (Requerimiento) 
router.get('/status', (req, res) => {
    res.json({
        status: "ok",
        message: "Servidor Spark funcionando",
        timestamp: new Date().toISOString()
    });
});

// --- RUTAS DE LA API (Persistencia con Sequelize) ---
// RUTA PARA CREAR UNA NUEVA CHISPA
router.post('/sparks', async (req, res) => {
    try {
        const { content, parentId } = req.body;
        // Creamos la chispa en la base de datos usando Sequelize
        const newSpark = await Spark.create({
            content,
            parentId: parentId || null // Si no viene parentId, es una publicación principal
        });
        res.status(201).json({
            message: '¡Chispa encendida con éxito!',
            data: newSpark
        });
    } catch (error) {
        console.error('Error al crear la chispa:', error);
        
        // Manejo de errores de validación (por si mandan más de 280 caracteres)
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'La chispa debe tener entre 1 y 280 caracteres.' });
        }
        res.status(500).json({ error: 'Hubo un problema al encender la chispa.' });
    }
});

// RUTA PARA VER TODAS LAS CHISPAS (El Feed)
router.get('/sparks', async (req, res) => {
    try {
        const sparks = await Spark.findAll({
            order: [['created_at', 'DESC']] // Las más nuevas primero (usando el nombre de la columna en DB)
        });
        res.json(sparks);
    } catch (error) {
        console.error('Error al obtener chispas:', error);
        res.status(500).json({ error: 'No se pudieron cargar las chispas.' });
    }
});

//Proximamente
router.get('/feed', (req, res) => res.render('feed', { sparks: [] })); // Aquí pasarás los datos de Sequelize
router.get('/profile', (req, res) => res.render('profile'));
router.get('/settings', (req, res) => res.render('settings'));

export default router;

