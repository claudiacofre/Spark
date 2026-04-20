import Spark from "../models/spark.js";

// --- RUTAS DE NAVEGACIÓN (HTML/Status) ---
// Ruta de Inicio HTML optimizada con motor de plantillas HBS
export const getIndex = (req, res) => {
    // Ya no buscamos chispas aquí, solo mostramos la portada
    res.render("index", { title: "Bienvenidos a Spark" });
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