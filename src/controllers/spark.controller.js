import Spark from "../models/spark.js";

// --- Obtener Chispas (Punto de conexión de la API / JSON) ---
export const getSparks = async (req, res) => {
  try {
    const sparks = await Spark.findAll({ order: [["created_at", "DESC"]] }); // Busca todas las chispas (sin el límite de 10)
    res.json(sparks); // Envia la respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las chispas. ❌" });
  }
};

export const getFeed = async (req, res) => {
    try {
        // Buscamos todas las chispas en la base de datos
        const sparksData = await Spark.findAll({ 
            order: [["created_at", "DESC"]] // Nota: uso 'created_at' porque tienes 'underscored: true'
        });

        const sparks = sparksData.map(spark => {
            const data = spark.get({ plain: true });
            return {
                ...data,
                created_at: data.created_at || data.createdAt 
            };
        });

        res.render('feed', { 
            title: 'Muro de Chispas',
            sparks 
        });
    } catch (error) {
        console.error("Error al cargar el feed:", error);
        res.status(500).send("Error al cargar las chispas. ❌");
    }
};

// Obtiene el detalle de una chispa
export const getPostDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const sparkData = await Spark.findByPk(id); // Busca por Primary Key (ID)

        if (!sparkData) return res.status(404).send("Chispa no encontrada. 🔍");

        const data = sparkData.get({ plain: true });
        const spark = {
            ...data,
            created_at: data.created_at || data.createdAt
        };

       res.render("post", { spark });
    } catch (error) {
        res.status(500).send("Error al abrir la chispa. ❌");
    }
};

//Crea una nueva chispa en la base de datos. Procesamiento de Formulario y manejo de la validación de contenido y la persistencia mediante Sequelize.
export const postSpark = async (req, res) => {
    try {
        const { content, parentId } = req.body;

        // 1. Validación de contenido (Evita guardar strings vacíos o solo espacios)
        if (!content || content.trim() === "") {
            console.warn("Intento de publicación con contenido vacío. ⚠️");
            return res.status(400).json({ error: 'Contenido vacío.' });
        }

        // 2. Creación en la base de datos
        // parentId será null si es una chispa principal, o el ID de otra si es respuesta.
        await Spark.create({
            content: content.trim(),
            parentId: parentId || null,
            username: 'Claudia' // Hardcoded temporalmente hasta tener el auth listo
        });

        // 3. Redirección exitosa al feed
        res.redirect('/');

    } catch (error) {
        console.error("--- ❌ ERROR AL GUARDAR CHISPA ❌ ---");
        res.status(500).send("Error interno del servidor al guardar la chispa. ❌");
    }
};

