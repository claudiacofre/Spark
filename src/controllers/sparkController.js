import Spark from '../models/spark.js'; 

// --- RUTAS DE NAVEGACIÓN (HTML/Status) --- 
// Ruta de Inicio HTML optimizada con motor de plantillas 
export const getIndex = async (req, res) => {
    try {
        // Busco las chispas en la BdD
        const sparks = await Spark.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10 // Solo las últimas 10
        });

        res.render('index', { 
            nombreProyecto: 'Spark', 
            status: 'Online',
            sparks: sparks // Paso los datos reales a la vista .hbs
        });
    } catch (error) {
        console.error("Error al cargar la página de inicio:❌", error);
        res.status(500).send("Error al cargar la página de inicio.❌");
    }
};

// --- Ruta de Status - Devuelve JSON --- //  
export const getStatus = (req, res) => {
    res.json({
        status: "ok",
        project: "SPARK",
        timestamp: new Date().toISOString(),
        folder_structure: "verified"
    });
};

// --- Crear una nueva chispa (Post) ---
export const postSpark = async (req, res) => {
    try {
        const { content, parentId } = req.body;
        
        // Uso el modelo Sequelize 
        await Spark.create({
            content,
            parentId: parentId || null
        });

        // Después de crear, redirijo al inicio para ver la nueva chispa
        res.redirect('/'); 
    } catch (error) {
        console.error('Error al crear la chispa:', error);
        res.status(500).json({ error: 'Hubo un problema al encender la chispa. ❌' });
    }
};