import Spark from "../models/spark.js";

// --- RUTAS DE NAVEGACIÓN (HTML/Status) ---
// Ruta de Inicio HTML optimizada con motor de plantillas HBS
export const getIndex = async (req, res) => {
  try {
    const sparks = await Spark.findAll({ // Consulta la base de datos para obtener las chispas más recientes
      order: [["createdAt", "DESC"]],
      limit: 10, // Solo las últimas 10 publicaciones.
    });
    res.render("index", {
      nombreProyecto: "Spark",
      status: "Online",
      sparks: sparks,  
    });
  } catch (error) {
    res.status(500).send("Error al cargar la página de inicio.❌");
  }
};

// --- Obtener Chispas (Punto de conexión de la API / JSON) ---
export const getSparks = async (req, res) => {
  try {
    const sparks = await Spark.findAll({ order: [["createdAt", "DESC"]] }); // Busca todas las chispas (sin el límite de 10)
    res.json(sparks); // Envia la respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las chispas. ❌" });
  }
};

// --- Ruta de Status (Verificación técnica) ---  (Devuelve JSON para el JS del cliente) 
export const getStatus = (req, res) => {
  res.json({
    status: "ok",
    project: "SPARK",
    timestamp: new Date().toISOString(),
    folder_structure: "verified",
  });
};

// --- Crear una nueva chispa ((Procesamiento de Formulario) ---
export const postSpark = async (req, res) => {
  try {
    const { content, parentId } = req.body;

    // Válida que el contenido no este vacío
    if (!content || content.trim() === "") {
      console.log("Error: El contenido llegó vacío. ⚠️");
      return res.redirect("/");
    }

    // Crear la chispa en la base de datos usando Sequelize
    const nuevaChispa = await Spark.create({
      content,
      parentId: parentId || null,
    });

    // Redirigir al inicio para ver los cambios
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error interno del servidor al guardar la chispa. ❌");
  }
};
