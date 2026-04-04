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

// --- OBTENER CHISPAS  (Devuelve JSON para el JS del cliente) ---
export const getSparks = async (req, res) => {
    try {
        const sparks = await Spark.findAll({ order: [['createdAt', 'DESC']] });
        res.json(sparks); // <--- IMPORTANTE: Debe devolver JSON, no renderizar HTML
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las chispas" });
    }
};

// --- Ruta de Status (Verificación técnica)  --- //  
export const getStatus = (req, res) => {
    res.json({
        status: "ok",
        project: "SPARK",
        timestamp: new Date().toISOString(),
        folder_structure: "verified"
    });
};

// --- Crear una nueva chispa (Procesa el Formulario POST) ---
export const postSpark = async (req, res) => {
    console.log("--- Intento de publicación ---");
    console.log("Cuerpo de la petición (body):", req.body);

    try {
        const { content, parentId } = req.body;

        // Validar que el contenido no venga vacío
        if (!content || content.trim() === "") {
            console.log("⚠️ Error: El contenido llegó vacío.");
            return res.redirect('/'); 
        }

        // Crear la chispa en la base de datos
        const nuevaChispa = await Spark.create({
            content,
            parentId: parentId || null
        });

        console.log("✅ Chispa creada con ID:", nuevaChispa.id);

        // Redirigir al inicio para ver los cambios
        res.redirect('/');

    } catch (error) {
        console.error('❌ Error al crear la chispa:', error.message);
        res.status(500).send("Error interno del servidor al guardar la chispa. ❌");
    }
};