import Spark from "../models/spark.js";

// --- RUTAS DE NAVEGACIÓN (HTML/Status) ---
// Ruta de Inicio HTML optimizada con motor de plantillas HBS
export const getIndex = async (req, res) => {
  try {
    // 1. Buscamos las chispas
    const sparksData = await Spark.findAll({ // Consulta la base de datos para obtener las chispas más recientes
      order: [["created_at", "DESC"]],
      limit: 10, // Solo las últimas 10 publicaciones.
    });
    const sparks = sparksData.map(spark => {
        const data = spark.get({ plain: true });
        return {
            ...data,
            // Nos aseguramos de que exista 'created_at' usando el valor de la DB
            created_at: data.created_at || data.createdAt 
        };
    });

    res.render("index", {
      sparks: sparks,  
    });
  } catch (error) {
    console.error("Error en getIndex:", error);
    res.status(500).send("Error");
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